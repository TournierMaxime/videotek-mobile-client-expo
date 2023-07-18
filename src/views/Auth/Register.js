import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native'

import { createUser } from '../../redux/actions/auth'
import { useNavigation } from '@react-navigation/native'
import button from '../../styles/components/button'
import form from '../../styles/components/form'
import { ToastSuccess, ToastError } from '../../utils/Toast'
import ToastConfig from '../../utils/ToastConfig'
import { useTranslation } from 'react-i18next'
import { registerForPushNotificationsAsync } from "../../utils/Notifications"

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
      ToastSuccess('success', t('yourAccountHasBeenCreated'), true)
      setTimeout(() => {
        navigation.navigate('ConfirmEmail', { userId: response.user.userId })
      }, 3000)
    } catch (error) {
      console.log(error.response.data.errMsg)
      ToastError('error', error.response.data.errMsg, true)
    }
    setData({})
  }

    useEffect(() => {
    registerForPushNotificationsAsync().then(token => setData({...data, expoPushToken: token}));
  }, []);


  return (
    <View style={styles.formContainer}>
      <Text style={styles.formLabel}>{t('userName')}</Text>
      <TextInput
        style={styles.formInput}
        placeholder={t('userName')}
        value={data.userName}
        onChangeText={(text) => setData({ ...data, userName: text })}
      />
      <Text style={styles.formLabel}>{t('email')}</Text>
      <TextInput
        style={styles.formInput}
        placeholder={t('email')}
        value={data.email}
        onChangeText={(text) => setData({ ...data, email: text })}
      />
      <Text style={styles.formLabel}>{t('password')}</Text>
      <TextInput
        style={styles.formInput}
        placeholder={t('password')}
        secureTextEntry
        value={data.password}
        onChangeText={(text) => setData({ ...data, password: text })}
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.formButtonRegister}
          onPress={handleRegister}
        >
          <Text style={styles.buttonText}>{t('signUp')}</Text>
          <ToastConfig />
        </TouchableOpacity>
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
})

export default RegisterScreen
