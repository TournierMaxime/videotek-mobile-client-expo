import React from "react"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import Header from "@mod/mobile-common/lib/components/layout/Header"
import Movies from "../views/Movies"
import NowPlaying from "@mod/mobile-tmdb/views/Movies/NowPlaying"
import TopRated from "@mod/mobile-tmdb/views/Movies/TopRated"
import Upcoming from "@mod/mobile-tmdb/views/Movies/Upcoming"
import DetailsMovie from "@mod/mobile-tmdb/views/Movies/DetailsMovie"
import DetailsPeople from "@mod/mobile-tmdb/views/People/DetailsPeople"
import CrewMovie from "@mod/mobile-tmdb/views/Movies/CrewMovie"
import CastMovie from "@mod/mobile-tmdb/views/Movies/CastMovie"

export type MovieStackParamList = {
  Movies: undefined
  NowPlaying: undefined
  TopRated: undefined
  Upcoming: undefined
  DetailsMovie: { id: number }
  DetailsPeople: { id: number }
  CastMovie: undefined
  CrewMovie: undefined
}

const MovieStack = createNativeStackNavigator<MovieStackParamList>()

interface Props {
  isAuthenticated: boolean
  i18n: any
  t: any
}

const MovieStackNavigator: React.FC<Props> = ({ isAuthenticated, i18n, t }) => {
  return (
    <MovieStack.Navigator
      screenOptions={{
        contentStyle: {
          backgroundColor: "white",
        },
      }}
    >
      <MovieStack.Screen
        name="Movies"
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
        {(props) => <Movies {...props} i18n={i18n} t={t} />}
      </MovieStack.Screen>
      <MovieStack.Screen
        name="NowPlaying"
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
        {(props) => <NowPlaying {...props} i18n={i18n} t={t} />}
      </MovieStack.Screen>
      <MovieStack.Screen
        name="TopRated"
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
        {(props) => <TopRated {...props} i18n={i18n} t={t} />}
      </MovieStack.Screen>
      <MovieStack.Screen
        name="Upcoming"
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
        {(props) => <Upcoming {...props} i18n={i18n} t={t} />}
      </MovieStack.Screen>
      <MovieStack.Screen
        name="DetailsMovie"
        initialParams={{ id: undefined }}
        options={() => ({
          header: () => (
            <Header
              isAuthenticated={isAuthenticated}
              backButton={true}
              type="movie"
              title={null}
            />
          ),
        })}
      >
        {(props) => <DetailsMovie {...props} i18n={i18n} t={t} />}
      </MovieStack.Screen>
      <MovieStack.Screen
        name="DetailsPeople"
        initialParams={{ id: undefined }}
        options={() => ({
          header: () => (
            <Header
              isAuthenticated={isAuthenticated}
              backButton={true}
              type="people"
              title={null}
            />
          ),
        })}
      >
        {(props) => <DetailsPeople {...props} i18n={i18n} t={t} />}
      </MovieStack.Screen>
      <MovieStack.Screen
        name="CastMovie"
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
        {(props) => <CastMovie {...props} i18n={i18n} t={t} />}
      </MovieStack.Screen>
      <MovieStack.Screen
        name="CrewMovie"
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
        {(props) => <CrewMovie {...props} i18n={i18n} t={t} />}
      </MovieStack.Screen>
    </MovieStack.Navigator>
  )
}

export default MovieStackNavigator
