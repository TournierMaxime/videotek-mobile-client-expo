import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { numberWithCommas } from '../../../utils/NumberWithCommas'
import details from '../../../styles/pages/details'
import moment from 'moment/moment'
import Accordion from '../../../components/Accordion'

const Production = ({ movie }) => {
  const productionCompanies = (data) => {
    if (!data) return null
    return (
      <Accordion title={'Producteurs'}>
        <View style={styles.mainContainer}>
          {data?.map((item, index) => {
            return (
              <View key={index} style={styles.flatListViewContainer}>
                <Text style={styles.tags}>{item.name}</Text>
              </View>
            )
          })}
        </View>
      </Accordion>
    )
  }

  const productionCountries = (data) => {
    if (!data) return null
    return (
      <Accordion title={"Pays d'origine"}>
        <View style={styles.mainContainer}>
          {data?.map((item, index) => {
            return (
              <View key={index} style={styles.flatListViewContainer}>
                <Text style={styles.tags}>{item.name}</Text>
              </View>
            )
          })}
        </View>
      </Accordion>
    )
  }

  const release = (data) => {
    if (!data) return null
    return (
      <Accordion title={'Sortie'}>
        <View style={styles.mainContainer}>
          <View style={styles.flatListViewContainer}>
            <Text style={styles.tags}>{moment(data).format('DD/MM/YYYY')}</Text>
          </View>
        </View>
      </Accordion>
    )
  }

  const budget = (data) => {
    if (!data) return null
    return (
      <Accordion title={'Budget'}>
        <View style={styles.mainContainer}>
          <View style={styles.flatListViewContainer}>
            <Text style={styles.tags}>{numberWithCommas(data)}$</Text>
          </View>
        </View>
      </Accordion>
    )
  }

  const revenue = (data) => {
    if (!data) return null

    return (
      <Accordion title={'Recette'}>
        <View style={styles.mainContainer}>
          <View style={styles.flatListViewContainer}>
            <Text style={styles.tags}>{numberWithCommas(data)}$</Text>
          </View>
        </View>
      </Accordion>
    )
  }

  return (
    <View style={styles.productionViewContainer}>
      <View style={styles.technicalSheetViewContainer}>
        <Text style={styles.title}>Fiche Technique</Text>
      </View>
      {release(movie.release_date)}
      {budget(movie.budget)}
      {revenue(movie.revenue)}
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
