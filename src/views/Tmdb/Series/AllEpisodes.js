import React, { useEffect } from 'react'
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  Image
} from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import moment from 'moment/moment'
import episodes from '../../../styles/pages/episodes'
import { seasonDetails } from '../../../redux/actions/tmdb/series/detailsSeason'

const AllEpisodes = ({ route }) => {
    const { id, seasonNumber } = route.params
    const dispatch = useDispatch()
    const season = useSelector((state) => state.seasonDetails.data)
    
    useEffect(() => {
        dispatch(seasonDetails(id, seasonNumber))
    }, [id, seasonNumber])

  const renderItem = (item) => {
    return (
        <View style={styles.renderItemContainer}>
          <Image
            style={styles.image}
            source={{
              uri: `https://image.tmdb.org/t/p/original/${item.still_path}`,
            }}
          />
          <View style={styles.renderItemDetails}>
            <Text style={styles.renderItemTitle}>
              {item.name} | épisode {item.episode_number} {moment(item.air_date).format('YYYY')}
            </Text>
            <Text style={styles.renderItemOverview}>{item.overview}</Text>
          </View>
        </View>
    )
  }

  return (
    <View style={styles.container}>
      <Text style={styles.seasonTitle}>Episodes</Text>
      <FlatList
        data={season?.episodes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => renderItem(item)}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: episodes.container,
  image: episodes.image,
  renderItemContainer: episodes.renderItemContainer,
  renderItemTitle: episodes.renderItemTitle,
  renderItemOverview: episodes.renderItemOverview,
  renderItemDetails: episodes.renderItemDetails,
  seasonTitle: episodes.seasonTitle,
})

export default AllEpisodes
