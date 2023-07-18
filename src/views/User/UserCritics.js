import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  Pressable,
  TouchableOpacity,
  Image,
  Button,
} from 'react-native'
import { Feather } from 'react-native-vector-icons'
import modal from '../../styles/components/modal'
import useLoadMore from '../../utils/LoadMore'
import card from '../../styles/components/card'
import moment from 'moment'
import button from '../../styles/components/button'
import { searchCriticByUser, deleteCritic } from '../../redux/actions/critics'
import AlertModal from '../../utils/AlertModal'
import { Fragment } from 'react'
import { useNavigation } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'
import Rate from '../../utils/Rate'
import dot from '../../styles/pages/dot'
import message from '../../styles/components/message'
import { moderateScale } from '../../utils/Responsive'
import NoDataFound from '../../utils/NoDataFound'

const UserCritics = () => {
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const criticsData = useSelector((state) => state.searchCritic.data)
  const criticsResults = useSelector((state) => state.searchCritic.data.critics)
  const userId = useSelector((state) => state.auth.data.user.userId)
  const [selectedCriticId, setSelectedCriticId] = useState(null)
  const [allResults, setAllResults] = useState([])
  const [modalVisible, setModalVisible] = useState(false)

  const { i18n, t } = useTranslation()
  const language = i18n.language
  moment.locale(language)

  const handleModal = (criticId) => {
    setSelectedCriticId(criticId)
    setModalVisible(!modalVisible)
  }

  const { currentPage, loadMore } = useLoadMore(
    criticsData.page,
    criticsData.totalPages
  )

  useEffect(() => {
    if (criticsResults?.length > 0) {
      if (currentPage > 1) {
        setAllResults((prevResults) => [...prevResults, ...criticsResults])
      } else {
        setAllResults(criticsResults)
      }
    }
  }, [criticsResults])

  useEffect(() => {
    dispatch(searchCriticByUser(userId, {page: currentPage}))
  }, [dispatch, userId, currentPage])

  const renderItem = (item, index) => {
    return (
      <TouchableOpacity
        key={index}
        onPress={() =>
          navigation.navigate('UpdateCritic', {
            criticId: item.criticId,
            userId,
          })
        }
      >
        <View style={styles.renderItemContainer}>
          <View style={{ alignItems: 'center' }}>
            {item.User.image ? (
              <Image
                style={styles.image}
                source={{
                  uri: `${item.User.image}?t=${new Date().getTime()}`,
                }}
              />
            ) : (
              <Image
                style={styles.image}
                source={require('../../assets/image/No_Image_Available.jpg')}
              />
            )}
            <Rate rate={item.rate} />
          </View>
          <View style={styles.renderItemDetails}>
            <Text style={styles.renderItemTitle}>
              {item.User.userName} | {moment(item.created).format('LLL')}
            </Text>
            <Text style={styles.renderItemOverview}>{item.title}</Text>
            <Text style={styles.renderItemOverview}>{item.content}</Text>
            <View style={{ alignItems: 'flex-end', marginRight: moderateScale(15) }}>
              {item.userId === userId ? (
                <Fragment>
                  <Pressable
                    style={styles.trashButton}
                    onPress={() => handleModal(item.criticId)}
                  >
                    <Feather
                      name='trash-2'
                      size={moderateScale(25)}
                      color='red'
                    />
                  </Pressable>
                  <AlertModal
                    message={t('areYouSureYouWantToDeleteThisReview')}
                    action={handleDelete}
                    visible={modalVisible}
                    setVisible={setModalVisible}
                    t={t}
                  />
                </Fragment>
              ) : null}
            </View>
          </View>
        </View>
      </TouchableOpacity>
    )
  }

  const handleDelete = async () => {
    if (selectedCriticId) {
      await dispatch(deleteCritic(selectedCriticId)).then(() =>
        setModalVisible(false)
      )
      setAllResults((prevResults) =>
        prevResults.filter((critic) => critic.criticId !== selectedCriticId)
      )
      await dispatch(searchCriticByUser(userId, 1))
      setSelectedCriticId(null)
    }
  }

  return (
    <Fragment>
      <Text style={styles.modalTitle}>{t('critics')}</Text>
      <FlatList
        data={allResults}
        keyExtractor={(item, index) => `${index}`}
        ListEmptyComponent={<NoDataFound message={t('noCritic')} />}
        ListFooterComponent={
          criticsResults?.length > 0 ? (
            <View
              style={{
                width: '100%',
                alignItems: 'center',
                marginVertical: moderateScale(25),
              }}
            >
              <Button
                title={t('loadMoreCritics')}
                onPress={loadMore}
                disabled={currentPage >= criticsData.totalPages}
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
    width: moderateScale(60),
    height: moderateScale(60),
    resizeMode: 'cover',
    borderRadius: moderateScale(30),
    marginLeft: 'auto',
    marginBottom: moderateScale(5),
  },
})

export default UserCritics
