import React, { Fragment, useState } from 'react'
import { View, TouchableOpacity, StyleSheet } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { moderateScale } from './Responsive'
import ModalComponent from './ModalComponent'
import NewPost from '../views/Posts/NewPost'
import { useSelector } from 'react-redux'

const CreateButton = ({ tmdbId, tmdbTitle }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)
  const [modalVisible, setModalVisible] = useState(false)
  const handleModal = () => {
    setModalVisible(!modalVisible)
  }

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
            title={"Ajout d'un post"}
            content={
              <NewPost
                tmdbId={tmdbId}
                tmdbTitle={tmdbTitle}
                handleModal={handleModal}
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

export default CreateButton
