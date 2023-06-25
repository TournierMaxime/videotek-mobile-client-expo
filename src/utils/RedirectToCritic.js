import React, { Fragment } from 'react'
import { TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'

const RedirectToCritic = ({ serie, movie, children, onPress }) => {
  const navigation = useNavigation()
  const isLogged = useSelector((state) => state.auth.isAuthenticated)

  return (
    <Fragment>
      {isLogged ? (
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('NewCritic', {
              title: serie ? serie.original_name : movie.original_title,
              id: serie ? serie.id : movie.id,
            })
          }
        >
          {children}
        </TouchableOpacity>
      ) : null}
    </Fragment>
  )
}

export default RedirectToCritic
