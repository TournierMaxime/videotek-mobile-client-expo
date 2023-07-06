import React from 'react'
import { Text, View } from 'react-native'
import Languages from '../../components/Languages'
import { useTranslation } from 'react-i18next'
import { moderateScale } from '../../utils/Responsive'

const Settings = () => {
  const { i18n, t } = useTranslation()
  return (
    <View style={{ justifyContent: 'center' }}>
      <Text style={{ margin: 15, fontSize: moderateScale(16) }}>
        {t('selectLanguage')}
      </Text>
      <Languages i18n={i18n} />
    </View>
  )
}

export default Settings
