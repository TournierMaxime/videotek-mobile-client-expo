import React, { useEffect, Fragment } from 'react'
import { ActivityIndicator, ScrollView } from 'react-native'
import { trendingTV, onTheAir, popular } from '../react-query/series'
import { useTranslation } from 'react-i18next'
import registerForPushNotificationsAsync from '@mod/mobile-common/lib/components/utils/Notifications'
import Popular from './Series/Popular'
import OnTheAir from './Series/OnTheAir'
import TrendingTV from './Series/TrendingTV'
import { useQuery } from 'react-query'

const Home = () => {
  const { i18n, t } = useTranslation()
  const language = i18n.language

  const { data: popularData, isLoading } = useQuery(
    ['popular', 1, language],
    () => popular(1, language)
  )
  const { data: onTheAirData } = useQuery(['onTheAir', 1, language], () =>
    onTheAir(1, language)
  )
  const { data: trendingTVData } = useQuery(['trendingTV', 1, language], () =>
    trendingTV(1, language)
  )

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
            <TrendingTV arrow={true} trendingTV={trendingTVData} t={t} />
            <OnTheAir arrow={true} onTheAir={onTheAirData} t={t} />
            <Popular arrow={true} popular={popularData} t={t} />
          </ScrollView>
        </Fragment>
      )}
    </Fragment>
  )
}

export default Home
