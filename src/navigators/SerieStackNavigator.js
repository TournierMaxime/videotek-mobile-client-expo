import React from "react"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import Header from "@mod/mobile-common/lib/components/layout/Header"
import Series from "../views/Series"
import OnTheAir from "@mod/mobile-tmdb/views/Series/OnTheAir"
import Popular from "@mod/mobile-tmdb/views/Series/Popular"
import TrendingTV from "@mod/mobile-tmdb/views/Series/TrendingTV"
import DetailsSerie from "@mod/mobile-tmdb/views/Series/DetailsSerie"
import AllSeasons from "@mod/mobile-tmdb/views/Series/AllSeasons"
import AllEpisodes from "@mod/mobile-tmdb/views/Series/AllEpisodes"
import DetailsPeople from "@mod/mobile-tmdb/views/People/DetailsPeople"

const SerieStack = createNativeStackNavigator()

const SerieStackNavigator = ({ isAuthenticated, i18n, t }) => {
  return (
    <SerieStack.Navigator
      screenOptions={{
        contentStyle: {
          backgroundColor: "white",
        },
      }}
    >
      <SerieStack.Screen
        name="Series"
        options={{
          header: () => (
            <Header isAuthenticated={isAuthenticated} backButton={false} />
          ),
        }}
      >
        {(props) => <Series {...props} i18n={i18n} t={t} />}
      </SerieStack.Screen>
      <SerieStack.Screen
        name="OnTheAir"
        options={{
          header: () => (
            <Header isAuthenticated={isAuthenticated} backButton={true} />
          ),
        }}
      >
        {(props) => <OnTheAir {...props} i18n={i18n} t={t} />}
      </SerieStack.Screen>
      <SerieStack.Screen
        name="Popular"
        options={{
          header: () => (
            <Header isAuthenticated={isAuthenticated} backButton={true} />
          ),
        }}
      >
        {(props) => <Popular {...props} i18n={i18n} t={t} />}
      </SerieStack.Screen>
      <SerieStack.Screen
        name="TrendingTV"
        options={{
          header: () => (
            <Header isAuthenticated={isAuthenticated} backButton={true} />
          ),
        }}
      >
        {(props) => <TrendingTV {...props} i18n={i18n} t={t} />}
      </SerieStack.Screen>
      <SerieStack.Screen
        name="DetailsSerie"
        initialParams={{ id: "" }}
        options={() => ({
          header: () => (
            <Header
              isAuthenticated={isAuthenticated}
              backButton={true}
              type="tv"
            />
          ),
        })}
      >
        {(props) => <DetailsSerie {...props} i18n={i18n} t={t} />}
      </SerieStack.Screen>
      <SerieStack.Screen
        name="AllSeasons"
        options={() => ({
          header: () => (
            <Header isAuthenticated={isAuthenticated} backButton={true} />
          ),
        })}
      >
        {(props) => <AllSeasons {...props} i18n={i18n} t={t} />}
      </SerieStack.Screen>
      <SerieStack.Screen
        name="AllEpisodes"
        options={() => ({
          header: () => (
            <Header isAuthenticated={isAuthenticated} backButton={true} />
          ),
        })}
      >
        {(props) => <AllEpisodes {...props} i18n={i18n} t={t} />}
      </SerieStack.Screen>
      <SerieStack.Screen
        name="DetailsPeople"
        initialParams={{ id: "" }}
        options={() => ({
          header: () => (
            <Header
              isAuthenticated={isAuthenticated}
              backButton={true}
              type="people"
            />
          ),
        })}
      >
        {(props) => <DetailsPeople {...props} i18n={i18n} t={t} />}
      </SerieStack.Screen>
    </SerieStack.Navigator>
  )
}

export default SerieStackNavigator
