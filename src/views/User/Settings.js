import React from "react"
import { Text, View } from "react-native"
import Languages from "../../components/Languages"

const Settings = ({ i18n }) => {
    return (
        <View style={{justifyContent:'center'}}>
            <Text style={{margin: 15, fontSize: 16}}>Sélectionnez votre langue</Text>
            <Languages i18n={i18n} />
        </View>
    )
}

export default Settings