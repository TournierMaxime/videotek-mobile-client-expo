import React, { Fragment, useEffect, useState } from 'react'
import {
  View,
  Text,
  ImageBackground,
  Image,
  StyleSheet,
  ActivityIndicator,
} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { serieDetails } from '../../../redux/actions/tmdb/series/detailsSerie'
import { serieCrew } from '../../../redux/actions/tmdb/series/serieCrew'
import { LinearGradient } from 'expo-linear-gradient'
import Runtime from '../../../utils/RunTime'
import Rate from '../../../utils/Rate'
import details from '../../../styles/pages/details'
import Trailer from './Trailer'
import Cast from './Cast'
import Production from './Production'
import Refresh from '../../../utils/Refresh'
import OverView from '../../../utils/OverView'

const DetailsSerie = ({ route }) => {
  const dispatch = useDispatch()
  const serie = useSelector((state) => state.serieDetails.data)
  const crew = useSelector((state) => state.serieCrew.data)
  const { id } = route.params
  const [loading, setLoading] = useState(false)

  const onRefresh = async () => {
    await Promise.all([dispatch(serieDetails(id)), dispatch(serieCrew(id))])
  }

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      await Promise.all([dispatch(serieDetails(id)), dispatch(serieCrew(id))])
      setLoading(false)
    }

    fetchData()
  }, [dispatch, id])

  return (
    <Refresh styles={styles.scrollView} onRefresh={onRefresh}>
      {loading ? (
        <ActivityIndicator size='large' color='#0000ff' />
      ) : (
        serie && (
          <Fragment>
            <View style={styles.mainViewContainer}>
              <LinearGradient
                colors={['rgba(0,0,0,0.8)', 'rgba(0,0,0,0.8)']}
                style={styles.linearGradient}
              />
              <ImageBackground
                style={styles.imageBackground}
                source={{
                  uri: `https://image.tmdb.org/t/p/original${serie?.backdrop_path}`,
                }}
              />

              <View style={styles.headerViewContainer}>
                <View style={styles.posterViewContainer}>
                  <Image
                    style={styles.posterPath}
                    source={{
                      uri: `https://image.tmdb.org/t/p/original${serie?.poster_path}`,
                    }}
                  />
                  <Rate rate={serie.vote_average} />
                </View>

                <View style={styles.infoViewContainer}>
                  <Text style={styles.headerTitle}>{serie.original_name}</Text>
                  <Runtime time={serie.episode_run_time} />

                  <View style={styles.genresViewContainer}>
                    {serie?.genres?.map((genre) => (
                      <Text key={genre.id} style={styles.genreText}>
                        {genre.name}
                      </Text>
                    ))}
                  </View>

                  <Text style={styles.directorTitle}>Réalisation</Text>

                  <View style={styles.directorsViewContainer}>
                    {serie?.created_by?.map((crew) => {
                      if (!crew.name) return null
                      return (
                        <Text key={crew.id} style={styles.directorText}>
                          {crew.name}
                        </Text>
                      )
                    })}
                  </View>
                </View>
              </View>

              <OverView content={serie.overview} />
            </View>
            <Trailer id={id} />
            <Cast crew={crew} />
            <Production serie={serie} />
          </Fragment>
        )
      )}
    </Refresh>
  )
}

const styles = StyleSheet.create({
  container: details.container,
  title: details.title,
  image: details.image,
  flatListViewContainer: details.flatListViewContainer,
  originalTitle: details.originalTitle,
  scrollView: details.scrollView,
  mainViewContainer: details.mainViewContainer,
  linearGradient: details.linearGradient,
  imageBackground: details.imageBackground,
  headerTitle: details.headerTitle,
  headerViewContainer: details.headerViewContainer,
  posterViewContainer: details.posterViewContainer,
  posterPath: details.posterPath,
  releaseDate: details.releaseDate,
  infoViewContainer: details.infoViewContainer,
  genresViewContainer: details.genresViewContainer,
  genreText: details.genreText,
  directorsViewContainer: details.directorsViewContainer,
  directorText: details.directorText,
  directorTitle: details.directorTitle,
})

export default DetailsSerie
