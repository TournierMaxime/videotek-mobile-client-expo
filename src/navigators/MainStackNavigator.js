import React from "react"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { useSelector } from "react-redux"
import Header from "@mod/mobile-common/lib/components/layout/Header.js"
import UserProfile from "@mod/mobile-user/views/Users/UserProfile"
import DetailsUser from "@mod/mobile-user/views/Users/DetailsUser"
import Settings from "@mod/mobile-user/views/Users/Settings"
import Favorites from "@mod/mobile-user/views/Users/Favorites"
import Recommendations from "@mod/mobile-user/views/Users/Recommendations"
import Home from "../views/Home"
import ComingSoon from "@mod/mobile-tmdb/views/Movies/ComingSoon"
import Trending from "@mod/mobile-tmdb/views/Movies/Trending"

const MainStack = createNativeStackNavigator()

const MainStackNavigator = ({ isAuthenticated, i18n, t }) => {
  const userId = useSelector((state) => state.auth.data?.user?.userId)

  return (
    <MainStack.Navigator
      screenOptions={{
        contentStyle: {
          backgroundColor: "white",
        },
      }}
    >
      <MainStack.Screen
        name="Home"
        options={{
          header: () => (
            <Header isAuthenticated={isAuthenticated} backButton={false} />
          ),
        }}
      >
        {(props) => <Home {...props} i18n={i18n} t={t} />}
      </MainStack.Screen>
      <MainStack.Screen
        name="ComingSoon"
        options={{
          header: () => (
            <Header isAuthenticated={isAuthenticated} backButton={false} />
          ),
        }}
      >
        {(props) => <ComingSoon {...props} i18n={i18n} t={t} />}
      </MainStack.Screen>
      <MainStack.Screen
        name="Trending"
        options={{
          header: () => (
            <Header isAuthenticated={isAuthenticated} backButton={false} />
          ),
        }}
      >
        {(props) => <Trending {...props} i18n={i18n} t={t} />}
      </MainStack.Screen>
      <MainStack.Screen
        name="DetailsUser"
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
        name="UserProfile"
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
        name="Settings"
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
        name="Favorites"
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
        name="Recommendations"
        options={{
          header: () => (
            <Header isAuthenticated={isAuthenticated} backButton={false} />
          ),
        }}
      >
        {(props) => <Recommendations {...props} i18n={i18n} t={t} />}
      </MainStack.Screen>
    </MainStack.Navigator>
  )
}

export default MainStackNavigator
