import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { numberWithCommas } from '../../../utils/NumberWithCommas'
import details from '../../../styles/pages/details'
import moment from 'moment'
import Accordion from '../../../components/Accordion'

const Production = ({ movie, t, language }) => {
  moment.locale(language)

  const productionCompanies = (data) => {
    if (!data) return null
    return (
      <Accordion title={t('producers')}>
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
      <Accordion title={t('country')}>
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
      <Accordion title={t('release')}>
        <View style={styles.mainContainer}>
          <View style={styles.flatListViewContainer}>
            <Text style={styles.tags}>{moment(data).format('L')}</Text>
          </View>
        </View>
      </Accordion>
    )
  }

  const budget = (data) => {
    if (!data) return null
    return (
      <Accordion title={t('budget')}>
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
      <Accordion title={t('boxOffice')}>
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
        <Text style={styles.title}>{t('production')}</Text>
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
