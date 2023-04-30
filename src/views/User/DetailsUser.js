import React, { useState, useEffect } from "react"
import { Text, View, TextInput, TouchableOpacity, StyleSheet } from "react-native"
import { updateUser } from '../../redux/actions/users/updateUser'
import { getUser } from '../../redux/actions/users/oneUser'
import { useDispatch, useSelector } from "react-redux"
import { ToastSuccess, ToastError } from '../../utils/Toast'
import ToastConfig from '../../utils/ToastConfig'
import button from '../../styles/components/button'
import form from '../../styles/components/form'

const DetailsUser = ({ route }) => {
  const { userId } = route.params
  const dispatch = useDispatch()
  const user = useSelector((state) => state.oneUser.data.user)

  const [data, setData] = useState({userName: user.userName, email: user.email})

  const handleUpdate = async () => {
    try {    
      await dispatch(updateUser(data, userId))
      ToastSuccess('success', 'Profil mis à jour', true)
      await dispatch(getUser(userId))
    } catch (error) {
      console.log(error.response.data.errMsg)
      ToastError('error', error.response.data.errMsg, true)
    }
  }

  useEffect(() => {
    dispatch(getUser(userId))
  }, [dispatch, userId])

  return (
    <View style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
      <View style={styles.formContainer}>
        <Text style={styles.formLabel}>Votre pseudo</Text>
        <TextInput
          style={styles.formInput}
          placeholder='Pseudo'
          onChangeText={(text) => setData({ ...data, userName: text })}
          defaultValue={user.userName}
        />
        <Text style={styles.formLabel}>Votre email</Text>
        <TextInput
          style={styles.formInput}
          placeholder='Email'
          onChangeText={(text) => setData({ ...data, email: text })}
          defaultValue={user.email}
        />
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.formButtonLogin}
            onPress={() => handleUpdate()
            }
          >
            <Text style={styles.buttonText}>Mettre à jour</Text>
          </TouchableOpacity>
          <ToastConfig />
        </View>
      </View>
      <View style={styles.deleteAccountContainer}>
          <TouchableOpacity
            style={styles.deleteAccount}
            onPress={() => handleUpdate()
            }
          >
            <Text style={styles.buttonText}>Supprimer compte</Text>
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
  deleteAccount: button.deleteAccount,
  deleteAccountContainer: button.deleteAccountContainer
})

export default DetailsUser