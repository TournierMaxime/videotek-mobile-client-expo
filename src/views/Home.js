import React, { useEffect, Fragment, useState } from 'react'
import {
  ActivityIndicator,
} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { nowPlaying, trending } from '../redux/actions/movies'
import { trendingTV } from '../redux/actions/series'
import Refresh from '../lib/components/utils/Refresh'
import { useTranslation } from 'react-i18next'
import registerForPushNotificationsAsync from '../lib/components/utils/Notifications'
import Trending from './Trending'
import NowPlaying from './NowPlaying'
import TrendingTV from './TrendingTV'

const Home = () => {
  const dispatch = useDispatch()
  const nowPlayingData = useSelector((state) => state.nowPlaying.data)
  const trendingData = useSelector((state) => state.trending.data)
  const trendingTVData = useSelector((state) => state.trendingTV.data)
  const [loading, setLoading] = useState(false)

  const { i18n, t } = useTranslation()
  const language = i18n.language

  const onRefresh = async () => {
    await dispatch(nowPlaying(nowPlayingData.page, 'nowPlaying', language))
    await dispatch(trending(trendingData.page, 'trending', language))
    await dispatch(trendingTV(trendingTVData.page, 'trendingTV', language))
  }

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      await dispatch(nowPlaying(nowPlayingData.page, 'nowPlaying', language)),
        await dispatch(trending(trendingData.page, 'trending', language)),
        await dispatch(trendingTV(trendingTVData.page, 'trendingTV', language)),
        setLoading(false)
    }

    fetchData()
  }, [dispatch, language])

  useEffect(() => {
    registerForPushNotificationsAsync()
  }, [])

  return (
    <Fragment>
      {loading ? (
        <ActivityIndicator size='large' color='#0000ff' />
      ) : (
        <Fragment>
          <Refresh onRefresh={onRefresh}>
            <Trending t={t} />

            <NowPlaying t={t} />

            <TrendingTV t={t} />
          </Refresh>
        </Fragment>
      )}
    </Fragment>
  )
}

export default Home
