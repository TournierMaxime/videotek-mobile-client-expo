import React, { useEffect } from 'react';
import {View, Text, Image, ScrollView, StyleSheet} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { peopleCast } from '../../../redux/actions/tmdb/people/detailsPeople'
import { peopleDetails } from '../../../redux/actions/tmdb/people/people';
import { LinearGradient } from 'expo-linear-gradient';
import { truncateOverview } from '../../../utils/Truncate'
import Cast from './Cast'
import details from '../../../styles/pages/details';

const DetailsPeople = ({route}) => {
    const dispatch = useDispatch();
    const people = useSelector((state) => state.peopleDetails.data)
    const cast = useSelector((state) => state.peopleCast.data)
    const { id } = route.params;

    console.log(route)

    useEffect(() => {
        dispatch(peopleCast(id))
        dispatch(peopleDetails(id))
      }, [dispatch])

  return (
    <ScrollView style={styles.scrollView}>
      {people && (
        <View style={styles.mainViewContainer}>
          <LinearGradient
            colors={['rgba(0,0,0,0.8)', 'rgba(0,0,0,0.8)']}
            style={styles.linearGradient}
          />

          <View style={styles.headerViewContainer}>

            <View style={styles.posterViewContainer}>
              <Image style={styles.posterPath} source={{ uri: `https://image.tmdb.org/t/p/original${people.profile_path}` }} />
            </View>

            <View style={styles.infoViewContainer}>
              <Text style={styles.headerTitle}>{people.original_name}</Text>
            </View>
          </View>

          <View style={styles.viewOverviewContainer}>
            <Text style={styles.headerTitle}>Biographie</Text>
            <Text style={styles.textOverview}>{truncateOverview(people.biography, 400)}</Text>
          </View>

        </View>
      )}
      <Cast cast={cast} />
    </ScrollView>  
  );
};

const styles = StyleSheet.create({
  container: details.container,
  title: details.title, 
  image: details.image,
  flatListViewContainer: details.flatListViewContainer,
  originalTitle: details.originalTitle,
  scrollView: details.scrollView,
  mainViewContainer: details.mainViewContainer,
  linearGradient: details.linearGradient,
  imageBackground: details.imageBackground,
  viewOverviewContainer: details.viewOverviewContainer,
  headerTitle: details.headerTitle,
  textOverview: details.textOverview,
  headerViewContainer: details.headerViewContainer,
  posterViewContainer: details.posterViewContainer,
  posterPath: details.posterPath,
  releaseDate: details.releaseDate,
  infoViewContainer: details.infoViewContainer,
  genresViewContainer: details.genresViewContainer,
  genreText: details.genreText,
  directorsViewContainer: details.directorsViewContainer,
  directorText: details.directorText,
  directorTitle: details.directorTitle
});

export default DetailsPeople;
