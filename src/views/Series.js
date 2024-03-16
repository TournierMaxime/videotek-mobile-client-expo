import React, { useEffect, Fragment } from 'react'
import { ActivityIndicator, ScrollView } from 'react-native'
import {
  trendingTV,
  onTheAir,
  popular,
} from '@mod/mobile-tmdb/react-query/series'
import { useTranslation } from 'react-i18next'
import registerForPushNotificationsAsync from '@mod/mobile-common/lib/components/utils/Notifications'
import Popular from './Series/Popular'
import OnTheAir from './Series/OnTheAir'
import TrendingTV from './Series/TrendingTV'
import { useQuery } from 'react-query'
import tw from 'twrnc'
import { useSelector } from 'react-redux'
import { useDynamicThemeStyles } from '@mod/mobile-common/styles/theme'

const Home = () => {
  const { i18n, t } = useTranslation()
  const language = i18n.language

  const darkMode = useSelector((state) => state.theme.darkMode)
  const { background } = useDynamicThemeStyles(darkMode)

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
        <ScrollView style={tw`${background}`}>
          <TrendingTV arrow={true} trendingTV={trendingTVData} t={t} />
          <OnTheAir arrow={true} onTheAir={onTheAirData} t={t} />
          <Popular arrow={true} popular={popularData} t={t} />
        </ScrollView>
      )}
    </Fragment>
  )
}

export default Home
