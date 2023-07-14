import React, { useState } from 'react'
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native'
import { ToastSuccess, ToastError } from '../../utils/Toast'
import ToastConfig from '../../utils/ToastConfig'
import button from '../../styles/components/button'
import form from '../../styles/components/form'
import { createCritic } from '../../redux/actions/critics/createCritic'
import { searchCritic } from '../../redux/actions/critics/searchCritic'
import { useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { useNavigation } from '@react-navigation/native'
import { moderateScale } from '../../utils/Responsive'

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
      ToastSuccess('success', t('reviewSuccessfullyPublished'), true)
      dispatch(searchCritic(id, 1))
      setTimeout(() => {
        navigation.navigate('AllCritics', {
          title: data.titleMovieOrSerie,
          id: data.idMovieOrSerie,
        })
      }, 200)
    } catch (error) {
      console.log(error.response.data.errMsg)
      ToastError('error', error.response.data.errMsg, false)
    }
  }

  return (
    <ScrollView style={styles.formContainer}>
      <Text style={styles.formLabel}>
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
        style={styles.formInput}
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
        <ToastConfig />
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
