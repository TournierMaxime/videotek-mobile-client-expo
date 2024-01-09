import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Ionicons } from 'react-native-vector-icons'
import message from '../styles/components/message'
import { moderateScale } from '../utils/Responsive'

const NoDataFound = ({ message }) => {
  const noDataFound = () => (
    <View style={[styles.containerMessage, { backgroundColor: '#e9e9ff' }]}>
      <Ionicons
        name='information-circle-outline'
        size={moderateScale(24)}
        color='#696cff'
      />
      <Text style={[styles.messageText, { color: "#696cff" }]}>{message}</Text>
    </View>
  )
  return noDataFound()
}

const styles = StyleSheet.create({
  containerMessage: message.containerMessage,
  messageText: message.messageText,
})

export default NoDataFound
