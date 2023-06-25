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
import Cast from './Cast'
import Production from './Production'
import details from '../../../styles/pages/details'
import Refresh from '../../../utils/Refresh'
import OverView from '../../../utils/OverView'
import AllCritics from '../../Critics/AllCritics'
import button from '../../../styles/components/button'
import { Entypo } from '@expo/vector-icons'
import ModalComponent from '../../../utils/ModalComponent'
import DotDetails from '../../../utils/DotDetails'

const DetailsMovie = ({ route }) => {
  const dispatch = useDispatch()
  const movie = useSelector((state) => state.movieDetails.data)
  const crew = useSelector((state) => state.movieCrew.data)
  const nbOfCritics = useSelector((state) => state.searchCritic.data.results)
  const { id } = route.params
  const [loading, setLoading] = useState(false)

  const [modalCritic, setModalCritic] = useState(false)
  const [modalDot, setModalDot] = useState(false)

  const handleModalCritic = () => {
    setModalCritic(!modalCritic)
  }

  const handleModalDot = () => {
    setModalDot(!modalDot)
  }

  const onRefresh = async () => {
    await dispatch(movieDetails(id))
    await dispatch(movieCrew(id))
  }

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      await dispatch(movieDetails(id))
      await dispatch(movieCrew(id))
      setLoading(false)
    }

    fetchData()
  }, [dispatch, id])

  const critics = (data) => {
    if (!data || data.length === 0) return null
    return (
      <TouchableOpacity
        style={styles.criticButton}
        onPress={() => handleModalCritic()}
      >
        <Text style={styles.buttonText}>Lire les critiques ({data})</Text>
      </TouchableOpacity>
    )
  }

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

            <View style={styles.titleAndDot}>
              <View>
                <Text
                  style={[
                    styles.headerTitle,
                    { marginLeft: 15, marginTop: 15 },
                  ]}
                >
                  {movie.original_title}
                </Text>
              </View>

              <TouchableOpacity onPress={() => handleModalDot()}>
                <Entypo
                  style={{ marginRight: 15, marginTop: 15 }}
                  name='dots-three-vertical'
                  size={24}
                  color='white'
                />
              </TouchableOpacity>
            </View>

            <ModalComponent
              visible={modalDot}
              setVisible={setModalDot}
              title={'Details'}
              content={<DotDetails id={id} movie={movie} />}
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
              </View>
            </View>

            <OverView content={movie.overview} />
          </View>
        )
      )}
      <Cast crew={crew} />
      <Production movie={movie} />
      {critics(nbOfCritics)}
      <AllCritics
        id={movie.id}
        visible={modalCritic}
        setVisible={setModalCritic}
      />
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
  titleAndDot: details.titleAndDot,
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
