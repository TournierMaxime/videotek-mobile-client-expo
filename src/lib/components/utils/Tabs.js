import React from 'react'
import { View, TouchableOpacity, Text } from 'react-native'
import ProductionMovie from '../../../views/Movies/Production'
import ProductionSerie from '../../../views/Series/Production'
import tw from 'twrnc'
import CastMovie from '../../../views/Movies/CastMovie'
import CastSerie from '../../../views/Series/CastSerie'
import CrewMovie from '../../../views/Movies/CrewMovie'
import CrewSerie from '../../../views/Series/CrewSerie'
import Informations from '../../../views/People/Informations'
import CastPeople from '../../../views/People/CastPeople'

const Tabs = ({
  id,
  movie,
  serie,
  people,
  externalIds,
  t,
  language,
  selectedTab,
  setSelectedTab,
}) => {
  return (
    <View style={tw`h-full`}>
      <View style={tw`flex-row bg-white`}>
        {movie || serie ? (
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
        ) : null}
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
              Cast
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
              Cast
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
              Crew
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
              Crew
            </Text>
          </TouchableOpacity>
        ) : null}
        {people ? (
          <TouchableOpacity
            style={tw`flex-1 p-4 items-center`}
            onPress={() => setSelectedTab('people')}
          >
            <Text
              style={
                selectedTab === 'people'
                  ? tw`text-blue-500 font-medium text-lg text-center w-40 border-b-2 border-blue-500`
                  : tw`text-black font-medium text-lg`
              }
            >
              {t('utils.about')}
            </Text>
          </TouchableOpacity>
        ) : null}
        {people ? (
          <TouchableOpacity
            style={tw`flex-1 p-4 items-center`}
            onPress={() => setSelectedTab('cast')}
          >
            <Text
              style={
                selectedTab === 'cast'
                  ? tw`text-blue-500 font-medium text-lg text-center w-40 border-b-2 border-blue-500`
                  : tw`text-black font-medium text-lg`
              }
            >
              Cast
            </Text>
          </TouchableOpacity>
        ) : null}
      </View>
      {selectedTab === 'about' &&
        (movie ? (
          <ProductionMovie id={id} movie={movie} language={language} t={t} />
        ) : selectedTab === 'about' && serie ? (
          <ProductionSerie id={id} serie={serie} language={language} t={t} />
        ) : null)}
      {selectedTab === 'cast' && movie ? (
        <CastMovie />
      ) : selectedTab === 'cast' && serie ? (
        <CastSerie />
      ) : null}
      {selectedTab === 'crew' && movie ? (
        <CrewMovie />
      ) : selectedTab === 'crew' && serie ? (
        <CrewSerie />
      ) : null}
      {selectedTab === 'people' && people ? (
        <Informations t={t} externalIds={externalIds} />
      ) : null}
      {selectedTab === 'cast' && people ? (
        <CastPeople />
      ) : null}
    </View>
  )
}

export default Tabs
