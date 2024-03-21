import { connect, Provider } from "react-redux"
import React, { Fragment, useEffect } from "react"
import { NavigationContainer } from "@react-navigation/native"
import store from "./src/redux/store"
import Header from "@mod/mobile-common/lib/components/layout/Header"
import Trending from "@mod/mobile-tmdb/views/Movies/Trending"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { MaterialIcons, Ionicons, Entypo } from "react-native-vector-icons"
import { useTranslation } from "react-i18next"
import i18n from "./i18n"
import { I18nextProvider } from "react-i18next"
import "./polyfill"
import { Platform, Dimensions } from "react-native"
import Utils from "@mod/mobile-common/lib/class/Utils"
import AuthStackNavigator from "@mod/mobile-auth/navigators/AuthStackNavigator"
import MainStackNavigator from "./src/navigators/MainStackNavigator.js"
import useLocalStorage from "@mod/mobile-common/lib/hooks/utils/useLocalStorage"
import { QueryClient, QueryClientProvider } from "react-query"
import Movies from "./src/views/Movies.js"
import Series from "./src/views/Series.js"
import { useDynamicThemeStyles } from "@mod/mobile-common/styles/theme"
import { useSelector } from "react-redux"

const queryClient = new QueryClient()

const Tab = createBottomTabNavigator()

const App = ({ isAuthenticated, onLoginSuccess }) => {
  const { i18n, t } = useTranslation()
  const { getUserData, updateLanguage, favorites, loadTheme, lang } =
    useLocalStorage({
      onLoginSuccess,
    })

  const darkMode = useSelector((state) => state.theme.darkMode)

  const { colorIcon, backgroundTabColor, activeIcon } =
    useDynamicThemeStyles(darkMode)

  useEffect(() => {
    getUserData()
    updateLanguage()
    favorites()
    loadTheme()
  }, [lang])

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarItemStyle: {
            marginTop: Utils.moderateScale(10),
          },
          tabBarStyle: {
            ...(Platform.OS === "android"
              ? { marginLeft: Utils.moderateScale(0) }
              : { marginLeft: Utils.moderateScale(15) }),
            marginRight: "auto",
            ...(Dimensions.get("window").width > 600
              ? { height: Utils.moderateScale(50) }
              : null),
            justifyContent: "center",
            display: "flex",
            flexDirection: "row",
            zIndex: 0,
            backgroundColor: backgroundTabColor,
          },
        }}
      >
        {isAuthenticated === true ? (
          <Fragment>
            <Tab.Screen
              name="MainStackNavigator"
              options={() => ({
                tabBarIcon: ({ focused }) => (
                  <Entypo
                    style={{ width: Utils.moderateScale(50), height: "auto" }}
                    name="home"
                    size={Utils.moderateScale(25)}
                    color={focused ? activeIcon : colorIcon}
                  />
                ),
                headerShown: false,
                tabBarLabel: "",
              })}
            >
              {() => (
                <MainStackNavigator
                  i18n={i18n}
                  t={t}
                  isAuthenticated={isAuthenticated}
                />
              )}
            </Tab.Screen>

            <Tab.Screen
              name="Trending"
              component={Trending}
              options={() => ({
                tabBarIcon: ({ focused }) => (
                  <Ionicons
                    style={{ width: Utils.moderateScale(50), height: "auto" }}
                    name="flame"
                    size={Utils.moderateScale(25)}
                    color={focused ? activeIcon : colorIcon}
                  />
                ),
                header: () => (
                  <Header isAuthenticated={isAuthenticated} backButton={true} />
                ),
                headerShown: true,
                tabBarLabel: "",
                tabBarActiveTintColor: activeIcon,
              })}
            />
            <Tab.Screen
              name="Movies"
              component={Movies}
              options={() => ({
                tabBarIcon: ({ focused }) => (
                  <MaterialIcons
                    style={{ width: Utils.moderateScale(50), height: "auto" }}
                    name="movie"
                    size={Utils.moderateScale(25)}
                    color={focused ? activeIcon : colorIcon}
                  />
                ),
                header: () => (
                  <Header isAuthenticated={isAuthenticated} backButton={true} />
                ),
                headerShown: true,
                tabBarLabel: "",
                tabBarActiveTintColor: activeIcon,
              })}
            />

            <Tab.Screen
              name="Series"
              component={Series}
              options={() => ({
                tabBarIcon: ({ focused }) => (
                  <Ionicons
                    style={{ width: Utils.moderateScale(50), height: "auto" }}
                    name="tv-sharp"
                    size={Utils.moderateScale(25)}
                    color={focused ? activeIcon : colorIcon}
                  />
                ),
                header: () => (
                  <Header isAuthenticated={isAuthenticated} backButton={true} />
                ),
                headerShown: true,
                tabBarLabel: "",
              })}
            />
          </Fragment>
        ) : (
          <Tab.Screen
            name="AuthStackNavigator"
            options={() => ({
              tabBarIcon: ({ focused }) => (
                <Entypo
                  style={{ width: Utils.moderateScale(50), height: "auto" }}
                  name="home"
                  size={Utils.moderateScale(25)}
                  color={focused ? activeIcon : colorIcon}
                />
              ),
              headerShown: false,
              tabBarLabel: "",
            })}
          >
            {() => (
              <AuthStackNavigator
                i18n={i18n}
                t={t}
                isAuthenticated={isAuthenticated}
              />
            )}
          </Tab.Screen>
        )}
      </Tab.Navigator>
    </NavigationContainer>
  )
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  data: state.auth.data,
})

const login = (dispatch) => ({
  onLoginSuccess: (userData) =>
    dispatch({ type: "LOGIN_USER_SUCCESS", payload: userData }),
})

const ConnectedApp = connect(mapStateToProps, login)(App)

const AppWithRedux = () => (
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <I18nextProvider i18n={i18n}>
        <ConnectedApp />
      </I18nextProvider>
    </QueryClientProvider>
  </Provider>
)

export default AppWithRedux
