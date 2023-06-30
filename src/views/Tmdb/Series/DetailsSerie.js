import React, { Fragment, useEffect, useState } from 'react'
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
import Production from './Production'
import Refresh from '../../../utils/Refresh'
import OverView from '../../../utils/OverView'
import button from '../../../styles/components/button'
import { Entypo } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'

const DetailsSerie = ({ route }) => {
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const serie = useSelector((state) => state.serieDetails.data)
  const { id } = route.params
  const [loading, setLoading] = useState(false)

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

  const ProductionMemoized = React.memo(Production)
  const OverViewMemoized = React.memo(OverView)

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

              <View style={styles.titleAndDot}>
                <View>
                  <Text style={[styles.headerTitle, { left: 15, top: 5 }]}>
                    {serie.original_name}
                  </Text>
                </View>

                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('DotDetails', {
                      id,
                      title: serie?.original_name,
                    })
                  }
                >
                  <Entypo
                    style={{
                      borderRadius: 100,
                      padding: 5,
                      backgroundColor: 'white',
                      right: 15,
                      top: 5,
                    }}
                    name='dots-three-vertical'
                    size={24}
                    color='black'
                  />
                </TouchableOpacity>
              </View>

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

                  <Text style={styles.directorTitle}>Genres</Text>

                  <View style={styles.genresViewContainer}>
                    {serie?.genres?.map((genre, index) => (
                      <Text key={index} style={styles.genreText}>
                        {genre.name}
                      </Text>
                    ))}
                  </View>

                  <Text style={styles.directorTitle}>Réalisation</Text>

                  <View style={styles.directorsViewContainer}>
                    {serie?.created_by?.map((credit, index) => {
                      if (!credit.name) return null
                      return (
                        <Text key={index} style={styles.directorText}>
                          {credit.name}
                        </Text>
                      )
                    })}
                  </View>
                </View>
              </View>

              <OverViewMemoized content={serie.overview} />
            </View>
            <ProductionMemoized serie={serie} />
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
