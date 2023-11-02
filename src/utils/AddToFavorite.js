import React, { Fragment, useEffect, useState } from 'react'
import { TouchableOpacity, StyleSheet, View } from 'react-native'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import {
  createFavorite,
  getOneFavorite,
  deleteFavorite,
} from '../redux/actions/favorites'
import { moderateScale } from './Responsive'
import { AntDesign, MaterialIcons } from '@expo/vector-icons'
import { AlertMessage } from './AlertMessage'

const AddToFavorite = ({ id, title, image, type, genre }) => {
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const data = useSelector((state) => state.getOneFavorite.data)
  const dataExists = useSelector((state) =>
    Boolean(state.getOneFavorite.data?.favorite)
  )
  const userId = useSelector((state) => state.auth.data.user.userId)
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)
  const [isFavorite, setIsFavorite] = useState(
    data.favorite !== null ? dataExists : false
  )

  const handleCreate = () => {
    try {
      switch (type) {
        case 'movie':
          dispatch(
            createFavorite({
              movieData: {
                tmdbId: id,
                title,
                imagePath: `https://image.tmdb.org/t/p/original${image}`,
                genre: genre.name
              },
            })
          )
          break
        case 'serie':
          dispatch(
            createFavorite({
              serieData: {
                tmdbId: id,
                name: title,
                imagePath: `https://image.tmdb.org/t/p/original${image}`,
                genre: genre.name
              },
            })
          )
          break
        case 'person':
          dispatch(
            createFavorite({
              peopleData: {
                tmdbId: id,
                name: title,
                imagePath: `https://image.tmdb.org/t/p/original${image}`,
              },
            })
          )
          break
      }
      setIsFavorite(true)
      AlertMessage(t('addedToFavorite'))
    } catch (error) {
      console.log(error.response.data.errMsg)
      AlertMessage(error.response.data.errMsg)
    }
  }

  const handleDelete = () => {
    try {
      setIsFavorite(false)
      dispatch(deleteFavorite(data?.favorite?.favoriteId))
      AlertMessage(t('removedFromFavorite'))
    } catch (error) {
      console.log(error.response.data.errMsg)
      AlertMessage(error.response.data.errMsg)
    }
  }

  useEffect(() => {
      setIsFavorite(data.favorite !== null)
  }, [data.favorite])

  useEffect(() => {
    if (isAuthenticated === true) {
      dispatch(getOneFavorite(userId, id))
    }
  }, [dispatch, userId, id, isFavorite])

  return (
    <Fragment>
      {isAuthenticated === true ? (
        <View style={{ marginTop: 15 }}>
          {!data.favorite && isFavorite === false ? (
            <TouchableOpacity
              style={styles.createButtonContainer}
              onPress={() => handleCreate()}
            >
              <MaterialIcons
                style={styles.icon}
                name='favorite-outline'
                size={moderateScale(25)}
                color='white'
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

export default AddToFavorite
