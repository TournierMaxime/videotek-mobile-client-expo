import React from 'react'
import { Text, StyleSheet } from 'react-native'

const Runtime = ({ time, isMovie }) => {
  if (!time) return null

  let hours, minutes
  if (isMovie) {
    hours = Math.floor(time / 60)
    minutes = time % 60
  } else {
    hours = Math.floor(time / 60)
    minutes = time % 60
  }

  const hasHours = hours > 0

  const runtime = () => { 
    if (time.length === 0) {
      return
    }
    return (
    <Text style={{ color: 'white' }}>
      {isMovie ? 
      <Text style={styles.duration}>Durée {hasHours ? hours + 'H' : ''}
      {minutes}Min</Text> : 
      <Text style={styles.duration}>Durée {hasHours ? hours + 'H' : ''}
      {minutes}Min / ep</Text>
      
      }
    </Text>
    )
  }

  return runtime()
}

const styles = StyleSheet.create({
  duration: {
    fontSize: 18
  }
})

export default Runtime
