import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import details from '../../../styles/pages/details'
// import moment from 'moment'
import Accordion from '../../../components/Accordion'

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
      <Accordion title={'Status'}>
        <View style={styles.mainContainer}>
          <View style={styles.flatListViewContainer}>{statusSerie()}</View>
        </View>
      </Accordion>
    )
  }

/*   const nbSeasons = (data) => {
    if (!data) return null
    return (
      <Accordion title={'Saisons'}>
        <View style={styles.mainContainer}>
          <View style={styles.flatListViewContainer}>
            <Text style={styles.tags}>{data}</Text>
          </View>
        </View>
      </Accordion>
    )
  }

  const nbEpisodes = (data) => {
    if (!data) return null
    return (
      <Accordion title={'Episodes'}>
        <View style={styles.mainContainer}>
          <View style={styles.flatListViewContainer}>
            <Text style={styles.tags}>{data}</Text>
          </View>
        </View>
      </Accordion>
    )
  } */

  const networks = (data) => {
    if (!data) return null

    return (
      <Accordion title={'Diffuseurs'}>
        {data?.map((item, index) => {
          return (
            <View key={index} style={styles.flatListViewContainer}>
              <Text style={styles.tags}>{item.name}</Text>
            </View>
          )
        })}
      </Accordion>
    )
  }

  const productionCompanies = (data) => {
    if (!data) return null

    return (
      <Accordion title={'Producteurs'}>
        {data?.map((item, index) => {
          return (
            <View key={index} style={styles.flatListViewContainer}>
              <Text style={styles.tags}>{item.name}</Text>
            </View>
          )
        })}
      </Accordion>
    )
  }

  const productionCountries = (data) => {
    if (!data) return null

    return (
      <Accordion title={"Pays d'origine"}>
        {data?.map((item, index) => {
          return (
            <View key={index} style={styles.flatListViewContainer}>
              <Text style={styles.tags}>{item.name}</Text>
            </View>
          )
        })}
      </Accordion>
    )
  }

/*   const firstEpisode = (data) => {
    if (!data) return null
    return (
      <Accordion title={'Premier épisode'}>
        <View style={styles.mainContainer}>
          <View style={styles.flatListViewContainer}>
            <Text style={styles.tags}>{moment(data).format('DD/MM/YYYY')}</Text>
          </View>
        </View>
      </Accordion>
    )
  }

  const lastEpisode = (data) => {
    if (!data) return null
    return (
      <Accordion title={'Dernier épisode'}>
        <View style={styles.mainContainer}>
          <View style={styles.flatListViewContainer}>
            <Text style={styles.tags}>{moment(data).format('DD/MM/YYYY')}</Text>
          </View>
        </View>
      </Accordion>
    )
  } */

  return (
    <View style={styles.productionViewContainer}>
      <View style={styles.technicalSheetViewContainer}>
        <Text style={styles.title}>Production</Text>
      </View>
      {status(serie.status)}
{/*       {nbSeasons(serie.number_of_seasons)}
      {nbEpisodes(serie.number_of_episodes)} */}
      {networks(serie.networks)}
      {productionCompanies(serie.production_companies)}
      {productionCountries(serie.production_countries)}
{/*       {firstEpisode(serie.first_air_date)}
      {lastEpisode(serie.last_air_date)} */}
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
  productionViewContainer: details.productionViewContainer,
})

export default Production
