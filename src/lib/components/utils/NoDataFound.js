import React from 'react'
import { View, Text } from 'react-native'
import { Ionicons } from 'react-native-vector-icons'
import Utils from '../../../lib/class/Utils'
import tw from 'twrnc'

const NoDataFound = ({ message }) => {
  const noDataFound = () => (
    <View style={[tw`rounded-md p-4 mb-4 flex-row justify-center items-center`, { backgroundColor: '#e9e9ff' }]}>
      <Ionicons
        name='information-circle-outline'
        size={Utils.moderateScale(24)}
        color='#696cff'
      />
      <Text style={[tw`text-center items-baseline`, { color: "#696cff" }]}>{message}</Text>
    </View>
  )
  return noDataFound()
}

export default NoDataFound
