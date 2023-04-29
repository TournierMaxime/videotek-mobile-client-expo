import React from "react"
import { Text } from "react-native"

const DetailsUser = ({ route }) => {
  const { userId } = route.params
  return <Text>{ userId }</Text>
}

export default DetailsUser