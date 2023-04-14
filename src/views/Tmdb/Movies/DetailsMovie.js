import React, { useEffect } from 'react';
import {View, Text, ImageBackground, Image} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { movieDetails } from '../../../redux/actions/tmdb/movies/detailsMovie'
import { LinearGradient } from 'expo-linear-gradient';
import Runtime from '../../../utils/RunTime';
import Rate from '../../../utils/Rate';

const DetailsMovie = ({route}) => {
    const dispatch = useDispatch();
    const movideDetails = useSelector((state) => state.movideDetails.data)
    const { id } = route.params;

    useEffect(() => {
        dispatch(movieDetails(id))
      }, [dispatch])

  return (
    <View style={{display: 'flex'}}>
      {movideDetails && (
        <View style={{display: 'flex', position: 'relative', width: '100%', height: '80%' }}>
          <LinearGradient
            colors={['rgba(0,0,0,0.8)', 'rgba(0,0,0,0.8)']}
            style={{ width: '100%', height: '100%', position: 'relative', display: 'flex' }}
          />
          <ImageBackground style={{ width: '100%', height: '100%', resizeMode: 'contain', opacity: 0.3, position: 'absolute' }} source={{ uri: `https://image.tmdb.org/t/p/original${movideDetails.backdrop_path}` }} />

          <View style={{position: 'absolute', flexDirection: 'row', justifyContent: 'center', top: '5%', display: 'flex'}}>
            <View style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
              <Image style={{ width: 160, height: 160, resizeMode: 'contain' }} source={{ uri: `https://image.tmdb.org/t/p/original${movideDetails.poster_path}` }} />
              <Text style={{color: 'white', justifyContent: 'flex-end'}}>Critique</Text>
            </View>
            <View style={{display: 'flex', flexDirection: 'column', width: '50%'}}>
              <Text style={{color: 'white'}}>{movideDetails.original_title}</Text>
              <Runtime time={movideDetails.runtime} />
              <View style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap'}}>
                {movideDetails?.genres?.map((genre) => (
                  <Text key={genre.id} style={{fontSize: 12, borderRadius: 8, margin: 5, paddingHorizontal: 5, textAlign: 'center', color: '#495057', backgroundColor: '#dee2e6'}}>{genre.name}</Text>
                ))}
              </View>
              <Rate rate={movideDetails.vote_average}/>
            </View>
          </View>
          <View style={{flexDirection: 'column', display: 'flex', bottom: '58%', margin: 15 }}>
            <Text style={{color: 'white'}}>Synopsis</Text>
            <Text style={{color: 'white', textAlign: 'justify', marginTop: 5, lineHeight: 20}}>{movideDetails.overview}</Text>
          </View>
        </View>
      )}
    </View>
  );
};

export default DetailsMovie;
