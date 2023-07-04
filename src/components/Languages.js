import React, { useState, useEffect } from 'react'
import { View } from 'react-native'
import { Picker } from '@react-native-picker/picker'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function Languages({ i18n }) {
  const [lang, setLang] = useState(i18n.language)

  const itemsPicker = [
    { label: 'German', value: 'de-DE' },
    { label: 'English', value: 'en-US' },
    { label: 'Spanish', value: 'es-ES' },
    { label: 'French', value: 'fr-FR' },
    { label: 'Italian', value: 'it-IT' },
    { label: 'Japanese', value: 'ja-JP' },
    { label: 'Korean', value: 'ko-KR' },
    { label: 'Dutch', value: 'nl-NL' },
    { label: 'Portuguese', value: 'pt-PT' },
    { label: 'Russian', value: 'ru-RU' },
    { label: 'Chinese', value: 'zh-CN' },
  ]

  useEffect(() => {
    const updateLanguage = async () => {
      const storedLang = await AsyncStorage.getItem('lang')
      if (storedLang) {
        setLang(storedLang)
        i18n.changeLanguage(storedLang)
      }
    }

    updateLanguage()
  }, [])

  const changeLanguage = async (itemValue) => {
    setLang(itemValue)
    i18n.changeLanguage(itemValue)
    await AsyncStorage.setItem('lang', itemValue)
  }

  return (
    <View style={{ backgroundColor: 'white' }}>
      <Picker selectedValue={lang} onValueChange={changeLanguage}>
        {itemsPicker.map((item, index) => (
          <Picker.Item key={index} label={item.label} value={item.value} />
        ))}
      </Picker>
    </View>
  )
}
