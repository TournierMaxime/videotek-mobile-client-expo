import React, { useState } from 'react'
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native'
import { Entypo } from 'react-native-vector-icons'
import accordion from '../styles/components/accordion'

const Accordion = ({ children, title }) => {
  const [expanded, setExpanded] = useState(false)

  const toggleItem = () => {
    setExpanded(!expanded)
  }

  const body = <View style={styles.accordBody}>{children}</View>

  return (
    <View style={styles.accordContainer}>
      <TouchableOpacity
        style={styles.accordHeader}
        onPress={() => toggleItem()}
      >
        <Text style={styles.accordTitle}>{title}</Text>
        <Entypo
          name={expanded ? 'chevron-small-up' : 'chevron-small-down'}
          size={25}
          color='black'
        />
      </TouchableOpacity>
      {expanded && body}
    </View>
  )
}

const styles = StyleSheet.create({
  accordBody: accordion.accordBody,
  accordContainer: accordion.accordContainer,
  accordHeader: accordion.accordHeader,
  accordTitle: accordion.accordTitle,
})

export default Accordion
