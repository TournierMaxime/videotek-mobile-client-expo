import React, { Fragment, useState } from 'react'
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native'
import header from '../../styles/components/header'
import { FontAwesome, Entypo, Ionicons } from 'react-native-vector-icons'
import SearchModal from '../../utils/SearchModal'
import { useNavigation } from '@react-navigation/native'

const Header = ({ backButton }) => {
  const [modalVisible, setModalVisible] = useState(false)
  const navigation = useNavigation()

  const handleModal = () => {
    setModalVisible(!modalVisible)
  }

  return (
    <Fragment>
      <View style={styles.headerContainer}>
        {backButton ? (
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name='arrow-back-outline' size={25} color='black' />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity>
            <Entypo style={styles.icon} name='menu' size={25} />
          </TouchableOpacity>
        )}
        <Image
          style={styles.logo}
          source={require('../../assets/image/videotek_logo.webp')}
        />
        <TouchableOpacity onPress={handleModal}>
          <FontAwesome style={styles.icon} name='search' size={25} />
        </TouchableOpacity>
      </View>
      <SearchModal visible={modalVisible} setVisible={setModalVisible} />
    </Fragment>
  )
}

const styles = StyleSheet.create({
  headerContainer: header.headerContainer,
  logo: header.logo,
  icon: header.icon,
})

export default Header
