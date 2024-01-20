import { connect, Provider } from 'react-redux'
import React, { useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import store from './src/redux/store'
import Header from '@mod/mobile-common/lib/components/layout/Header'
import NowPlaying from '@mod/mobile-tmdb/views/Movies/NowPlaying'
import Trending from '@mod/mobile-tmdb/views/Movies/Trending'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { MaterialIcons, Ionicons, Entypo } from 'react-native-vector-icons'
import { useTranslation } from 'react-i18next'
import i18n from '@mod/mobile-tmdb/i18n'
import { I18nextProvider } from 'react-i18next'
import '@mod/mobile-tmdb/polyfill'
import { Platform, Dimensions } from 'react-native'
import TrendingTV from '@mod/mobile-tmdb/views/Series/TrendingTV'
import Utils from '@mod/mobile-common/lib/class/Utils'
import AuthStackNavigator from './src/navigators/AuthStackNavigator.js'
import MainStackNavigator from './src/navigators/MainStackNavigator.js'
import useLocalStorage from '@mod/mobile-common/lib/hooks/utils/useLocalStorage'

const Tab = createBottomTabNavigator()

const App = ({ isAuthenticated, onLoginSuccess }) => {
  const { i18n, t } = useTranslation()
  const {
    getUserData,
    updateLanguage,
    //favorites,
    lang
  } = useLocalStorage({ onLoginSuccess })

  useEffect(() => {
    getUserData()
    updateLanguage()
    //favorites()
  }, [lang])

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          activeTintColor: '#4900AD',
          tabBarItemStyle: {
            marginTop: Utils.moderateScale(10),
          },
          tabBarStyle: {
            ...(Platform.OS === 'android'
              ? { marginLeft: Utils.moderateScale(0) }
              : { marginLeft: Utils.moderateScale(15) }),
            marginRight: 'auto',
            ...(Dimensions.get('window').width > 600
              ? { height: Utils.moderateScale(50) }
              : null),
            justifyContent: 'center',
            display: 'flex',
            flexDirection: 'row',
          },
        }}
      >
        {isAuthenticated === true ? (
          <Tab.Screen
            name='MainStackNavigator'
            options={() => ({
              tabBarIcon: ({ color }) => (
                <Entypo
                  style={{ width: Utils.moderateScale(50), height: 'auto' }}
                  name='home'
                  size={Utils.moderateScale(25)}
                  color={color}
                />
              ),
              headerShown: false,
              tabBarLabel: '',
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
        ) : (
          <Tab.Screen
            name='AuthStackNavigator'
            options={() => ({
              tabBarIcon: ({ color }) => (
                <Entypo
                  style={{ width: Utils.moderateScale(50), height: 'auto' }}
                  name='home'
                  size={Utils.moderateScale(25)}
                  color={color}
                />
              ),
              headerShown: false,
              tabBarLabel: '',
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

        <Tab.Screen
          name='Trending'
          component={Trending}
          options={() => ({
            tabBarIcon: ({ color }) => (
              <Ionicons
                style={{ width: Utils.moderateScale(50), height: 'auto' }}
                name='flame'
                size={Utils.moderateScale(25)}
                color={color}
              />
            ),
            header: () => (
              <Header isAuthenticated={isAuthenticated} backButton={true} />
            ),
            headerShown: true,
            tabBarLabel: '',
          })}
        />
        <Tab.Screen
          name='NowPlaying'
          component={NowPlaying}
          options={() => ({
            tabBarIcon: ({ color }) => (
              <MaterialIcons
                style={{ width: Utils.moderateScale(50), height: 'auto' }}
                name='movie'
                size={Utils.moderateScale(25)}
                color={color}
              />
            ),
            header: () => (
              <Header isAuthenticated={isAuthenticated} backButton={true} />
            ),
            headerShown: true,
            tabBarLabel: '',
          })}
        />

        <Tab.Screen
          name='TrendingTV'
          component={TrendingTV}
          options={() => ({
            tabBarIcon: ({ color }) => (
              <Ionicons
                style={{ width: Utils.moderateScale(50), height: 'auto' }}
                name='ios-tv-sharp'
                size={Utils.moderateScale(25)}
                color={color}
              />
            ),
            header: () => (
              <Header isAuthenticated={isAuthenticated} backButton={true} />
            ),
            headerShown: true,
            tabBarLabel: '',
          })}
        />
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
    dispatch({ type: 'LOGIN_USER_SUCCESS', payload: userData }),
})

const ConnectedApp = connect(mapStateToProps, login)(App)

const AppWithRedux = () => (
  <Provider store={store}>
    <I18nextProvider i18n={i18n}>
      <ConnectedApp />
    </I18nextProvider>
  </Provider>
)

export default AppWithRedux
