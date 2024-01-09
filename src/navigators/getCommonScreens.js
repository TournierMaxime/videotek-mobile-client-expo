import React from "react"
import Header from '../components/Layout/Header'
import Home from '../views/Home'
import NowPlaying from '../views/Tmdb/Movies/NowPlaying'
import Upcoming from '../views/Tmdb/Movies/Upcoming'
import DetailsMovie from '../views/Tmdb/Movies/DetailsMovie'
import OnTheAir from '../views/Tmdb/Series/OnTheAir'
import Popular from '../views/Tmdb/Series/Popular'
import DetailsSerie from '../views/Tmdb/Series/DetailsSerie'
import DetailsPeople from '../views/Tmdb/People/DetailsPeople'
import Trending from '../views/Tmdb/Movies/Trending'
import Seasons from '../components/Seasons'
import AllSeasons from '../views/Tmdb/Series/AllSeasons'
import AllEpisodes from '../views/Tmdb/Series/AllEpisodes'
import CastMovie from '../views/Tmdb/Movies/CastMovie'
import CrewMovie from '../views/Tmdb/Movies/CrewMovie'
import CastSerie from '../views/Tmdb/Series/CastSerie'
import CrewSerie from '../views/Tmdb/Series/CrewSerie'
import CastPeople from '../views/Tmdb/People/CastPeople'
import DotDetails from '../components/DotDetails'

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
  </>
)

export default getCommonScreens