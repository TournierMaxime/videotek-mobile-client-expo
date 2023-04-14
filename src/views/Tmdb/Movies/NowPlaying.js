import React, { useEffect, useState } from 'react';
import {StyleSheet, View, Text, FlatList, Image, TouchableOpacity} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { nowPlaying } from '../../../redux/actions/tmdb/movies/nowPlaying'
import useLoadMore from '../../../utils/LoadMore';
import { truncateTitle } from '../../../utils/Truncate'
import {useNavigation} from '@react-navigation/native';

const NowPlaying = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const nowPlayingData = useSelector((state) => state.nowPlaying.paginationData)
    const nowPlayingResults = useSelector((state) => state.nowPlaying.paginationData.results)
    const { currentPage, loadMore } = useLoadMore(nowPlayingData.page, nowPlayingData.total_pages)
    const [allResults, setAllResults] = useState([])

    useEffect(() => {
        dispatch(nowPlaying(currentPage, 'nowPlayingPagination'))
      }, [dispatch, currentPage])

      useEffect(() => {
        if (nowPlayingResults?.length > 0) {
          if (currentPage > 1) {
            setAllResults((prevResults) => [...prevResults, ...nowPlayingResults]);
          } else {
            setAllResults(nowPlayingResults);
          }
        }
      }, [nowPlayingResults]);

  return (
    <View style={styles.container}>
        <FlatList 
          data={allResults}
          keyExtractor={(item, index) => `${index}`}
          numColumns={2}
          onEndReached={loadMore}
          onEndReachedThreshold={0.5}
          renderItem={({item}) => {
            return (
              <View style={{flexDirection: 'column', justifyContent: 'space-between'}}>
                <TouchableOpacity onPress={() => navigation.navigate('Details Movie', {id: item.id, title: item.original_title})}>
                  <Image style={styles.image} source={{uri: `https://image.tmdb.org/t/p/original${item.poster_path}`}} />
                  <Text style={{textAlign: 'center', fontSize: 12}}>{truncateTitle(item.original_title, 15)}</Text>
                </TouchableOpacity>
              </View>
            )
          }}
        />
    </View>
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
      margin: 15
    }
  });

export default NowPlaying;
