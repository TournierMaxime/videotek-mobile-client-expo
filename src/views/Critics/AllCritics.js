import React, { useEffect, useState } from 'react'
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  Image,
  ActivityIndicator,
} from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import moment from 'moment/moment'
import dot from '../../styles/pages/dot'
import message from "../../styles/components/message"
import button from '../../styles/components/button'
import Rate from '../../utils/Rate'
import { Ionicons } from 'react-native-vector-icons'
import {
  searchCritic,
  resetSearchCritic,
} from '../../redux/actions/critics/searchCritic'

const AllCritics = ({ route }) => {
  const { id, title } = route.params
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(false)
  const critics = useSelector((state) => state.searchCritic.data)

  const renderItem = (item) => {
    return (
      <View style={styles.renderItemContainer}>
        <View style={{ alignItems: 'center' }}>
          {item.User.image ? (
            <Image
              style={styles.image}
              source={{
                uri: item.User.image,
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
            {item.User.userName} |{' '}
            {moment(item.created).format('DD/MM/YYYY à HH:mm:ss')}
          </Text>
          <Text style={styles.renderItemOverview}>{item.title}</Text>
          <Text style={styles.renderItemOverview}>{item.content}</Text>
        </View>
      </View>
    )
  }

  const noDataFound = () => (
    <View style={styles.containerMessage}>
      <Ionicons name='information-circle-outline' size={24} color='#696cff' />
      <Text style={styles.messageText}>Aucune critique pour {title}</Text>
    </View>
  )

  useEffect(() => {
    setIsLoading(true)
    dispatch(searchCritic(id))
      .then(() => {
        setIsLoading(false)
      })
      .catch(() => {
        setIsLoading(false)
      })
  }, [dispatch, id])

  useEffect(() => {
    return () => {
      dispatch(resetSearchCritic())
    }
  }, [])

  return (
    <View style={styles.container}>
      <Text style={styles.seasonTitle}>Critiques de {title}</Text>
      {isLoading ? (
        <ActivityIndicator size='large' color='#0000ff' />
      ) : (
        <FlatList
          data={critics?.critics}
          ListEmptyComponent={noDataFound}
          keyExtractor={(item) => item.criticId}
          renderItem={({ item }) => renderItem(item)}
        />
      )}
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
  trashButton: button.trashButton,
  containerMessage: message.containerMessage,
  messageText: message.messageText,
})

export default AllCritics
