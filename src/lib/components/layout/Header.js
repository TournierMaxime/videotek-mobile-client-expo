import React, { Fragment, useState } from 'react'
import { View, Image, TouchableOpacity, Platform } from 'react-native'
import { FontAwesome5, FontAwesome, Ionicons } from 'react-native-vector-icons'
import SearchModal from '../../components/utils/SearchModal'
import { useNavigation } from '@react-navigation/native'
import Utils from '../../class/Utils'
import tw from 'twrnc'

const Header = ({ backButton, isAuthenticated }) => {
  const [modalVisible, setModalVisible] = useState(false)
  const navigation = useNavigation()

  const handleModal = () => {
    setModalVisible(!modalVisible)
  }

  return (
    <Fragment>
      <View style={tw`flex flex-row items-center justify-between p-2 bg-white h-20`}>
        {backButton ? (
          <View style={Platform.OS === 'ios' ? tw`mt-4` : null}>
            <TouchableOpacity
              style={tw`p-2`}
              onPress={() => navigation.goBack()}
            >
              <Ionicons
                name='arrow-back-outline'
                size={Utils.moderateScale(25)}
                color='black'
              />
            </TouchableOpacity>
          </View>
        ) : isAuthenticated === true ? (
          <View style={Platform.OS === 'ios' ? tw`mt-4` : null}>
            <TouchableOpacity
              style={tw`p-2`}
              onPress={() => navigation.navigate('UserProfile')}
            >
              <FontAwesome5
                style={tw`text-black`}
                name='user'
                size={Utils.moderateScale(25)}
              />
            </TouchableOpacity>
          </View>
        ) : (
          <View style={Platform.OS === 'ios' ? tw`mt-4` : null}>
            <TouchableOpacity
              style={tw`p-2`}
              onPress={() =>
                navigation.navigate('AuthStackNavigator', { screen: 'Login' })
              }
            >
              <FontAwesome5
                style={tw`text-black`}
                name='user'
                size={Utils.moderateScale(25)}
              />
            </TouchableOpacity>
          </View>
        )}
        <View style={Platform.OS === 'ios' ? tw`mt-4` : null}>
          <Image
            style={[tw`w-30 h-15`, { resizeMode: 'contain' }]}
            source={require('../../../assets/images/videotek_logo.webp')}
          />
        </View>
        <View style={Platform.OS === 'ios' ? tw`mt-4` : null}>
          <TouchableOpacity
            style={tw`p-2`}
            onPress={handleModal}
          >
            <FontAwesome
              style={tw`text-black`}
              name='search'
              size={Utils.moderateScale(25)}
            />
          </TouchableOpacity>
        </View>
      </View>
      <SearchModal visible={modalVisible} setVisible={setModalVisible} />
    </Fragment>
  )
}

export default Header
