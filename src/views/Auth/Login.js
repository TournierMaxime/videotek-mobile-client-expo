import React, { useState } from 'react'
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Text,
} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser } from '../../redux/actions/auth/auth'
import { useNavigation } from '@react-navigation/native'
import button from '../../styles/components/button'
import form from '../../styles/components/form'
import { ToastSuccess, ToastError } from '../../utils/Toast'
import ToastConfig from '../../utils/ToastConfig'
import { Fragment } from 'react'

const LoginScreen = () => {
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const [data, setData] = useState({ email: '', password: '' })
  const userId = useSelector((state) => state.auth.data.user.userId)

  const handleLogin = async () => {
    try {
      await dispatch(loginUser(data))
      ToastSuccess('success', 'Connexion réussie', true)
        navigation.navigate('UserProfile', {
          screen: 'UserProfile',
          params: {
            id: userId,
          },
        })
    } catch (error) {
      console.log(error.response.data.errMsg)
      ToastError('error', error.response.data.errMsg, true)
    }
    setData({})
  }

  const handleForgetPassword = () => {
    navigation.navigate('ForgetPassword')
  }

  return (
    <Fragment>
      <View style={styles.formContainer}>
        <Text style={styles.formLabel}>Email</Text>
        <TextInput
          style={styles.formInput}
          placeholder='Email'
          onChangeText={(text) => setData({ ...data, email: text })}
          value={data.email}
        />
        <Text style={styles.formLabel}>Mot de passe</Text>
        <TextInput
          style={styles.formInput}
          placeholder='Mot de passe'
          onChangeText={(text) => setData({ ...data, password: text })}
          value={data.password}
          secureTextEntry={true}
        />
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.formButtonLogin, { width: '100%' }]}
            onPress={handleLogin}
          >
            <Text style={styles.buttonText}>Se connecter</Text>
          </TouchableOpacity>
          <ToastConfig />
        </View>
        <View style={{ flexDirection:'row', justifyContent: 'space-between', width: 'auto', marginTop: 40}}>
          <TouchableOpacity
            style={{alignItems: 'center'}}
            onPress={() => navigation.navigate('Register')}
          >
            <Text style={{color: '#0000EE'}}>Pas encore inscrit ?</Text>
          </TouchableOpacity>
                    <TouchableOpacity
            style={{alignItems: 'center'}}
            onPress={handleForgetPassword}
          >
            <Text style={{color: '#0000EE'}}>Mot de passe oublié ?</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Fragment>
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
})
export default LoginScreen
