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
import { movieDetails } from '../redux/actions/tmdb/movies/detailsMovie'
import { serieDetails } from '../redux/actions/tmdb/series/detailsSerie'
import { peopleDetails } from '../redux/actions/tmdb/people/detailsPeople'
import { useTranslation } from 'react-i18next'
import { moderateScale } from './Responsive'

const DotDetails = ({ route }) => {
  const { id, title } = route.params
  const dispatch = useDispatch()
  const serie = useSelector((state) => state.serieDetails.data)
  const movie = useSelector((state) => state.movieDetails.data)
  const people = useSelector((state) => state.peopleDetails.data)
  const numberOfCritics = useSelector((state) => state.searchCritic?.data)

  const { i18n, t } = useTranslation()
  const language = i18n.language

  useEffect(() => {
    dispatch(searchCritic(id))
    if (id === movie.id) {
      dispatch(movieDetails(id, language))
    }
    if (id === serie.id) {
      dispatch(serieDetails(id, language))
    }
    if (id === people.id) {
      dispatch(peopleDetails(id, language))
    }
  }, [dispatch, id])

  return (
    <View style={styles.container}>
      <View style={styles.profilViewContainer}>
        <Cast id={id} movie={movie} serie={serie} people={people} language={language}>
          <View style={styles.profileSectionContainer}>
            <View style={styles.textIconContainer}>
              <SimpleLineIcons
                style={styles.icon}
                name='people'
                size={moderateScale(25)}
                color='black'
              />
              <Text style={styles.textSize}>
                {(movie && movie.id === id) || (serie && serie.id === id)
                  ? t('cast')
                  : t('filmography')}
              </Text>
            </View>
            <Entypo name='chevron-small-right' size={moderateScale(25)} color='black' />
          </View>
        </Cast>
        {(movie && movie.id === id) || (serie && serie.id === id) ? (
          <Crew id={id} movie={movie} serie={serie}>
            <View style={styles.profileSectionContainer}>
              <View style={styles.textIconContainer}>
                <SimpleLineIcons
                  style={styles.icon}
                  name='people'
                  size={moderateScale(25)}
                  color='black'
                />
                <Text style={styles.textSize}>{t('crew')}</Text>
              </View>
              <Entypo name='chevron-small-right' size={moderateScale(25)} color='black' />
            </View>
          </Crew>
        ) : null}
        {serie.id === id ? (
          <Seasons serie={serie}>
            <View style={styles.profileSectionContainer}>
              <View style={styles.textIconContainer}>
                <FontAwesome
                  style={styles.icon}
                  name='tv'
                  size={moderateScale(25)}
                  color='black'
                />
                <Text style={styles.textSize}>{t('seasons')}</Text>
              </View>
              <Entypo name='chevron-small-right' size={moderateScale(25)} color='black' />
            </View>
          </Seasons>
        ) : null}
        {(movie && movie.id === id) || (serie && serie.id === id) ? (
          <Trailer movie={movie} serie={serie} id={id}>
            <View style={styles.profileSectionContainer}>
              <View style={styles.textIconContainer}>
                <Ionicons
                  style={styles.icon}
                  name='videocam-outline'
                  size={moderateScale(25)}
                  color='black'
                />
                <Text style={styles.textSize}>{t('trailer')}</Text>
              </View>
              <Entypo name='chevron-small-right' size={moderateScale(25)} color='black' />
            </View>
          </Trailer>
        ) : null}
        {(movie && movie.id === id) || (serie && serie.id === id) ? (
          <RedirectToCritic id={id} movie={movie} serie={serie}>
            <View style={styles.profileSectionContainer}>
              <View style={styles.textIconContainer}>
                <Entypo
                  style={styles.icon}
                  name='new-message'
                  size={moderateScale(25)}
                  color='black'
                />
                <Text style={styles.textSize}>{t('writeAReview')}</Text>
              </View>
              <Entypo name='chevron-small-right' size={moderateScale(25)} color='black' />
            </View>
          </RedirectToCritic>
        ) : null}
        {(movie && movie.id === id) || (serie && serie.id === id) ? (
          <Critics id={id} title={title}>
            <View style={styles.profileSectionContainer}>
              <View style={styles.textIconContainer}>
                <AntDesign
                  style={styles.icon}
                  name='message1'
                  size={moderateScale(25)}
                  color='black'
                />
                <Text style={styles.textSize}>
                  {t('critics')} {numberOfCritics?.results > 0 ? numberOfCritics?.results : 0}
                </Text>
              </View>
              <Entypo name='chevron-small-right' size={moderateScale(25)} color='black' />
            </View>
          </Critics>
        ) : null}
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
  textSize: profil.textSize
})

export default DotDetails
