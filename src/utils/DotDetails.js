import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { Entypo, Ionicons, FontAwesome } from 'react-native-vector-icons'
import profil from '../styles/components/profil'
import button from '../styles/components/button'
import Trailer from '../views/Tmdb/Movies/Trailer'
import RedirectToCritic from './RedirectToCritic'
import Seasons from './Seasons'

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
              <Text>Ecrire une critique</Text>
            </View>
            <Entypo name='chevron-small-right' size={25} color='black' />
          </View>
        </RedirectToCritic>
        <Seasons serie={serie}>
          <View style={styles.profileSectionContainer}>
            <View style={styles.textIconContainer}>
              <FontAwesome
                style={styles.icon}
                name='tv'
                size={25}
                color='black'
              />
              <Text>Saisons</Text>
            </View>
            <Entypo name='chevron-small-right' size={25} color='black' />
          </View>
        </Seasons>
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
