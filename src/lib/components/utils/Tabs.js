import React from 'react'
import { View, TouchableOpacity, Text } from 'react-native'
import ProductionMovie from '../../../views/Movies/Production'
import ProductionSerie from '../../../views/Series/Production'
import tw from 'twrnc'

const Tabs = ({ id, movie, serie, t, language, selectedTab, setSelectedTab }) => {
  return (
    <View style={tw`h-full`}>
      <View style={tw`flex-row bg-white mb-4`}>
        <TouchableOpacity
          style={tw`flex-1 p-4 items-center m-4`}
          onPress={() => setSelectedTab('about')}
        >
          <Text
            style={
              selectedTab === 'about' ? tw`text-blue-500 font-medium text-lg text-center w-20 border-b-2 border-blue-500` : tw`text-black font-medium text-lg`
            }
          >
            {t('about')}
          </Text>
        </TouchableOpacity>
      </View>
      {selectedTab === 'about' &&
        (movie ? (
          <ProductionMovie id={id} movie={movie} language={language} t={t} />
        ) : serie ? (
          <ProductionSerie id={id} serie={serie} language={language} t={t} />
        ) : null)}
    </View>
  )
}

export default Tabs
