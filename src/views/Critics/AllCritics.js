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
import moment from 'moment'
import dot from '../../styles/pages/dot'
import message from '../../styles/components/message'
import button from '../../styles/components/button'
import Rate from '../../utils/Rate'
import { Ionicons } from 'react-native-vector-icons'
import { searchCritic } from '../../redux/actions/critics/searchCritic'
import { useTranslation } from 'react-i18next'

const AllCritics = ({ route }) => {
  const { id, title } = route.params
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(false)
  const critics = useSelector((state) => state.searchCritic.data)

  const { i18n, t } = useTranslation()
  const language = i18n.language
  moment.locale(language)

  const renderItem = (item) => {
    return (
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
            {item.User.userName} |{' '}
            {moment(item.created).format('LLL')}
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
      <Text style={styles.messageText}>{t('noCritic')} {title}</Text>
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

  return (
    <View style={styles.container}>
      <Text style={styles.seasonTitle}>{t('criticOf')} {title}</Text>
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
  image: {
    width: 80,
    height: 80,
    resizeMode: 'cover',
    borderRadius: 15,
    marginLeft: 15,
    marginBottom: 5,
  },
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
