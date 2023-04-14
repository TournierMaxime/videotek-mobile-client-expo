import React, { useEffect } from 'react';
import {StyleSheet, View, Text, FlatList, Image, ScrollView, TouchableOpacity} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { nowPlaying } from '../redux/actions/tmdb/movies/nowPlaying'
import { upcoming } from '../redux/actions/tmdb/movies/upcoming'
import { onTheAir } from '../redux/actions/tmdb/series/onTheAir'
import { popular } from '../redux/actions/tmdb/series/popular'
import {useNavigation} from '@react-navigation/native';

const HomeScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const nowPlayingData = useSelector((state) => state.nowPlaying.data)
  const upcomingData = useSelector((state) => state.upcoming.data)
  const onTheAirData = useSelector((state) => state.onTheAir.data)
  const popularData = useSelector((state) => state.popular.data)
  const nowPlayingResults = useSelector((state) => state.nowPlaying.data.results)
  const upcomingResults = useSelector((state) => state.upcoming.data.results)
  const onTheAirResults = useSelector((state) => state.onTheAir.data.results)
  const popularResults = useSelector((state) => state.popular.data.results)

  useEffect(() => {
    dispatch(nowPlaying(nowPlayingData.page))
    dispatch(upcoming(upcomingData.page))
    dispatch(onTheAir(onTheAirData.page))
    dispatch(popular(popularData.page))
  }, [dispatch])


  return (
    <ScrollView>
      <View style={{justifyContent: 'space-between', flexDirection: 'row', marginRight: 15}}>
        <Text style={styles.title}>En ce moment</Text>
        <TouchableOpacity onPress={() => navigation.navigate('En ce moment')}>
          <Text style={styles.title}>Tout</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <FlatList 
          data={nowPlayingResults?.slice(0,8)}
          keyExtractor={item => item.id}
          horizontal={true}
          renderItem={({item, index}) => {
            return (
              <View style={{flexDirection: 'column', justifyContent: 'space-between'}}>
                <TouchableOpacity onPress={() => navigation.navigate('Details Movie', {id: item.id, title: item.original_title})}>
                  <Image 
                    style={[styles.image, { marginRight: index === nowPlayingResults?.slice(0,8).length - 1 ? 15 : 0 }]}
                    source={{uri: `https://image.tmdb.org/t/p/original/${item.poster_path}`}}
                  />
                  <Text style={{textAlign: 'center', fontSize: 12}}>{item.original_title}</Text>
                </TouchableOpacity>
              </View>
            )
          }}
        />
      </View>

      <View style={{justifyContent: 'space-between', flexDirection: 'row', marginRight: 15}}>
        <Text style={styles.title}>A Venir</Text>
        <TouchableOpacity onPress={() => navigation.navigate('A Venir')}>
          <Text style={styles.title}>Tout</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <FlatList 
          data={upcomingResults?.slice(0,8)}
          keyExtractor={item => item.id}
          horizontal={true}
          renderItem={({item, index}) => {
            return (
              <View style={{flexDirection: 'column', justifyContent: 'space-between'}}>
                <TouchableOpacity onPress={() => navigation.navigate('Details Movie', {id: item.id, title: item.original_title})}>
                  <Image style={[styles.image, { marginRight: index === upcomingResults?.slice(0,8).length - 1 ? 15 : 0 }]} source={{uri: `https://image.tmdb.org/t/p/original/${item.poster_path}`}} />
                </TouchableOpacity>
                <Text style={{textAlign: 'center', fontSize: 12}}>{item.original_title}</Text>
              </View>
            )
          }}
        />
      </View>

      <View style={{justifyContent: 'space-between', flexDirection: 'row', marginRight: 15}}>
        <Text style={styles.title}>Série en cours de diffusion</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Série en cours de diffusion')}>
          <Text style={styles.title}>Tout</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <FlatList 
          data={onTheAirResults?.slice(0,8)}
          keyExtractor={item => item.id}
          horizontal={true}
          renderItem={({item, index}) => {
            return (
              <View style={{flexDirection: 'column', justifyContent: 'space-between'}}>
                <TouchableOpacity onPress={() => navigation.navigate('Details Serie', {id: item.id, title: item.original_name})}>
                  <Image style={[styles.image, { marginRight: index === onTheAirResults?.slice(0,8).length - 1 ? 15 : 0 }]} source={{uri: `https://image.tmdb.org/t/p/original/${item.poster_path}`}} />
                </TouchableOpacity>
                <Text style={{textAlign: 'center', fontSize: 12}}>{item.original_name}</Text>
              </View>
            )
          }}
        />
      </View>

      <View style={{justifyContent: 'space-between', flexDirection: 'row', marginRight: 15}}>
        <Text style={styles.title}>Séries populaires</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Séries populaires')}>
          <Text style={styles.title}>Tout</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <FlatList 
          data={popularResults?.slice(0,8)}
          keyExtractor={item => item.id}
          horizontal={true}
          renderItem={({item, index}) => {
            return (
              <View style={{flexDirection: 'column', justifyContent: 'space-between'}}>
                <TouchableOpacity onPress={() => navigation.navigate('Details Serie', {id: item.id, title: item.original_name})}>
                  <Image style={[styles.image, { marginRight: index === popularResults?.slice(0,8).length - 1 ? 15 : 0 }]} source={{uri: `https://image.tmdb.org/t/p/original/${item.poster_path}`}} />
                </TouchableOpacity>
                <Text style={{textAlign: 'center', fontSize: 12}}>{item.original_name}</Text>
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
  },
  title: {
    fontSize: 24,
    marginLeft: 15,
    marginTop: 15,
    fontWeight: 'bold'
  }, 
  image: {
    width: 160,
    height: 260,
    resizeMode: 'contain',
    borderRadius: 15,
    marginTop: 15,
    marginLeft: 15,
    marginBottom: 15
  }
});

export default HomeScreen;
