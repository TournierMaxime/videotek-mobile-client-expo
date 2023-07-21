import React, { useState, useEffect } from 'react'
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
        <View style={{ alignItems: 'center' }}>
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
        </View>
        <View style={styles.renderItemDetails}>
          <Text style={styles.renderItemTitle}>
            {item.User.userName} | {moment(item.created).format('LLL')}
          </Text>
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
      </View>
    )
  }

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
    <View>
      <View>
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
    marginLeft: 'auto',
    marginBottom: 5,
  },
  imagePath: {
    width: moderateScale(240),
    height: moderateScale(240),
    resizeMode: 'cover',
    marginLeft: 'auto',
    marginRight: 'auto',
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

export default AllPosts
