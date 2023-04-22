import React, { Fragment } from 'react'
import { View, Text, FlatList, Image, StyleSheet } from 'react-native'
import { numberWithCommas } from '../../../utils/NumberWithCommas'
import details from '../../../styles/pages/details'
import moment from 'moment/moment'

const Production = ({ movie }) => {
  const productionCompanies = (data) => {
    return (
      <View style={styles.mainContainer}>
        <View style={styles.technicalSheetViewContainer}>
          <Text style={styles.subTitle}>Producteurs</Text>
        </View>
        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          horizontal={true}
          renderItem={({ item }) => {
            const logo_path = item.logo_path
              ? `https://image.tmdb.org/t/p/original/${item.logo_path}`
              : null
            return (
              <View style={styles.flatListViewContainer}>
                {logo_path ? (
                  <Image style={styles.image} source={{ uri: logo_path }} />
                ) : (
                  <Text>{item.name}</Text>
                )}
              </View>
            )
          }}
        />
      </View>
    )
  }

  const productionCountries = (data) => {
    return (
      <View style={styles.mainContainer}>
        <View style={styles.technicalSheetViewContainer}>
          <Text style={styles.subTitle}>Pays d&apos;origine</Text>
        </View>
        <FlatList
          data={data}
          keyExtractor={(item) => item.iso_3166_1}
          horizontal={true}
          renderItem={({ item }) => {
            return (
              <View style={styles.flatListViewContainer}>
                <Text style={styles.tags}>{item.name}</Text>
              </View>
            )
          }}
        />
      </View>
    )
  }

  return (
    <View style={styles.productionViewContainer}>
      <View style={styles.technicalSheetViewContainer}>
        <Text style={styles.title}>Fiche Technique</Text>
      </View>
      <View style={styles.technicalSheetViewContainer}>
        <Text style={styles.subTitle}>
          Sortie : {moment(movie.release_date).format('DD/MM/YYYY')}
        </Text>
      </View>
      <Fragment>
        {movie.budget ? (
          <View style={styles.technicalSheetViewContainer}>
            <Text style={styles.subTitle}>
              Budget {numberWithCommas(movie.budget)}$
            </Text>
          </View>
        ) : null}
      </Fragment>
      <Fragment>
        {movie.revenue ? (
          <View style={styles.technicalSheetViewContainer}>
            <Text style={styles.subTitle}>
              Recette {numberWithCommas(movie.revenue)}$
            </Text>
          </View>
        ) : null}
      </Fragment>
      {productionCompanies(movie?.production_companies)}
      {productionCountries(movie?.production_countries)}
    </View>
  )
}

const styles = StyleSheet.create({
  image: details.image,
  title: details.title,
  subTitle: details.subTitle,
  flatListViewContainer: details.flatListViewContainer,
  tags: details.tags,
  productionViewContainer: details.productionViewContainer,
  mainContainer: details.mainContainer,
  technicalSheetViewContainer: details.technicalSheetViewContainer,
})

export default Production
