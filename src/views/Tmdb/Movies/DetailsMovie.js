import React, { useEffect, useState } from 'react'
import {
  View,
  Text,
  ImageBackground,
  Image,
  StyleSheet,
  ActivityIndicator,
} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { movieDetails } from '../../../redux/actions/tmdb/movies/detailsMovie'
import { movieCrew } from '../../../redux/actions/tmdb/movies/movieCrew'
import { LinearGradient } from 'expo-linear-gradient'
import Runtime from '../../../utils/RunTime'
import Rate from '../../../utils/Rate'
import { truncateOverview } from '../../../utils/Truncate'
import moment from 'moment/moment'
import Trailer from './Trailer'
import Cast from './Cast'
import Production from './Production'
import details from '../../../styles/pages/details'
import Refresh from '../../../utils/Refresh'

const DetailsMovie = ({ route }) => {
  const dispatch = useDispatch()
  const movie = useSelector((state) => state.movieDetails.data)
  const crew = useSelector((state) => state.movieCrew.data)
  const { id } = route.params
  const [loading, setLoading] = useState(false)

  const onRefresh = async () => {
    await Promise.all([dispatch(movieDetails(id)), dispatch(movieCrew(id))])
  }

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      await Promise.all([dispatch(movieDetails(id)), dispatch(movieCrew(id))])
      setLoading(false)
    }

    fetchData()
  }, [dispatch, id])

  return (
    <Refresh styles={styles.scrollView} onRefresh={onRefresh}>
      {loading ? (
        <ActivityIndicator size='large' color='#0000ff' />
      ) : (
        movie && (
          <View style={styles.mainViewContainer}>
            <LinearGradient
              colors={['rgba(0,0,0,0.8)', 'rgba(0,0,0,0.8)']}
              style={styles.linearGradient}
            />
            <ImageBackground
              style={styles.imageBackground}
              source={{
                uri: `https://image.tmdb.org/t/p/original${movie.backdrop_path}`,
              }}
            />

            <View style={styles.headerViewContainer}>
              <View style={styles.posterViewContainer}>
                <Image
                  style={styles.posterPath}
                  source={{
                    uri: `https://image.tmdb.org/t/p/original${movie.poster_path}`,
                  }}
                />
                <Text style={styles.releaseDate}>
                  Sortie : {moment(movie.release_date).format('DD/MM/YYYY')}
                </Text>
              </View>

              <View style={styles.infoViewContainer}>
                <Text style={styles.headerTitle}>{movie.original_title}</Text>
                <Runtime time={movie.runtime} />

                <View style={styles.genresViewContainer}>
                  {movie?.genres?.map((genre) => (
                    <Text key={genre.id} style={styles.genreText}>
                      {genre.name}
                    </Text>
                  ))}
                </View>

                <Rate rate={movie.vote_average} />
                <Text style={styles.directorTitle}>Réalisation</Text>

                <View style={styles.directorsViewContainer}>
                  {crew?.crew?.map((crew) => {
                    if (crew.job === 'Director') {
                      return (
                        <Text key={crew.id} style={styles.directorText}>
                          {crew.name}
                        </Text>
                      )
                    }
                  })}
                </View>
              </View>
            </View>

            <View style={styles.viewOverviewContainer}>
              <Text style={styles.headerTitle}>Synopsis</Text>
              <Text style={styles.textOverview}>
                {truncateOverview(movie.overview, 400)}
              </Text>
            </View>
          </View>
        )
      )}
      <Trailer id={id} />
      <Cast crew={crew} />
      <Production movie={movie} />
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
  viewOverviewContainer: details.viewOverviewContainer,
  headerTitle: details.headerTitle,
  textOverview: details.textOverview,
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

export default DetailsMovie
