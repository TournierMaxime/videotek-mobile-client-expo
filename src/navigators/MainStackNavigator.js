import React from "react"
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useSelector } from 'react-redux'
import Header from '@mod/mobile-common/lib/components/layout/Header.js'
import UserProfile from '../views/User/UserProfile'
import DetailsUser from '../views/User/DetailsUser'
import Settings from '../views/User/Settings'
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
          userId: route.params.userId,
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
          userId: route.params.userId,
          header: () => (
            <Header isAuthenticated={isAuthenticated} backButton={true} />
          ),
        })}
      >
        {(props) => <Settings {...props} i18n={i18n} t={t} />}
      </MainStack.Screen>
    </MainStack.Navigator>
  )
}

export default MainStackNavigator