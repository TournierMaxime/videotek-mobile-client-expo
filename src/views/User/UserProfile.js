import React, { Fragment, useEffect } from "react"
import { StyleSheet, View, Text, TouchableOpacity } from "react-native"
import button from "../../styles/components/button"
import { useDispatch, useSelector } from "react-redux"
import { getUser } from "../../redux/actions/users/oneUser"
import { logoutUser } from "../../redux/actions/auth/auth"
import { useNavigation } from "@react-navigation/native"
import { checkAccess } from "../../utils/CheckAccess"
import { Entypo, FontAwesome5, MaterialIcons } from 'react-native-vector-icons';
import profil from "../../styles/components/profil"

const UserProfile = ({ route }) => {
  const { userId } = route.params
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const oneUser = useSelector((state) => state.oneUser.data)
  const currentUserId = useSelector((state) => state.auth.data.user.userId)
  const isLogged = useSelector((state) => state.auth.isAuthenticated)

  const handleLogout = async () => {
    await dispatch(logoutUser())
    navigation.navigate("Home")
  }

  useEffect(() => {
    dispatch(getUser(userId))
  }, [dispatch, userId])

  const accessDenied = checkAccess(isLogged, userId, currentUserId)
  const userName = `${oneUser?.user?.userName}`

  return (
    <View style={styles.container}>
      {accessDenied ? (
        accessDenied
      ) : (
        <Fragment>
            {oneUser && (
              <View style={styles.profilViewContainer}>
                <TouchableOpacity onPress={() => navigation.navigate('DetailsUser')}>
                  <View style={styles.profileSectionContainer}>
                    <View style={styles.textIconContainer}>
                      <FontAwesome5 style={styles.icon} name="user" size={25} color="black" />
                      <Text>{userName}</Text>
                    </View>
                    <Entypo name="chevron-small-right" size={25} color="black" /> 
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleLogout()}>
                <View style={styles.profileSectionContainer}>
                  <View style={styles.textIconContainer}>
                    <MaterialIcons style={styles.icon} name="logout" size={25} color="black" />
                    <Text>Déconnexion</Text>
                  </View>
                  <Entypo name="chevron-small-right" size={25} color="black" />
                </View>
                </TouchableOpacity>
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
    backgroundColor: "#efefef",
    alignItems: "center",
    justifyContent: "space-between",
  },
  logoutButton: button.logoutButton,
  profileSectionContainer: profil.profileSectionContainer,
  icon: profil.icon,
  textIconContainer: profil.textIconContainer,
  profilViewContainer: profil.profilViewContainer
})



export default UserProfile
