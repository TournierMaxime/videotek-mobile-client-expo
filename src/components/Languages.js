import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Languages({ i18n }) {
  const [lang, setLang] = useState(i18n.language);

  const itemsPicker = [
    { label: 'Arabic', value: 'ar-SA' },
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
  ];

  useEffect(() => {
    const updateLanguage = async () => {
      try {
        const storedLang = await AsyncStorage.getItem('lang');
        if (storedLang) {
          setLang(storedLang);
          i18n.changeLanguage(storedLang);
        }
      } catch (error) {
        console.log(error);
      }
    };

    updateLanguage();
  }, []);

  const changeLanguage = async (itemValue) => {
    try {
      await AsyncStorage.setItem('lang', itemValue);
      setLang(itemValue);
      i18n.changeLanguage(itemValue);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={{ backgroundColor: 'white' }}>
      <Picker selectedValue={lang} onValueChange={changeLanguage}>
        {itemsPicker.map((item) => (
          <Picker.Item key={item.value} label={item.label} value={item.value} />
        ))}
      </Picker>
    </View>
  );
}
