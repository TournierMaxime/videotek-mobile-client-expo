import React, { Fragment } from 'react'
import { TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'

const Cast = ({ children, serie }) => {
  const navigation = useNavigation()
  return (
    <Fragment>
      <TouchableOpacity
        onPress={async () => {
            navigation.navigate('Cast', {
              title: serie.original_name,
              id: serie.id,
            })
        }}
      >
        {children}
      </TouchableOpacity>
    </Fragment>
  )
}

export default Cast
