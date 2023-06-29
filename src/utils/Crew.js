import React, { Fragment } from 'react'
import { TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'

const Crew = ({ children, serie }) => {
  const navigation = useNavigation()
  return (
    <Fragment>
      <TouchableOpacity
        onPress={() => {
            navigation.navigate('Crew', {
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

export default Crew
