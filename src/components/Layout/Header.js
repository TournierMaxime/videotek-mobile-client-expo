import React, { Fragment, useState } from 'react'
import { View, Image, StyleSheet, TouchableOpacity, Platform } from 'react-native'
import header from '../../styles/components/header'
import { FontAwesome5, FontAwesome, Ionicons } from 'react-native-vector-icons'
import SearchModal from '../../utils/SearchModal'
import { useNavigation } from '@react-navigation/native'
import { moderateScale } from '../../utils/Responsive'

const Header = ({ backButton, isAuthenticated }) => {
  const [modalVisible, setModalVisible] = useState(false)
  const navigation = useNavigation()

  const handleModal = () => {
    setModalVisible(!modalVisible)
  }

  return (
    <Fragment>
      <View style={styles.headerContainer}>
        {backButton ? (
          <View style={Platform.OS === 'ios' ? {marginTop: moderateScale(20)} : null}>
            <TouchableOpacity
              style={{ padding: moderateScale(10) }}
              onPress={() => navigation.goBack()}
            >
              <Ionicons
                name='arrow-back-outline'
                size={moderateScale(25)}
                color='black'
              />
            </TouchableOpacity>
          </View>
        ) : isAuthenticated === true ? (
          <View style={Platform.OS === 'ios' ? {marginTop: moderateScale(20)} : null}>
            <TouchableOpacity
              style={{ padding: moderateScale(10) }}
              onPress={() => navigation.navigate('UserProfile')}
            >
              <FontAwesome5
                style={styles.icon}
                name='user'
                size={moderateScale(25)}
              />
            </TouchableOpacity>
          </View>
        ) : (
          <View style={Platform.OS === 'ios' ? {marginTop: moderateScale(20)} : null}>
            <TouchableOpacity
              style={{ padding: moderateScale(10) }}
              onPress={() =>
                navigation.navigate('AuthStackNavigator', { screen: 'Login' })
              }
            >
              <FontAwesome5
                style={styles.icon}
                name='user'
                size={moderateScale(25)}
              />
            </TouchableOpacity>
          </View>
        )}
        <View style={Platform.OS === 'ios' ? {marginTop: moderateScale(20)} : null}>
          <Image
            style={styles.logo}
            source={require('../../assets/image/videotek_logo.webp')}
          />
        </View>
        <View style={Platform.OS === 'ios' ? {marginTop: moderateScale(20)} : null}>
          <TouchableOpacity
            style={{ padding: moderateScale(10) }}
            onPress={handleModal}
          >
            <FontAwesome
              style={styles.icon}
              name='search'
              size={moderateScale(25)}
            />
          </TouchableOpacity>
        </View>
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
