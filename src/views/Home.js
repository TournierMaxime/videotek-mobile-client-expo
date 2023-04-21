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
import { upcoming } from '../redux/actions/tmdb/movies/upcoming'
import { onTheAir } from '../redux/actions/tmdb/series/onTheAir'
import { popular } from '../redux/actions/tmdb/series/popular'
import { useNavigation } from '@react-navigation/native'
import home from '../styles/pages/home'
import Refresh from '../utils/Refresh'

const Home = () => {
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const nowPlayingData = useSelector((state) => state.nowPlaying.data)
  const upcomingData = useSelector((state) => state.upcoming.data)
  const onTheAirData = useSelector((state) => state.onTheAir.data)
  const popularData = useSelector((state) => state.popular.data)
  const nowPlayingResults = useSelector(
    (state) => state.nowPlaying.data.results
  )
  const upcomingResults = useSelector((state) => state.upcoming.data.results)
  const onTheAirResults = useSelector((state) => state.onTheAir.data.results)
  const popularResults = useSelector((state) => state.popular.data.results)
  const [loading, setLoading] = useState(false)

  const onRefresh = async () => {
    await Promise.all([
      dispatch(nowPlaying(nowPlayingData.page)),
      dispatch(upcoming(upcomingData.page)),
      dispatch(onTheAir(onTheAirData.page)),
      dispatch(popular(popularData.page)),
    ])
  }

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      await Promise.all([
        dispatch(nowPlaying(nowPlayingData.page)),
        dispatch(upcoming(upcomingData.page)),
        dispatch(onTheAir(onTheAirData.page)),
        dispatch(popular(popularData.page)),
      ])
      setLoading(false)
    }

    fetchData()
  }, [dispatch])

  return (
    <Refresh onRefresh={onRefresh}>
      {loading ? (
        <ActivityIndicator size='large' color='#0000ff' />
      ) : (
        <Fragment>
          <View style={styles.categoryViewContainer}>
            <Text style={styles.title}>En ce moment</Text>
            <TouchableOpacity onPress={() => navigation.navigate('NowPlaying')}>
              <Text style={styles.title}>Tout</Text>
            </TouchableOpacity>
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
                        {item.original_title}
                      </Text>
                    </TouchableOpacity>
                  </View>
                )
              }}
            />
          </View>

          <View style={styles.categoryViewContainer}>
            <Text style={styles.title}>A Venir</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Upcoming')}>
              <Text style={styles.title}>Tout</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.container}>
            <FlatList
              data={upcomingResults?.slice(0, 8)}
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
                              index === upcomingResults?.slice(0, 8).length - 1
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
                      {item.original_title}
                    </Text>
                  </View>
                )
              }}
            />
          </View>

          <View style={styles.categoryViewContainer}>
            <Text style={styles.title}>Série en cours de diffusion</Text>
            <TouchableOpacity onPress={() => navigation.navigate('OnTheAir')}>
              <Text style={styles.title}>Tout</Text>
            </TouchableOpacity>
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
                              index === onTheAirResults?.slice(0, 8).length - 1
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
                      {item.original_name}
                    </Text>
                  </View>
                )
              }}
            />
          </View>

          <View style={styles.categoryViewContainer}>
            <Text style={styles.title}>Séries populaires</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Popular')}>
              <Text style={styles.title}>Tout</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.container}>
            <FlatList
              data={popularResults?.slice(0, 8)}
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
                              index === popularResults?.slice(0, 8).length - 1
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
                      {item.original_name}
                    </Text>
                  </View>
                )
              }}
            />
          </View>
        </Fragment>
      )}
    </Refresh>
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
