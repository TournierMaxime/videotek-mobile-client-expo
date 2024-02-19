import React from "react"
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useSelector } from 'react-redux'
import Header from '@mod/mobile-common/lib/components/layout/Header.js'
import UserProfile from '@mod/mobile-user/views/Users/UserProfile'
import DetailsUser from '@mod/mobile-user/views/Users/DetailsUser'
import Settings from '@mod/mobile-user/views/Users/Settings'
import Favorites from '@mod/mobile-user/views/Users/Favorites'
import Recommendations from '@mod/mobile-user/views/Users/Recommendations'
import getCommonScreens from './getCommonScreens.js'

const MainStack = createNativeStackNavigator()

const MainStackNavigator = ({ isAuthenticated, i18n, t }) => {
  const userId = useSelector((state) => state.auth.data.user.userId)

  return (
    <MainStack.Navigator screenOptions={{
      contentStyle: {
        backgroundColor: "white"
      }
    }}>
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
      <MainStack.Screen
        name='Favorites'
        options={({ route }) => ({
          userId: route.params.userId,
          header: () => (
            <Header isAuthenticated={isAuthenticated} backButton={true} />
          ),
        })}
      >
        {(props) => <Favorites {...props} i18n={i18n} t={t} />}
      </MainStack.Screen>
      <MainStack.Screen
        name='Recommendations'
        component={Recommendations}
        options={{
          header: () => (
            <Header isAuthenticated={isAuthenticated} backButton={true} />
          ),
        }}
      />
    </MainStack.Navigator>
  )
}

export default MainStackNavigator