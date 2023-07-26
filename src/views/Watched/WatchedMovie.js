import React from "react"
import { View, Text } from "react-native"

const WatchedMovie = ({ route }) => {
    const { id, title } = route.params
    
    return (
        <View>
            <Text>{title}</Text>
        </View>
    )
}

export default WatchedMovie