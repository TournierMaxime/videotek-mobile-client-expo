import React, { useEffect, useCallback, useState, Fragment } from 'react'
import {
  View,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native'
import { moderateScale } from '../../utils/Responsive'
import { useDispatch, useSelector } from 'react-redux'
import { serieDetails } from '../../redux/actions/tmdb/series'
import { useTranslation } from 'react-i18next'
import moment from 'moment'
import Rate from '../../utils/Rate'
import { getOneWatchList } from '../../redux/actions/watchlists'
import { seasonDetails } from '../../redux/actions/tmdb/series'
import { Entypo } from 'react-native-vector-icons'

const Accordion = ({ children }) => {
  return <View style={{backgroundColor: 'white'}}>{children}</View>
}

const Header = ({ serie, title, t }) => {
  const statusSerie = (data) => {
    switch (data) {
      case 'Returning Series':
        return <Text style={styles.tags}>{t('returningSeries')}</Text>
      case 'Ended':
        return <Text style={styles.tags}>{t('ended')}</Text>
    }
  }

  return (
    <View style={{ alignItems: 'flex-start', position: 'relative' }}>
      {serie.backdrop_path ? (
        <Image
          style={styles.image}
          source={{
            uri: `https://image.tmdb.org/t/p/original/${serie.backdrop_path}`,
          }}
        />
      ) : (
        <Image
          style={styles.image}
          source={require('../../assets/image/No_Image_Available.jpg')}
        />
      )}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'flex-start',
          position: 'absolute',
          bottom: moderateScale(15),
          left: moderateScale(15),
        }}
      >
        <Text style={{ color: 'white', fontSize: moderateScale(20) }}>
          {title} | {statusSerie(serie.status)}
        </Text>
      </View>
      <Rate rate={serie.vote_average} />
    </View>
  )
}

const InProgress = ({ t, watchlist }) => {
  if (watchlist?.watchList?.Watched?.state !== 'in-progress') return
  return (
    <View
      style={{
        backgroundColor: 'white',
        marginVertical: moderateScale(10),
        padding: moderateScale(10),
        width: '100%',
      }}
    >
      <Text style={{ fontSize: moderateScale(20) }}>{t('inProgress')}</Text>
    </View>
  )
}

const Seasons = ({ serie, seasons }) => {
  const [expanded, setExpanded] = useState({})

  const toggleItem = (index) => {
    setExpanded((prevExpanded) => ({
      ...prevExpanded,
      [index]: !prevExpanded[index],
    }))
  }

  const allSeasons = (data) => {
    return data?.map((item, index) => {
      const seasonData = seasons[item.season_number]
      return (
        <View
          style={{ flexDirection: 'column', alignItems: 'stretch', marginVertical: moderateScale(10), }}
          key={index}
        >
          <View
            style={{
              backgroundColor: 'white',
              flexDirection: 'row',
              padding: moderateScale(10)
            }}
          >
            <TouchableOpacity
              onPress={() => toggleItem(index)}
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                flex: 1,
              }}
            >
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                }}
              >
                <Text style={{ fontSize: moderateScale(20) }}>
                  {item.name}{' '}
                  <Entypo
                    name={
                      expanded[index]
                        ? 'chevron-small-up'
                        : 'chevron-small-down'
                    }
                    size={moderateScale(25)}
                    color='black'
                  />
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'flex-end',
                }}
              >
                <Text style={{ fontSize: moderateScale(20) }}>
                  {seasonData?.episodes?.length}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={{backgroundColor: 'white'}}>
            {expanded[index] ? (
              <Accordion>
                {seasonData?.episodes?.map((item, index) => {
                  return <Text style={{fontSize: moderateScale(18), margin: moderateScale(5)}} key={index}>{item.name}</Text>
                })}
              </Accordion>
            ) : null}
          </View>
        </View>
      )
    })
  }

  return <Fragment>{allSeasons(serie.seasons)}</Fragment>
}

const WatchedSerie = ({ route }) => {
  const { id, title } = route.params
  const dispatch = useDispatch()
  const serie = useSelector((state) => state.serieDetails.data)
  const seasons = useSelector((state) => state.seasonDetails.data)
  const watchlist = useSelector((state) => state.getOneWatchList.data)
  const userId = useSelector((state) => state.auth.data.user.userId)

  const { t, i18n } = useTranslation()
  const language = i18n.language
  moment.locale(language)

  const fetchDetails = useCallback(async () => {
    const serieDetail = await dispatch(serieDetails(id, language))
    serieDetail.seasons.forEach((season) => {
      dispatch(seasonDetails(id, season.season_number, language))
    })
  }, [dispatch, id, language])

  useEffect(() => {
    fetchDetails()
    dispatch(serieDetails(id, language))
    dispatch(getOneWatchList(userId, id))
  }, [dispatch, fetchDetails])

  return (
    <View style={{ flex: 1, backgroundColor: '#efefef' }}>
      <ScrollView>
        <Header serie={serie} title={title} t={t} />
        <InProgress serie={serie} t={t} userId={userId} watchlist={watchlist} />
        <Seasons serie={serie} seasons={seasons} />
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: moderateScale(200),
    resizeMode: 'cover',
    backgroundColor: 'black',
    opacity: 0.7,
  },
})

export default WatchedSerie
