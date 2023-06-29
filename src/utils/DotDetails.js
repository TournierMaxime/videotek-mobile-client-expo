import React, { useEffect } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import {
  Entypo,
  Ionicons,
  FontAwesome,
  SimpleLineIcons,
  AntDesign,
} from 'react-native-vector-icons'
import profil from '../styles/components/profil'
import button from '../styles/components/button'
import Trailer from './Trailer'
import RedirectToCritic from './RedirectToCritic'
import Seasons from './Seasons'
import Cast from './Cast'
import Crew from './Crew'
import Critics from './Critics'
import { useDispatch, useSelector } from 'react-redux'
import { searchCritic } from '../redux/actions/critics/searchCritic'

const DotDetails = ({ id, title }) => {
  const dispatch = useDispatch()
  const serie = useSelector((state) => state.serieDetails.data)
  const movie = useSelector((state) => state.movieDetails.data)
  const critics = useSelector((state) => state.searchCritic.data.critics)

  useEffect(() => {
    dispatch(searchCritic(id))
  }, [dispatch, id])

  return (
    <View style={styles.container}>
      <View style={styles.profilViewContainer}>
        <Cast serie={serie}>
          <View style={styles.profileSectionContainer}>
            <View style={styles.textIconContainer}>
              <SimpleLineIcons
                style={styles.icon}
                name='people'
                size={25}
                color='black'
              />
              <Text>Distribution</Text>
            </View>
            <Entypo name='chevron-small-right' size={25} color='black' />
          </View>
        </Cast>
        <Crew serie={serie}>
          <View style={styles.profileSectionContainer}>
            <View style={styles.textIconContainer}>
              <SimpleLineIcons
                style={styles.icon}
                name='people'
                size={25}
                color='black'
              />
              <Text>Equipe Technique</Text>
            </View>
            <Entypo name='chevron-small-right' size={25} color='black' />
          </View>
        </Crew>
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
        <Critics id={id} title={title}>
          <View style={styles.profileSectionContainer}>
            <View style={styles.textIconContainer}>
              <AntDesign
                style={styles.icon}
                name='message1'
                size={25}
                color='black'
              />
              <Text>Critiques {critics?.length > 0 ? critics?.length : 0}</Text>
            </View>
            <Entypo name='chevron-small-right' size={25} color='black' />
          </View>
        </Critics>
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
