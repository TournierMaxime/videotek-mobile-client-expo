import React, { Fragment } from 'react'
import { TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'

const Critics = ({ children, id, title }) => {
  const navigation = useNavigation()
  return (
    <Fragment>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('AllCritics', {
            id,
            title
          })
        }}
      >
        {children}
      </TouchableOpacity>
    </Fragment>
  )
}

export default Critics
