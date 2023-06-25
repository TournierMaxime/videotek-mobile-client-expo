import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { Entypo, Ionicons } from 'react-native-vector-icons'
import profil from '../styles/components/profil'
import button from '../styles/components/button'
import Trailer from '../views/Tmdb/Movies/Trailer'
import RedirectToCritic from './RedirectToCritic'

const DotDetails = ({ id, movie, serie }) => {
  return (
    <View style={styles.container}>
      <View style={styles.profilViewContainer}>
        <Trailer movie={movie} serie={serie} id={id}>
          <View style={styles.profileSectionContainer}>
            <View style={styles.textIconContainer}>
              <Ionicons
                style={styles.icon}
                name='videocam-outline'
                size={25}
                color='black'
              />
              <Text>Trailer</Text>
            </View>
            <Entypo name='chevron-small-right' size={25} color='black' />
          </View>
        </Trailer>
        <RedirectToCritic movie={movie} serie={serie}>
          <View style={styles.profileSectionContainer}>
            <View style={styles.textIconContainer}>
              <Entypo
                style={styles.icon}
                name='new-message'
                size={25}
                color='black'
              />
              <Text>Emettre une critique</Text>
            </View>
            <Entypo name='chevron-small-right' size={25} color='black' />
          </View>
        </RedirectToCritic>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#efefef',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logoutButton: button.logoutButton,
  profileSectionContainer: profil.profileSectionContainer,
  icon: profil.icon,
  textIconContainer: profil.textIconContainer,
  profilViewContainer: profil.profilViewContainer,
})

export default DotDetails
