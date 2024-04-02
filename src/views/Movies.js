import React, { Fragment } from "react"
import { ActivityIndicator, ScrollView } from "react-native"
import {
  nowPlaying,
  topRated,
  upcoming,
} from "@mod/mobile-tmdb/react-query/movies"
import { useTranslation } from "react-i18next"
import TopRated from "./Movies/TopRated"
import NowPlaying from "./Movies/NowPlaying"
import Upcoming from "./Movies/Upcoming"
import { useQuery } from "react-query"
import tw from "twrnc"
import { useSelector } from "react-redux"
import { useDynamicThemeStyles } from "@mod/mobile-common/styles/theme"

const Movies = () => {
  const { i18n, t } = useTranslation()
  const language = i18n.language

  const darkMode = useSelector((state) => state.theme.darkMode)
  const { background } = useDynamicThemeStyles(darkMode)

  const { data: nowPlayingData, isLoading } = useQuery(
    ["nowPlaying", 1, language],
    () => nowPlaying(1, language),
  )
  const { data: topRatedData } = useQuery(["topRated", 1, language], () =>
    topRated(1, language),
  )
  const { data: upcomingData } = useQuery(["upcoming", 1, language], () =>
    upcoming(1, language),
  )

  return (
    <Fragment>
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <ScrollView style={tw`${background}`}>
          <NowPlaying arrow={true} nowPlaying={nowPlayingData} t={t} />
          <Upcoming arrow={true} upcoming={upcomingData} t={t} />
          <TopRated arrow={true} topRated={topRatedData} t={t} />
        </ScrollView>
      )}
    </Fragment>
  )
}

export default Movies
