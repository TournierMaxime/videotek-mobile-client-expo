import React, { useEffect, useState } from 'react'
import { searchCritic } from '../../redux/actions/critics/searchCritic'
import { useDispatch, useSelector } from 'react-redux'
import {
  Text,
  View,
  StyleSheet,
  Modal,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Pressable,
} from 'react-native'
import { Ionicons, Feather } from 'react-native-vector-icons'
import modal from '../../styles/components/modal'
import useLoadMore from '../../utils/LoadMore'
import card from '../../styles/components/card'
import moment from 'moment'
import button from '../../styles/components/button'
import { deleteCritic } from '../../redux/actions/critics/deleteCritic'
import AlertModal from '../../utils/AlertModal'
import { Fragment } from 'react'

const AllCritics = ({ id, visible, setVisible }) => {
  const dispatch = useDispatch()
  const criticsData = useSelector((state) => state.searchCritic.data)
  const criticsResults = useSelector((state) => state.searchCritic.data.critics)
  const userId = useSelector((state) => state.auth.data.user.userId)
  const [selectedCriticId, setSelectedCriticId] = useState(null)

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

  const handleModalClose = () => {
    setVisible(false)
  }

  useEffect(() => {
    setIsLoading(true)
    dispatch(searchCritic(id, currentPage))
      .then(() => {
        setIsLoading(false)
      })
      .catch(() => {
        setIsLoading(false)
      })
  }, [dispatch, id, currentPage])

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
    <View style={styles.container}>
      <Modal
        animationType='slide'
        transparent={true}
        visible={visible}
        onRequestClose={handleModalClose}
      >
        <View style={styles.modalView}>
          <View style={styles.closeContainer}>
            <TouchableOpacity onPress={() => setVisible(!visible)}>
              <Ionicons style={styles.closeIcons} name='close' size={40} />
            </TouchableOpacity>
          </View>
          <Text style={styles.modalTitle}>Critiques</Text>
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
                  await dispatch(searchCritic(id, 1))
                  setSelectedCriticId(null)
                }
              }

              return (
                <View style={styles.criticCardContainer} key={index}>
                  <View style={styles.criticHeaderContainer}>
                    <Text style={styles.criticTitle}>{item.title}</Text>
                    <Text style={styles.criticTitle}>{item.User.userName}</Text>
                  </View>
                  <Text style={styles.criticContent}>{item.content}</Text>
                  <Text>
                    Le {moment(item.created).format('DD/MM/YYYY à HH:mm:ss')}
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
                        message={
                          'Etes vous sur de vouloir supprimer cette critique ?'
                        }
                        action={handleDelete}
                        visible={modalVisible}
                        setVisible={setModalVisible}
                      />
                    </Fragment>
                  ) : null}
                </View>
              )
            }}
          />
        </View>
      </Modal>
    </View>
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

export default AllCritics
