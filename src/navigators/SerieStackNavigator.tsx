import React from "react"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import Header from "@mod/mobile-common/lib/components/layout/Header"
import Series from "../views/Series"
import OnTheAir from "@mod/mobile-tmdb/views/Series/OnTheAir"
import Popular from "@mod/mobile-tmdb/views/Series/Popular"
import TrendingTV from "@mod/mobile-tmdb/views/Series/TrendingTV"
import DetailsSerie from "@mod/mobile-tmdb/views/Series/DetailsSerie"
import AllEpisodes from "@mod/mobile-tmdb/views/Series/AllEpisodes"
import DetailsPeople from "@mod/mobile-tmdb/views/People/DetailsPeople"

export type SerieStackParamList = {
  Series: undefined
  OnTheAir: undefined
  Popular: undefined
  TrendingTV: undefined
  DetailsSerie: { id: number }
  DetailsPeople: { id: number }
  AllEpisodes: { id: number; seasonNumber: number }
  SeriesTab: { screen: string; params: { id: number } }
}

const SerieStack = createNativeStackNavigator<SerieStackParamList>()

interface Props {
  isAuthenticated: boolean
  i18n: any
  t: any
}

const SerieStackNavigator: React.FC<Props> = ({ isAuthenticated, i18n, t }) => {
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
            <Header
              title={""}
              type={""}
              isAuthenticated={isAuthenticated}
              backButton={false}
            />
          ),
        }}
      >
        {(props) => <Series {...props} i18n={i18n} t={t} />}
      </SerieStack.Screen>
      <SerieStack.Screen
        name="OnTheAir"
        options={{
          header: () => (
            <Header
              title={""}
              type={""}
              isAuthenticated={isAuthenticated}
              backButton={true}
            />
          ),
        }}
      >
        {(props) => <OnTheAir {...props} i18n={i18n} t={t} />}
      </SerieStack.Screen>
      <SerieStack.Screen
        name="Popular"
        options={{
          header: () => (
            <Header
              title={""}
              type={""}
              isAuthenticated={isAuthenticated}
              backButton={true}
            />
          ),
        }}
      >
        {(props) => <Popular {...props} i18n={i18n} t={t} />}
      </SerieStack.Screen>
      <SerieStack.Screen
        name="TrendingTV"
        options={{
          header: () => (
            <Header
              title={""}
              type={""}
              isAuthenticated={isAuthenticated}
              backButton={true}
            />
          ),
        }}
      >
        {(props) => <TrendingTV {...props} i18n={i18n} t={t} />}
      </SerieStack.Screen>
      <SerieStack.Screen
        name="DetailsSerie"
        initialParams={{ id: undefined }}
        options={() => ({
          header: () => (
            <Header
              isAuthenticated={isAuthenticated}
              backButton={true}
              type="tv"
              title={""}
            />
          ),
        })}
      >
        {(props) => <DetailsSerie {...props} i18n={i18n} t={t} />}
      </SerieStack.Screen>
      <SerieStack.Screen
        name="AllEpisodes"
        options={() => ({
          header: () => (
            <Header
              title={""}
              type={""}
              isAuthenticated={isAuthenticated}
              backButton={true}
            />
          ),
        })}
      >
        {(props) => <AllEpisodes {...props} i18n={i18n} t={t} />}
      </SerieStack.Screen>
      <SerieStack.Screen
        name="DetailsPeople"
        initialParams={{ id: undefined }}
        options={() => ({
          header: () => (
            <Header
              isAuthenticated={isAuthenticated}
              backButton={true}
              type="people"
              title={""}
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
