import React, { useState, useEffect } from 'react'
import { Text, View, TextInput, StyleSheet, Button, Image } from 'react-native'
import { getUser, updateUser, resetUser } from '../../redux/actions/users'
import { useDispatch, useSelector } from 'react-redux'
import { ToastSuccess, ToastError } from '../../utils/Toast'
import ToastConfig from '../../utils/ToastConfig'
import button from '../../styles/components/button'
import form from '../../styles/components/form'
import * as ImagePicker from 'expo-image-picker'
import { useTranslation } from 'react-i18next'
import { moderateScale } from '../../utils/Responsive'

const DetailsUser = ({ route }) => {
  const { userId } = route.params
  const dispatch = useDispatch()
  const user = useSelector((state) => state.oneUser.data.user)
  const [isModified, setIsModified] = useState(false)

  const { t } = useTranslation()

  const [data, setData] = useState({
    userName: user?.userName || '',
    email: user?.email || '',
    image: user?.image || '',
  })

  const pickImage = async () => {
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
      }),
        setIsModified(true)
    }
  }

const handleUpdate = async () => {
  if (!isModified) {
    return
  }

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

  formData.append('image', file)

  try {
    await dispatch(updateUser(formData, userId))
    ToastSuccess('success', t('profileUpdated'), true)
    dispatch(getUser(userId))
  } catch (error) {
    console.log(error.response.data.errMsg)

    if (error.response.data.errMsg) {
      ToastError('error', error.response.data.errMsg, true)
    } else {
      ToastError('error', t('anErrorHasOccurred'), true)
    }
  }
}


  useEffect(() => {
    dispatch(getUser(userId))
  }, [dispatch, userId])

  useEffect(() => {
    return () => {
      dispatch(resetUser())
    }
  }, [])

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
            setData({ ...data, userName: text }), setIsModified(true)
          }}
          defaultValue={user?.userName}
        />
        <Text style={styles.formLabel}>{t('email')}</Text>
        <TextInput
          style={styles.formInput}
          placeholder={t('email')}
          onChangeText={(text) => {
            setData({ ...data, email: text }), setIsModified(true)
          }}
          defaultValue={user?.email}
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
            <Image
              source={{ uri: `${data.image}?t=${new Date().getTime()}` }}
              style={{ width: moderateScale(48), height: moderateScale(48) }}
            />
          </View>
          <View>
            <Button title={t('changeAvatar')} onPress={() => pickImage()} />
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <Button
            onPress={() => handleUpdate()}
            color={'#00AD4F'}
            title={t('update')}
            disabled={!isModified}
          />
          <ToastConfig />
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
