import React from 'react';
import {View, Text, FlatList, Image, StyleSheet} from 'react-native';
import { numberWithCommas } from '../../../utils/NumberWithCommas';
import details from '../../../styles/pages/details';

const Production = ({movie}) => {

  return (
    <View>
        <Text style={styles.title}>Fiche Technique</Text>
        <Text style={styles.subTitle}>Producteurs</Text>
        <FlatList 
          data={movie?.production_companies}
          keyExtractor={item => item.id}
          horizontal={true}
          renderItem={({item}) => {
            return (
              <View style={styles.flatListViewContainer}>
                <Image 
                    style={styles.image}
                    source={{uri: `https://image.tmdb.org/t/p/original/${item.logo_path}`}}
                />
              </View>
            )
          }}
        />
        <Text style={styles.subTitle}>Pays d&apos;origine</Text>
        <FlatList 
          data={movie?.production_countries}
          keyExtractor={item => item.iso_3166_1}
          horizontal={true}
          renderItem={({item}) => {
            return (
              <View style={styles.flatListViewContainer}>
                <Text style={styles.tags}>{item.name}</Text>
              </View>
            )
          }}
        />
        <Text style={styles.subTitle}>Budget: {numberWithCommas(movie.budget)}$</Text>
        <Text style={styles.subTitle}>Recette: {numberWithCommas(movie.revenue)}$</Text>
    </View>
  );
};

const styles = StyleSheet.create({
    image: details.image,
    title: details.title,
    subTitle: details.subTitle,
    flatListViewContainer: details.flatListViewContainer,
    tags: details.tags
  });

export default Production;
