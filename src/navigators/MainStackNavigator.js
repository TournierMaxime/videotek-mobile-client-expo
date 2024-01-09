import React from "react"
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useSelector } from 'react-redux'
import Header from '../components/Layout/Header'
import UserProfile from './src/views/User/UserProfile'
import DetailsUser from './src/views/User/DetailsUser'
import Settings from './src/views/User/Settings'
import Favorites from './src/views/User/Favorites'
import getCommonScreens from './getCommonScreens.js'

const MainStack = createNativeStackNavigator()

const MainStackNavigator = ({ isAuthenticated, i18n, t }) => {
  const userId = useSelector((state) => state.auth.data.user.userId)
  return (
    <MainStack.Navigator>
      {getCommonScreens(MainStack, isAuthenticated, i18n, t)}
      <MainStack.Screen
        name='DetailsUser'
        options={({ route }) => ({
          title: route.params.userId,
          header: () => (
            <Header isAuthenticated={isAuthenticated} backButton={true} />
          ),
        })}
      >
        {(props) => <DetailsUser {...props} i18n={i18n} t={t} />}
      </MainStack.Screen>
      <MainStack.Screen
        name='UserProfile'
        initialParams={{ userId }}
        options={() => ({
          header: () => (
            <Header isAuthenticated={isAuthenticated} backButton={true} />
          ),
        })}
      >
        {(props) => <UserProfile {...props} i18n={i18n} t={t} />}
      </MainStack.Screen>
      <MainStack.Screen
        name='Settings'
        options={({ route }) => ({
          title: route.params.userId,
          header: () => (
            <Header isAuthenticated={isAuthenticated} backButton={true} />
          ),
        })}
      >
        {(props) => <Settings {...props} i18n={i18n} t={t} />}
      </MainStack.Screen>
      <MainStack.Screen
        name='Favorites'
        options={({ route }) => ({
          title: route.params.userId,
          header: () => (
            <Header isAuthenticated={isAuthenticated} backButton={true} />
          ),
        })}
      >
        {(props) => <Favorites {...props} i18n={i18n} t={t} />}
      </MainStack.Screen>
    </MainStack.Navigator>
  )
}

export default MainStackNavigator