import React from 'react'
import { View, Text } from 'react-native'
import tw from 'twrnc'

const Message = ({ message, priority }) => {
  switch (priority) {
    case 'info':
      return (
        <View style={[tw`rounded-md p-4 mb-4 flex flex-row justify-center items-center`, { backgroundColor: '#e9e9ff' }]}>
          <Text style={[tw`text-center items-baseline`, { color: '#696cff' }]}>{message}</Text>
        </View>
      )
    case 'success':
      return (
        <View style={[tw`rounded-md p-4 mb-4 flex flex-row justify-center items-center`, { backgroundColor: '#1ea97c' }]}>
          <Text style={[tw`text-center items-baseline`, { color: '#1ea97c' }]}>{message}</Text>
        </View>
      )
    case 'warning':
      return (
        <View style={[tw`rounded-md p-4 mb-4 flex flex-row justify-center items-center`, { backgroundColor: '#fff2e2' }]}>
          <Text style={[tw`text-center items-baseline`, { color: '#cc8925' }]}>{message}</Text>
        </View>
      )
    case 'error':
      return (
        <View style={[tw`rounded-md p-4 mb-4 flex flex-row justify-center items-center`, { backgroundColor: '#ff5757' }]}>
          <Text style={[tw`text-center items-baseline`, { color: '#ff5757' }]}>{message}</Text>
        </View>
      )
  }
}

export default Message
