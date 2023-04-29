import React, { Fragment } from 'react'
import { Text, TouchableOpacity, StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import button from '../styles/components/button'

const RedirectToCritic = ({ serie, movie }) => {
  const navigation = useNavigation()
  const isLogged = useSelector((state) => state.auth.isAuthenticated)

  return (
    <Fragment>
      {isLogged ? (
        <TouchableOpacity
          style={styles.criticButton}
          onPress={() =>
            navigation.navigate('NewCritic', {
              title: serie ? serie.original_name : movie.original_title,
              id: serie ? serie.id : movie.id,
            })
          }
        >
          <Text style={styles.buttonText}>Emettre une critique</Text>
        </TouchableOpacity>
      ) : null}
    </Fragment>
  )
}

const styles = StyleSheet.create({
  criticButton: button.criticButton,
  buttonText: button.buttonText,
})

export default RedirectToCritic
