import React, { useEffect, Fragment, useState } from 'react'
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { nowPlaying, trending } from '@mod/mobile-tmdb/redux/actions/movies'
import { trendingTV } from '@mod/mobile-tmdb/redux/actions/series'
import { useNavigation } from '@react-navigation/native'
import Refresh from '@mod/mobile-common/lib/components/utils/Refresh'
import Utils from '@mod/mobile-common/lib/class/Utils'
import { Ionicons, MaterialIcons } from 'react-native-vector-icons'
import { useTranslation } from 'react-i18next'
import registerForPushNotificationsAsync from '@mod/mobile-common/lib/components/utils/Notifications'
import tw from 'twrnc'

const Home = () => {
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const nowPlayingData = useSelector((state) => state.nowPlaying.data)
  const trendingData = useSelector((state) => state.trending.data)
  const trendingTVData = useSelector((state) => state.trendingTV.data)
  const nowPlayingResults = useSelector(
    (state) => state.nowPlaying.data.results
  )
  const trendingResults = useSelector((state) => state.trending.data.results)
  const trendingTVResults = useSelector(
    (state) => state.trendingTV.data.results
  )
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
            <View style={tw`justify-between items-baseline flex-row mr-4`}>
              <Text style={tw`font-medium text-lg ml-4 mt-4`}>
                {t('trending')}
              </Text>

              <Ionicons
                name='flame'
                size={Utils.moderateScale(25)}
                color='black'
              />
            </View>
            <View style={tw`items-center justify-between mb-6`}>
              <FlatList
                data={trendingResults?.slice(0, 8)}
                keyExtractor={(item) => item.id}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item, index }) => {
                  return (
                    <Fragment>
                      {item.media_type == 'movie' ? (
                        <View style={tw`flex-col justify-between`}>
                          <TouchableOpacity
                            onPress={() =>
                              navigation.navigate('DetailsMovie', {
                                id: item.id,
                                title: item.title,
                              })
                            }
                          >
                            <Image
                              style={[
                                tw`w-13 h-21 rounded-md mt-4 ml-4 mb-4`,
                                {
                                  resizeMode: 'cover',
                                  marginRight:
                                    index ===
                                    trendingResults?.slice(0, 8).length - 1
                                      ? 15
                                      : 0,
                                },
                              ]}
                              source={{
                                uri: `https://image.tmdb.org/t/p/original/${item.poster_path}`,
                              }}
                            />
                            <Text style={tw`text-center font-medium text-lg`}>
                              {Utils.truncateTitle(
                                item.title,
                                language === 'zh-cn' ||
                                  language === 'ko' ||
                                  language === 'ja'
                                  ? 5
                                  : 15
                              )}
                            </Text>
                          </TouchableOpacity>
                        </View>
                      ) : (
                        <View style={tw`flex-col justify-between`}>
                          <TouchableOpacity
                            onPress={() =>
                              navigation.navigate('DetailsSerie', {
                                id: item.id,
                                title: item.name,
                              })
                            }
                          >
                            <Image
                              style={[
                                tw`w-13 h-21 rounded-md mt-4 ml-4 mb-4`,
                                {
                                  resizeMode: 'cover',
                                  marginRight:
                                    index ===
                                    trendingResults?.slice(0, 8).length - 1
                                      ? 15
                                      : 0,
                                },
                              ]}
                              source={{
                                uri: `https://image.tmdb.org/t/p/original/${item.poster_path}`,
                              }}
                            />
                            <Text style={tw`text-center font-medium text-lg`}>
                              {Utils.truncateTitle(
                                item.name,
                                language === 'zh-cn' ||
                                  language === 'ko' ||
                                  language === 'ja'
                                  ? 5
                                  : 15
                              )}
                            </Text>
                          </TouchableOpacity>
                        </View>
                      )}
                    </Fragment>
                  )
                }}
              />
            </View>

            <View style={tw`justify-between items-baseline flex-row mr-4`}>
              <Text style={tw`font-medium text-lg ml-4 mt-4`}>
                {t('films')}
              </Text>
              <MaterialIcons
                name='movie'
                size={Utils.moderateScale(25)}
                color='black'
              />
            </View>
            <View style={tw`items-center justify-between mb-6`}>
              <FlatList
                data={nowPlayingResults?.slice(0, 8)}
                keyExtractor={(item) => item.id}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item, index }) => {
                  return (
                    <View style={tw`flex-col justify-between`}>
                      <TouchableOpacity
                        onPress={() =>
                          navigation.navigate('DetailsMovie', {
                            id: item.id,
                            title: item.title,
                          })
                        }
                      >
                        <Image
                          style={[
                            tw`w-13 h-21 rounded-md mt-4 ml-4 mb-4`,
                            {
                              resizeMode: 'cover',
                              marginRight:
                                index ===
                                nowPlayingResults?.slice(0, 8).length - 1
                                  ? 15
                                  : 0,
                            },
                          ]}
                          source={{
                            uri: `https://image.tmdb.org/t/p/original/${item.poster_path}`,
                          }}
                        />
                        <Text style={tw`text-center font-medium text-lg`}>
                          {Utils.truncateTitle(
                            item.title,
                            language === 'zh-cn' ||
                              language === 'ko' ||
                              language === 'ja'
                              ? 5
                              : 15
                          )}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  )
                }}
              />
            </View>

            <View style={tw`justify-between items-baseline flex-row mr-4`}>
              <Text style={tw`font-medium text-lg ml-4 mt-4`}>
                {t('series')}
              </Text>
              <Ionicons
                name='ios-tv-sharp'
                size={Utils.moderateScale(25)}
                color='black'
              />
            </View>
            <View style={tw`items-center justify-between mb-6`}>
              <FlatList
                data={trendingTVResults?.slice(0, 8)}
                keyExtractor={(item) => item.id}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item, index }) => {
                  return (
                    <View style={tw`flex-col justify-between`}>
                      <TouchableOpacity
                        onPress={() =>
                          navigation.navigate('DetailsSerie', {
                            id: item.id,
                            title: item.name,
                          })
                        }
                      >
                        <Image
                          style={[
                            tw`w-13 h-21 rounded-md mt-4 ml-4 mb-4`,
                            {
                              resizeMode: 'cover',
                              marginRight:
                                index ===
                                trendingTVResults?.slice(0, 8).length - 1
                                  ? 15
                                  : 0,
                            },
                          ]}
                          source={{
                            uri: `https://image.tmdb.org/t/p/original/${item.poster_path}`,
                          }}
                        />
                      </TouchableOpacity>
                      <Text style={tw`text-center font-medium text-lg`}>
                        {Utils.truncateTitle(
                          item.name,
                          language === 'zh-cn' ||
                            language === 'ko' ||
                            language === 'ja'
                            ? 5
                            : 15
                        )}
                      </Text>
                    </View>
                  )
                }}
              />
            </View>
          </Refresh>
        </Fragment>
      )}
    </Fragment>
  )
}

export default Home
