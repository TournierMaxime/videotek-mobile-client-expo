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
import { serieDetails } from '../../../redux/actions/tmdb/series/detailsSerie'
import { serieCrew } from '../../../redux/actions/tmdb/series/serieCrew'
import { LinearGradient } from 'expo-linear-gradient'
import Runtime from '../../../utils/RunTime'
import Rate from '../../../utils/Rate'
import details from '../../../styles/pages/details'
import Cast from './Cast'
import Production from './Production'
import Refresh from '../../../utils/Refresh'
import OverView from '../../../utils/OverView'
import button from '../../../styles/components/button'
import AllCritics from '../../Critics/AllCritics'
import { Entypo } from '@expo/vector-icons'
import ModalComponent from '../../../utils/ModalComponent'
import DotDetails from '../../../utils/DotDetails'

const DetailsSerie = ({ route }) => {
  const dispatch = useDispatch()
  const serie = useSelector((state) => state.serieDetails.data)
  const crew = useSelector((state) => state.serieCrew.data)
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
    await dispatch(serieDetails(id))
    await dispatch(serieCrew(id))
  }

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      await dispatch(serieDetails(id))
      await dispatch(serieCrew(id))
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
        serie && (
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

            <View style={styles.titleAndDot}>
              <View>
                <Text
                  style={[
                    styles.headerTitle,
                    { marginLeft: 15, marginTop: 15 },
                  ]}
                >
                  {serie.original_name}
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
              content={<DotDetails id={id} serie={serie} />}
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
                <Runtime time={serie.episode_run_time} isMovie={false} />

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
        )
      )}
      <Cast crew={crew} />
      <Production serie={serie} />
      {critics(nbOfCritics)}
      <AllCritics
        id={serie.id}
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

export default DetailsSerie
