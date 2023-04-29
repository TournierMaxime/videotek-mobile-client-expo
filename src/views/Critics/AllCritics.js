import React, { useEffect, useState } from 'react'
import { searchCritic } from '../../redux/actions/critics/searchCritic'
import { useDispatch, useSelector } from 'react-redux'
import {
  Text,
  View,
  StyleSheet,
  Modal,
  TouchableOpacity,
  ActivityIndicator,
  FlatList
} from 'react-native'
import { Ionicons } from 'react-native-vector-icons'
import modal from '../../styles/components/modal'
import useLoadMore from '../../utils/LoadMore'

const AllCritics = ({ id, visible, setVisible }) => {
  const dispatch = useDispatch()
  const criticsData = useSelector((state) => state.searchCritic.paginationData)
  const criticsResults = useSelector((state) => state.searchCritic.paginationData.critics)
  const { currentPage, loadMore  } = useLoadMore(
    criticsData.currentPage,
    criticsData.totalPages
  )
  const [allResults, setAllResults] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  

  const handleModalClose = () => {
    setVisible(false)
  }

  useEffect(() => {
    setIsLoading(true);
    dispatch(searchCritic({ currentPage, idMovieOrSerie: id }, 'searchCriticPagination'))
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

  const filteredCritics = allResults?.filter(
    (critic) => critic.idMovieOrSerie === id
  )

  console.log(criticsData.currentPage)

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
              data={filteredCritics}
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
                return (
                  <View key={index}>
                    <Text style={styles.modalText}>{item.title}</Text>
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
})

export default AllCritics
