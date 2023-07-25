import React, { useState } from 'react'
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native'
import button from '../../styles/components/button'
import form from '../../styles/components/form'
import { searchCritic, createCritic } from '../../redux/actions/critics'
import { useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { useNavigation } from '@react-navigation/native'
import { moderateScale } from '../../utils/Responsive'
import { AlertMessage } from '../../utils/AlertMessage'

const NewCritic = ({ route }) => {
  const dispatch = useDispatch()
  const { title, id } = route.params
  const navigation = useNavigation()

  const { t } = useTranslation()

  const [data, setData] = useState({
    title: '',
    content: '',
    rate: null,
    idMovieOrSerie: id,
    titleMovieOrSerie: title,
  })

  const handleCritic = async () => {
    try {
      await dispatch(createCritic(data))
      AlertMessage(t('reviewSuccessfullyPublished'))
      dispatch(searchCritic(id, { page: 1 }))
      setTimeout(() => {
        navigation.navigate('AllCritics', {
          title: data.titleMovieOrSerie,
          id: data.idMovieOrSerie,
        })
      }, 200)
    } catch (error) {
      console.log(error.response.data.errMsg)
      AlertMessage(error.response.data.errMsg)
    }
  }

  return (
    <ScrollView style={styles.formContainer}>
      <Text style={{fontSize: moderateScale(16), marginBottom: moderateScale(15)}}>
        {t('criticOf')} {title}
      </Text>
      <Text style={styles.formLabel}>{t('title')}</Text>
      <TextInput
        style={styles.formInput}
        placeholder={t('title')}
        onChangeText={(text) => setData({ ...data, title: text })}
        value={data.title}
      />
      <Text style={styles.formLabel}>{t('critic')}</Text>
      <TextInput
        style={[styles.formInput, { height: moderateScale(300), textAlignVertical: 'top' }]}
        editable
        multiline
        placeholder={t('critic')}
        onChangeText={(text) => setData({ ...data, content: text })}
        value={data.content}
      />
      <Text style={styles.formLabel}>{t('rate')}</Text>
      <TextInput
        style={styles.formInput}
        placeholder={t('rate')}
        onChangeText={(text) => setData({ ...data, rate: text })}
        value={data.rate}
        keyboardType='numeric'
      />
      <View style={[styles.buttonContainer, { paddingBottom: moderateScale(50) }]}>
        <TouchableOpacity
          style={styles.formButtonLogin}
          onPress={() => handleCritic()}
        >
          <Text style={styles.buttonText}>{t('publish')}</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  formContainer: form.formContainer,
  formLabel: form.formLabel,
  formInput: form.formInput,
  buttonText: button.buttonText,
  formButtonRegister: button.formButtonRegister,
  buttonContainer: button.buttonContainer,
  formButtonLogin: button.formButtonLogin,
  formButtonForgetPassword: button.formButtonForgetPassword,
})

export default NewCritic
