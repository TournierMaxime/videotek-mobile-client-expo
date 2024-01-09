import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Header from '../components/Layout/Header'
import Login from '../views/Auth/Login'
import Register from '../views/Auth/Register'
import ForgetPassword from '../views/Auth/ForgetPassword'
import ConfirmEmail from '../views/Auth/ConfirmEmail'
import getCommonScreens from './getCommonScreens.js'

const AuthStack = createNativeStackNavigator()

const AuthStackNavigator = ({ isAuthenticated, i18n, t }) => {
  return (
    <AuthStack.Navigator>
      {getCommonScreens(AuthStack, isAuthenticated, i18n, t)}
      <AuthStack.Screen
        name='Login'
        options={() => ({
          header: () => (
            <Header isAuthenticated={isAuthenticated} backButton={false} />
          ),
        })}
      >
        {(props) => <Login {...props} i18n={i18n} t={t} />}
      </AuthStack.Screen>
      <AuthStack.Screen
        name='Register'
        options={() => ({
          header: () => (
            <Header isAuthenticated={isAuthenticated} backButton={true} />
          ),
        })}
      >
        {(props) => <Register {...props} i18n={i18n} t={t} />}
      </AuthStack.Screen>
      <AuthStack.Screen
        name='ForgetPassword'
        options={() => ({
          header: () => (
            <Header isAuthenticated={isAuthenticated} backButton={true} />
          ),
        })}
      >
        {(props) => <ForgetPassword {...props} i18n={i18n} t={t} />}
      </AuthStack.Screen>
      <AuthStack.Screen
        name='ConfirmEmail'
        options={() => ({
          header: () => (
            <Header isAuthenticated={isAuthenticated} backButton={false} />
          ),
        })}
      >
        {(props) => <ConfirmEmail {...props} i18n={i18n} t={t} />}
      </AuthStack.Screen>
    </AuthStack.Navigator>
  )
}

export default AuthStackNavigator