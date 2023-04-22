import React, { Fragment } from 'react'
import { View, Text, FlatList, Image, StyleSheet } from 'react-native'
import details from '../../../styles/pages/details'
import moment from 'moment'
import StatusSeries from '../../../utils/StatusSeries'

const Production = ({ serie }) => {
  const networks = (data) => {
    if (!data || data.length === 0) return null
    return (
      <Fragment>
        <View style={styles.technicalSheetViewContainer}>
          <Text style={styles.subTitle}>Diffuseurs</Text>
        </View>
        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          horizontal={true}
          renderItem={({ item }) => {
            return (
              <View style={styles.flatListViewContainer}>
                <Image
                  style={styles.image}
                  source={{
                    uri: `https://image.tmdb.org/t/p/original/${item.logo_path}`,
                  }}
                />
              </View>
            )
          }}
        />
      </Fragment>
    )
  }

  const productionCompanies = (data) => {
    if (!data || data.length === 0) return null
    return (
      <Fragment>
        <View style={styles.technicalSheetViewContainer}>
          <Text style={styles.subTitle}>Producteurs</Text>
        </View>
        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          horizontal={true}
          renderItem={({ item }) => {
            return (
              <View style={styles.flatListViewContainer}>
                <Image
                  style={styles.image}
                  source={{
                    uri: `https://image.tmdb.org/t/p/original/${item.logo_path}`,
                  }}
                />
              </View>
            )
          }}
        />
      </Fragment>
    )
  }

  const productionCountries = (data) => {
    if (!data || data.length === 0) return null
    return (
      <Fragment>
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
      </Fragment>
    )
  }

  return (
    <View>
      <View style={styles.technicalSheetViewContainer}>
        <Text style={styles.title}>Fiche Technique</Text>
      </View>
      <View style={styles.technicalSheetViewContainer}>
        <StatusSeries status={serie.status} />
      </View>
      <View style={styles.technicalSheetViewContainer}>
        <Text style={styles.subTitle}>Saisons {serie.number_of_seasons}</Text>
      </View>
      <View style={styles.technicalSheetViewContainer}>
        <Text style={styles.subTitle}>Episodes {serie.number_of_episodes}</Text>
      </View>
      <View>{networks(serie?.networks)}</View>
      <View>
        {serie?.production_companies
          ? productionCompanies(serie?.production_companies)
          : null}
      </View>
      <View>
        {serie?.production_countries
          ? productionCountries(serie?.production_countries)
          : null}
      </View>
      <View style={styles.technicalSheetViewContainer}>
        <Text style={styles.subTitle}>
          Premier épisode {moment(serie.first_air_date).format('DD/MM/YYYY')}
        </Text>
      </View>
      <View style={styles.technicalSheetViewContainer}>
        <Text style={styles.subTitle}>
          Dernier épisode {moment(serie.last_air_date).format('DD/MM/YYYY')}
        </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  image: details.image,
  title: details.title,
  subTitle: details.subTitle,
  flatListViewContainer: details.flatListViewContainer,
  tags: details.tags,
  technicalSheetViewContainer: details.technicalSheetViewContainer,
})

export default Production
