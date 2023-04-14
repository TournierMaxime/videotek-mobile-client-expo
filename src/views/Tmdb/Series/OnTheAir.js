import React, { useEffect, useState } from 'react';
import {StyleSheet, View, Text, FlatList, Image, TouchableOpacity} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { onTheAir } from '../../../redux/actions/tmdb/series/onTheAir'
import useLoadMore from '../../../utils/LoadMore';
import { truncateTitle } from '../../../utils/Truncate'
import {useNavigation} from '@react-navigation/native';

const OnTheAir = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const onTheAirData = useSelector((state) => state.onTheAir.paginationData)
    const onTheAirResults = useSelector((state) => state.onTheAir.paginationData.results)
    const { currentPage, loadMore } = useLoadMore(onTheAirData.page, onTheAirData.total_pages)
    const [allResults, setAllResults] = useState([])

    useEffect(() => {
        dispatch(onTheAir(currentPage, 'onTheAirPagination'))
      }, [dispatch, currentPage])

      useEffect(() => {
        if (onTheAirResults?.length > 0) {
          if (currentPage > 1) {
            setAllResults((prevResults) => [...prevResults, ...onTheAirResults]);
          } else {
            setAllResults(onTheAirResults);
          }
        }
      }, [onTheAirResults]);

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

export default OnTheAir;
