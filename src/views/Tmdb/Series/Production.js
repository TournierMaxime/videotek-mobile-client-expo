import React from 'react';
import {View, Text, FlatList, Image, StyleSheet} from 'react-native';
import details from '../../../styles/pages/details';
import moment from 'moment';

const Production = ({serie}) => {

  return (
    <View>
        <Text style={styles.title}>Fiche Technique</Text>
        <Text style={styles.subTitle}>Status: {serie.status}</Text>

        <Text style={styles.subTitle}>Diffuseurs</Text>
        <FlatList 
          data={serie?.networks}
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
        <Text style={styles.subTitle}>Producteurs</Text>
        <FlatList 
          data={serie?.production_companies}
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
          data={serie?.production_countries}
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
        <Text style={styles.subTitle}>Premier épisode: {moment(serie.first_air_date).format('DD/MM/YYYY')}</Text>
        <Text style={styles.subTitle}>Saisons: {serie.number_of_seasons}</Text>
        <Text style={styles.subTitle}>Episodes: {serie.number_of_episodes}</Text>
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
