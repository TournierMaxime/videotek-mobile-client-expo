import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native'
import { createUser } from '../../redux/actions/auth'
import { useNavigation } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'
import registerForPushNotificationsAsync from "../../lib/components/utils/Notifications"
import { AlertMessage } from '../../lib/components/utils/AlertMessage'
import tw from 'twrnc'

const RegisterScreen = () => {
  const [data, setData] = useState({
    userName: '',
    email: '',
    password: '',
    lang: '',
    expoPushToken: ''
  })
  const dispatch = useDispatch()
  const navigation = useNavigation()

  const { i18n, t } = useTranslation()
  const language = i18n.language
  const lang = language.slice(0, 2)

  const handleRegister = async () => {
    try {
      const response = await dispatch(createUser({ ...data, lang }))
      AlertMessage(t('yourAccountHasBeenCreated'))
      setTimeout(() => {
        navigation.navigate('ConfirmEmail', { userId: response.user.userId })
      }, 3000)
    } catch (error) {
      console.log(error.response.data.errMsg)
      AlertMessage(error.response.data.errMsg)
    }
    setData({})
  }

    useEffect(() => {
    registerForPushNotificationsAsync().then(token => setData({...data, expoPushToken: token}));
  }, []);


  return (
    <View style={tw`bg-white p-4 rounded-md h-full`}>
      <Text style={tw`font-medium text-lg mt-2`}>{t('utils.userName')}</Text>
      <TextInput
        style={tw`mt-2 px-3 py-2 text-gray-500 text-lg border border-slate-200 rounded-lg`}
        placeholder={t('utils.userName')}
        value={data.userName}
        onChangeText={(text) => setData({ ...data, userName: text })}
      />
      <Text style={tw`font-medium text-lg mt-2`}>{t('utils.email')}</Text>
      <TextInput
        style={tw`mt-2 px-3 py-2 text-gray-500 text-lg border border-slate-200 rounded-lg`}
        placeholder={t('utils.email')}
        value={data.email}
        onChangeText={(text) => setData({ ...data, email: text })}
      />
      <Text style={tw`font-medium text-lg mt-2`}>{t('utils.password')}</Text>
      <TextInput
        style={tw`mt-2 px-3 py-2 text-gray-500 text-lg border border-slate-200 rounded-lg`}
        placeholder={t('utils.password')}
        secureTextEntry
        value={data.password}
        onChangeText={(text) => setData({ ...data, password: text })}
      />
      <View style={tw`flex-row justify-center mt-4`}>
        <TouchableOpacity
          onPress={handleRegister}
        >
          <Text style={tw`px-4 py-2 text-white text-xl font-medium bg-indigo-600 rounded-lg`}>{t('utils.signUp')}</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default RegisterScreen
