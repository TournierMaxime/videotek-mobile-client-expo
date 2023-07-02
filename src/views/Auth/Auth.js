import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import button from '../../styles/components/button'
import { useNavigation } from '@react-navigation/native'
import { Image } from 'react-native'
import { useTranslation } from 'react-i18next'

const AuthScreen = () => {
  const navigation = useNavigation()
  const { t } = useTranslation()

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          style={styles.logo}
          source={require('../../assets/image/videotek_logo.webp')}
        />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.loginButton}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.buttonText}>{t('signIn')}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.registerButton}
          onPress={() => navigation.navigate('Register')}
        >
          <Text style={styles.buttonText}>{t('signUp')}</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingVertical: 40,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logoContainer: {
    alignItems: 'center',
  },
  logo: {
    width: 300,
    height: 150,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'grey',
  },
  buttonContainer: button.buttonContainer,
  loginButton: button.loginButton,
  registerButton: button.registerButton,
  buttonText: button.buttonText,
})

export default AuthScreen
