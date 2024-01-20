import React, { useState } from 'react'
import { Text, View, TextInput, Button, Image } from 'react-native'
import { updateUser } from '../../redux/actions/users'
import { setUserWithLocalStorage } from '@mod/mobile-common/redux/actions/auth'
import { useDispatch, useSelector } from 'react-redux'
import * as ImagePicker from 'expo-image-picker'
import { useTranslation } from 'react-i18next'
import { AlertMessage } from '@mod/mobile-common/lib/components/utils/AlertMessage'
import AsyncStorage from '@react-native-async-storage/async-storage'
import tw from 'twrnc'

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
      style={tw`flex flex-col justify-between`}
    >
      <View style={tw`bg-white p-4 rounded-md m-4`}>
        <Text style={tw`font-medium text-lg mb-4`}>{t('userName')}</Text>
        <TextInput
          style={tw`bg-slate-100 p-4 rounded-sm mb-4 font-medium text-lg`}
          placeholder={t('userName')}
          onChangeText={(text) => {
            setData({ ...data, userName: text }), setIsOnChange(true)
          }}
          defaultValue={data?.userName}
        />
        <Text style={tw`font-medium text-lg mb-4`}>{t('email')}</Text>
        <TextInput
          style={tw`bg-slate-100 p-4 rounded-sm mb-4 font-medium text-lg`}
          placeholder={t('email')}
          onChangeText={(text) => {
            setData({ ...data, email: text }), setIsOnChange(true)
          }}
          defaultValue={data?.email}
        />
        <Text style={tw`font-medium text-lg mb-4`}>{t('avatar')}</Text>
        <View
          style={tw`flex-row justify-between items-center mb-8`}
        >
          <View>
            {
              <Image
                source={{
                  uri: `${data?.image}?t=${Date.now()}`,
                }}
                style={tw`w-20 h-20`}
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
        <View style={tw`flex-row justify-center`}>
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

export default DetailsUser
