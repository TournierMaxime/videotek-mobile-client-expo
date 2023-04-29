import React from 'react'
import { Text } from 'react-native'

export default function Runtime({ time, isMovie }) {
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

  const runtime = () => (
    <Text style={{ color: 'white' }}>
      {isMovie ? 
      <Text>Durée {hasHours ? hours + 'H' : ''}
      {minutes}Min</Text> : 
      <Text>Durée {hasHours ? hours + 'H' : ''}
      {minutes}Min / épisodes</Text>
      
      }
    </Text>
  )

  return runtime()
}
