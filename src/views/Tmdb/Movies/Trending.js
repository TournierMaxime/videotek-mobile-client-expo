import React, { Fragment, useEffect, useState } from 'react'
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { trending } from '../../../redux/actions/tmdb/movies/trending'
import useLoadMore from '../../../utils/LoadMore'
import { truncateTitle } from '../../../utils/Truncate'
import { useNavigation } from '@react-navigation/native'
import list from '../../../styles/components/list'

const Trending = () => {
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const trendingData = useSelector((state) => state.trending.paginationData)
  const trendingResults = useSelector(
    (state) => state.trending.paginationData.results
  )
  const { currentPage, loadMore } = useLoadMore(
    trendingData.page,
    trendingData.total_pages
  )
  const [allResults, setAllResults] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    dispatch(trending(currentPage, 'trendingPagination'))
      .then(() => {
        setIsLoading(false)
      })
      .catch(() => {
        setIsLoading(false)
      })
  }, [dispatch, currentPage])

  useEffect(() => {
    if (trendingResults?.length > 0) {
      if (currentPage > 1) {
        setAllResults((prevResults) => [...prevResults, ...trendingResults])
      } else {
        setAllResults(trendingResults)
      }
    }
  }, [trendingResults])

  return (
    <View style={styles.container}>
      <FlatList
        data={allResults}
        keyExtractor={(item, index) => `${index}`}
        numColumns={2}
        onEndReached={
          isLoading === true ? (
            <ActivityIndicator
              style={styles.loader}
              size='large'
              color='#0000ff'
            />
          ) : (
            loadMore
          )
        }
        onEndReachedThreshold={0.5}
        renderItem={({ item }) => {
          return (
            <Fragment>
              {item.media_type == 'movie' ? (
                <View style={styles.flatListViewContainer}>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate('DetailsMovie', {
                        id: item.id,
                        title: item.original_title,
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
                      {truncateTitle(item.original_title, 15)}
                    </Text>
                  </TouchableOpacity>
                </View>
              ) : (
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
                      {truncateTitle(item.original_name, 15)}
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            </Fragment>
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

export default Trending
