import React, { Fragment, useEffect, useState } from 'react'
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { peopleDetails } from '../../../redux/actions/tmdb/people/detailsPeople'
import { peopleCareer } from '../../../redux/actions/tmdb/people/careerPeople'
import { LinearGradient } from 'expo-linear-gradient'
import { truncateOverview } from '../../../utils/Truncate'
import Cast from './Cast'
import details from '../../../styles/pages/details'

const DetailsPeople = ({ route }) => {
  const dispatch = useDispatch()
  const { id } = route.params
  const people = useSelector((state) => state.peopleDetails.data)
  const cast = useSelector((state) => state.peopleCareer.data)
  const [loading, setLoading] = useState(false)

  const biography = (data) => {
    if (data == '') return null
    return (
      <Fragment>
        <Text style={styles.headerTitle}>Biographie</Text>
        <Text style={styles.textOverview}>{truncateOverview(data, 400)}</Text>
      </Fragment>
    )
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
    <ScrollView style={styles.scrollView}>
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
                <Text style={styles.headerTitle}>{people.original_name}</Text>
              </View>
            </View>
            <View style={styles.viewOverviewContainer}>
              {biography(people.biography)}
            </View>
          </View>
          <Cast cast={cast} />
        </Fragment>
      )}
    </ScrollView>
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
})

export default DetailsPeople
