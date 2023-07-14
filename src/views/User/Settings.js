import React from 'react'
import { ScrollView, Text, View } from 'react-native'
import Languages from '../../components/Languages'
import { useTranslation } from 'react-i18next'
import { moderateScale } from '../../utils/Responsive'
import packageJson from '../../../package.json'

const Settings = () => {
  const { i18n, t } = useTranslation()
  return (
    <ScrollView>
      <View style={{ justifyContent: 'center' }}>
        <Text style={{ margin: 15, fontSize: moderateScale(16) }}>
          {t('selectLanguage')}
        </Text>
        <Languages i18n={i18n} />
      </View>

      <View style={{ marginTop: moderateScale(15), justifyContent: 'center', backgroundColor: '#FFF' }}>
        <Text style={{ margin: 15, fontSize: moderateScale(16) }}>
          {t('versionNumber')}
        </Text>
        <Text style={{ marginVertical: 5, marginHorizontal: 15, fontSize: moderateScale(16) }}>{packageJson.version}</Text>
      </View>
    </ScrollView>
  )
}

export default Settings
