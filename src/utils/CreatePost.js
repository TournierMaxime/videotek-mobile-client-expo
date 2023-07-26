import React, { Fragment, useState } from 'react'
import { View, TouchableOpacity, StyleSheet } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { moderateScale } from './Responsive'
import ModalComponent from './ModalComponent'
import NewPost from '../views/Posts/NewPost'
import { useSelector } from 'react-redux'
import moment from 'moment'
import { useTranslation } from 'react-i18next'

const CreatePost = ({ tmdbId, movie, serie }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)
  const [modalVisible, setModalVisible] = useState(false)
  const handleModal = () => {
    setModalVisible(!modalVisible)
  }

  const { i18n, t } = useTranslation()
  const language = i18n.language
  moment.locale(language)

  return (
    <Fragment>
      {isAuthenticated === true ? (
        <Fragment>
          <TouchableOpacity
            style={styles.createButtonContainer}
            onPress={() => handleModal()}
          >
            <View style={styles.createButton}>
              <MaterialCommunityIcons
                name='feather'
                size={moderateScale(25)}
                color='white'
              />
            </View>
          </TouchableOpacity>
          <ModalComponent
            visible={modalVisible}
            setVisible={setModalVisible}
            title={t('expressYourself')}
            content={
              <NewPost
                tmdbId={tmdbId}
                tmdbTitle={movie ? movie?.title : serie?.name}
                handleModal={handleModal}
                movie={movie}
                serie={serie}
              />
            }
          />
        </Fragment>
      ) : null}
    </Fragment>
  )
}

const styles = StyleSheet.create({
  createButtonContainer: {
    position: 'absolute',
    bottom: moderateScale(10),
    right: moderateScale(15),
    zIndex: 1000,
  },
  createButton: {
    backgroundColor: 'rgb(33, 150, 243)',
    height: moderateScale(60),
    width: moderateScale(60),
    borderRadius: moderateScale(30),
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export default CreatePost
