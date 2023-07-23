import React, { useEffect, useState } from 'react'
import { TouchableOpacity, StyleSheet, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import {
  createLike,
  getOneLikePost,
  deleteLike,
  resetLike
} from '../redux/actions/likes'
import { moderateScale } from './Responsive'
import { AntDesign, MaterialIcons } from '@expo/vector-icons'

const Likes = ({ postId }) => {
  const dispatch = useDispatch()
  const userId = useSelector((state) => state.auth.data.user.userId)
  const post = useSelector((state) => state.getOneLikePost.data)
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)
  const [isLiked, setIsLiked] = useState(false)

  const handleCreate = async () => {
      await dispatch(createLike({ postId }))
      setIsLiked(true)
  }

  const handleDelete = async () => {
    try {
      const likeId = post?.like?.likeId
      if (likeId) {
        await dispatch(deleteLike(likeId))
        setIsLiked(false)
      }
    } catch (error) {
      console.log(error.response.data.errMsg)
    }
  }

  useEffect(() => {
    const fetchLikeStatus = async () => {
      try {
        if (isAuthenticated) {
          const res = await dispatch(getOneLikePost(userId, postId))
          if (res?.like) {
            setIsLiked(true)
          } else {
            setIsLiked(false)
          }
        }
      } catch (error) {
        if (error.response.status === 404) {
          setIsLiked(false)
        } else {
          console.error(error)
        }
      }
    }
    fetchLikeStatus()
  }, [dispatch, userId, postId, isAuthenticated, isLiked])

  useEffect(() => {
    return () => {
      dispatch(resetLike())
    }
  }, [])

  return isAuthenticated ? (
    <View style={{ marginVertical: moderateScale(5) }}>
      {!isLiked ? (
        <TouchableOpacity
          style={styles.createButtonContainer}
          onPress={() => handleCreate()}
        >
          <MaterialIcons
            style={styles.icon}
            name='favorite-outline'
            size={moderateScale(25)}
            color='black'
          />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={styles.createButtonContainer}
          onPress={() => handleDelete()}
        >
          <AntDesign
            style={styles.icon}
            name='heart'
            size={moderateScale(25)}
            color='red'
          />
        </TouchableOpacity>
      )}
    </View>
  ) : null
}

const styles = StyleSheet.create({
  createButtonContainer: {
    width: moderateScale(40),
    height: moderateScale(40),
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export default Likes
