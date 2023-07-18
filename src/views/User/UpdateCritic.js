import React, { useState } from 'react'
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native'
import { ToastSuccess, ToastError } from '../../utils/Toast'
import ToastConfig from '../../utils/ToastConfig'
import button from '../../styles/components/button'
import form from '../../styles/components/form'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import { useEffect } from 'react'
import { searchCriticByUser, getOneCritic, updateCritic } from '../../redux/actions/critics'
import { useTranslation } from 'react-i18next'

const UpdateCritic = ({ route }) => {
  const dispatch = useDispatch()
  const { criticId, userId } = route.params
  const critic = useSelector((state) => state.getOneCritic.data.critic)
  const navigation = useNavigation()

  const { t } = useTranslation()

  const [data, setData] = useState({
    title: critic?.title || '',
    content: critic?.content || '',
    rate: critic?.rate || '',
    idMovieOrSerie: critic?.idMovieOrSerie,
    titleMovieOrSerie: critic?.titleMovieOrSerie,
  })

  const handleUpdateCritic = async () => {
    try {
      await dispatch(updateCritic(criticId, data))
      ToastSuccess('success', t('reviewSuccessfullyUpdated'), true)
      dispatch(searchCriticByUser(userId, 1))
      setTimeout(() => {
        navigation.navigate('UserCritics', { userId })
      }, 1500)
    } catch (error) {
      console.log(error.response.data.errMsg)
      ToastError('error', error.response.data.errMsg, false)
    }
  }

  useEffect(() => {
    dispatch(getOneCritic(criticId))
  }, [dispatch, criticId])

  return (
    <View style={styles.formContainer}>
      <Text style={styles.formLabel}>
        {t('criticOf')} {critic?.titleMovieOrSerie}
      </Text>
      <Text style={styles.formLabel}>{t('title')}</Text>
      <TextInput
        style={styles.formInput}
        placeholder={t('title')}
        onChangeText={(text) => setData({ ...data, title: text })}
        defaultValue={critic?.title}
      />
      <Text style={styles.formLabel}>{t('critic')}</Text>
      <TextInput
        style={styles.formInput}
        editable
        multiline
        placeholder={t('critic')}
        onChangeText={(text) => setData({ ...data, content: text })}
        defaultValue={critic?.content}
      />
      <Text style={styles.formLabel}>{t('rate')}</Text>
      <TextInput
        style={styles.formInput}
        placeholder={t('rate')}
        onChangeText={(text) => setData({ ...data, rate: text })}
        defaultValue={critic?.rate?.toString()}
        keyboardType='numeric'
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.formButtonLogin}
          onPress={() => handleUpdateCritic()}
        >
          <Text style={styles.buttonText}>{t('update')}</Text>
        </TouchableOpacity>
        <ToastConfig />
      </View>
    </View>
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

export default UpdateCritic
