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
import dot from '../../../styles/pages/dot'
import { useNavigation } from '@react-navigation/native'
import Rate from '../../../utils/Rate'
import { useTranslation } from 'react-i18next'

const AllSeasons = ({ route }) => {
  const { title, id } = route.params
  const navigation = useNavigation()
  const serie = useSelector((state) => state.serieDetails.data)

  const { t, i18n } = useTranslation()
  const language = i18n.language

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
          <View style={{ alignItems: 'center' }}>
            {item.poster_path ? (
              <Image
                style={styles.image}
                source={{
                  uri: `https://image.tmdb.org/t/p/original/${item.poster_path}`,
                }}
              />
            ) : (
              <Image
                style={styles.image}
                source={require('../../../assets/image/No_Image_Available.jpg')}
              />
            )}
            <Rate rate={item.vote_average} />
          </View>
          <View style={styles.renderItemDetails}>
            <Text style={styles.renderItemTitle}>
              {item.name} | {item.episode_count} {t('episodes')}{' '}
              {moment(item.air_date).locale(language).format('LL')}
            </Text>
            <Text style={styles.renderItemOverview}>{item.overview}</Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  }

  return (
    <View style={styles.container}>
      <Text style={styles.seasonTitle}>{t('seasonsOf')} {title}</Text>
      <FlatList
        data={serie?.seasons}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => renderItem(item)}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: dot.container,
  image: dot.image,
  renderItemContainer: dot.renderItemContainer,
  renderItemTitle: dot.renderItemTitle,
  renderItemOverview: dot.renderItemOverview,
  renderItemDetails: dot.renderItemDetails,
  seasonTitle: dot.seasonTitle,
})

export default AllSeasons
