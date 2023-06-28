import React from 'react'
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native'
import { useSelector } from 'react-redux'
import moment from 'moment/moment'
import seasons from '../../../styles/pages/seasons'
import { useNavigation } from '@react-navigation/native'

const AllSeasons = ({ route }) => {
  const { title, id } = route.params
  const navigation = useNavigation()
  const serie = useSelector((state) => state.serieDetails.data)

  const renderItem = (item) => {
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('AllEpisodes', {
            id,
            seasonNumber: item.season_number,
          })
        }
      >
        <View style={styles.renderItemContainer}>
          <Image
            style={styles.image}
            source={{
              uri: `https://image.tmdb.org/t/p/original/${item.poster_path}`,
            }}
          />
          <View style={styles.renderItemDetails}>
            <Text style={styles.renderItemTitle}>
              {item.name} | {item.episode_count} épisodes{' '}
              {moment(item.air_date).format('YYYY')}
            </Text>
            <Text style={styles.renderItemOverview}>{item.overview}</Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  }

  return (
    <View style={styles.container}>
      <Text style={styles.seasonTitle}>Saisons de {title}</Text>
      <FlatList
        data={serie?.seasons}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => renderItem(item)}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: seasons.container,
  image: seasons.image,
  renderItemContainer: seasons.renderItemContainer,
  renderItemTitle: seasons.renderItemTitle,
  renderItemOverview: seasons.renderItemOverview,
  renderItemDetails: seasons.renderItemDetails,
  seasonTitle: seasons.seasonTitle,
})

export default AllSeasons
