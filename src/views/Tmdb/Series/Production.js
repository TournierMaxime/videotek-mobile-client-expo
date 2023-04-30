import React, { Fragment } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import details from '../../../styles/pages/details'
import moment from 'moment'

const Production = ({ serie }) => {

  const status = (data) => {
    if (!data) return null

    const statusSerie = () => {
      switch (data) {
        case 'Returning Series':
          return <Text style={styles.tags}>Série renouvelée</Text>
        case 'Ended':
          return <Text style={styles.tags}>Série terminée</Text>
      }
    }

    return (
      <View style={styles.mainContainer}>
        <View style={styles.technicalSheetViewContainer}>
          <Text style={styles.subTitle}>Status</Text>
        </View>
        <View style={styles.flatListViewContainer}>{statusSerie()}</View>
      </View>
    )
  }

  const nbSeasons = (data) => {
    if (!data) return null
    return (
      <View style={styles.mainContainer}>
        <View style={styles.technicalSheetViewContainer}>
          <Text style={styles.subTitle}>Saisons</Text>
        </View>
        <View style={styles.flatListViewContainer}>
          <Text style={styles.tags}>{data}</Text>
        </View>
      </View>
    )
  }

  const nbEpisodes = (data) => {
    if (!data) return null
    return (
      <View style={styles.mainContainer}>
        <View style={styles.technicalSheetViewContainer}>
          <Text style={styles.subTitle}>Episodes</Text>
        </View>
        <View style={styles.flatListViewContainer}>
          <Text style={styles.tags}>{data}</Text>
        </View>
      </View>
    )
  }

  const networks = (data) => {
    if (!data) return null

    return (
      <Fragment>
        <View style={styles.technicalSheetViewContainer}>
          <Text style={styles.subTitle}>Diffuseurs</Text>
        </View>
        {data?.map((item, index) => {
          return (
            <View key={index} style={styles.flatListViewContainer}>
              <Text style={styles.tags}>{item.name}</Text>
            </View>
          )
        })}
      </Fragment>
    )
  }

  const productionCompanies = (data) => {
    if (!data) return null

    return (
      <Fragment>
        <View style={styles.technicalSheetViewContainer}>
          <Text style={styles.subTitle}>Producteurs</Text>
        </View>
        {data?.map((item, index) => {
          return (
            <View key={index} style={styles.flatListViewContainer}>
              <Text style={styles.tags}>{item.name}</Text>
            </View>
          )
        })}
      </Fragment>
    )
  }

  const productionCountries = (data) => {
    if (!data) return null

    return (
      <Fragment>
        <View style={styles.technicalSheetViewContainer}>
          <Text style={styles.subTitle}>Pays d&apos;origine</Text>
        </View>
        {data?.map((item, index) => {
          return (
            <View key={index} style={styles.flatListViewContainer}>
              <Text style={styles.tags}>{item.name}</Text>
            </View>
          )
        })}
      </Fragment>
    )
  }

  const firstEpisode = (data) => {
    if (!data) return null
    return (
      <View style={styles.mainContainer}>
        <View style={styles.technicalSheetViewContainer}>
          <Text style={styles.subTitle}>Premier épisode</Text>
        </View>
        <View style={styles.flatListViewContainer}>
          <Text style={styles.tags}>{moment(data).format('DD/MM/YYYY')}</Text>
        </View>
      </View>
    )
  }

  const lastEpisode = (data) => {
    if (!data) return null
    return (
      <View style={styles.mainContainer}>
        <View style={styles.technicalSheetViewContainer}>
          <Text style={styles.subTitle}>Dernier épisode</Text>
        </View>
        <View style={styles.flatListViewContainer}>
          <Text style={styles.tags}>{moment(data).format('DD/MM/YYYY')}</Text>
        </View>
      </View>
    )
  }

  return (
    <View style={styles.productionViewContainer}>
      <View style={styles.technicalSheetViewContainer}>
        <Text style={styles.title}>Fiche Technique</Text>
      </View>
      {status(serie.status)}
      {nbSeasons(serie.number_of_seasons)}
      {nbEpisodes(serie.number_of_episodes)}
      {networks(serie.networks)}
      {productionCompanies(serie.production_companies)}
      {productionCountries(serie.production_countries)}
      {firstEpisode(serie.first_air_date)}
      {lastEpisode(serie.last_air_date)}     
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
  mainContainer: details.mainContainer,
  productionViewContainer: details.productionViewContainer
})

export default Production
