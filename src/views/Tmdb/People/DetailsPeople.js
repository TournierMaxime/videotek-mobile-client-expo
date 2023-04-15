import React, { useEffect } from 'react';
import { View, Text, Image, ScrollView, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { peopleDetails } from '../../../redux/actions/tmdb/people/detailsPeople';
import { peopleCareer } from '../../../redux/actions/tmdb/people/careerPeople';
import { LinearGradient } from 'expo-linear-gradient';
import { truncateOverview } from '../../../utils/Truncate'
import Cast from './Cast'
import details from '../../../styles/pages/details';

const DetailsPeople = ({ route }) => {
  const dispatch = useDispatch();
  const { id } = route.params;
  const { data: people, loading: peopleLoading, error: peopleError } = useSelector((state) => state.peopleDetails);
  const { data: cast, loading: castLoading, error: castError } = useSelector((state) => state.peopleCareer);

  useEffect(() => {
    dispatch(peopleCareer(id));
    dispatch(peopleDetails(id));
  }, [dispatch, id]);

  if (peopleLoading || castLoading) {
    return <Text>Loading...</Text>
  }

  if (peopleError || castError) {
    return <Text>Error</Text>
  }

  return (
    <ScrollView style={styles.scrollView}>
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
      <Cast cast={cast} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: details.scrollView,
  mainViewContainer: details.mainViewContainer,
  linearGradient: details.linearGradient,
  headerViewContainer: details.headerViewContainer,
  posterViewContainer: details.posterViewContainer,
  posterPath: details.posterPath,
  infoViewContainer: details.infoViewContainer,
  viewOverviewContainer: details.viewOverviewContainer,
  headerTitle: details.headerTitle,
  textOverview: details.textOverview,
});

export default DetailsPeople;
