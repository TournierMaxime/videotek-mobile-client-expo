import { connect, Provider } from 'react-redux'
import React, { useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import store from './src/redux/store'
import Header from './src/components/Layout/Header'
import NowPlaying from './src/views/Tmdb/Movies/NowPlaying'
import Upcoming from './src/views/Tmdb/Movies/Upcoming'
import DetailsMovie from './src/views/Tmdb/Movies/DetailsMovie'
import OnTheAir from './src/views/Tmdb/Series/OnTheAir'
import Popular from './src/views/Tmdb/Series/Popular'
import DetailsSerie from './src/views/Tmdb/Series/DetailsSerie'
import DetailsPeople from './src/views/Tmdb/People/DetailsPeople'
import Trending from './src/views/Tmdb/Movies/Trending'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { MaterialIcons, Ionicons, Entypo } from 'react-native-vector-icons'
import UserProfile from './src/views/User/UserProfile'
import Home from './src/views/Home'
import { useSelector } from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Login from './src/views/Auth/Login'
import Register from './src/views/Auth/Register'
import ForgetPassword from './src/views/Auth/ForgetPassword'
import NewCritic from './src/views/Critics/NewCritic'
import DetailsUser from './src/views/User/DetailsUser'
import AllCritics from './src/views/Critics/AllCritics'
import ConfirmEmail from './src/views/Auth/ConfirmEmail'
import UserCritics from './src/views/User/UserCritics'
import UpdateCritic from './src/views/User/UpdateCritic'
import Seasons from './src/utils/Seasons'
import AllSeasons from './src/views/Tmdb/Series/AllSeasons'
import AllEpisodes from './src/views/Tmdb/Series/AllEpisodes'
import CastSerie from './src/views/Tmdb/Series/CastSerie'
import CastMovie from './src/views/Tmdb/Movies/CastMovie'
import CastPeople from './src/views/Tmdb/People/CastPeople'
import CrewSerie from './src/views/Tmdb/Series/CrewSerie'
import CrewMovie from './src/views/Tmdb/Movies/CrewMovie'
import DotDetails from './src/utils/DotDetails'
import Settings from './src/views/User/Settings'
import { useTranslation } from 'react-i18next'
import i18n from './i18n.js'
import { I18nextProvider } from 'react-i18next'
import './polyfill.js'
import { moderateScale } from './src/utils/Responsive'

const MainStack = createNativeStackNavigator()
const AuthStack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()

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
        name='NewCritic'
        options={() => ({
          header: () => (
            <Header isAuthenticated={isAuthenticated} backButton={true} />
          ),
        })}
      >
        {(props) => <NewCritic {...props} i18n={i18n} t={t} />}
      </MainStack.Screen>
      <MainStack.Screen
        name='UserCritics'
        options={() => ({
          header: () => (
            <Header isAuthenticated={isAuthenticated} backButton={true} />
          ),
        })}
      >
        {(props) => <UserCritics {...props} i18n={i18n} t={t} />}
      </MainStack.Screen>
      <MainStack.Screen
        name='UpdateCritic'
        options={() => ({
          header: () => (
            <Header isAuthenticated={isAuthenticated} backButton={true} />
          ),
        })}
      >
        {(props) => <UpdateCritic {...props} i18n={i18n} t={t} />}
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
    </MainStack.Navigator>
  )
}

const getCommonScreens = (Stack, isAuthenticated, i18n, t) => (
  <>
    <Stack.Screen
      name='Home'
      options={{
        header: () => (
          <Header isAuthenticated={isAuthenticated} backButton={false} />
        ),
      }}
    >
      {(props) => <Home {...props} i18n={i18n} t={t} />}
    </Stack.Screen>
    <Stack.Screen
      name='NowPlaying'
      component={NowPlaying}
      options={{
        header: () => (
          <Header isAuthenticated={isAuthenticated} backButton={true} />
        ),
      }}
    />
    <Stack.Screen
      name='Upcoming'
      component={Upcoming}
      options={{
        header: () => (
          <Header isAuthenticated={isAuthenticated} backButton={true} />
        ),
      }}
    />
    <Stack.Screen
      name='Trending'
      component={Trending}
      options={{
        header: () => (
          <Header isAuthenticated={isAuthenticated} backButton={true} />
        ),
      }}
    />
    <Stack.Screen
      name='DetailsMovie'
      component={DetailsMovie}
      options={({ route }) => ({
        title: route.params.title,
        header: () => (
          <Header isAuthenticated={isAuthenticated} backButton={true} />
        ),
      })}
    />
    <Stack.Screen
      name='OnTheAir'
      component={OnTheAir}
      options={{
        header: () => (
          <Header isAuthenticated={isAuthenticated} backButton={true} />
        ),
      }}
    />
    <Stack.Screen
      name='Popular'
      component={Popular}
      options={{
        header: () => (
          <Header isAuthenticated={isAuthenticated} backButton={true} />
        ),
      }}
    />
    <Stack.Screen
      name='DetailsSerie'
      component={DetailsSerie}
      options={({ route }) => ({
        title: route.params.title,
        header: () => (
          <Header isAuthenticated={isAuthenticated} backButton={true} />
        ),
      })}
    />
    <Stack.Screen
      name='DetailsPeople'
      component={DetailsPeople}
      options={({ route }) => ({
        title: route.params.name,
        header: () => (
          <Header isAuthenticated={isAuthenticated} backButton={true} />
        ),
      })}
    />
    <Stack.Screen
      name='Seasons'
      component={Seasons}
      options={() => ({
        header: () => (
          <Header isAuthenticated={isAuthenticated} backButton={true} />
        ),
      })}
    />
    <Stack.Screen
      name='AllSeasons'
      component={AllSeasons}
      options={() => ({
        header: () => (
          <Header isAuthenticated={isAuthenticated} backButton={true} />
        ),
      })}
    />
    <Stack.Screen
      name='AllEpisodes'
      component={AllEpisodes}
      options={() => ({
        header: () => (
          <Header isAuthenticated={isAuthenticated} backButton={true} />
        ),
      })}
    />
    <Stack.Screen
      name='CastSerie'
      component={CastSerie}
      options={() => ({
        header: () => (
          <Header isAuthenticated={isAuthenticated} backButton={true} />
        ),
      })}
    />
    <Stack.Screen
      name='CastPeople'
      component={CastPeople}
      options={() => ({
        header: () => (
          <Header isAuthenticated={isAuthenticated} backButton={true} />
        ),
      })}
    />
    <Stack.Screen
      name='CastMovie'
      component={CastMovie}
      options={() => ({
        header: () => (
          <Header isAuthenticated={isAuthenticated} backButton={true} />
        ),
      })}
    />
    <Stack.Screen
      name='CrewSerie'
      component={CrewSerie}
      options={() => ({
        header: () => (
          <Header isAuthenticated={isAuthenticated} backButton={true} />
        ),
      })}
    />
    <Stack.Screen
      name='CrewMovie'
      component={CrewMovie}
      options={() => ({
        header: () => (
          <Header isAuthenticated={isAuthenticated} backButton={true} />
        ),
      })}
    />
    <Stack.Screen
      name='DotDetails'
      component={DotDetails}
      options={() => ({
        header: () => (
          <Header isAuthenticated={isAuthenticated} backButton={true} />
        ),
      })}
    />
    <Stack.Screen
      name='AllCritics'
      component={AllCritics}
      options={() => ({
        header: () => (
          <Header isAuthenticated={isAuthenticated} backButton={true} />
        ),
      })}
    />
  </>
)

const App = ({ isAuthenticated, onLoginSuccess }) => {
  const { i18n, t } = useTranslation()
  useEffect(() => {
    const getUserData = async () => {
      try {
        const userData = await AsyncStorage.getItem('userData')
        if (userData !== null) {
          onLoginSuccess(JSON.parse(userData))
        } else {
          isAuthenticated = false
        }
      } catch (error) {
        console.log(error)
      }
    }
    getUserData()

    const updateLanguage = async () => {
      try {
        const storedLang = await AsyncStorage.getItem('lang')
        if (storedLang) {
          i18n.changeLanguage(storedLang)
        }
      } catch (error) {
        console.log(error)
      }
    }

    updateLanguage()
  }, [])

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          activeTintColor: '#4900AD',
          tabBarItemStyle: {
            marginTop: 10,
          },
          tabBarStyle: {
            marginLeft: 15,
            marginRight: 'auto',
            justifyContent: 'center',
            display: 'flex',
            flexDirection: 'row'
          },
        }}
      >
        {isAuthenticated === true ? (
          <Tab.Screen
            name='MainStackNavigator'
            options={() => ({
              tabBarIcon: ({ color }) => (
                <Entypo
                  style={{ width: 50, height: 'auto' }}
                  name='home'
                  size={moderateScale(25)}
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
                  style={{ width: 50, height: 'auto' }}
                  name='home'
                  size={moderateScale(25)}
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
                style={{ width: 50, height: 'auto' }}
                name='flame'
                size={moderateScale(25)}
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
                style={{ width: 50, height: 'auto' }}
                name='movie'
                size={moderateScale(25)}
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
          name='OnTheAir'
          component={OnTheAir}
          options={() => ({
            tabBarIcon: ({ color }) => (
              <Ionicons
                style={{ width: 50, height: 'auto' }}
                name='ios-tv-sharp'
                size={moderateScale(25)}
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
