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
import { updateCritic } from '../../redux/actions/critics/updateCritic'
import { getOneCritic } from '../../redux/actions/critics/getOneCritic'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import { useEffect } from 'react'
import { searchCriticByUser } from '../../redux/actions/critics/searchCritic'

const UpdateCritic = ({ route }) => {
  const dispatch = useDispatch()
  const { criticId, userId } = route.params
  const critic = useSelector((state) => state.getOneCritic.data.critic)
  const navigation = useNavigation()

  const [data, setData] = useState({
    title: critic?.title,
    content: critic?.content,
    rate: critic?.rate,
    idMovieOrSerie: critic?.idMovieOrSerie,
    titleMovieOrSerie: critic?.titleMovieOrSerie,
  })

  const handleUpdateCritic = async () => {
    try {
      await dispatch(updateCritic(criticId, data))
      ToastSuccess('success', 'Critique mise à jour avec succès', true)
      dispatch(searchCriticByUser(userId, 1))
      setTimeout(() => {
        navigation.navigate('UserCritics', { userId })
      }, 3000)
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
        <Text style={styles.formLabel}>Critique de {critic?.titleMovieOrSerie}</Text>
        <Text style={styles.formLabel}>Votre titre</Text>
        <TextInput
          style={styles.formInput}
          placeholder='Titre'
          onChangeText={(text) => setData({ ...data, title: text })}
          defaultValue={critic?.title}
        />
        <Text style={styles.formLabel}>Votre critique</Text>
        <TextInput
          style={styles.formInput}
          editable
          multiline
          placeholder='Critique'
          onChangeText={(text) => setData({ ...data, content: text })}
          defaultValue={critic?.content}
        />
        <Text style={styles.formLabel}>Votre note</Text>
        <TextInput
          style={styles.formInput}
          placeholder='Notation'
          onChangeText={(text) => setData({ ...data, rate: text })}
          defaultValue={critic?.rate?.toString()}
          keyboardType='numeric'
        />
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.formButtonLogin}
            onPress={() => handleUpdateCritic()}
          >
            <Text style={styles.buttonText}>Mettre à jour</Text>
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
