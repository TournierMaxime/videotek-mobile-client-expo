import React, { useState } from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native'
import { useDispatch } from 'react-redux'
import {
  forgetPassword,
  checkForgetPasswordCode,
  resetPassword,
} from '../../redux/actions/auth'
import { useTranslation } from 'react-i18next'
import { useNavigation } from '@react-navigation/native'
import { AlertMessage } from '../../lib/components/utils/AlertMessage'
import tw from 'twrnc'

const ForgetPasswordScreen = () => {
  const [email, setEmail] = useState('')
  const [code, setCode] = useState('')
  const [password, setPassword] = useState({
    password: '',
    confirmPassword: '',
  })
  const [step, setStep] = useState(1)
  const navigation = useNavigation()
  const dispatch = useDispatch()

  const { i18n, t } = useTranslation()
  const language = i18n.language
  const lang = language.slice(0, 2)

  const handleForgetPassword = async () => {
    try {
      await dispatch(forgetPassword({ email, lang }))
      AlertMessage(t('anEmailHasBeenSentToYouContainingA6DigitCode'))
      setStep(2)
    } catch (error) {
      console.log(error.response.data.errMsg)
      AlertMessage(error.response.data.errMsg)
    }
  }

  const handleCheckForgetPasswordCode = async () => {
    try {
      await dispatch(checkForgetPasswordCode({ email, code }))
      AlertMessage(t('yourVerificationCodeHasBeenValidated'))
      setStep(3)
    } catch (error) {
      console.log(error.response.data.errMsg)
      AlertMessage(error.response.data.errMsg)
    }
    setCode('')
  }

  const handleResetPassword = async () => {
    try {
      await dispatch(
        resetPassword({
          email,
          password: password.password,
          confirmPassword: password.confirmPassword,
        })
      )
      AlertMessage(t('yourPasswordHasBeenSuccessfullyReset'))
      setStep(4)
      setTimeout(() => {
        navigation.navigate('Login')
      }, 2000)
    } catch (error) {
      console.log(error.response.data.errMsg)
      AlertMessage(error.response.data.errMsg)
    }
    setPassword({})
  }

  return (
    <View>
      <View>
        {step === 1 && (
          <View style={tw`bg-white p-4 rounded-md m-4`}>
            <Text style={tw`font-medium text-lg mb-4`}>{t('enterYourEmailAddress')}</Text>
            <TextInput
              style={tw`bg-slate-100 p-4 rounded-md mb-4 font-medium text-lg`}
              placeholder={t('email')}
              value={email}
              onChangeText={(text) => setEmail(text)}
            />
            <View style={tw`flex-row justify-center`}>
              <TouchableOpacity
                style={[tw`p-4 rounded-md items-center mr-4 w-auto`, { backgroundColor: '#22C55E' }]}
                onPress={handleForgetPassword}
              >
                <Text style={tw`text-white font-medium text-lg`}>{t('confirm')}</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        {step === 2 && (
          <View style={tw`bg-white p-4 rounded-md m-4`}>
            <Text style={tw`font-medium text-lg mb-4`}>
              {t('enterYourVerificationCode')}
            </Text>
            <TextInput
              placeholder={t('verificationCode')}
              style={tw`bg-slate-100 p-4 rounded-md mb-4 font-medium text-lg`}
              value={code}
              onChangeText={(text) => setCode(text)}
            />
            <View style={tw`flex-row justify-center`}>
              <TouchableOpacity
                style={[tw`p-4 rounded-md items-center mr-4 w-auto`, { backgroundColor: '#22C55E' }]}
                onPress={handleCheckForgetPasswordCode}
              >
                <Text style={tw`text-white font-medium text-lg`}>{t('confirm')}</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {step === 3 && (
          <View style={tw`bg-white p-4 rounded-md m-4`}>
            <Text style={tw`font-medium text-lg mb-4`}>{t('enterYourNewPassword')}</Text>
            <TextInput
              style={tw`bg-slate-100 p-4 rounded-md mb-4 font-medium text-lg`}
              placeholder={t('password')}
              secureTextEntry={true}
              value={password.password}
              onChangeText={(text) =>
                setPassword({ ...password, password: text })
              }
            />
            <TextInput
              style={tw`bg-slate-100 p-4 rounded-md mb-4 font-medium text-lg`}
              placeholder={t('confirmYourPassword')}
              secureTextEntry={true}
              value={password.confirmPassword}
              onChangeText={(text) =>
                setPassword({ ...password, confirmPassword: text })
              }
            />
            <View style={tw`flex-row justify-center`}>
              <TouchableOpacity
                style={[tw`p-4 rounded-md items-center mr-4 w-auto`, { backgroundColor: '#22C55E' }]}
                onPress={handleResetPassword}
              >
                <Text style={tw`text-white font-medium text-lg`}>{t('confirm')}</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        {step === 4 && (
          <View style={tw`bg-white p-4 rounded-md m-4`}>
            <Text style={tw`font-medium text-lg mb-4`}>
              {t('yourPasswordHasBeenSuccessfullyReset')}
            </Text>
          </View>
        )}
      </View>
    </View>
  )
}

export default ForgetPasswordScreen
