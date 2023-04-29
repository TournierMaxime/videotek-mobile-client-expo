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
import { useDispatch } from 'react-redux'

const NewCritic = ({ route }) => {
  const dispatch = useDispatch()
  const { title, id } = route.params

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
      ToastSuccess('success', 'Critique publiée avec succès', true)
    } catch (error) {
      console.log(error.response.data.errMsg)
      ToastError('error', error.response.data.errMsg, false)
    }
  }

  return (
    <ScrollView>
      <View style={styles.formContainer}>
        <Text style={styles.formLabel}>Critique de {title}</Text>
        <Text style={styles.formLabel}>Votre titre</Text>
        <TextInput
          style={styles.formInput}
          placeholder='Titre'
          onChangeText={(text) => setData({ ...data, title: text })}
          value={data.title}
        />
        <Text style={styles.formLabel}>Votre critique</Text>
        <TextInput
          style={styles.formInput}
          editable
          multiline
          placeholder='Critique'
          onChangeText={(text) => setData({ ...data, content: text })}
          value={data.content}
        />
        <Text style={styles.formLabel}>Votre note</Text>
        <TextInput
          style={styles.formInput}
          placeholder='Notation'
          onChangeText={(text) => setData({ ...data, rate: text })}
          value={data.rate}
          keyboardType='numeric'
        />
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.formButtonLogin}
            onPress={() => handleCritic()}
          >
            <Text style={styles.buttonText}>Publier</Text>
          </TouchableOpacity>
          <ToastConfig />
        </View>
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
