import React, { useState } from 'react'
import { Text, View, TextInput, StyleSheet, Button, Image } from 'react-native'
import { updateUser } from '../../redux/actions/users'
import { setUserWithLocalStorage } from '../../redux/actions/auth'
import { useDispatch, useSelector } from 'react-redux'
import button from '../../styles/components/button'
import form from '../../styles/components/form'
import * as ImagePicker from 'expo-image-picker'
import { useTranslation } from 'react-i18next'
import { moderateScale } from '../../utils/Responsive'
import { AlertMessage } from '../../utils/AlertMessage'
import AsyncStorage from '@react-native-async-storage/async-storage'

const DetailsUser = ({ route }) => {
  const { userId } = route.params
  const dispatch = useDispatch()
  const localStorageData = useSelector((state) => state.auth.data)
  const [isOnChange, setIsOnChange] = useState(false)

  const { t } = useTranslation()

  const [data, setData] = useState({
    userName: localStorageData.user?.userName || '',
    email: localStorageData.user?.email || '',
    image: localStorageData.user?.image || '',
  })

  const pickImage = async () => {
    let permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync()

    if (permissionResult.granted === false) {
      alert(t('permissionToAccessCameraRollIsRequired'))
      return
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    })

    if (!result.canceled) {
      setData({
        ...data,
        image: result.assets[0].uri,
      })
    }
  }

  const handleUpdate = async () => {
    const formData = new FormData()
    formData.append('userName', data.userName)
    formData.append('email', data.email)

    const imageUriParts = data.image.split('.')
    const fileType = imageUriParts[imageUriParts.length - 1]

    let file = {
      uri: data.image,
      name: `image.${fileType}`,
      type: `image/${fileType}`,
    }
    if (file) {
      formData.append('image', file)
    }

    const updatedUserData = {
      ...localStorageData,
      user: {
        ...localStorageData.user,
        userName: data.userName,
        email: data.email,
        image: data.image,
      },
    }

    try {
      await dispatch(updateUser(formData, userId))
      await AsyncStorage.setItem('userData', JSON.stringify(updatedUserData))
      await dispatch(setUserWithLocalStorage(updatedUserData))
      AlertMessage(t('profileUpdated'))
    } catch (error) {
      console.log(error.response.data.errMsg)

      if (error.response.data.errMsg) {
        AlertMessage(error.response.data.errMsg)
      } else {
        AlertMessage(t('anErrorHasOccurred'))
      }
    }
  }

  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <View style={styles.formContainer}>
        <Text style={styles.formLabel}>{t('userName')}</Text>
        <TextInput
          style={styles.formInput}
          placeholder={t('userName')}
          onChangeText={(text) => {
            setData({ ...data, userName: text }), setIsOnChange(true)
          }}
          defaultValue={data?.userName}
        />
        <Text style={styles.formLabel}>{t('email')}</Text>
        <TextInput
          style={styles.formInput}
          placeholder={t('email')}
          onChangeText={(text) => {
            setData({ ...data, email: text }), setIsOnChange(true)
          }}
          defaultValue={data?.email}
        />
        <Text style={styles.formLabel}>{t('avatar')}</Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 50,
          }}
        >
          <View>
            {
              <Image
                source={{
                  uri: `${data?.image}?t=${Date.now()}`,
                }}
                style={{ width: moderateScale(48), height: moderateScale(48) }}
              />
            }
          </View>
          <View>
            <Button
              title={t('changeAvatar')}
              onPress={() => {
                pickImage(), setIsOnChange(true)
              }}
            />
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <Button
            onPress={() => handleUpdate()}
            color={'#00AD4F'}
            title={t('update')}
            disabled={!isOnChange}
          />
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  formContainer: form.formContainer,
  formLabel: form.formLabel,
  formInput: form.formInput,
  buttonText: button.buttonText,
  formButtonRegister: button.formButtonRegister,
  buttonContainer: button.buttonContainer,
  formButtonLogin: button.formButtonLogin,
  formButtonForgetPassword: button.formButtonForgetPassword,
  deleteAccount: button.deleteAccount,
  deleteAccountContainer: button.deleteAccountContainer,
})

export default DetailsUser
