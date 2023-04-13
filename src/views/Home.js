import React, { useEffect } from 'react';
import {StyleSheet, View, Text, FlatList, Image, ScrollView} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { nowPlaying } from '../redux/actions/tmdb/nowPlaying'
import { upcoming } from '../redux/actions/tmdb/upcoming'
import { onTheAir } from '../redux/actions/tmdb/onTheAir'
import { popular } from '../redux/actions/tmdb/popular'

const HomeScreen = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.nowPlaying.data)
  const nowPlayingResults = useSelector((state) => state.nowPlaying.data.results)
  const upcomingResults = useSelector((state) => state.upcoming.data.results)
  const onTheAirResults = useSelector((state) => state.onTheAir.data.results)
  const popularResults = useSelector((state) => state.popular.data.results)

  useEffect(() => {
    dispatch(nowPlaying(data.page))
    dispatch(upcoming(data.page))
    dispatch(onTheAir(data.page))
    dispatch(popular(data.page))
  }, [dispatch])


  return (
    <ScrollView>
      <Text style={{fontSize: 24, marginLeft: 15, marginTop: 15, fontWeight: 'bold'}}>En ce moment</Text>
      <View style={styles.container}>
        <FlatList 
          data={nowPlayingResults?.slice(0,8)}
          keyExtractor={item => item.id}
          horizontal={true}
          renderItem={({item}) => {
            return (
              <View style={{flexDirection: 'column', justifyContent: 'space-between'}}>
                <Image style={{width: 160, height: 260, resizeMode: 'contain', borderRadius: 15, margin: 15}} source={{uri: `https://image.tmdb.org/t/p/original/${item.poster_path}`}} />
                <Text style={{textAlign: 'center', fontSize: 12}}>{item.original_title}</Text>
              </View>
            )
          }}
        />
      </View>
      <Text style={{fontSize: 24, marginLeft: 15, marginTop: 15, fontWeight: 'bold'}}>A venir</Text>
      <View style={styles.container}>
        <FlatList 
          data={upcomingResults?.slice(0,8)}
          keyExtractor={item => item.id}
          horizontal={true}
          renderItem={({item}) => {
            return (
              <View style={{flexDirection: 'column', justifyContent: 'space-between'}}>
                <Image style={{width: 160, height: 260, resizeMode: 'contain', borderRadius: 15, margin: 15}} source={{uri: `https://image.tmdb.org/t/p/original/${item.poster_path}`}} />
                <Text style={{textAlign: 'center', fontSize: 12}}>{item.original_title}</Text>
              </View>
            )
          }}
        />
      </View>
      <Text style={{fontSize: 24, marginLeft: 15, marginTop: 15, fontWeight: 'bold'}}>Série en cours de diffusion</Text>
      <View style={styles.container}>
        <FlatList 
          data={onTheAirResults?.slice(0,8)}
          keyExtractor={item => item.id}
          horizontal={true}
          renderItem={({item}) => {
            return (
              <View style={{flexDirection: 'column', justifyContent: 'space-between'}}>
                <Image style={{width: 160, height: 260, resizeMode: 'contain', borderRadius: 15, margin: 15}} source={{uri: `https://image.tmdb.org/t/p/original/${item.poster_path}`}} />
                <Text style={{textAlign: 'center', fontSize: 12}}>{item.original_title}</Text>
              </View>
            )
          }}
        />
      </View>
      <Text style={{fontSize: 24, marginLeft: 15, marginTop: 15, fontWeight: 'bold'}}>Séries populaires</Text>
      <View style={styles.container}>
        <FlatList 
          data={popularResults?.slice(0,8)}
          keyExtractor={item => item.id}
          horizontal={true}
          renderItem={({item}) => {
            return (
              <View style={{flexDirection: 'column', justifyContent: 'space-between'}}>
                <Image style={{width: 160, height: 260, resizeMode: 'contain', borderRadius: 15, margin: 15}} source={{uri: `https://image.tmdb.org/t/p/original/${item.poster_path}`}} />
                <Text style={{textAlign: 'center', fontSize: 12}}>{item.original_title}</Text>
              </View>
            )
          }}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#efefef',
    alignItems: 'center',
    justifyContent: 'space-between',
  }
});

export default HomeScreen;
