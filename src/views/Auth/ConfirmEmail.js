import React, { useState } from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native'
import { ToastSuccess, ToastError } from '../../utils/Toast'
import ToastConfig from '../../utils/ToastConfig'
import { confirmEmail } from '../../redux/actions/auth/confirmEmail'
import form from '../../styles/components/form'
import button from '../../styles/components/button'
import { useDispatch } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import { loginWithUserId } from '../../redux/actions/auth/auth'

const ConfirmEmail = ({ route }) => {
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const { userId } = route.params
  const [data, setData] = useState({ code: '' })

  const handleConfirmEmail = async () => {
    try {
      await dispatch(confirmEmail(userId, data))
      ToastSuccess('success', 'Votre compte a bien été vérifié.', false)
      await dispatch(loginWithUserId({ userId }))

      navigation.navigate('MainStackNavigator', {
        screen: 'UserProfile',
        userId,
      })
    } catch (error) {
      console.log(error.response.data.errMsg)
      ToastError('error', error.response.data.errMsg, false)
    }
    setData({})
  }

  return (
    <View style={styles.formContainer}>
      <Text style={styles.formLabel}>Votre code</Text>
      <TextInput
        style={styles.formInput}
        placeholder='Code'
        onChangeText={(text) => setData({ ...data, code: text })}
        value={data.code}
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.formButtonLogin}
          onPress={handleConfirmEmail}
        >
          <Text style={styles.buttonText}>Envoyer</Text>
        </TouchableOpacity>
        <ToastConfig />
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
})

export default ConfirmEmail
