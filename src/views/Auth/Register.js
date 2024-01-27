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
    <View style={tw`bg-white p-4 rounded-md m-4`}>
      <Text style={tw`font-medium text-lg mb-4`}>{t('userName')}</Text>
      <TextInput
        style={tw`bg-slate-100 p-4 rounded-md mb-4 font-medium text-lg`}
        placeholder={t('userName')}
        value={data.userName}
        onChangeText={(text) => setData({ ...data, userName: text })}
      />
      <Text style={tw`font-medium text-lg mb-4`}>{t('email')}</Text>
      <TextInput
        style={tw`bg-slate-100 p-4 rounded-md mb-4 font-medium text-lg`}
        placeholder={t('email')}
        value={data.email}
        onChangeText={(text) => setData({ ...data, email: text })}
      />
      <Text style={tw`font-medium text-lg mb-4`}>{t('password')}</Text>
      <TextInput
        style={tw`bg-slate-100 p-4 rounded-md mb-4 font-medium text-lg`}
        placeholder={t('password')}
        secureTextEntry
        value={data.password}
        onChangeText={(text) => setData({ ...data, password: text })}
      />
      <View style={tw`flex-row justify-center`}>
        <TouchableOpacity
          style={[tw`p-4 rounded-md items-center mr-4 w-auto`, { backgroundColor: '#476EFF' }]}
          onPress={handleRegister}
        >
          <Text style={tw`text-white font-medium text-lg`}>{t('signUp')}</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default RegisterScreen
