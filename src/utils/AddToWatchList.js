import React, { Fragment, useEffect, useState } from 'react'
import { TouchableOpacity, StyleSheet, View } from 'react-native'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import {
  createWatchList,
  getOneWatchList,
  deleteWatchList,
  resetWatchLists,
} from '../redux/actions/watchlists'
import { moderateScale } from './Responsive'
import { Ionicons } from '@expo/vector-icons'
import { AlertMessage } from './AlertMessage'

const AddToWatchList = ({ id, title, image, type }) => {
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const data = useSelector((state) => state.getOneWatchList.data)
  //const dataExists = useSelector(state => Boolean(state.getOneWatchList?.data?.watchList));
  const userId = useSelector((state) => state.auth.data.user.userId)
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)
  const [isAdded, setIsAdded] = useState(false)

  const handleCreate = async () => {
    try {
      switch (type) {
        case 'movie':
          await dispatch(
            createWatchList({
              movieData: {
                tmdbId: id,
                title,
                imagePath: `https://image.tmdb.org/t/p/original${image}`,
              },
            })
          )
          break
        case 'serie':
          await dispatch(
            createWatchList({
              serieData: {
                tmdbId: id,
                name: title,
                imagePath: `https://image.tmdb.org/t/p/original${image}`,
              },
            })
          )
          break
      }
      setIsAdded(true)
      AlertMessage(t('addedToWatchList'))
    } catch (error) {
      console.log(error.response.data.errMsg)
      AlertMessage(error.response.data.errMsg)
    }
  }

  const handleDelete = async () => {
    try {
      await dispatch(
        deleteWatchList(data?.watchList?.watchListId)
      ).then(() => {
          setIsAdded(false)
        })
      AlertMessage(t('removedFromWatchList'))
    } catch (error) {
      console.log(error.response.data.errMsg)
      AlertMessage(error.response.data.errMsg)
    }
  }

  useEffect(() => {
    if (isAuthenticated === true) {
      dispatch(getOneWatchList(userId, id))
    }
  }, [dispatch, userId, id, isAdded])

  useEffect(() => {
    return () => {
      dispatch(resetWatchLists())
    }
  }, [])

  return (
    <Fragment>
      {isAuthenticated === true ? (
        <View style={{ marginTop: 15 }}>
          {!data.watchList && isAdded === false ? (
            <TouchableOpacity
              style={styles.createButtonContainer}
              onPress={() => handleCreate()}
            >
              <Ionicons
                style={styles.icon}
                name='bookmark-outline'
                size={moderateScale(25)}
                color='white'
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.createButtonContainer}
              onPress={() => handleDelete()}
            >
              <Ionicons
                style={styles.icon}
                name='bookmark'
                size={moderateScale(25)}
                color='green'
              />
            </TouchableOpacity>
          )}
        </View>
      ) : null}
    </Fragment>
  )
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

export default AddToWatchList
