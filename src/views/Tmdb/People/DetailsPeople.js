import React, { Fragment, useEffect, useState } from 'react'
import {
  View,
  Text,
  Image,
  StyleSheet,
  ActivityIndicator,
  Linking,
  TouchableOpacity,
} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { peopleDetails } from '../../../redux/actions/tmdb/people/detailsPeople'
import { peopleCareer } from '../../../redux/actions/tmdb/people/careerPeople'
import { LinearGradient } from 'expo-linear-gradient'
import Cast from './Cast'
import details from '../../../styles/pages/details'
import Refresh from '../../../utils/Refresh'
import OverView from '../../../utils/OverView'
import moment from 'moment'
import Svg, { Path, G, Rect, Polygon } from 'react-native-svg'

const DetailsPeople = ({ route }) => {
  const dispatch = useDispatch()
  const { id } = route.params
  const people = useSelector((state) => state.peopleDetails.data)
  const cast = useSelector((state) => state.peopleCareer.data)
  const [loading, setLoading] = useState(false)

  const currentAge = () => {
    const currentYear = moment().format('YYYY')
    const yearBirthDay = moment(people.birthday).format('YYYY')
    const currentAge = currentYear - yearBirthDay

    return <Text style={styles.headerTitle}>Age {currentAge} ans</Text>
  }

  const ageDeath = () => {
    const yearBirthDay = moment(people.birthday).format('YYYY')
    const yearDeathDay = moment(people.deathday).format('YYYY')
    const ageDeath = yearDeathDay - yearBirthDay

    return <Text style={styles.headerTitle}>Mort à {ageDeath} ans</Text>
  }

  const birth = () => {
    const birthDay = moment(people.birthday).format('DD/MM/YYYY')
    const placeOfBirth = people.place_of_birth
    const gender = people.gender

    if (gender === 1) {
      return (
        <Text style={styles.headerTitle}>
          Née le {birthDay} à {placeOfBirth}
        </Text>
      )
    } else if (gender === 2) {
      return (
        <Text style={styles.headerTitle}>
          Né le {birthDay} à {placeOfBirth}
        </Text>
      )
    }
  }

  const imdb = () => {
    if (!people.imdb_id) return null
    const url = `https://www.imdb.com/name/${people.imdb_id}`
    Linking.openURL(url)
  }

  const onRefresh = async () => {
    await Promise.all([dispatch(peopleCareer(id)), dispatch(peopleDetails(id))])
  }

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      await Promise.all([
        dispatch(peopleCareer(id)),
        dispatch(peopleDetails(id)),
      ])
      setLoading(false)
    }

    fetchData()
  }, [dispatch, id])

  return (
    <Refresh styles={styles.scrollView} onRefresh={onRefresh}>
      {loading ? (
        <ActivityIndicator size='large' color='#0000ff' />
      ) : (
        <Fragment>
          <View style={styles.mainViewContainer}>
            <LinearGradient
              colors={['rgba(0,0,0,0.8)', 'rgba(0,0,0,0.8)']}
              style={styles.linearGradient}
            />
            <View style={styles.headerViewContainer}>
              <View style={styles.posterViewContainer}>
                <Image
                  style={styles.posterPath}
                  source={{
                    uri: `https://image.tmdb.org/t/p/original${people.profile_path}`,
                  }}
                />
              </View>
              <View style={styles.infoViewContainer}>
                <Text style={styles.headerTitle}>{people.name}</Text>
                {birth()}

                {people.deathday ? null : currentAge()}

                {people.deathday ? ageDeath() : null}

                <TouchableOpacity onPress={() => imdb()}>
                  <Svg
                    style={styles.imdb}
                    id='home_img'
                    class='ipc-logo'
                    xmlns='http://www.w3.org/2000/svg'
                    width='64'
                    height='32'
                    viewBox='0 0 64 32'
                    version='1.1'
                  >
                    <G fill='#F5C518'>
                      <Rect x='0' y='0' width='100%' height='100%' rx='4' />
                    </G>
                    <G
                      transform='translate(8.000000, 7.000000)'
                      fill='#000000'
                      fill-rule='nonzero'
                    >
                      <Polygon points='0 18 5 18 5 0 0 0' />

                      <Path d='M15.6725178,0 L14.5534833,8.40846934 L13.8582008,3.83502426 C13.65661,2.37009263 13.4632474,1.09175121 13.278113,0 L7,0 L7,18 L11.2416347,18 L11.2580911,6.11380679 L13.0436094,18 L16.0633571,18 L17.7583653,5.8517865 L17.7707076,18 L22,18 L22,0 L15.6725178,0 Z' />
                      <Path d='M24,18 L24,0 L31.8045586,0 C33.5693522,0 35,1.41994415 35,3.17660424 L35,14.8233958 C35,16.5777858 33.5716617,18 31.8045586,18 L24,18 Z M29.8322479,3.2395236 C29.6339219,3.13233348 29.2545158,3.08072342 28.7026524,3.08072342 L28.7026524,14.8914865 C29.4312846,14.8914865 29.8796736,14.7604764 30.0478195,14.4865461 C30.2159654,14.2165858 30.3021941,13.486105 30.3021941,12.2871637 L30.3021941,5.3078959 C30.3021941,4.49404499 30.272014,3.97397442 30.2159654,3.74371416 C30.1599168,3.5134539 30.0348852,3.34671372 29.8322479,3.2395236 Z' />
                      <Path d='M44.4299079,4.50685823 L44.749518,4.50685823 C46.5447098,4.50685823 48,5.91267586 48,7.64486762 L48,14.8619906 C48,16.5950653 46.5451816,18 44.749518,18 L44.4299079,18 C43.3314617,18 42.3602746,17.4736618 41.7718697,16.6682739 L41.4838962,17.7687785 L37,17.7687785 L37,0 L41.7843263,0 L41.7843263,5.78053556 C42.4024982,5.01015739 43.3551514,4.50685823 44.4299079,4.50685823 Z M43.4055679,13.2842155 L43.4055679,9.01907814 C43.4055679,8.31433946 43.3603268,7.85185468 43.2660746,7.63896485 C43.1718224,7.42607505 42.7955881,7.2893916 42.5316822,7.2893916 C42.267776,7.2893916 41.8607934,7.40047379 41.7816216,7.58767002 L41.7816216,9.01907814 L41.7816216,13.4207851 L41.7816216,14.8074788 C41.8721037,15.0130276 42.2602358,15.1274059 42.5316822,15.1274059 C42.8031285,15.1274059 43.1982131,15.0166981 43.281155,14.8074788 C43.3640968,14.5982595 43.4055679,14.0880581 43.4055679,13.2842155 Z' />
                    </G>
                  </Svg>
                </TouchableOpacity>
              </View>
            </View>

            <OverView isBiography={true} content={people.biography} />
          </View>
          <Cast cast={cast} />
        </Fragment>
      )}
    </Refresh>
  )
}

const styles = StyleSheet.create({
  scrollView: details.scrollView,
  mainViewContainer: details.mainViewContainer,
  linearGradient: details.linearGradient,
  headerViewContainer: details.headerViewContainer,
  posterViewContainer: details.posterViewContainer,
  posterPath: details.posterPath,
  infoViewContainer: details.infoViewContainer,
  viewOverviewContainer: details.viewOverviewContainer,
  headerTitle: details.headerTitle,
  textOverview: details.textOverview,
  imdb: details.imdb,
})

export default DetailsPeople
