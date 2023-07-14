import React, { useEffect, useState } from 'react'
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  Image,
  Button,
} from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import moment from 'moment'
import dot from '../../styles/pages/dot'
import message from '../../styles/components/message'
import button from '../../styles/components/button'
import Rate from '../../utils/Rate'
import { searchCritic } from '../../redux/actions/critics/searchCritic'
import { useTranslation } from 'react-i18next'
import { moderateScale } from '../../utils/Responsive'
import useLoadMore from '../../utils/LoadMore'
import NoDataFound from '../../utils/NoDataFound'

const AllCritics = ({ route }) => {
  const { id, title } = route.params
  const dispatch = useDispatch()
  const critics = useSelector((state) => state.searchCritic.data)
  const criticsResults = useSelector((state) => state.searchCritic.data.critics)
  const [allResults, setAllResults] = useState([])

  const { i18n, t } = useTranslation()
  const language = i18n.language
  moment.locale(language)

  const { currentPage, loadMore } = useLoadMore(
    critics.page,
    critics.totalPages
  )

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
            {item.User.userName} | {moment(item.created).format('LLL')}
          </Text>
          <Text style={styles.renderItemOverview}>{item.title}</Text>
          <Text style={styles.renderItemOverview}>{item.content}</Text>
        </View>
      </View>
    )
  }

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
    dispatch(searchCritic(id, {page: currentPage}))
  }, [dispatch, id, currentPage])

  return (
    <View style={styles.container}>
      <Text style={styles.seasonTitle}>
        {t('criticOf')} {title}
      </Text>
        <FlatList
          data={allResults}
          ListEmptyComponent={<NoDataFound message={t('noCritic')} />}
          keyExtractor={(item) => item.criticId}
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
                  disabled={currentPage >= critics.totalPages}
                />
              </View>
            ) : null
          }
          renderItem={({ item }) => renderItem(item)}
        />
    </View>
  )
}

const styles = StyleSheet.create({
  container: dot.container,
  image: {
    width: moderateScale(60),
    height: moderateScale(60),
    resizeMode: 'cover',
    borderRadius: moderateScale(30),
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
