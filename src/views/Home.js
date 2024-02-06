import React, { useEffect, Fragment } from 'react'
import { ActivityIndicator, ScrollView } from 'react-native'
import { nowPlaying, trending } from '../react-query/movies'
import { trendingTV } from '../react-query/series'
import { useTranslation } from 'react-i18next'
import registerForPushNotificationsAsync from '@mod/mobile-common/lib/components/utils/Notifications'
import Trending from './Movies/Trending'
import NowPlaying from './Movies/NowPlaying'
import TrendingTV from './Series/TrendingTV'
import { useQuery } from 'react-query'

const Home = () => {
  const { i18n, t } = useTranslation()
  const language = i18n.language

  const { data: nowPlayingData, isLoading } = useQuery(['nowPlaying', 1, language], () => nowPlaying(1, language))
  const { data: trendingData } = useQuery(['trending', 1, language], () => trending(1, language))
  const { data: trendingTVData } = useQuery(['trendingTV', 1, language], () => trendingTV(1, language))

  useEffect(() => {
    registerForPushNotificationsAsync()
  }, [language])

  return (
    <Fragment>
      {isLoading ? (
        <ActivityIndicator size='large' color='#0000ff' />
      ) : (
        <Fragment>
          <ScrollView>
            <Trending arrow={false} trending={trendingData} t={t} />

            <NowPlaying arrow={false} nowPlaying={nowPlayingData} t={t} />

            <TrendingTV arrow={false} trendingTV={trendingTVData} t={t} />
          </ScrollView>
        </Fragment>
      )}
    </Fragment>
  )
}

export default Home
