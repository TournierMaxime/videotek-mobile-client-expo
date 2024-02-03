import React from 'react'
import { View, Text } from 'react-native'
import Utils from '../../lib/class/Utils'
import moment from 'moment'
import Accordion from '../../lib/components/utils/Accordion'
import { useSelector } from 'react-redux'
import MovieWatchProviders from './MovieWatchProviders'
import tw from 'twrnc'

const Production = ({ id, movie, t, language }) => {
  moment.locale(language)
  const lang = language.toUpperCase()

  const releases = useSelector((state) => state.releaseDates.data.results)

  const productionCompanies = (data) => {
    if (!data) return null
    return (
      <Accordion title={t('utils.producers')}>
        <View style={tw`flex flex-col`}>
          {data?.map((item, index) => {
            return (
              <View key={index} style={tw`flex-col justify-between`}>
                <Text
                  style={[
                    tw`font-medium text-lg rounded-md ml-4 mr-auto my-2 w-auto py-2 px-4 text-center leading-7`,
                    { color: '#495057', backgroundColor: '#dee2e6' },
                  ]}
                >
                  {item.name}
                </Text>
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
      <Accordion title={t('utils.country')}>
        <View style={tw`flex flex-col`}>
          {data?.map((item, index) => {
            return (
              <View key={index} style={tw`flex-col justify-between`}>
                <Text style={[
                    tw`font-medium text-lg rounded-md ml-4 mr-auto my-2 w-auto py-2 px-4 text-center leading-7`,
                    { color: '#495057', backgroundColor: '#dee2e6' },
                  ]}>{item.name}</Text>
              </View>
            )
          })}
        </View>
      </Accordion>
    )
  }

  const releaseByCountry = (releaseDates, language) => {
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
    return (
      <View style={[tw`border-slate-100`, { borderTopWidth: 2 }]}>
      <Accordion title={t('utils.release')}>
        <View style={tw`flex flex-col`}>
          {releaseDates.map((releaseDate, index) => {
            if (releaseDate.iso_3166_1 !== language) return null
            return (
              <View key={index}>
                {releaseDate.release_dates.map((releaseDate, index) => {
                  return (
                    <View style={tw`flex-col justify-between`} key={index}>
                      <Text style={[
                    tw`font-medium text-lg rounded-md ml-4 mr-auto my-2 w-auto py-2 px-4 text-center leading-7`,
                    { color: '#495057', backgroundColor: '#dee2e6' },
                  ]}>
                        {moment(releaseDate.release_date).format('L')}{' '}
                        {releaseDate.note
                          ? `- ${releaseDate.note}`
                          : `- ${t('utils.nationalRelease')}`}
                      </Text>
                    </View>
                  )
                })}
              </View>
            )
          })}
        </View>
        </Accordion>
        </View>
    )
  }

  const budget = (data) => {
    if (!data) return null
    return (
      <Accordion title={t('utils.budget')}>
        <View style={tw`flex flex-col`}>
          <View style={tw`flex-col justify-between`}>
            <Text style={[
                    tw`font-medium text-lg rounded-md ml-4 mr-auto my-2 w-auto py-2 px-4 text-center leading-7`,
                    { color: '#495057', backgroundColor: '#dee2e6' },
                  ]}>{Utils.numberWithCommas(data)}$</Text>
          </View>
        </View>
      </Accordion>
    )
  }

  const revenue = (data) => {
    if (!data) return null

    return (
      <Accordion title={t('utils.boxOffice')}>
        <View style={tw`flex flex-col`}>
          <View style={tw`flex-col justify-between`}>
            <Text style={[
                    tw`font-medium text-lg rounded-md ml-4 mr-auto my-2 w-auto py-2 px-4 text-center leading-7`,
                    { color: '#495057', backgroundColor: '#dee2e6' },
                  ]}>{Utils.numberWithCommas(data)}$</Text>
          </View>
        </View>
      </Accordion>
    )
  }

  return (
    <View style={tw`pb-4 bg-white h-full`}>
      {releaseByCountry(releases, lang)}
      {budget(movie?.budget)}
      {revenue(movie?.revenue)}
      <MovieWatchProviders id={id} language={lang} t={t} />
      {productionCompanies(movie?.production_companies)}
      {productionCountries(movie?.production_countries)}
    </View>
  )
}

export default Production
