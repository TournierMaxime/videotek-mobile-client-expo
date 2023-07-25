import React, { Fragment, useEffect, useState } from 'react'
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native'
import button from '../../styles/components/button'
import { useDispatch, useSelector } from 'react-redux'
import { getUser, deleteUser, resetUser } from '../../redux/actions/users'
import { logoutUser } from '../../redux/actions/auth'
import { useNavigation } from '@react-navigation/native'
import { checkAccess } from '../../utils/CheckAccess'
import {
  Entypo,
  FontAwesome5,
  MaterialIcons,
  Ionicons,
} from 'react-native-vector-icons'
import profil from '../../styles/components/profil'
import AlertModal from '../../utils/AlertModal'
import { useTranslation } from 'react-i18next'
import { moderateScale } from '../../utils/Responsive'
import { AlertMessage } from '../../utils/AlertMessage'

const UserProfile = ({ route }) => {
  const { userId } = route.params
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const oneUser = useSelector((state) => state.oneUser.data)
  const currentUserId = useSelector((state) => state.auth.data.user.userId)
  const isLogged = useSelector((state) => state.auth.isAuthenticated)
  const [deleteModalVisible, setDeleteModalVisible] = useState(false)
  const [deleteSuccess, setDeleteSuccess] = useState(false)
  const accessDenied = checkAccess(isLogged, currentUserId, userId)
  const userName = `${oneUser?.user?.userName}`

  const { t } = useTranslation()

  const handleLogout = () => {
    dispatch(logoutUser())
    navigation.navigate('Home')
  }

  const handleDelete = async () => {
    try {
      await dispatch(deleteUser(userId))
      setDeleteSuccess(true)
      AlertMessage(t('yourAccountHasBeenSuccessfullyDeleted'))

      setTimeout(async () => {
        await dispatch(logoutUser())
        navigation.navigate('Home')
      }, 3000)
    } catch (error) {
      console.log(error.response.data.errMsg)
      AlertMessage(error.response.data.errMsg)
    }
  }

  const handleDeleteModal = () => {
    setDeleteModalVisible(!deleteModalVisible)
  }

  useEffect(() => {
    dispatch(getUser(userId))
  }, [dispatch, userId, userName])

  useEffect(() => {
    return () => {
      dispatch(resetUser())
    }
  }, [])

  return (
    <View style={styles.container}>
      {accessDenied ? (
        accessDenied
      ) : (
        <Fragment>
          {oneUser && (
            <View style={styles.profilViewContainer}>
              <ScrollView contentContainerStyle={{ height: '100%' }}>
                <TouchableOpacity
                  onPress={() => navigation.navigate('DetailsUser', { userId })}
                >
                  <View style={styles.profileSectionContainer}>
                    <View style={styles.textIconContainer}>
                      <FontAwesome5
                        style={styles.icon}
                        name='user'
                        size={moderateScale(25)}
                        color='black'
                      />
                      <Text style={styles.textSize}>{userName}</Text>
                    </View>
                    <Entypo
                      name='chevron-small-right'
                      size={moderateScale(25)}
                      color='black'
                    />
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => navigation.navigate('UserCritics', { userId })}
                >
                  <View style={styles.profileSectionContainer}>
                    <View style={styles.textIconContainer}>
                      <Entypo
                        style={styles.icon}
                        name='new-message'
                        size={moderateScale(25)}
                        color='black'
                      />
                      <Text style={styles.textSize}>{t('critics')}</Text>
                    </View>
                    <Entypo
                      name='chevron-small-right'
                      size={moderateScale(25)}
                      color='black'
                    />
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => navigation.navigate('Favorites', { userId })}
                >
                  <View style={styles.profileSectionContainer}>
                    <View style={styles.textIconContainer}>
                      <MaterialIcons
                        style={styles.icon}
                        name='favorite-outline'
                        size={moderateScale(25)}
                        color='black'
                      />
                      <Text style={styles.textSize}>{t('favorites')}</Text>
                    </View>
                    <Entypo
                      name='chevron-small-right'
                      size={moderateScale(25)}
                      color='black'
                    />
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => navigation.navigate('Settings', { userId })}
                >
                  <View style={styles.profileSectionContainer}>
                    <View style={styles.textIconContainer}>
                      <Ionicons
                        style={styles.icon}
                        name='settings-outline'
                        size={moderateScale(25)}
                        color='black'
                      />
                      <Text style={styles.textSize}>{t('settings')}</Text>
                    </View>
                    <Entypo
                      name='chevron-small-right'
                      size={moderateScale(25)}
                      color='black'
                    />
                  </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => handleLogout()}>
                  <View style={styles.profileSectionContainer}>
                    <View style={styles.textIconContainer}>
                      <MaterialIcons
                        style={styles.icon}
                        name='logout'
                        size={moderateScale(25)}
                        color='black'
                      />
                      <Text style={styles.textSize}>{t('logout')}</Text>
                    </View>
                    <Entypo
                      name='chevron-small-right'
                      size={moderateScale(25)}
                      color='black'
                    />
                  </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => handleDeleteModal()}>
                  <View style={styles.profileSectionContainer}>
                    <View style={styles.textIconContainer}>
                      <MaterialIcons
                        style={styles.icon}
                        name='delete-outline'
                        size={moderateScale(25)}
                        color='black'
                      />
                      <Text style={[styles.textSize, { color: 'red' }]}>
                        {t('deleteAccount')}
                      </Text>
                    </View>
                    <Entypo
                      name='chevron-small-right'
                      size={moderateScale(25)}
                      color='black'
                    />
                  </View>
                </TouchableOpacity>
                <AlertModal
                  message={t('deleteAccountConfirmMsg')}
                  action={handleDelete}
                  visible={deleteModalVisible}
                  setVisible={setDeleteModalVisible}
                  success={deleteSuccess}
                  t={t}
                >
                </AlertModal>
              </ScrollView>
            </View>
          )}
        </Fragment>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#efefef',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logoutButton: button.logoutButton,
  profileSectionContainer: profil.profileSectionContainer,
  icon: profil.icon,
  textIconContainer: profil.textIconContainer,
  profilViewContainer: profil.profilViewContainer,
  textSize: profil.textSize,
})

export default UserProfile
