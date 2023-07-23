import React, { useState, useEffect, memo } from 'react'
import { View, Text, Image, Button, StyleSheet } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { searchPost, resetSearchPost } from '../../redux/actions/posts'
import useLoadMore from '../../utils/LoadMore'
import NoDataFound from '../../utils/NoDataFound'
import { moderateScale } from '../../utils/Responsive'
import moment from 'moment'
import { useTranslation } from 'react-i18next'
import dot from '../../styles/pages/dot'
import message from '../../styles/components/message'
import button from '../../styles/components/button'
import Likes from '../../utils/Likes'

const AllPosts = ({ id }) => {
  const dispatch = useDispatch()
  const posts = useSelector((state) => state.searchPost.data)
  const postsResults = useSelector((state) => state.searchPost.data.posts)
  const [allResults, setAllResults] = useState([])

  const { i18n, t } = useTranslation()
  const language = i18n.language
  moment.locale(language)

  const { currentPage, loadMore } = useLoadMore(posts.page, posts.totalPages)

  const renderItem = (item, index) => {
    return (
      <View style={styles.renderItemContainer} key={index}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          {item.User.image ? (
            <Image
              style={styles.image}
              source={{
                uri: `${item?.User?.image}?t=${new Date().getTime()}`,
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
          <Text style={styles.renderItemOverview}>{item.content}</Text>
          {item?.Image ? (
            <Image
              style={styles.imagePath}
              source={{
                uri: `${item?.Image?.imagePath}?t=${new Date().getTime()}`,
              }}
            />
          ) : null}
        </View>
        <Likes postId={item.postId} />
      </View>
    )
  }
  const renderItemMemo = memo(renderItem)
  renderItemMemo.displayName = 'renderItem'

  useEffect(() => {
    if (postsResults?.length > 0) {
      if (currentPage > 1) {
        setAllResults((prevResults) => [...prevResults, ...postsResults])
      } else {
        setAllResults(postsResults)
      }
    }
  }, [postsResults])

  useEffect(() => {
    dispatch(searchPost(id, { page: currentPage }))
  }, [dispatch, id, currentPage])

  useEffect(() => {
    return () => {
      dispatch(resetSearchPost())
    }
  }, [])

  return (
    <View style={{ marginHorizontal: moderateScale(10) }}>
      {allResults.length === 0 ? (
        <NoDataFound message={t('noPost')} />
      ) : (
        allResults.map((item, index) => renderItem(item, index))
      )}

      {postsResults?.length > 0 && currentPage < posts.totalPages && (
        <View
          style={{
            width: '100%',
            alignItems: 'center',
            marginVertical: moderateScale(25),
          }}
        >
          <Button title={t('loadMorePosts')} onPress={loadMore} />
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
  imagePath: {
    width: '100%',
    height: moderateScale(400),
    resizeMode: 'cover',
    marginBottom: 5,
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

export default AllPosts
