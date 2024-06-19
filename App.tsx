import { connect, Provider } from "react-redux"
import React, { Fragment, useEffect } from "react"
import { NavigationContainer } from "@react-navigation/native"
import store from "./src/store"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons"
import { useTranslation } from "react-i18next"
import i18n from "./i18n"
import { I18nextProvider } from "react-i18next"
import "./polyfill"
import { Dimensions } from "react-native"
import Utils from "@mod/mobile-common/lib/class/Utils"
import AuthStackNavigator from "@mod/mobile-auth/navigators/AuthStackNavigator"
import MainStackNavigator from "./src/navigators/MainStackNavigator"
import useLocalStorage from "@mod/mobile-common/lib/hooks/utils/useLocalStorage"
import { QueryClient, QueryClientProvider } from "react-query"
import { useDynamicThemeStyles } from "@mod/mobile-common/styles/theme"
import { useSelector } from "react-redux"
import MovieStackNavigator from "./src/navigators/MovieStackNavigator"
import SerieStackNavigator from "./src/navigators/SerieStackNavigator"
import ArticleStackNavigator from "./src/navigators/ArticleStackNavigator"
import { RootSiblingParent } from "react-native-root-siblings"

const queryClient = new QueryClient()

const Tab = createBottomTabNavigator()

interface Props {
  isAuthenticated: boolean
  onLoginSuccess: (userData: any) => void
}

const App: React.FC<Props> = ({ isAuthenticated, onLoginSuccess }) => {
  const { i18n, t } = useTranslation()
  const { getUserData, updateLanguage, favorites, loadTheme, lang } =
    useLocalStorage({
      onLoginSuccess,
    })

  const darkMode = useSelector((state: any) => state.theme.darkMode)

  const { colorIcon, backgroundTabColor, activeIcon } =
    useDynamicThemeStyles(darkMode)

  useEffect(() => {
    getUserData()
    updateLanguage()
    favorites()
    loadTheme()
  }, [lang])

  return (
    <RootSiblingParent>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={{
            tabBarItemStyle: {
              marginTop: Utils.moderateScale(10),
            },
            tabBarStyle: {
              marginLeft: Utils.moderateScale(0),
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
          {isAuthenticated ? (
            <Fragment>
              <Tab.Screen
                name="MainStackNavigator"
                options={() => ({
                  tabBarIcon: ({ focused }) => (
                    <Ionicons
                      style={{ width: Utils.moderateScale(50), height: "auto" }}
                      name="flame-outline"
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
                name="ArticlesTab"
                listeners={({ navigation }) => ({
                  tabPress: (e) => {
                    e.preventDefault()
                    navigation.navigate("ArticlesTab", {
                      screen: "AllArticles",
                    })
                  },
                })}
                options={() => ({
                  tabBarIcon: ({ focused }) => (
                    <Ionicons
                      style={{ width: Utils.moderateScale(50), height: "auto" }}
                      name="newspaper-outline"
                      size={Utils.moderateScale(25)}
                      color={focused ? activeIcon : colorIcon}
                    />
                  ),
                  headerShown: false,
                  tabBarLabel: "",
                  tabBarActiveTintColor: activeIcon,
                })}
              >
                {() => (
                  <ArticleStackNavigator
                    i18n={i18n}
                    t={t}
                    isAuthenticated={isAuthenticated}
                  />
                )}
              </Tab.Screen>

              <Tab.Screen
                name="MoviesTab"
                listeners={({ navigation }) => ({
                  tabPress: (e) => {
                    e.preventDefault()
                    navigation.navigate("MoviesTab", { screen: "Movies" })
                  },
                })}
                options={() => ({
                  tabBarIcon: ({ focused }) => (
                    <MaterialCommunityIcons
                      style={{ width: Utils.moderateScale(50), height: "auto" }}
                      name="movie-open-outline"
                      size={Utils.moderateScale(25)}
                      color={focused ? activeIcon : colorIcon}
                    />
                  ),
                  headerShown: false,
                  tabBarLabel: "",
                  tabBarActiveTintColor: activeIcon,
                })}
              >
                {() => (
                  <MovieStackNavigator
                    i18n={i18n}
                    t={t}
                    isAuthenticated={isAuthenticated}
                  />
                )}
              </Tab.Screen>

              <Tab.Screen
                name="SeriesTab"
                listeners={({ navigation }) => ({
                  tabPress: (e) => {
                    e.preventDefault()
                    navigation.navigate("SeriesTab", { screen: "Series" })
                  },
                })}
                options={() => ({
                  tabBarIcon: ({ focused }) => (
                    <Ionicons
                      style={{ width: Utils.moderateScale(50), height: "auto" }}
                      name="tv-outline"
                      size={Utils.moderateScale(25)}
                      color={focused ? activeIcon : colorIcon}
                    />
                  ),
                  headerShown: false,
                  tabBarLabel: "",
                  tabBarActiveTintColor: activeIcon,
                })}
              >
                {() => (
                  <SerieStackNavigator
                    i18n={i18n}
                    t={t}
                    isAuthenticated={isAuthenticated}
                  />
                )}
              </Tab.Screen>
            </Fragment>
          ) : (
            <Tab.Screen
              name="AuthStackNavigator"
              options={() => ({
                headerShown: false,
                tabBarLabel: "",
                tabBarButton: () => null,
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
    </RootSiblingParent>
  )
}

const mapStateToProps = (state: any) => ({
  isAuthenticated: state.auth.isAuthenticated,
  data: state.auth.data,
})

const login = (dispatch: any) => ({
  onLoginSuccess: (userData: any) =>
    dispatch({ type: "LOGIN_USER_SUCCESS", payload: userData }),
})

const ConnectedApp = connect(mapStateToProps, login)(App)

const AppWithRedux: React.FC = () => (
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <I18nextProvider i18n={i18n}>
        <ConnectedApp />
      </I18nextProvider>
    </QueryClientProvider>
  </Provider>
)

export default AppWithRedux
