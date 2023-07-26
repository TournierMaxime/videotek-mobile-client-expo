import React, { useEffect, useState } from 'react'
import { Text, View, StyleSheet, Image, Button } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import moment from 'moment'
import dot from '../../styles/pages/dot'
import message from '../../styles/components/message'
import button from '../../styles/components/button'
import Rate from '../../utils/Rate'
import { searchCritic, resetSearchCritic } from '../../redux/actions/critics'
import { useTranslation } from 'react-i18next'
import { moderateScale } from '../../utils/Responsive'
import useLoadMore from '../../utils/LoadMore'
import NoDataFound from '../../utils/NoDataFound'
import LikesCritics from '../../utils/LikesCritics'
import Message from '../../utils/Message'

const AllCritics = ({ id }) => {
  const dispatch = useDispatch()
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)
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

  const renderItem = (item, index) => {
    return (
      <View style={styles.renderItemContainer} key={index}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
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
          <Text style={styles.renderItemTitle}>
            {item.User.userName} | {moment(item.created).format('LLL')}
          </Text>
        </View>
        <View style={styles.renderItemDetails}>
          <Text style={styles.renderItemOverview}>{item.title}</Text>
          <Text style={styles.renderItemOverview}>{item.content}</Text>
        </View>
        <LikesCritics criticId={item.criticId} likes={item?.Likes} />
        <Rate rate={item.rate} />
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
    dispatch(searchCritic(id, { page: currentPage }))
  }, [dispatch, id, currentPage])

  useEffect(() => {
    return () => {
      dispatch(resetSearchCritic())
    }
  }, [])

  return (
    <View style={{ marginHorizontal: moderateScale(10) }}>
      {!isAuthenticated ? (
        <Message
          message={t('youMustBeAuthenticatedToPostAMessage')}
          priority='warning'
        />
      ) : null}

      {allResults.length === 0 ? (
        <NoDataFound message={t('noCritic')} />
      ) : (
        allResults.map((item, index) => renderItem(item, index))
      )}

      {criticsResults?.length > 0 && currentPage < critics.totalPages && (
        <View
          style={{
            width: '100%',
            alignItems: 'center',
            marginVertical: moderateScale(25),
          }}
        >
          <Button title={t('loadMoreCritics')} onPress={loadMore} />
        </View>
      )}
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
    margin: moderateScale(10),
  },
  renderItemContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    backgroundColor: 'white',
    marginVertical: moderateScale(10),
  },
  renderItemTitle: {
    fontWeight: 'bold',
    fontSize: moderateScale(16),
  },
  renderItemOverview: dot.renderItemOverview,
  renderItemDetails: dot.renderItemDetails,
  seasonTitle: dot.seasonTitle,
  trashButton: button.trashButton,
  containerMessage: message.containerMessage,
  messageText: message.messageText,
})

export default AllCritics
