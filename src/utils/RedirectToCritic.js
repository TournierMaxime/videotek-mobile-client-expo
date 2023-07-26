import React, { Fragment } from 'react'
import { TouchableOpacity, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import { SimpleLineIcons } from 'react-native-vector-icons'
import { moderateScale } from './Responsive'

const RedirectToCritic = ({ serie, movie, id }) => {
  const navigation = useNavigation()
  const isLogged = useSelector((state) => state.auth.isAuthenticated)

  return (
    <Fragment>
      {isLogged && serie && serie.id === id && (
        <View style={{ marginTop: 15 }}>
          <TouchableOpacity
            style={{
              width: moderateScale(40),
              height: moderateScale(40),
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={() => {
              navigation.navigate('NewCritic', {
                title: serie.original_name,
                id: serie.id,
              })
            }}
          >
            <SimpleLineIcons
              style={{
                alignItems: 'center',
                justifyContent: 'center',
              }}
              name='note'
              size={moderateScale(20)}
              color='white'
            />
          </TouchableOpacity>
        </View>
      )}

      {isLogged && movie && movie.id === id && (
        <View style={{ marginTop: 15 }}>
          <TouchableOpacity
            style={{
              width: moderateScale(40),
              height: moderateScale(40),
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={() => {
              navigation.navigate('NewCritic', {
                title: movie.original_title,
                id: movie.id,
              })
            }}
          >
            <SimpleLineIcons
              style={{
                alignItems: 'center',
                justifyContent: 'center',
              }}
              name='note'
              size={moderateScale(20)}
              color='white'
            />
          </TouchableOpacity>
        </View>
      )}
    </Fragment>
  )
}

export default RedirectToCritic
