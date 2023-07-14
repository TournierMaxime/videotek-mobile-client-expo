import React, { useEffect, useState } from 'react'
import { TouchableOpacity, StyleSheet, View } from 'react-native'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { createFavorite } from '../redux/actions/favorites/createFavorite'
import { deleteFavorite } from '../redux/actions/favorites/deleteFavorite'
import {
  getOneFavorite,
  resetFavorites,
} from '../redux/actions/favorites/getOneFavorite'
import { moderateScale } from './Responsive'
import { AntDesign } from '@expo/vector-icons'
import { ToastSuccess, ToastError } from './Toast'
import ToastConfig from './ToastConfig'

const AddToFavorite = ({ id, title, image, type }) => {
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const data = useSelector((state) => state.getOneFavorite.data)
  const userId = useSelector((state) => state.auth.data.user.userId)
  const [isFavorite, setIsFavorite] = useState(false)

  const handleCreate = async () => {
    try {
      await dispatch(
        createFavorite({
          tmdbId: id,
          title,
          image: `https://image.tmdb.org/t/p/original${image}`,
          type,
        })
      )
      setIsFavorite(true)
      ToastSuccess('success', t('addedToFavorite'), true)
    } catch (error) {
      console.log(error.response.data.errMsg)
      ToastError('error', error.response.data.errMsg, false)
    }
  }

  const handleDelete = async () => {
    try {
      await dispatch(deleteFavorite(data.favorite.favoriteId))
      setIsFavorite(false)
      ToastSuccess('success', t('removedFromFavorite'), true)
    } catch (error) {
      console.log(error.response.data.errMsg)
      ToastError('error', error.response.data.errMsg, false)
    }
  }

  useEffect(() => {
    dispatch(getOneFavorite(userId, id))
  }, [dispatch, userId, id, isFavorite])

  useEffect(() => {
    return () => {
      dispatch(resetFavorites())
    }
  }, [])

  return (
    <View style={{ marginTop: 15 }}>
      {!data?.favorite && isFavorite === false ? (
        <TouchableOpacity
          style={styles.createButtonContainer}
          onPress={() => handleCreate()}
        >
          <AntDesign
            style={styles.icon}
            name='heart'
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
      <ToastConfig />
    </View>
  )
}

const styles = StyleSheet.create({
  createButtonContainer: {
    width: moderateScale(40),
    height: moderateScale(40),
    borderRadius: moderateScale(20),
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export default AddToFavorite
