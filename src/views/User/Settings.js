import React from 'react'
import { ScrollView, Text, View } from 'react-native'
import Languages from '../../lib/components/utils/Languages'
import { useTranslation } from 'react-i18next'
import packageJson from '../../../package.json'
import tw from 'twrnc'

const Settings = () => {
  const { i18n, t } = useTranslation()
  return (
    <ScrollView>
      <View style={tw`justify-center`}>
        <Text style={tw`m-4 font-medium text-lg`}>
          {t('selectLanguage')}
        </Text>
        <Languages i18n={i18n} />
      </View>

      <View style={tw`mt-4 justify-center bg-white`}>
        <Text style={tw`m-4 forn-medium text-lg`}>
          {t('versionNumber')}
        </Text>
        <Text style={tw`my-2 mx-4 font-medium text-lg`}>{packageJson.version}</Text>
      </View>
    </ScrollView>
  )
}

export default Settings
