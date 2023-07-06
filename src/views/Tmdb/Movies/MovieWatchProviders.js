import React, { Fragment } from 'react'
import { useSelector } from 'react-redux'
import { Text, View, StyleSheet } from 'react-native'
import dot from '../../../styles/pages/dot'
import Accordion from '../../../components/Accordion'

const MovieWatchProviders = ({ language, t }) => {
  const providers = useSelector(
    (state) => state.movieWatchProviders.data.results
  )

  const lang = language.toUpperCase()

  const flatrate = (providers, languageKey) => {
    let language = languageKey

    switch (language) {
      case 'EN-GB':
        language = 'US'
        break
      case 'ZH-CN':
        language = 'CN'
        break
      case 'JA':
        language = 'JP'
        break
      case 'KO':
        language = 'KR'
        break
    }

    if (!providers?.[language]?.flatrate) {
      return null
    }

    return (
      <View>
        <Text style={styles.renderItemTitle}>{t('flatrate')}</Text>
        {providers?.[language]?.flatrate?.map((provider, index) => {
          return (
            <View key={index} style={styles.flatListViewContainer}>
              <Text style={styles.renderItemTags}>
                {provider.provider_name}
              </Text>
            </View>
          )
        })}
      </View>
    )
  }

  const buy = (providers, languageKey) => {
    let language = languageKey

    switch (language) {
      case 'EN-GB':
        language = 'US'
        break
      case 'ZH-CN':
        language = 'CN'
        break
      case 'JA':
        language = 'JP'
        break
      case 'KO':
        language = 'KR'
        break
    }
    if (!providers?.[language]?.buy) {
      return null
    }

    return (
      <View>
        <Text style={styles.renderItemTitle}>{t('buy')}</Text>
        {providers?.[language]?.buy?.map((provider, index) => {
          return (
            <View key={index} style={styles.flatListViewContainer}>
              <Text style={styles.renderItemTags}>
                {provider.provider_name}
              </Text>
            </View>
          )
        })}
      </View>
    )
  }

  const rent = (providers, languageKey) => {
    let language = languageKey

    switch (language) {
      case 'EN-GB':
        language = 'US'
        break
      case 'ZH-CN':
        language = 'CN'
        break
      case 'JA':
        language = 'JP'
        break
      case 'KO':
        language = 'KR'
        break
    }
    if (!providers?.[language]?.buy) {
      return null
    }

    return (
      <View>
        <Text style={styles.renderItemTitle}>{t('rent')}</Text>
        {providers?.[language]?.buy?.map((provider, index) => {
          return (
            <View key={index} style={styles.flatListViewContainer}>
              <Text style={styles.renderItemTags}>
                {provider.provider_name}
              </Text>
            </View>
          )
        })}
      </View>
    )
  }

  const providersByCountry = (lang) => {
    switch (lang) {
      case 'EN-GB':
        lang = 'US'
        break
      case 'ZH-CN':
        lang = 'CN'
        break
      case 'JA':
        lang = 'JP'
        break
      case 'KO':
        lang = 'KR'
        break
    }

    return (
      <Fragment>
        {flatrate(providers, lang)}
        {buy(providers, lang)}
        {rent(providers, lang)}
      </Fragment>
    )
  }

  return (
    <Accordion title={t('available')}>
      {providers ? (
        <View style={styles.mainContainer}>
          <Text style={[styles.renderItemTitle, { marginBottom: 15 }]}>
            {t('contentPoweredByJustWatch')}
          </Text>
          <View>{providersByCountry(lang)}</View>
        </View>
      ) : null}
    </Accordion>
  )
}

const styles = StyleSheet.create({
  image: dot.image,
  renderItemContainer: dot.renderItemContainer,
  renderItemTitle: dot.renderItemTitle,
  renderItemOverview: dot.renderItemOverview,
  renderItemTags: dot.renderItemTags,
  renderItemDetails: dot.renderItemDetails,
  seasonTitle: dot.seasonTitle,
})

export default MovieWatchProviders
