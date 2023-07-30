import React, { useEffect, useCallback, useState, Fragment } from 'react'
import {
  View,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Pressable,
} from 'react-native'
import { moderateScale } from '../../utils/Responsive'
import { useDispatch, useSelector } from 'react-redux'
import { serieDetails } from '../../redux/actions/tmdb/series'
import { useTranslation } from 'react-i18next'
import moment from 'moment'
import Rate from '../../utils/Rate'
import { getOneWatchList } from '../../redux/actions/watchlists'
import { seasonDetails } from '../../redux/actions/tmdb/series'
import { Entypo, AntDesign } from 'react-native-vector-icons'
import { createSeason, deleteSeason, getOneSeason } from '../../redux/actions/seasons'
import { createEpisode, deleteEpisode } from '../../redux/actions/episodes'
import { markEpisodeWatched, markSeasonWatched, unmarkEpisodeWatched, unmarkSeasonWatched } from '../../redux/actions/watched'

const Accordion = ({ children }) => {
  return <View style={{ backgroundColor: 'white' }}>{children}</View>
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

const Episodes = (props) => {
  const { episode, seasonId, serieId, dispatch, userId } = props;
  const watchedEpisodes = useSelector((state) => state.watched.watchedEpisodes);
  const episodeIds = useSelector((state) => state.watched.episodeIds);
  const episodeId = serieId && episodeIds ? episodeIds[serieId]?.[seasonId]?.[episode.episode_number] : undefined;

  const toggleWatchedEpisode = async () => {

    if (watchedEpisodes[serieId]?.[episode.episode_number]) {
      const response = await dispatch(deleteEpisode(episodeId));
      if (response.success) {
        dispatch(unmarkEpisodeWatched(serieId, seasonId, episode.episode_number));
      } else {
        // handle error
      }
    } else {
      const response = await dispatch(createEpisode({ serieId, seasonId, userId, episodeNumber: episode.episode_number, state: 'seen' }));
      if (response.success) {
        dispatch(markEpisodeWatched(serieId, seasonId, episode.episode_number));
      } else {
        // handle error
      }
    }
  };


  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: moderateScale(10),
        backgroundColor: 'white',
        padding: moderateScale(10),
      }}
      key={episode.id}
    >
      <Text style={{ fontSize: moderateScale(20) }}>{episode.name}</Text>
      <Pressable
        onPress={toggleWatchedEpisode}
      >
        {watchedEpisodes[serieId]?.[episode.episode_number] ? (
          <AntDesign
            name='checkcircle'
            size={moderateScale(25)}
            color='green'
          />
        ) : (
          <AntDesign
            name='checkcircleo'
            size={moderateScale(25)}
            color='black'
          />
        )}
      </Pressable>
    </View>
  );
}

const Seasons = (props) => {
  const { serie, seasons, dispatch, userId, watchList } = props
  const [expanded, setExpanded] = useState({})
  const watchedSeasons = useSelector((state) => state.watched.watchedSeasons)
  const seasonIds = useSelector((state) => state.watched.seasonIds)
  const serieId = watchList?.watchList?.serieId

  const toggleWatchedSeason = async (seasonNumber) => {
    const seasonId = serieId && seasonIds ? seasonIds[serieId]?.[seasonNumber] : undefined
    const seasonData = seasons[seasonNumber];
    const totalWatchedEpisodes = seasonData?.episodes?.length;

    if (watchedSeasons[watchList?.watchList?.serieId]?.[seasonNumber]?.watched === true) {
      const response = await dispatch(deleteSeason(seasonId, serieId, seasonNumber));
      if (response.success) {
        await dispatch(unmarkSeasonWatched(watchList.watchList.serieId, seasonNumber));
      } else {
        // handle error
      }
    } else {
      const response = await dispatch(createSeason({ serieId: watchList.watchList.serieId, userId, seasonNumber, state: 'seen', totalWatchedEpisodes, watched: true }));
      if (response.success) {
        dispatch(markSeasonWatched(watchList.watchList.serieId, seasonNumber));
      } else {
        // handle error
      }
    }
  };

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
          style={{
            flexDirection: 'column',
            alignItems: 'stretch',
            marginVertical: moderateScale(10),
          }}
          key={index}
        >
          <View
            style={{
              backgroundColor: 'white',
              flexDirection: 'row',
              padding: moderateScale(10),
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
                {watchedSeasons[watchList?.watchList?.serieId]?.[item.season_number]?.totalWatchedEpisodes || 0}
                  /{seasonData?.episodes?.length}
                </Text>
                <Pressable
                style={{ marginLeft: moderateScale(15) }}
                onPress={() => toggleWatchedSeason(item.season_number)}
              >
                {watchedSeasons[watchList?.watchList?.serieId]?.[item.season_number]?.watched ? (
                  <AntDesign
                    name='checkcircle'
                    size={moderateScale(25)}
                    color='green'
                  />
                ) : (
                  <AntDesign
                    name='checkcircleo'
                    size={moderateScale(25)}
                    color='black'
                  />
                )}
              </Pressable>
              </View>
            </TouchableOpacity>
          </View>
          <View style={{ backgroundColor: 'white' }}>
            {expanded[index] ? (
              <Accordion>
                {seasonData?.episodes?.map((episode) => {
                  return (
                    <Episodes
                      episode={episode}
                      key={episode.id}
                      serieId={serieId}
                      dispatch={dispatch}
                      userId={userId}
                    />
                  )
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
        <Seasons
          serie={serie}
          seasons={seasons}
          dispatch={dispatch}
          userId={userId}
          watchList={watchlist}
        />
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
