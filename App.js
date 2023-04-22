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
import { FontAwesome, Ionicons } from 'react-native-vector-icons'
import UserProfile from './src/views/User/UserProfile'
import Home from './src/views/Home'
import { useSelector } from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Login from './src/views/Auth/Login'
import Register from './src/views/Auth/Register'
import ForgetPassword from './src/views/Auth/ForgetPassword'
import AuthScreen from './src/views/Auth/Auth'

const MainStack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()

function MainStackNavigator() {
  const userId = useSelector((state) => state.auth.data.user.userId)
  return (
    <MainStack.Navigator>
      <MainStack.Screen
        name='Home'
        component={Home}
        options={{ header: () => <Header backButton={false} /> }}
      />
      <MainStack.Screen
        name='NowPlaying'
        component={NowPlaying}
        options={{ header: () => <Header backButton={true} /> }}
      />
      <MainStack.Screen
        name='Upcoming'
        component={Upcoming}
        options={{ header: () => <Header backButton={true} /> }}
      />
      <MainStack.Screen
        name='Trending'
        component={Trending}
        options={{ header: () => <Header backButton={true} /> }}
      />
      <MainStack.Screen
        name='DetailsMovie'
        component={DetailsMovie}
        options={({ route }) => ({
          title: route.params.title,
          header: () => <Header backButton={true} />,
        })}
      />
      <MainStack.Screen
        name='OnTheAir'
        component={OnTheAir}
        options={{ header: () => <Header backButton={true} /> }}
      />
      <MainStack.Screen
        name='Popular'
        component={Popular}
        options={{ header: () => <Header backButton={true} /> }}
      />
      <MainStack.Screen
        name='DetailsSerie'
        component={DetailsSerie}
        options={({ route }) => ({
          title: route.params.title,
          header: () => <Header backButton={true} />,
        })}
      />
      <MainStack.Screen
        name='DetailsPeople'
        component={DetailsPeople}
        options={({ route }) => ({
          title: route.params.name,
          header: () => <Header backButton={true} />,
        })}
      />
      <MainStack.Screen
        name='Login'
        component={Login}
        options={() => ({
          header: () => <Header backButton={true} />,
        })}
      />
      <MainStack.Screen
        name='Register'
        component={Register}
        options={() => ({
          header: () => <Header backButton={true} />,
        })}
      />
      <MainStack.Screen
        name='ForgetPassword'
        component={ForgetPassword}
        options={() => ({
          header: () => <Header backButton={true} />,
        })}
      />
      <MainStack.Screen
        name='Auth'
        component={AuthScreen}
        options={() => ({
          header: () => <Header backButton={true} />,
        })}
      />
      <MainStack.Screen
        name='UserProfile'
        component={UserProfile}
        initialParams={{ userId }}
        options={() => ({
          header: () => <Header backButton={true} />,
        })}
      />
    </MainStack.Navigator>
  )
}

function App({ isAuthenticated, onLoginSuccess }) {
  const userId = useSelector((state) => state.auth.data.user.userId)

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
  }, [])

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          activeTintColor: '#4900AD',
          tabBarItemStyle: {
            marginTop: 10,
          },
        }}
      >
        <Tab.Screen
          name='MainStackNavigator'
          component={MainStackNavigator}
          options={() => ({
            tabBarIcon: ({ color }) => (
              <Ionicons name='home' size={25} color={color} />
            ),
            headerShown: false,
            tabBarLabel: '',
          })}
        />
        {isAuthenticated === true ? (
          <Tab.Screen
            name='UserProfile'
            initialParams={{ userId }}
            component={UserProfile}
            options={() => ({
              header: () => <Header backButton={true} />,
              tabBarIcon: ({ color }) => (
                <FontAwesome name='user' size={25} color={color} />
              ),
              headerShown: false,
              tabBarLabel: '',
            })}
          />
        ) : (
          <Tab.Screen
            name='Auth'
            component={AuthScreen}
            options={() => ({
              header: () => <Header backButton={true} />,
              tabBarIcon: ({ color }) => (
                <FontAwesome name='user' size={25} color={color} />
              ),
              headerShown: false,
              tabBarLabel: '',
            })}
          />
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
    dispatch({ type: 'LOGIN_USER_SUCCESS', payload: userData }),
})

const ConnectedApp = connect(mapStateToProps, login)(App)

const AppWithRedux = () => (
  <Provider store={store}>
    <ConnectedApp />
  </Provider>
)

export default AppWithRedux
