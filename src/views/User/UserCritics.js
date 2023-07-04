import React, { useEffect, useState } from 'react'
import { searchCriticByUser } from '../../redux/actions/critics/searchCritic'
import { useDispatch, useSelector } from 'react-redux'
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Pressable,
  TouchableOpacity,
} from 'react-native'
import { Feather } from 'react-native-vector-icons'
import modal from '../../styles/components/modal'
import useLoadMore from '../../utils/LoadMore'
import card from '../../styles/components/card'
import moment from 'moment'
import button from '../../styles/components/button'
import { deleteCritic } from '../../redux/actions/critics/deleteCritic'
import AlertModal from '../../utils/AlertModal'
import { Fragment } from 'react'
import { useNavigation } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'

const UserCritics = () => {
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const criticsData = useSelector((state) => state.searchCritic.data)
  const criticsResults = useSelector((state) => state.searchCritic.data.critics)
  const userId = useSelector((state) => state.auth.data.user.userId)
  const [selectedCriticId, setSelectedCriticId] = useState(null)

  const { i18n, t } = useTranslation()
  const language = i18n.language
  moment.locale(language)

  const [modalVisible, setModalVisible] = useState(false)

  const handleModal = (criticId) => {
    setSelectedCriticId(criticId)
    setModalVisible(!modalVisible)
  }

  const { currentPage, loadMore } = useLoadMore(
    criticsData.page,
    criticsData.totalPages
  )
  const [allResults, setAllResults] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    dispatch(searchCriticByUser(userId, currentPage))
      .then(() => {
        setIsLoading(false)
      })
      .catch(() => {
        setIsLoading(false)
      })
  }, [dispatch, userId, currentPage])

  useEffect(() => {
    if (criticsResults?.length > 0) {
      if (currentPage > 1) {
        setAllResults((prevResults) => [...prevResults, ...criticsResults])
      } else {
        setAllResults(criticsResults)
      }
    }
  }, [criticsResults])

  return (
    <Fragment>
      <Text style={styles.modalTitle}>{t('critics')}</Text>
      <FlatList
        data={allResults}
        keyExtractor={(item, index) => `${index}`}
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
        renderItem={({ item, index }) => {
          const handleDelete = async () => {
            if (selectedCriticId) {
              await dispatch(deleteCritic(selectedCriticId)).then(() =>
                setModalVisible(false)
              )
              setAllResults((prevResults) =>
                prevResults.filter(
                  (critic) => critic.criticId !== selectedCriticId
                )
              )
              await dispatch(searchCriticByUser(userId, 1))
              setSelectedCriticId(null)
            }
          }

          return (
            <Fragment>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('UpdateCritic', {
                    criticId: item.criticId,
                    userId,
                  })
                }
              >
                <View style={styles.criticCardContainer} key={index}>
                  <View style={styles.criticHeaderContainer}>
                    <Text style={styles.criticTitle}>{item.title}</Text>
                    <Text style={styles.criticTitle}>{item.User.userName}</Text>
                  </View>
                  <Text style={styles.criticContent}>{item.content}</Text>
                  <Text>
                    {moment(item.created).locale(language).format('LLL')}
                  </Text>
                  {item.userId === userId ? (
                    <Fragment>
                      <Pressable
                        style={styles.trashButton}
                        onPress={() => handleModal(item.criticId)}
                      >
                        <Feather name='trash-2' size={25} color='white' />
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
              </TouchableOpacity>
            </Fragment>
          )
        }}
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
})

export default UserCritics
