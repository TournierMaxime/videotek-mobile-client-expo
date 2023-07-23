import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Ionicons, AntDesign, Entypo } from 'react-native-vector-icons'
import message from '../styles/components/message'
import { moderateScale } from './Responsive'

const Message = ({ message, priority }) => {
  switch (priority) {
    case 'info':
      return (
        <View style={[styles.containerMessage, { backgroundColor: '#e9e9ff' }]}>
          <Ionicons
            name='information-circle-outline'
            size={moderateScale(24)}
            color='#696cff'
          />
          <Text style={[styles.messageText, { color: '#696cff' }]}>{message}</Text>
        </View>
      )
    case 'success':
      return (
        <View style={[styles.containerMessage, { backgroundColor: '#1ea97c' }]}>
          <AntDesign
            name='check'
            size={moderateScale(24)}
            color='#1ea97c'
          />
          <Text style={[styles.messageText, { color: '#1ea97c' }]}>{message}</Text>
        </View>
      )
    case 'warning':
      return (
        <View style={[styles.containerMessage, { backgroundColor: '#fff2e2' }]}>
          <AntDesign
            name='warning'
            size={moderateScale(24)}
            color='#cc8925'
          />
          <Text style={[styles.messageText, { color: '#cc8925' }]}>{message}</Text>
        </View>
      )
    case 'error':
      return (
        <View style={[styles.containerMessage, { backgroundColor: '#ff5757' }]}>
          <Entypo
            name='circle-with-cross'
            size={moderateScale(24)}
            color='#ff5757'
          />
          <Text style={[styles.messageText, { color: '#ff5757' }]}>{message}</Text>
        </View>
      )
  }
}

const styles = StyleSheet.create({
  containerMessage: message.containerMessage,
  messageText: message.messageText,
})

export default Message
