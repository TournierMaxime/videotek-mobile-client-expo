import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { truncateOverview } from './Truncate'
import details from '../styles/pages/details'

const OverView = ({ content }) => {
    if (!content) return null
  return (
    <View style={styles.viewOverviewContainer}>
      <Text style={styles.headerTitle}>Synopsis</Text>
      <Text style={styles.textOverview}>
        {truncateOverview(content, 400)}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
    viewOverviewContainer: details.viewOverviewContainer,
    headerTitle: details.headerTitle,
    textOverview: details.textOverview,
  })

export default OverView
