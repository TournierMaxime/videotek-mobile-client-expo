import React from 'react'
import { View, Text } from 'react-native'
import Accordion from '../../lib/components/utils/Accordion'
import tw from 'twrnc'

const Production = ({ serie, t }) => {
  const status = (data) => {
    if (!data) return null

    const statusSerie = () => {
      switch (data) {
        case 'Returning Series':
          return (
            <Text
              style={[
                tw`font-medium text-lg rounded-md ml-4 mr-auto my-2 w-auto py-2 px-4 text-center leading-7`,
                { color: '#495057', backgroundColor: '#dee2e6' },
              ]}
            >
              {t('utils.returningSeries')}
            </Text>
          )
        case 'Ended':
          return (
            <Text
              style={[
                tw`font-medium text-lg rounded-md ml-4 mr-auto my-2 w-auto py-2 px-4 text-center leading-7`,
                { color: '#495057', backgroundColor: '#dee2e6' },
              ]}
            >
              {t('utils.ended')}
            </Text>
          )
      }
    }

    return (
      <View style={[tw`border-slate-100`, { borderTopWidth: 2 }]}>
        <Accordion title={t('utils.status')}>
          <View style={tw`flex flex-col`}>
            <View style={tw`flex-col justify-between`}>{statusSerie()}</View>
          </View>
        </Accordion>
      </View>
    )
  }

  const networks = (data) => {
    if (!data) return null

    return (
      <Accordion title={t('utils.diffusers')}>
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
      </Accordion>
    )
  }

  const productionCompanies = (data) => {
    if (!data) return null

    return (
      <Accordion title={t('utils.producers')}>
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
      </Accordion>
    )
  }

  const productionCountries = (data) => {
    if (!data) return null

    return (
      <Accordion title={t('utils.country')}>
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
      </Accordion>
    )
  }

  return (
    <View style={tw`pb-4 bg-white h-full`}>
      {status(serie?.status)}
      {networks(serie?.networks)}
      {productionCompanies(serie?.production_companies)}
      {productionCountries(serie?.production_countries)}
    </View>
  )
}

export default Production
