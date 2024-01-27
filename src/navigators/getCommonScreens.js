import React from "react"
import Header from '../lib/components/layout/Header'
import Home from '../views/Home'
import NowPlaying from '../views/Movies/NowPlaying'
import Upcoming from '../views/Movies/Upcoming'
import DetailsMovie from '../views/Movies/DetailsMovie'
import OnTheAir from '../views/Series/OnTheAir'
import Popular from '../views/Series/Popular'
import DetailsSerie from '../views/Series/DetailsSerie'
import DetailsPeople from '../views/People/DetailsPeople'
import Trending from '../views/Movies/Trending'
import Seasons from '../lib/components/utils/Seasons'
import AllSeasons from '../views/Series/AllSeasons'
import AllEpisodes from '../views/Series/AllEpisodes'
import CastMovie from '../views/Movies/CastMovie'
import CrewMovie from '../views/Movies/CrewMovie'
import CastSerie from '../views/Series/CastSerie'
import CrewSerie from '../views/Series/CrewSerie'
import CastPeople from '../views/People/CastPeople'
import DotDetails from '../lib/components/utils/DotDetails'

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