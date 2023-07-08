import React, { useEffect, Fragment, useState } from 'react'
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { nowPlaying } from '../redux/actions/tmdb/movies/nowPlaying'
import { trending } from '../redux/actions/tmdb/movies/trending'
import { onTheAir } from '../redux/actions/tmdb/series/onTheAir'
import { useNavigation } from '@react-navigation/native'
import home from '../styles/pages/home'
import Refresh from '../utils/Refresh'
import { truncateTitle } from '../utils/Truncate'
import { Ionicons, MaterialIcons } from 'react-native-vector-icons'
import { useTranslation } from 'react-i18next'
import { moderateScale } from '../utils/Responsive'
import { registerForPushNotificationsAsync } from '../utils/Notifications'

const Home = () => {
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const nowPlayingData = useSelector((state) => state.nowPlaying.data)
  const trendingData = useSelector((state) => state.trending.data)
  const onTheAirData = useSelector((state) => state.onTheAir.data)
  const nowPlayingResults = useSelector(
    (state) => state.nowPlaying.data.results
  )
  const trendingResults = useSelector((state) => state.trending.data.results)
  const onTheAirResults = useSelector((state) => state.onTheAir.data.results)
  const [loading, setLoading] = useState(false)

  const { i18n, t } = useTranslation()
  const language = i18n.language

  const onRefresh = async () => {
    await dispatch(nowPlaying(nowPlayingData.page, 'nowPlaying', language))
    await dispatch(trending(trendingData.page, 'trending', language))
    await dispatch(onTheAir(onTheAirData.page, 'onTheAir', language))
  }

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      await dispatch(nowPlaying(nowPlayingData.page, 'nowPlaying', language)),
        await dispatch(trending(trendingData.page, 'trending', language)),
        await dispatch(onTheAir(onTheAirData.page, 'onTheAir', language)),
        setLoading(false)
    }

    fetchData()
  }, [dispatch])

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
            <View style={styles.categoryViewContainer}>
              <Text style={styles.title}>{t('trending')}</Text>

              <Ionicons name='flame' size={moderateScale(25)} color='black' />
            </View>
            <View style={styles.container}>
              <FlatList
                data={trendingResults?.slice(0, 8)}
                keyExtractor={(item) => item.id}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item, index }) => {
                  return (
                    <Fragment>
                      {item.media_type == 'movie' ? (
                        <View style={styles.listViewContainer}>
                          <TouchableOpacity
                            onPress={() =>
                              navigation.navigate('DetailsMovie', {
                                id: item.id,
                                title: item.original_title,
                              })
                            }
                          >
                            <Image
                              style={[
                                styles.image,
                                {
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
                            <Text style={styles.originalTitle}>
                              {truncateTitle(item.title, 15)}
                            </Text>
                          </TouchableOpacity>
                        </View>
                      ) : (
                        <View style={styles.listViewContainer}>
                          <TouchableOpacity
                            onPress={() =>
                              navigation.navigate('DetailsSerie', {
                                id: item.id,
                                title: item.original_name,
                              })
                            }
                          >
                            <Image
                              style={[
                                styles.image,
                                {
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
                            <Text style={styles.originalTitle}>
                              {truncateTitle(item.name, 10)}
                            </Text>
                          </TouchableOpacity>
                        </View>
                      )}
                    </Fragment>
                  )
                }}
              />
            </View>

            <View style={styles.categoryViewContainer}>
              <Text style={styles.title}>{t('films')}</Text>
              <MaterialIcons
                name='movie'
                size={moderateScale(25)}
                color='black'
              />
            </View>
            <View style={styles.container}>
              <FlatList
                data={nowPlayingResults?.slice(0, 8)}
                keyExtractor={(item) => item.id}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item, index }) => {
                  return (
                    <View style={styles.listViewContainer}>
                      <TouchableOpacity
                        onPress={() =>
                          navigation.navigate('DetailsMovie', {
                            id: item.id,
                            title: item.original_title,
                          })
                        }
                      >
                        <Image
                          style={[
                            styles.image,
                            {
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
                        <Text style={styles.originalTitle}>
                          {truncateTitle(item.title, 10)}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  )
                }}
              />
            </View>

            <View style={styles.categoryViewContainer}>
              <Text style={styles.title}>{t('series')}</Text>
              <Ionicons
                name='ios-tv-sharp'
                size={moderateScale(25)}
                color='black'
              />
            </View>
            <View style={styles.container}>
              <FlatList
                data={onTheAirResults?.slice(0, 8)}
                keyExtractor={(item) => item.id}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item, index }) => {
                  return (
                    <View style={styles.listViewContainer}>
                      <TouchableOpacity
                        onPress={() =>
                          navigation.navigate('DetailsSerie', {
                            id: item.id,
                            title: item.original_name,
                          })
                        }
                      >
                        <Image
                          style={[
                            styles.image,
                            {
                              marginRight:
                                index ===
                                onTheAirResults?.slice(0, 8).length - 1
                                  ? 15
                                  : 0,
                            },
                          ]}
                          source={{
                            uri: `https://image.tmdb.org/t/p/original/${item.poster_path}`,
                          }}
                        />
                      </TouchableOpacity>
                      <Text style={styles.originalTitle}>
                        {truncateTitle(item.name, 10)}
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

const styles = StyleSheet.create({
  categoryViewContainer: home.categoryViewContainer,
  listViewContainer: home.listViewContainer,
  originalTitle: home.originalTitle,
  container: home.container,
  title: home.title,
  image: home.image,
})

export default Home
