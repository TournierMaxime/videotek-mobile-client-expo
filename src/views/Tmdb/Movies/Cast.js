import React from 'react';
import {View, Text, FlatList, TouchableHighlight, Image, StyleSheet} from 'react-native';
import cast from '../../../styles/components/cast';
import { useNavigation } from '@react-navigation/native';

const Cast = ({crew}) => {
  const navigation = useNavigation()

  return (
    <View>
        <Text style={styles.castTitle}>Distribution</Text>
        <FlatList 
          data={crew?.cast}
          keyExtractor={(item) =>`${item.id.toString()}-${item.name}`}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => {
            const profilePath = item.profile_path ? `https://image.tmdb.org/t/p/original/${item.profile_path}` : null
            return (
              <View style={styles.flatListViewContainer}>
                <TouchableHighlight underlayColor={'transparent'} onPress={() => navigation.navigate('DetailsPeople', {id: item.id, name: item.name})}>
                  <View>
                    {profilePath ? <Image style={styles.image} source={{uri: profilePath}} /> : null}
                  </View>
                </TouchableHighlight>
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
