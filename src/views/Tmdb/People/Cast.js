import React from 'react';
import {View, Text, FlatList, TouchableOpacity, Image, StyleSheet} from 'react-native';
import cast from '../../../styles/components/cast';
import { useNavigation } from '@react-navigation/native';

const Cast = ({cast}) => {
    const navigation = useNavigation()

  return (
    <View>
        <Text style={styles.castTitle}>Filmographie</Text>
        <FlatList 
          data={cast?.cast}
          keyExtractor={item => item.id.toString()}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          renderItem={({item}) => {
            return (
              <View style={styles.flatListViewContainer}>
                {item.original_title ?
                    <TouchableOpacity onPress={() => navigation.navigate('DetailsMovie', {id: item.id, title: item.original_title})}>
                      {item.poster_path ? 
                        <Image 
                          style={styles.image}
                          source={{uri: `https://image.tmdb.org/t/p/original/${item.poster_path}`}}
                        />
                      : null}
                    </TouchableOpacity>
                 : 
                    <TouchableOpacity onPress={() => navigation.navigate('DetailsSerie', {id: item.id, title: item.original_name})}>
                      {item.poster_path ?
                        <Image 
                          style={styles.image}
                          source={{uri: `https://image.tmdb.org/t/p/original/${item.poster_path}`}}
                        />
                       : null}
                    </TouchableOpacity>
                 }
              </View>
            )
          }}
        />
    </View>
  );
};

const styles = StyleSheet.create({
    image: cast.image,
    castTitle: cast.castTitle,
    originalName: cast.originalName,
    flatListViewContainer: cast.flatListViewContainer
  });

export default Cast;
