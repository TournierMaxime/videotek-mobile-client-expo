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
import details from '../../../styles/pages/details'
import Refresh from '../../../utils/Refresh'
import OverView from '../../../utils/OverView'
import moment from 'moment'
import SVGImdb from '../../../utils/SVGImdb'
import { Entypo } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'

const DetailsPeople = ({ route }) => {
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const { id } = route.params
  const people = useSelector((state) => state.peopleDetails.data)
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
    await dispatch(peopleCareer(id))
    await dispatch(peopleDetails(id))
  }

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      await dispatch(peopleCareer(id))
      await dispatch(peopleDetails(id))
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

            <View style={styles.titleAndDot}>
              <View>
                <Text style={[styles.headerTitle, { left: 15, top: 5 }]}>
                  {people.name}
                </Text>
              </View>

              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('DotDetails', {
                    id,
                    title: people?.name,
                  })
                }
              >
                <Entypo
                  style={{
                    borderRadius: 100,
                    padding: 5,
                    backgroundColor: 'white',
                    right: 15,
                    top: 5
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
                    uri: `https://image.tmdb.org/t/p/original${people.profile_path}`,
                  }}
                />
              </View>
              <View style={styles.infoViewContainer}>
                {birth()}

                {people.deathday ? null : currentAge()}

                {people.deathday ? ageDeath() : null}

                <TouchableOpacity onPress={() => imdb()}>
                  <SVGImdb />
                </TouchableOpacity>
              </View>
            </View>
            <OverView isBiography={true} content={people.biography} />
          </View>
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
  titleAndDot: details.titleAndDot,
})

export default DetailsPeople
