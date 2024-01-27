import React, { useState } from 'react'
import { View, TouchableOpacity, Text } from 'react-native'
import { Entypo } from 'react-native-vector-icons'
import Utils from '../../class/Utils'
import tw from 'twrnc'

const Accordion = ({ children, title }) => {
  const [expanded, setExpanded] = useState(false)

  const toggleItem = () => {
    setExpanded(!expanded)
  }

  const body = <View style={tw`p-0`}>{children}</View>

  return (
    <View style={tw`pb-4`}>
      <TouchableOpacity
        style={tw`p-4 flex-1 flex flex-row justify-between`}
        onPress={() => toggleItem()}
      >
        <Text style={tw`font-medium text-lg`}>{title}</Text>
        <Entypo
          name={expanded ? 'chevron-small-up' : 'chevron-small-down'}
          size={Utils.moderateScale(25)}
          color='black'
        />
      </TouchableOpacity>
      {expanded && body}
    </View>
  )
}

export default Accordion
