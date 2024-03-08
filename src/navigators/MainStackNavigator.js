import React from "react"
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useSelector } from 'react-redux'
import Header from '@mod/mobile-common/lib/components/layout/Header.js'
import UserProfile from '@mod/mobile-user/views/Users/UserProfile'
import DetailsUser from '@mod/mobile-user/views/Users/DetailsUser'
import Settings from '@mod/mobile-user/views/Users/Settings'
import Favorites from '@mod/mobile-user/views/Users/Favorites'
import Recommendations from '@mod/mobile-user/views/Users/Recommendations'
import Home from '../views/Home'
import NowPlaying from '@mod/mobile-tmdb/views/Movies/NowPlaying'
import Upcoming from '@mod/mobile-tmdb/views/Movies/Upcoming'
import ComingSoon from '@mod/mobile-tmdb/views/Movies/ComingSoon'
import DetailsMovie from '@mod/mobile-tmdb/views/Movies/DetailsMovie'
import OnTheAir from '@mod/mobile-tmdb/views/Series/OnTheAir'
import Popular from '@mod/mobile-tmdb/views/Series/Popular'
import TrendingTV from '@mod/mobile-tmdb/views/Series/TrendingTV'
import DetailsSerie from '@mod/mobile-tmdb/views/Series/DetailsSerie'
import DetailsPeople from '@mod/mobile-tmdb/views/People/DetailsPeople'
import Trending from '@mod/mobile-tmdb/views/Movies/Trending'
import AllSeasons from '@mod/mobile-tmdb/views/Series/AllSeasons'
import AllEpisodes from '@mod/mobile-tmdb/views/Series/AllEpisodes'
import CastMovie from '@mod/mobile-tmdb/views/Movies/CastMovie'
import CrewMovie from '@mod/mobile-tmdb/views/Movies/CrewMovie'
import CastSerie from '@mod/mobile-tmdb/views/Series/CastSerie'
import CrewSerie from '@mod/mobile-tmdb/views/Series/CrewSerie'
import CastPeople from '@mod/mobile-tmdb/views/People/CastPeople'

const MainStack = createNativeStackNavigator()

const MainStackNavigator = ({ isAuthenticated, i18n, t }) => {
  const userId = useSelector((state) => state.auth.data.user.userId)

  return (
    <MainStack.Navigator screenOptions={{
      contentStyle: {
        backgroundColor: "white"
      }
    }}>

      <MainStack.Screen
        name='Home'
        options={{
          header: () => (
            <Header isAuthenticated={isAuthenticated} backButton={false} />
          ),
        }}
      >
        {(props) => <Home {...props} i18n={i18n} t={t} />}
      </MainStack.Screen>
      <MainStack.Screen
        name='NowPlaying'
        component={NowPlaying}
        options={{
          header: () => (
            <Header isAuthenticated={isAuthenticated} backButton={true} />
          ),
        }}
      />
      <MainStack.Screen
        name='Upcoming'
        component={Upcoming}
        options={{
          header: () => (
            <Header isAuthenticated={isAuthenticated} backButton={true} />
          ),
        }}
      />
      <MainStack.Screen
        name='ComingSoon'
        component={ComingSoon}
        options={{
          header: () => (
            <Header isAuthenticated={isAuthenticated} backButton={true} />
          ),
        }}
      />
      <MainStack.Screen
        name='Trending'
        component={Trending}
        options={{
          header: () => (
            <Header isAuthenticated={isAuthenticated} backButton={true} />
          ),
        }}
      />
      <MainStack.Screen
        name='DetailsMovie'
        component={DetailsMovie}
        options={({ route }) => ({
          title: route.params.title,
          header: () => (
            <Header isAuthenticated={isAuthenticated} backButton={true} />
          ),
        })}
      />
      <MainStack.Screen
        name='OnTheAir'
        component={OnTheAir}
        options={{
          header: () => (
            <Header isAuthenticated={isAuthenticated} backButton={true} />
          ),
        }}
      />
      <MainStack.Screen
        name='Popular'
        component={Popular}
        options={{
          header: () => (
            <Header isAuthenticated={isAuthenticated} backButton={true} />
          ),
        }}
      />
      <MainStack.Screen
        name='TrendingTV'
        component={TrendingTV}
        options={{
          header: () => (
            <Header isAuthenticated={isAuthenticated} backButton={true} />
          ),
        }}
      />
      <MainStack.Screen
        name='DetailsSerie'
        component={DetailsSerie}
        options={({ route }) => ({
          title: route.params.title,
          header: () => (
            <Header isAuthenticated={isAuthenticated} backButton={true} />
          ),
        })}
      />
      <MainStack.Screen
        name='DetailsPeople'
        component={DetailsPeople}
        options={({ route }) => ({
          title: route.params.name,
          header: () => (
            <Header isAuthenticated={isAuthenticated} backButton={true} />
          ),
        })}
      />
      <MainStack.Screen
        name='AllSeasons'
        component={AllSeasons}
        options={() => ({
          header: () => (
            <Header isAuthenticated={isAuthenticated} backButton={true} />
          ),
        })}
      />
      <MainStack.Screen
        name='AllEpisodes'
        component={AllEpisodes}
        options={() => ({
          header: () => (
            <Header isAuthenticated={isAuthenticated} backButton={true} />
          ),
        })}
      />
      <MainStack.Screen
        name='CastSerie'
        component={CastSerie}
        options={() => ({
          header: () => (
            <Header isAuthenticated={isAuthenticated} backButton={true} />
          ),
        })}
      />
      <MainStack.Screen
        name='CastPeople'
        component={CastPeople}
        options={() => ({
          header: () => (
            <Header isAuthenticated={isAuthenticated} backButton={true} />
          ),
        })}
      />
      <MainStack.Screen
        name='CastMovie'
        component={CastMovie}
        options={() => ({
          header: () => (
            <Header isAuthenticated={isAuthenticated} backButton={true} />
          ),
        })}
      />
      <MainStack.Screen
        name='CrewSerie'
        component={CrewSerie}
        options={() => ({
          header: () => (
            <Header isAuthenticated={isAuthenticated} backButton={true} />
          ),
        })}
      />
      <MainStack.Screen
        name='CrewMovie'
        component={CrewMovie}
        options={() => ({
          header: () => (
            <Header isAuthenticated={isAuthenticated} backButton={true} />
          ),
        })}
      />
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