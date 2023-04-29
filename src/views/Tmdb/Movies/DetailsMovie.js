import React, { useEffect, useState } from 'react'
import {
  View,
  Text,
  ImageBackground,
  Image,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { movieDetails } from '../../../redux/actions/tmdb/movies/detailsMovie'
import { movieCrew } from '../../../redux/actions/tmdb/movies/movieCrew'
import { LinearGradient } from 'expo-linear-gradient'
import Runtime from '../../../utils/RunTime'
import Rate from '../../../utils/Rate'
import Trailer from './Trailer'
import Cast from './Cast'
import Production from './Production'
import details from '../../../styles/pages/details'
import Refresh from '../../../utils/Refresh'
import OverView from '../../../utils/OverView'
import AllCritics from '../../Critics/AllCritics'
import RedirectToCritic from '../../../utils/RedirectToCritic'
import button from '../../../styles/components/button'

const DetailsMovie = ({ route }) => {
  const dispatch = useDispatch()
  const movie = useSelector((state) => state.movieDetails.data)
  const crew = useSelector((state) => state.movieCrew.data)
  const { id } = route.params
  const [loading, setLoading] = useState(false)

  const [modalVisible, setModalVisible] = useState(false)

  const handleModal = () => {
    setModalVisible(!modalVisible)
  }

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
                <Rate rate={movie.vote_average} />
              </View>

              <View style={styles.infoViewContainer}>
                <Text style={styles.headerTitle}>{movie.original_title}</Text>
                <Runtime time={movie.runtime} isMovie={true} />

                <View style={styles.genresViewContainer}>
                  {movie?.genres?.map((genre) => (
                    <Text key={genre.id} style={styles.genreText}>
                      {genre.name}
                    </Text>
                  ))}
                </View>

                <Text style={styles.directorTitle}>Réalisation</Text>

                <View style={styles.directorsViewContainer}>
                  {crew?.crew?.map((crew) => {
                    if (!crew.job === 'Director') return null
                    if (crew.job === 'Director') {
                      return (
                        <Text key={crew.id} style={styles.directorText}>
                          {crew.name}
                        </Text>
                      )
                    }
                  })}
                </View>

                <RedirectToCritic movie={movie} />
              </View>
            </View>

            <OverView content={movie.overview} />
          </View>
        )
      )}
      <Trailer id={id} />
      <Cast crew={crew} />
      <Production movie={movie} />
      <TouchableOpacity
          style={styles.criticButton}
          onPress={() => handleModal()}
          
        >
          <Text style={styles.buttonText}>Lire les critiques</Text>
        </TouchableOpacity>
      <AllCritics id={movie.id} visible={modalVisible} setVisible={setModalVisible} />
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
  criticButton: button.criticButton,
  buttonText: button.buttonText,
})

export default DetailsMovie
