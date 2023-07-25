import React, { useState } from 'react'
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native'
import { useDispatch } from 'react-redux'
import {
  forgetPassword,
  checkForgetPasswordCode,
  resetPassword,
} from '../../redux/actions/auth'
import button from '../../styles/components/button'
import form from '../../styles/components/form'
import { useTranslation } from 'react-i18next'
import { useNavigation } from '@react-navigation/native'
import { AlertMessage } from '../../utils/AlertMessage'

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
      console.log(email)
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
          <View style={styles.formContainer}>
            <Text style={styles.formLabel}>{t('enterYourEmailAddress')}</Text>
            <TextInput
              style={styles.formInput}
              placeholder={t('email')}
              value={email}
              onChangeText={(text) => setEmail(text)}
            />
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.formButton}
                onPress={handleForgetPassword}
              >
                <Text style={styles.buttonText}>{t('confirm')}</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        {step === 2 && (
          <View style={styles.formContainer}>
            <Text style={styles.formLabel}>
              {t('enterYourVerificationCode')}
            </Text>
            <TextInput
              placeholder={t('verificationCode')}
              style={styles.formInput}
              value={code}
              onChangeText={(text) => setCode(text)}
            />
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.formButton}
                onPress={handleCheckForgetPasswordCode}
              >
                <Text style={styles.buttonText}>{t('confirm')}</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {step === 3 && (
          <View style={styles.formContainer}>
            <Text style={styles.formLabel}>{t('enterYourNewPassword')}</Text>
            <TextInput
              style={styles.formInput}
              placeholder={t('password')}
              secureTextEntry={true}
              value={password.password}
              onChangeText={(text) =>
                setPassword({ ...password, password: text })
              }
            />
            <TextInput
              style={styles.formInput}
              placeholder={t('confirmYourPassword')}
              secureTextEntry={true}
              value={password.confirmPassword}
              onChangeText={(text) =>
                setPassword({ ...password, confirmPassword: text })
              }
            />
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.formButton}
                onPress={handleResetPassword}
              >
                <Text style={styles.buttonText}>{t('confirm')}</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        {step === 4 && (
          <View style={styles.formContainer}>
            <Text style={styles.formLabel}>
              {t('yourPasswordHasBeenSuccessfullyReset')}
            </Text>
          </View>
        )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  formContainer: form.formContainer,
  formLabel: form.formLabel,
  formInput: form.formInput,
  buttonText: button.buttonText,
  formButton: button.formButton,
  buttonContainer: button.buttonContainer,
})

export default ForgetPasswordScreen
