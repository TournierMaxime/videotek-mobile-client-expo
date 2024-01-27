import React, { useState } from 'react'
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser } from '../../redux/actions/auth'
import { useNavigation } from '@react-navigation/native'
import { Fragment } from 'react'
import { useTranslation } from 'react-i18next'
import { AlertMessage } from '../../lib/components/utils/AlertMessage'
import tw from 'twrnc'

const LoginScreen = () => {
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const [data, setData] = useState({ email: '', password: '' })
  const userId = useSelector((state) => state.auth.data.user.userId)

  const { t } = useTranslation()

  const handleLogin = async () => {
    try {
      await dispatch(loginUser(data))
      navigation.navigate('UserProfile', {
        screen: 'UserProfile',
        params: {
          id: userId,
        },
      })
    } catch (error) {
      console.log(error.response.data.errMsg)
      AlertMessage(error.response.data.errMsg)
    }
    setData({})
  }

  const handleForgetPassword = () => {
    navigation.navigate('ForgetPassword')
  }

  return (
    <Fragment>
      <View style={tw`bg-white p-4 rounded-md m-4`}>
        <Text style={tw`font-medium text-lg mb-4`}>{t('email')}</Text>
        <TextInput
          style={tw`bg-slate-100 p-4 rounded-md mb-4 font-medium text-lg`}
          placeholder={t('email')}
          onChangeText={(text) => setData({ ...data, email: text })}
          value={data.email}
        />
        <Text style={tw`font-medium text-lg mb-4`}>{t('password')}</Text>
        <TextInput
          style={tw`bg-slate-100 p-4 rounded-md mb-4 font-medium text-lg`}
          placeholder={t('password')}
          onChangeText={(text) => setData({ ...data, password: text })}
          value={data.password}
          secureTextEntry={true}
        />
        <View style={tw`flex-row justify-center`}>
          <TouchableOpacity
            style={[tw`p-4 rounded-md items-center mr-4 w-auto`, { backgroundColor: '#00AD4F' }]}
            onPress={handleLogin}
          >
            <Text style={tw`text-white font-medium text-lg`}>{t('signIn')}</Text>
          </TouchableOpacity>
        </View>
        <View
          style={tw`flex-row justify-between w-auto mt-4`}
        >
          <TouchableOpacity
            style={tw`items-center`}
            onPress={() => navigation.navigate('Register')}
          >
            <Text style={[tw`font-medium text-lg`, { color: '#0000EE' }]}>{t('notRegistered')}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={tw`items-center`}
            onPress={handleForgetPassword}
          >
            <Text style={[tw`font-medium text-lg`, { color: '#0000EE' }]}>{t('forgotYourPassword')}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Fragment>
  )
}

export default LoginScreen
