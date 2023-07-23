import React, { useEffect, useState } from 'react'
import { TouchableOpacity, StyleSheet, View, Text } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import {
  createLike,
  getOneLikeCritic,
  deleteLike,
  resetLike
} from '../redux/actions/likes'
import { moderateScale } from './Responsive'
import { AntDesign, MaterialIcons } from '@expo/vector-icons'

const LikesCritics = ({ criticId, likes }) => {
  const dispatch = useDispatch()
  const userId = useSelector((state) => state.auth.data.user.userId)
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)
  const [isLiked, setIsLiked] = useState(false)
  const [numberOfLikes, setNumberOfLikes] = useState(likes.length)

  const handleCreate = async () => {
    await dispatch(createLike({ criticId }))
    setIsLiked(true)
    setNumberOfLikes(likes.length + 1)
  }

  const handleDelete = async () => {
    try {
      // Assuming you have a function to fetch likes for a specific post for the user
      const res = await dispatch(getOneLikeCritic(userId, criticId))
      const likeId = res?.like?.likeId
      if (likeId) {
        await dispatch(deleteLike(likeId))
        setIsLiked(false)
        setNumberOfLikes(likes.length)
      }
    } catch (error) {
      console.log(error.response.data.errMsg)
    }
  }

  useEffect(() => {
    const fetchLikeStatus = async () => {
      try {
        if (isAuthenticated) {
          const res = await dispatch(getOneLikeCritic(userId, criticId))
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
  }, [dispatch, userId, criticId, isAuthenticated])

  useEffect(() => {
    return () => {
      dispatch(resetLike())
    }
  }, [])

  return (
    <View style={{ marginVertical: moderateScale(5) }}>
      {!isLiked ? (
        <TouchableOpacity
          style={styles.createButtonContainer}
          onPress={() => isAuthenticated ? handleCreate() : null}
        >
          <MaterialIcons
            style={styles.icon}
            name='favorite-outline'
            size={moderateScale(25)}
            color='black'
          />
          <Text style={styles.likes}>{numberOfLikes}</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={styles.createButtonContainer}
          onPress={() => isAuthenticated ? handleDelete() : null}
        >
          <AntDesign
            style={styles.icon}
            name='heart'
            size={moderateScale(25)}
            color='red'
          />
          <Text style={styles.likes}>{numberOfLikes}</Text>
        </TouchableOpacity>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  createButtonContainer: {
    width: moderateScale(40),
    height: moderateScale(40),
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  },
  icon: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  likes: {
    marginLeft: moderateScale(5),
    fontSize: moderateScale(14)
  }
})

export default LikesCritics