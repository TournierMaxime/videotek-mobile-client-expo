import React, { useState } from 'react'
import { View, TouchableOpacity, Text } from 'react-native'
import { Entypo } from 'react-native-vector-icons'
import Utils from '@mod/mobile-common/lib/class/Utils'
import tw from 'twrnc'

const Accordion = ({ children, title }) => {
  const [expanded, setExpanded] = useState(false)

  const toggleItem = () => {
    setExpanded(!expanded)
  }

  return (
    <View style={[tw`py-4 border-slate-100`, { borderBottomWidth: 2 }]}>
      <TouchableOpacity
        style={tw`p-2 flex flex-row justify-between`}
        onPress={() => toggleItem()}
      >
        <Text style={tw`font-medium text-lg`}>{title}</Text>
        <Entypo
          name={expanded ? 'chevron-small-up' : 'chevron-small-down'}
          size={Utils.moderateScale(25)}
          color='black'
        />
      </TouchableOpacity>
      {expanded && children}
    </View>
  )
}

export default Accordion
