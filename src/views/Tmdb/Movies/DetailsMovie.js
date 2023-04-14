import React, { useEffect } from 'react';
import {View, Text, ImageBackground, Image} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { movieDetails } from '../../../redux/actions/tmdb/movies/detailsMovie'
import { movieCrew } from '../../../redux/actions/tmdb/movies/movieCrew';
import { LinearGradient } from 'expo-linear-gradient';
import Runtime from '../../../utils/RunTime';
import Rate from '../../../utils/Rate';
import { truncateOverview } from '../../../utils/Truncate'

const DetailsMovie = ({route}) => {
    const dispatch = useDispatch();
    const movie = useSelector((state) => state.movieDetails.data)
    const crew = useSelector((state) => state.movieCrew.data.crew)
    const { id } = route.params;

    useEffect(() => {
        dispatch(movieDetails(id))
        dispatch(movieCrew(id))
      }, [dispatch])

  return (
    <View style={{display: 'flex'}}>
      {movie && (
        <View style={{display: 'flex', position: 'relative', width: '100%', height: '80%' }}>
          <LinearGradient
            colors={['rgba(0,0,0,0.8)', 'rgba(0,0,0,0.8)']}
            style={{ width: '100%', height: '100%', position: 'relative', display: 'flex' }}
          />
          <ImageBackground style={{ width: '100%', height: '100%', resizeMode: 'contain', opacity: 0.3, position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }} source={{ uri: `https://image.tmdb.org/t/p/original${movie.backdrop_path}` }} />

          <View style={{position: 'absolute', top: '5%', left: 0, right: 0, bottom: 0, flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-start', display: 'flex'}}>
            <View style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
              <Image style={{ width: 200, height: 200, resizeMode: 'contain' }} source={{ uri: `https://image.tmdb.org/t/p/original${movie.poster_path}` }} />
              <Text style={{color: 'white', justifyContent: 'flex-end'}}>Critique</Text>
            </View>
            <View style={{display: 'flex', flexDirection: 'column', width: '50%'}}>
              <Text style={{color: 'white'}}>{movie.original_title}</Text>
              <Runtime time={movie.runtime} />
              <View style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap'}}>
                {movie?.genres?.map((genre) => (
                  <Text key={genre.id} style={{fontSize: 12, borderRadius: 8, margin: 5, paddingHorizontal: 5, textAlign: 'center', color: '#495057', backgroundColor: '#dee2e6'}}>{genre.name}</Text>
                ))}
              </View>
              <Rate rate={movie.vote_average}/>
              <Text style={{color: 'white', marginTop: 15}}>Réalisation</Text>
              <View style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap'}}>
                {crew?.map((crew) => {
                  if (crew.job === 'Director') {
                    return (
                      <Text key={crew.id} style={{fontSize: 12, borderRadius: 8, margin: 5, paddingHorizontal: 5, textAlign: 'center', color: '#495057', backgroundColor: '#dee2e6'}}>{crew.name}</Text>
                    )
                  }})}
              </View>
            </View>
          </View>
          <View style={{flexDirection: 'column', display: 'flex', position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'flex-end', alignItems: 'flex-start', margin: 15 }}>
            <Text style={{color: 'white'}}>Synopsis</Text>
            <Text style={{color: 'white', textAlign: 'justify', marginTop: 5, lineHeight: 20}}>{truncateOverview(movie.overview, 400)}</Text>
          </View>
        </View>
      )}
    </View>
  );
};

export default DetailsMovie;
