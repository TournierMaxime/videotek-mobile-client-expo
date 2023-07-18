import React, { useEffect, useState } from 'react'
import { searchFavorite, deleteFavorite, resetFavorites } from '../../redux/actions/favorites'
import { useDispatch, useSelector } from 'react-redux'
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  Pressable,
  TouchableOpacity,
  Button,
  Image,
} from 'react-native'
import { Feather } from 'react-native-vector-icons'
import modal from '../../styles/components/modal'
import useLoadMore from '../../utils/LoadMore'
import card from '../../styles/components/card'
import moment from 'moment'
import button from '../../styles/components/button'
import AlertModal from '../../utils/AlertModal'
import { Fragment } from 'react'
import { useNavigation } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'
import dot from '../../styles/pages/dot'
import message from '../../styles/components/message'
import { moderateScale } from '../../utils/Responsive'
import NoDataFound from '../../utils/NoDataFound'

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

  const renderItem = (item, index) => {
    return (
      <TouchableOpacity
        onPress={() => redirectByType(item.type, Number(item.tmdbId), item.title)}
        key={index}
      >
        <View style={styles.renderItemContainer}>
          <View style={{ alignItems: 'center' }}>
            {item.image ? (
              <Image
                style={styles.image}
                source={{
                  uri: `${item.image}?t=${new Date().getTime()}`,
                }}
              />
            ) : (
              <Image
                style={styles.image}
                source={require('../../assets/image/No_Image_Available.jpg')}
              />
            )}
          </View>
          <View style={styles.renderItemDetails}>
            <Text style={styles.renderItemTitle}>
              {item.title}
            </Text>
            <View style={{ alignItems: 'flex-end', position: 'absolute', bottom: moderateScale(15), right: moderateScale(15) }}>
              {item.userId === userId ? (
                <View>
                  <Pressable
                    style={styles.trashButton}
                    onPress={() => handleModal(item.favoriteId)}
                  >
                    <Feather
                      name='trash-2'
                      size={moderateScale(25)}
                      color='red'
                    />
                  </Pressable>
                  <AlertModal
                    message={t('areYouSureYouWantToDeleteThisFavorite')}
                    action={handleDelete}
                    visible={modalVisible}
                    setVisible={setModalVisible}
                    t={t}
                  />
                </View>
              ) : null}
            </View>
          </View>
        </View>
      </TouchableOpacity>
    )
  }

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
      <Text style={styles.modalTitle}>{t('favorites')}</Text>
      <FlatList
        data={allResults}
        keyExtractor={(item, index) => `${index}`}
        ListEmptyComponent={<NoDataFound message={t('noFavorite')} />}
        ListFooterComponent={
          favoritesResults?.length > 0 ? (
            <View
              style={{
                width: '100%',
                alignItems: 'center',
                marginVertical: moderateScale(25),
              }}
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

const styles = StyleSheet.create({
  container: modal.container,
  modalView: modal.modalView,
  modalText: modal.modalText,
  closeIcons: modal.closeIcons,
  closeContainer: modal.closeContainer,
  modalTitle: modal.modalTitle,
  criticCardContainer: card.criticCardContainer,
  criticTitle: card.criticTitle,
  criticContent: card.criticContent,
  criticHeaderContainer: card.criticHeaderContainer,
  deleteButton: button.deleteButton,
  buttonText: button.buttonText,
  trashButton: button.trashButton,
  renderItemContainer: dot.renderItemContainer,
  renderItemTitle: dot.renderItemTitle,
  renderItemOverview: dot.renderItemOverview,
  renderItemDetails: dot.renderItemDetails,
  seasonTitle: dot.seasonTitle,
  containerMessage: message.containerMessage,
  messageText: message.messageText,
  image: {
    width: moderateScale(140),
    height: moderateScale(200),
    resizeMode: 'cover',
    marginLeft: moderateScale(15),
    marginBottom: moderateScale(5),
  },
})

export default Favorites
