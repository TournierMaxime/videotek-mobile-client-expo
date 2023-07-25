import React, { useState } from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native'
import { loginWithUserId, confirmEmail } from '../../redux/actions/auth'
import form from '../../styles/components/form'
import button from '../../styles/components/button'
import { useDispatch } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import message from '../../styles/components/message'
import { useTranslation } from 'react-i18next'
import { AlertMessage } from '../../utils/AlertMessage'
import Message from '../../utils/Message'

const ConfirmEmail = ({ route }) => {
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const { userId } = route.params
  const [data, setData] = useState({ code: '' })

  const { t } = useTranslation()

  const handleConfirmEmail = async () => {
    try {
      await dispatch(confirmEmail(userId, data))
      AlertMessage(t('yourAccountHasBeenSuccessfullyVerified'))
      await dispatch(loginWithUserId({ userId }))

      navigation.navigate('MainStackNavigator', {
        screen: 'UserProfile',
        userId,
      })
    } catch (error) {
      console.log(error.response.data.errMsg)
      AlertMessage(error.response.data.errMsg)
    }
    setData({})
  }

  const infoMsg = () => (
    <View style={styles.containerMessage}>
      <Message message={t('anEmailHasBeenSentToYouContainingA6DigitCode')} priority='info' />
    </View>
  )

  return (
    <View style={styles.formContainer}>
      {infoMsg()}
      <Text style={styles.formLabel}>{t('code')}</Text>
      <TextInput
        style={styles.formInput}
        placeholder={t('code')}
        onChangeText={(text) => setData({ ...data, code: text })}
        value={data.code}
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.formButtonLogin}
          onPress={handleConfirmEmail}
        >
          <Text style={styles.buttonText}>{t('confirm')}</Text>
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
  buttonContainer: button.buttonContainer,
  formButtonLogin: button.formButtonLogin,
  containerMessage: message.containerMessage,
  messageText: message.messageText,
})

export default ConfirmEmail
