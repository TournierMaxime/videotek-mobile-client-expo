import React, { useEffect, useState } from 'react';
import {StyleSheet, View, Text, FlatList, Image, TouchableOpacity} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { popular } from '../../../redux/actions/tmdb/series/popular'
import useLoadMore from '../../../utils/LoadMore';
import { truncateTitle } from '../../../utils/Truncate'
import {useNavigation} from '@react-navigation/native';

const Popular = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const popularData = useSelector((state) => state.popular.paginationData)
    const popularResults = useSelector((state) => state.popular.paginationData.results)
    const { currentPage, loadMore } = useLoadMore(popularData.page, popularData.total_pages)
    const [allResults, setAllResults] = useState([])

    useEffect(() => {
        dispatch(popular(currentPage, 'popularPagination'))
      }, [dispatch, currentPage])

      useEffect(() => {
        if (popularResults?.length > 0) {
          if (currentPage > 1) {
            setAllResults((prevResults) => [...prevResults, ...popularResults]);
          } else {
            setAllResults(popularResults);
          }
        }
      }, [popularResults]);

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
                <TouchableOpacity onPress={() => navigation.navigate('Details Serie', {id: item.id, title: item.original_name})}>
                  <Image style={styles.image} source={{uri: `https://image.tmdb.org/t/p/original${item.poster_path}`}} />
                  <Text style={{textAlign: 'center', fontSize: 12}}>{truncateTitle(item.original_name, 15)}</Text>
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

export default Popular;
