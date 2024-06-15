import React from "react"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { useSelector } from "react-redux"
import Header from "@mod/mobile-common/lib/components/layout/Header"
import UserProfile from "@mod/mobile-user/views/Users/UserProfile"
import Settings from "@mod/mobile-user/views/Settings/Index"
import Theme from "@mod/mobile-user/views/Settings/Theme"
import Notifications from "@mod/mobile-user/views/Settings/Notifications"
import Languages from "@mod/mobile-user/views/Settings/Languages"
import Favorites from "@mod/mobile-user/views/Users/Favorites"
import Recommendations from "@mod/mobile-user/views/Users/Recommendations"
import Home from "../views/Home"
import ComingSoon from "@mod/mobile-tmdb/views/Movies/ComingSoon"
import Trending from "@mod/mobile-tmdb/views/Movies/Trending"
import UpdateData from "@mod/mobile-user/views/Users/UpdateData/Index"
import UpdateUserName from "@mod/mobile-user/views/Users/UpdateData/UpdateUserName"
import UpdateEmail from "@mod/mobile-user/views/Users/UpdateData/UpdateEmail"
import UpdateAvatar from "@mod/mobile-user/views/Users/UpdateData/UpdateAvatar"
import PrivacyPolicy from "@mod/mobile-user/views/Users/PrivacyPolicy"
import { RootState } from "redux/store"

export type MainStackParamList = {
  Home: undefined
  ComingSoon: undefined
  Trending: undefined
  UpdateData: { userId: string }
  UpdateUserName: { userId: string }
  UpdateEmail: { userId: string }
  UpdateAvatar: { userId: string }
  UserProfile: { userId: string }
  Settings: { userId: string }
  Languages: undefined
  Theme: undefined
  Notifications: { userId: string }
  Favorites: { userId: string }
  Recommendations: undefined
  PrivacyPolicy: undefined
}

const MainStack = createNativeStackNavigator<MainStackParamList>()

interface Props {
  isAuthenticated: boolean
  i18n: any
  t: any
}

const MainStackNavigator: React.FC<Props> = ({ isAuthenticated, i18n, t }) => {
  const userId = useSelector(
    (state: RootState) => state.auth.data?.user?.userId,
  )

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
            <Header
              title={null}
              type={null}
              isAuthenticated={isAuthenticated}
              backButton={false}
            />
          ),
        }}
      >
        {(props) => <Home {...props} i18n={i18n} t={t} />}
      </MainStack.Screen>
      <MainStack.Screen
        name="ComingSoon"
        options={{
          header: () => (
            <Header
              title={null}
              type={null}
              isAuthenticated={isAuthenticated}
              backButton={false}
            />
          ),
        }}
      >
        {(props) => <ComingSoon {...props} i18n={i18n} t={t} />}
      </MainStack.Screen>
      <MainStack.Screen
        name="Trending"
        options={{
          header: () => (
            <Header
              title={null}
              type={null}
              isAuthenticated={isAuthenticated}
              backButton={false}
            />
          ),
        }}
      >
        {(props) => <Trending {...props} i18n={i18n} t={t} />}
      </MainStack.Screen>
      <MainStack.Screen
        name="UpdateData"
        options={({ route }) => ({
          userId: route.params.userId,
          header: () => (
            <Header
              title={null}
              type={null}
              isAuthenticated={isAuthenticated}
              backButton={true}
            />
          ),
        })}
      >
        {(props) => <UpdateData {...props} i18n={i18n} t={t} />}
      </MainStack.Screen>
      <MainStack.Screen
        name="UpdateUserName"
        options={({ route }) => ({
          userId: route.params.userId,
          header: () => (
            <Header
              title={null}
              type={null}
              isAuthenticated={isAuthenticated}
              backButton={true}
            />
          ),
        })}
      >
        {(props) => <UpdateUserName {...props} i18n={i18n} t={t} />}
      </MainStack.Screen>
      <MainStack.Screen
        name="UpdateEmail"
        options={({ route }) => ({
          userId: route.params.userId,
          header: () => (
            <Header
              title={null}
              type={null}
              isAuthenticated={isAuthenticated}
              backButton={true}
            />
          ),
        })}
      >
        {(props) => <UpdateEmail {...props} i18n={i18n} t={t} />}
      </MainStack.Screen>
      <MainStack.Screen
        name="UpdateAvatar"
        options={({ route }) => ({
          userId: route.params.userId,
          header: () => (
            <Header
              title={null}
              type={null}
              isAuthenticated={isAuthenticated}
              backButton={true}
            />
          ),
        })}
      >
        {(props) => <UpdateAvatar {...props} i18n={i18n} t={t} />}
      </MainStack.Screen>
      <MainStack.Screen
        name="UserProfile"
        initialParams={{ userId }}
        options={() => ({
          header: () => (
            <Header
              title={null}
              type={null}
              isAuthenticated={isAuthenticated}
              backButton={true}
            />
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
            <Header
              title={null}
              type={null}
              isAuthenticated={isAuthenticated}
              backButton={true}
            />
          ),
        })}
      >
        {(props) => <Settings {...props} i18n={i18n} t={t} />}
      </MainStack.Screen>
      <MainStack.Screen
        name="Languages"
        options={() => ({
          header: () => (
            <Header
              title={null}
              type={null}
              isAuthenticated={isAuthenticated}
              backButton={true}
            />
          ),
        })}
      >
        {(props) => <Languages {...props} i18n={i18n} t={t} />}
      </MainStack.Screen>
      <MainStack.Screen
        name="Theme"
        options={() => ({
          header: () => (
            <Header
              title={null}
              type={null}
              isAuthenticated={isAuthenticated}
              backButton={true}
            />
          ),
        })}
      >
        {(props) => <Theme {...props} i18n={i18n} t={t} />}
      </MainStack.Screen>
      <MainStack.Screen
        name="Notifications"
        options={({ route }) => ({
          userId: route.params.userId,
          header: () => (
            <Header
              title={null}
              type={null}
              isAuthenticated={isAuthenticated}
              backButton={true}
            />
          ),
        })}
      >
        {(props) => <Notifications {...props} i18n={i18n} t={t} />}
      </MainStack.Screen>
      <MainStack.Screen
        name="Favorites"
        options={({ route }) => ({
          userId: route.params.userId,
          header: () => (
            <Header
              title={null}
              type={null}
              isAuthenticated={isAuthenticated}
              backButton={true}
            />
          ),
        })}
      >
        {(props) => <Favorites {...props} i18n={i18n} t={t} />}
      </MainStack.Screen>
      <MainStack.Screen
        name="Recommendations"
        options={{
          header: () => (
            <Header
              title={null}
              type={null}
              isAuthenticated={isAuthenticated}
              backButton={false}
            />
          ),
        }}
      >
        {(props) => <Recommendations {...props} i18n={i18n} t={t} />}
      </MainStack.Screen>
      <MainStack.Screen
        name="PrivacyPolicy"
        options={{
          header: () => (
            <Header
              title={null}
              type={null}
              isAuthenticated={isAuthenticated}
              backButton={true}
            />
          ),
        }}
      >
        {(props) => <PrivacyPolicy {...props} i18n={i18n} t={t} />}
      </MainStack.Screen>
    </MainStack.Navigator>
  )
}

export default MainStackNavigator
