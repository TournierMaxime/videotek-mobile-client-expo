import React, {
  Fragment,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react'
import {
  View,
  Text,
  ImageBackground,
  Image,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import {
  serieDetails,
  resetSerieDetails,
  serieCrew,
} from '../../redux/actions/series'
import { LinearGradient } from 'expo-linear-gradient'
import Runtime from '../../lib/components/utils/RunTime'
import Rate from '../../lib/components/utils/Rate'
import Tabs from '../../lib/components/utils/Tabs'
import Refresh from '../../lib/components/utils/Refresh'
import OverView from '../../lib/components/utils/OverView'
import { Entypo } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'
import Utils from '../../lib/class/Utils'
import Trailer from '../../lib/components/utils/Trailer'
import tw from 'twrnc'

const DetailsSerie = ({ route }) => {
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const serie = useSelector((state) => state.serieDetails.data)
  const { id } = route.params
  const [loading, setLoading] = useState(false)
  const [selectedTab, setSelectedTab] = useState('about')

  const { i18n, t } = useTranslation()
  const language = i18n.language

  const fetchData = useCallback(async () => {
    setLoading(true)
    await dispatch(serieDetails(id, language))
    await dispatch(serieCrew(id, language))
    setLoading(false)
  }, [dispatch, id, language])

  const onRefresh = useCallback(async () => {
    await dispatch(serieDetails(id, language))
    await dispatch(serieCrew(id, language))
  })

  useEffect(() => {
    fetchData()
  }, [fetchData])

  useEffect(() => {
    return () => {
      dispatch(resetSerieDetails())
      dispatch(resetFavorites())
      dispatch(resetWatchLists())
    }
  }, [])

  const creators = useMemo(() => {
    return serie?.created_by?.map((credit, index) => {
      if (!credit.name) return null
      return (
        <Text
          key={index}
          style={[
            tw`font-medium text-lg rounded-sm m-2 px-2 text-center`,
            { color: '#495057', backgroundColor: '#dee2e6' },
          ]}
        >
          {credit.name}
        </Text>
      )
    })
  })

  const genres = useMemo(() => {
    return serie?.genres?.map((genre, index) => (
      <Text
        key={index}
        style={[
          tw`font-medium text-lg rounded-sm m-2 px-2 text-center`,
          { color: '#495057', backgroundColor: '#dee2e6' },
        ]}
      >
        {genre.name}
      </Text>
    ))
  })

  const OverViewMemoized = React.memo(OverView)

  return (
    <View style={tw`flex-1`}>
      <Refresh styles={tw`flex w-full h-full relative`} onRefresh={onRefresh}>
        {loading ? (
          <ActivityIndicator size='large' color='#0000ff' />
        ) : (
          serie && (
            <Fragment>
              <View style={tw`flex relative w-full h-60`}>
                <LinearGradient
                  colors={['rgba(0,0,0,0.8)', 'rgba(0,0,0,0.8)']}
                  style={tw`flex w-full h-full relative`}
                />
                <ImageBackground
                  style={[
                    tw`w-full h-full absolute`,
                    {
                      resizeMode: 'contain',
                      opacity: 0.3,
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                    },
                  ]}
                  source={{
                    uri: `https://image.tmdb.org/t/p/original${serie?.backdrop_path}`,
                  }}
                />

                <View
                  style={tw`flex flex-row absolute items-center justify-between w-full`}
                >
                  <View>
                    <Text
                      style={[
                        tw`font-medium text-lg text-white my-2 w-25`,
                        { left: 15, top: 5 },
                      ]}
                    >
                      {serie.name}
                    </Text>
                  </View>

                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate('DotDetails', {
                        id,
                        title: serie?.name,
                      })
                    }
                  >
                    <Entypo
                      style={[tw`p-4`, { right: 0, top: 5 }]}
                      name='dots-three-vertical'
                      size={Utils.moderateScale(25)}
                      color='white'
                    />
                  </TouchableOpacity>
                </View>

                <View
                  style={[
                    tw`absolute flex-row justify-around items-start flex mt-4`,
                    { top: '10%', left: 0, right: 0, bottom: 0 },
                  ]}
                >
                  <View style={tw`flex flex-col items-center`}>
                    <Image
                      style={[tw`w-14 h-20 rounded-sm`, { resizeMode: 'cover' }]}
                      source={{
                        uri: `https://image.tmdb.org/t/p/original${serie?.poster_path}`,
                      }}
                    />
                    <Rate rate={serie.vote_average} />
                  </View>

                  <View style={tw`flex flex-col w-1/2`}>
                    <Runtime
                      time={serie.episode_run_time}
                      isMovie={false}
                      t={t}
                    />

                    <Text style={tw`font-medium text-lg text-white mt-2`}>{t('genres')}</Text>

                    <View style={tw`flex flex-row flex-wrap`}>{genres}</View>

                    <Text style={tw`font-medium text-lg text-white mt-2`}>{t('direction')}</Text>

                    <View style={tw`flex flex-row flex-wrap`}>
                      {creators}
                    </View>
                    <View style={tw`flex-row`}>
                      <Trailer serie={serie} id={id} />
                    </View>
                  </View>
                </View>

                <OverViewMemoized content={serie.overview} t={t} />
              </View>
              <Tabs
                serie={serie}
                t={t}
                language={language}
                id={id}
                selectedTab={selectedTab}
                setSelectedTab={setSelectedTab}
              />
            </Fragment>
          )
        )}
      </Refresh>
    </View>
  )
}

export default DetailsSerie
