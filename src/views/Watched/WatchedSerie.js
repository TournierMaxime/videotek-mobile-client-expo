import React from "react"
import { View, Text } from "react-native"

const WatchedSerie = ({route}) => {
    const { id, title } = route.params
    
    return (
        <View>
            <Text>{title}</Text>
        </View>
    )
}

export default WatchedSerie