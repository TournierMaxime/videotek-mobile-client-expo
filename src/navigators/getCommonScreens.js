import React from "react"
import Header from '@mod/mobile-common/lib/components/layout/Header'
import Home from '../views/Home'
import NowPlaying from '@mod/mobile-tmdb/views/Movies/NowPlaying'
import Upcoming from '@mod/mobile-tmdb/views/Movies/Upcoming'
import DetailsMovie from '@mod/mobile-tmdb/views/Movies/DetailsMovie'
import OnTheAir from '@mod/mobile-tmdb/views/Series/OnTheAir'
import Popular from '@mod/mobile-tmdb/views/Series/Popular'
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
  </>
)

export default getCommonScreens