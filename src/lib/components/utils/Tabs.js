import React from 'react'
import { View, TouchableOpacity, Text } from 'react-native'
import ProductionMovie from '../../../views/Movies/Production'
import ProductionSerie from '../../../views/Series/Production'
import tw from 'twrnc'
import CastMovie from '../../../views/Movies/CastMovie'
import CastSerie from '../../../views/Series/CastSerie'
import CrewMovie from '../../../views/Movies/CrewMovie'
import CrewSerie from '../../../views/Series/CrewSerie'

const Tabs = ({
  id,
  movie,
  serie,
  t,
  language,
  selectedTab,
  setSelectedTab,
}) => {
  return (
    <View style={tw`h-full`}>
      <View style={tw`flex-row bg-white`}>
        <TouchableOpacity
          style={tw`flex-1 p-4 items-center`}
          onPress={() => setSelectedTab('about')}
        >
          <Text
            style={
              selectedTab === 'about'
                ? tw`text-blue-500 font-medium text-lg text-center w-20 border-b-2 border-blue-500`
                : tw`text-black font-medium text-lg`
            }
          >
            {t('utils.about')}
          </Text>
        </TouchableOpacity>
        {movie ? (
          <TouchableOpacity
            style={tw`flex-1 p-4 items-center`}
            onPress={() => setSelectedTab('cast')}
          >
            <Text
              style={
                selectedTab === 'cast'
                  ? tw`text-blue-500 font-medium text-lg text-center w-20 border-b-2 border-blue-500`
                  : tw`text-black font-medium text-lg`
              }
            >
              {t('utils.cast')}
            </Text>
          </TouchableOpacity>
        ) : serie ? (
          <TouchableOpacity
            style={tw`flex-1 p-4 items-center`}
            onPress={() => setSelectedTab('cast')}
          >
            <Text
              style={
                selectedTab === 'cast'
                  ? tw`text-blue-500 font-medium text-lg text-center w-20 border-b-2 border-blue-500`
                  : tw`text-black font-medium text-lg`
              }
            >
              {t('utils.cast')}
            </Text>
          </TouchableOpacity>
        ) : null}
        {movie ? (
          <TouchableOpacity
            style={tw`flex-1 p-4 items-center`}
            onPress={() => setSelectedTab('crew')}
          >
            <Text
              style={
                selectedTab === 'crew'
                  ? tw`text-blue-500 font-medium text-lg text-center w-20 border-b-2 border-blue-500`
                  : tw`text-black font-medium text-lg`
              }
            >
              {t('utils.crew')}
            </Text>
          </TouchableOpacity>
        ) : serie ? (
          <TouchableOpacity
            style={tw`flex-1 p-4 items-center`}
            onPress={() => setSelectedTab('crew')}
          >
            <Text
              style={
                selectedTab === 'crew'
                  ? tw`text-blue-500 font-medium text-lg text-center w-20 border-b-2 border-blue-500`
                  : tw`text-black font-medium text-lg`
              }
            >
              {t('utils.crew')}
            </Text>
          </TouchableOpacity>
        ) : null}
      </View>
      {selectedTab === 'about' &&
        (movie ? (
          <ProductionMovie id={id} movie={movie} language={language} t={t} />
        ) : serie ? (
          <ProductionSerie id={id} serie={serie} language={language} t={t} />
        ) : null)}
      {selectedTab === 'cast' && movie ? (
        <CastMovie />
      ) : serie ? (
          <CastSerie />
      ) : null}
      {selectedTab === 'crew' && movie ? (
        <CrewMovie />
      ) : serie ? (
          <CrewSerie />
      ) : null}
    </View>
  )
}

export default Tabs
