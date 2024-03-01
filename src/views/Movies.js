import React, { Fragment } from 'react'
import { ActivityIndicator, ScrollView } from 'react-native'
import {
  nowPlaying,
  trending,
  upcoming,
} from '@mod/mobile-tmdb/react-query/movies'
import { useTranslation } from 'react-i18next'
import Trending from './Movies/Trending'
import NowPlaying from './Movies/NowPlaying'
import Upcoming from './Movies/Upcoming'
import { useQuery } from 'react-query'
import tw from 'twrnc'

const Movies = () => {
  const { i18n, t } = useTranslation()
  const language = i18n.language

  const { data: nowPlayingData, isLoading } = useQuery(
    ['nowPlaying', 1, language],
    () => nowPlaying(1, language)
  )
  const { data: trendingData } = useQuery(['trending', 1, language], () =>
    trending(1, language)
  )
  const { data: upcomingData } = useQuery(['upcoming', 1, language], () =>
    upcoming(1, language)
  )

  return (
    <Fragment>
      {isLoading ? (
        <ActivityIndicator size='large' color='#0000ff' />
      ) : (
        <ScrollView style={tw`bg-white`}>
          <Trending arrow={true} trending={trendingData} t={t} />
          <NowPlaying arrow={true} nowPlaying={nowPlayingData} t={t} />
          <Upcoming arrow={true} upcoming={upcomingData} t={t} />
        </ScrollView>
      )}
    </Fragment>
  )
}

export default Movies
