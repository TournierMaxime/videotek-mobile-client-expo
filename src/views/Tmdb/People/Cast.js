import React from 'react';
import {View, Text, FlatList, TouchableOpacity, Image, StyleSheet} from 'react-native';
import cast from '../../../styles/components/cast';
import { useNavigation } from '@react-navigation/native';

const Cast = ({cast}) => {
    const navigation = useNavigation()

  return (
    <View>
        <Text style={styles.castTitle}>Distribution</Text>
        <FlatList 
          data={cast?.cast?.slice(0, 8)}
          keyExtractor={item => item.id}
          horizontal={true}
          renderItem={({item}) => {
            console.log(item.id)
            return (
              <View style={styles.flatListViewContainer}>
                {item.original_title ?
                    <TouchableOpacity onPress={() => navigation.navigate('Details Movie', {id: item.id, title: item.original_title})}>
                        <Image 
                            style={styles.image}
                            source={{uri: `https://image.tmdb.org/t/p/original/${item.poster_path}`}}
                        />
                        <Text style={styles.originalName}>{item.original_title}</Text>
                    </TouchableOpacity>
                 : 
                    <TouchableOpacity onPress={() => navigation.navigate('Details Serie', {id: item.id, title: item.original_name})}>
                        <Image 
                            style={styles.image}
                            source={{uri: `https://image.tmdb.org/t/p/original/${item.poster_path}`}}
                        />
                        <Text style={styles.originalName}>{item.original_name}</Text>
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
