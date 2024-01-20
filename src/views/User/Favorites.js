import React, { useCallback, useEffect, useState } from 'react'
import {
  searchFavorite,
  deleteFavorite,
  resetFavorites,
} from '../../redux/actions/favorites'
import { useDispatch, useSelector } from 'react-redux'
import {
  Text,
  View,
  FlatList,
  Pressable,
  TouchableOpacity,
  Button,
  Image,
} from 'react-native'
import { Feather } from 'react-native-vector-icons'
import useLoadMore from '@mod/mobile-common/lib/hooks/utils/useLoadMore'
import moment from 'moment'
import AlertModal from '@mod/mobile-common/lib/components/utils/AlertModal'
import { Fragment } from 'react'
import { useNavigation } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'
import Utils from '@mod/mobile-common/lib/class/Utils'
import NoDataFound from '@mod/mobile-common/lib/components/utils/NoDataFound'
import tw from 'twrnc'

const Favorites = () => {
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const favoritesData = useSelector((state) => state.searchFavorite.data)
  const favoritesResults = useSelector(
    (state) => state.searchFavorite.data.favorites
  )
  const userId = useSelector((state) => state.auth.data.user.userId)
  const [selectedFavoriteId, setSelectedFavoriteId] = useState(null)
  const [allResults, setAllResults] = useState([])
  const [modalVisible, setModalVisible] = useState(false)

  const { i18n, t } = useTranslation()
  const language = i18n.language
  moment.locale(language)

  const handleModal = (favoriteId) => {
    setSelectedFavoriteId(favoriteId)
    setModalVisible(!modalVisible)
  }

  const { currentPage, loadMore } = useLoadMore(
    favoritesData.page,
    favoritesData.totalPages
  )

  useEffect(() => {
    if (favoritesResults?.length > 0) {
      if (currentPage > 1) {
        setAllResults((prevResults) => [...prevResults, ...favoritesResults])
      } else {
        setAllResults(favoritesResults)
      }
    }
  }, [favoritesResults])

  useEffect(() => {
    dispatch(searchFavorite(userId, { page: currentPage }))
  }, [dispatch, userId, currentPage])

  const redirectByType = (type, id, title) => {
    switch (type) {
      case 'movie':
        return navigation.navigate('DetailsMovie', { id, title })
      case 'serie':
        return navigation.navigate('DetailsSerie', { id, title })
      case 'person':
        return navigation.navigate('DetailsPeople', { id, title })
    }
  }

  const renderItem = useCallback(
    (item, index) => {
      return (
        <TouchableOpacity
          onPress={() =>
            redirectByType(item.type, Number(item.tmdbId), item.title)
          }
          key={index}
        >
          <View style={tw`flex-row justify-between bg-white m-4`}>
            <View style={tw`flex-row`}>
              {item.image ? (
                <Image
                  style={[tw`w-7 h-10`, { resizeMode: 'cover' }]}
                  source={{
                    uri: `${item.image}?t=${new Date().getTime()}`,
                  }}
                />
              ) : (
                <Image
                  style={[tw`w-7 h-10`, { resizeMode: 'cover' }]}
                  source={require('../../assets/image/No_Image_Available.jpg')}
                />
              )}
              <View style={tw`flex-col`}>
                <Text style={tw`mt-4 font-medium text-lg ml-4`}>{item.title}</Text>
              </View>
            </View>
            <View style={tw`flex-col`}>
              {item.userId === userId ? (
                <Pressable
                  style={tw`p-4 w-5 h-10 items-center bg-red-500`}
                  onPress={() => handleModal(item.favoriteId)}
                >
                  <View
                    style={tw`flex-1 justify-center items-center`}
                  >
                    <Feather
                      name='trash-2'
                      size={Utils.moderateScale(25)}
                      color='white'
                    />

                    <AlertModal
                      message={t('areYouSureYouWantToDeleteThisFavorite')}
                      action={handleDelete}
                      visible={modalVisible}
                      setVisible={setModalVisible}
                      t={t}
                    />
                  </View>
                </Pressable>
              ) : null}
            </View>
          </View>
        </TouchableOpacity>
      )
    },
    [userId, handleModal, t]
  )

  const handleDelete = async () => {
    if (selectedFavoriteId) {
      await dispatch(deleteFavorite(selectedFavoriteId)).then(() =>
        setModalVisible(false)
      )
      setAllResults((prevResults) =>
        prevResults.filter(
          (favorite) => favorite.favoriteId !== selectedFavoriteId
        )
      )
      await dispatch(searchFavorite(userId, { page: 1 }))
      setSelectedFavoriteId(null)
    }
  }

  useEffect(() => {
    return () => {
      dispatch(resetFavorites())
    }
  }, [])

  return (
    <Fragment>
      <Text style={tw`m-4 font-medium text-lg`}>{t('favorites')}</Text>
      <FlatList
        data={allResults}
        keyExtractor={(item, index) => `${index}`}
        ListEmptyComponent={<NoDataFound message={t('noFavorite')} />}
        ListFooterComponent={
          favoritesResults?.length > 0 ? (
            <View
              style={tw`w-full items-center my-6`}
            >
              <Button
                title={t('loadMoreFavorites')}
                onPress={loadMore}
                disabled={currentPage >= favoritesData.totalPages}
              />
            </View>
          ) : null
        }
        renderItem={({ item, index }) => renderItem(item, index)}
      />
    </Fragment>
  )
}

export default Favorites
