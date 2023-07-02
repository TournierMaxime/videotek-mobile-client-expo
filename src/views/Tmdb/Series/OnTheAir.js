import React, { useEffect, useState } from 'react'
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { onTheAir } from '../../../redux/actions/tmdb/series/onTheAir'
import useLoadMore from '../../../utils/LoadMore'
import { truncateTitle } from '../../../utils/Truncate'
import { useNavigation } from '@react-navigation/native'
import list from '../../../styles/components/list'
import { useTranslation } from 'react-i18next'

const OnTheAir = () => {
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const onTheAirData = useSelector((state) => state.onTheAir.paginationData)
  const onTheAirResults = useSelector(
    (state) => state.onTheAir.paginationData.results
  )
  const { currentPage, loadMore } = useLoadMore(
    onTheAirData.page,
    onTheAirData.total_pages
  )
  const [allResults, setAllResults] = useState([])

  const { i18n } = useTranslation()
  const language = i18n.language

  useEffect(() => {
    dispatch(onTheAir(currentPage, 'onTheAirPagination', language))
  }, [dispatch, currentPage])

  useEffect(() => {
    if (onTheAirResults?.length > 0) {
      if (currentPage > 1) {
        setAllResults((prevResults) => [...prevResults, ...onTheAirResults])
      } else {
        setAllResults(onTheAirResults)
      }
    }
  }, [onTheAirResults])

  return (
    <View style={styles.container}>
      <FlatList
        data={allResults}
        keyExtractor={(item, index) => `${index}`}
        numColumns={2}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        renderItem={({ item }) => {
          return (
            <View style={styles.flatListViewContainer}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('DetailsSerie', {
                    id: item.id,
                    title: item.original_name,
                  })
                }
              >
                <Image
                  style={styles.image}
                  source={{
                    uri: `https://image.tmdb.org/t/p/original${item.poster_path}`,
                  }}
                />
                <Text style={styles.originalTitle}>
                  {truncateTitle(item.name, 15)}
                </Text>
              </TouchableOpacity>
            </View>
          )
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: list.container,
  title: list.title,
  image: list.image,
  flatListViewContainer: list.flatListViewContainer,
  originalTitle: list.originalTitle,
})

export default OnTheAir
