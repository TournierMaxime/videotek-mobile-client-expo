import React from 'react';
import {View, Text, FlatList, TouchableOpacity, Image, StyleSheet} from 'react-native';
import cast from '../../../styles/components/cast';
import { useNavigation } from '@react-navigation/native';

const Cast = ({crew}) => {
  const navigation = useNavigation()

  return (
    <View>
        <Text style={styles.castTitle}>Distribution</Text>
        <FlatList 
          data={crew?.cast}
          keyExtractor={item => item.id.toString()}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          renderItem={({item}) => {
            return (
              <View style={styles.flatListViewContainer}>
                <TouchableOpacity onPress={() => navigation.navigate('DetailsPeople', {id: item.id, name: item.name})}>
                  <Image 
                    style={styles.image}
                    source={{uri: `https://image.tmdb.org/t/p/original/${item.profile_path}`}}
                  />
                </TouchableOpacity>
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
