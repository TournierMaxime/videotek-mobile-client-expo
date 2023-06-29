import React, { useState, useEffect } from 'react'
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Button,
  Image,
} from 'react-native'
import { updateUser, resetUser } from '../../redux/actions/users/updateUser'
import { getUser } from '../../redux/actions/users/oneUser'
import { useDispatch, useSelector } from 'react-redux'
import { ToastSuccess, ToastError } from '../../utils/Toast'
import ToastConfig from '../../utils/ToastConfig'
import button from '../../styles/components/button'
import form from '../../styles/components/form'
import { deleteUser } from '../../redux/actions/users/deleteUser'
import { logoutUser } from '../../redux/actions/auth/auth'
import { useNavigation } from '@react-navigation/native'
import AlertModal from '../../utils/AlertModal'
import * as ImagePicker from 'expo-image-picker'

const DetailsUser = ({ route }) => {
  const { userId } = route.params
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const user = useSelector((state) => state.oneUser.data.user)
  console.log(user?.image)
  const [data, setData] = useState({
    userName: user?.userName || "",
    email: user?.email || "",
    image: user?.image|| "",
  })

  const [modalVisible, setModalVisible] = useState(false)

  const handleModal = () => {
    setModalVisible(!modalVisible)
  }

  const handleUpdate = async () => {
    try {
      // create a new FormData object
      const formData = new FormData()

      // append text data
      formData.append('userName', data.userName)
      formData.append('email', data.email)

      // append the image only if it's present
        const imageUriParts = data.image.split('.')
        const fileType = imageUriParts[imageUriParts.length - 1]

        let file = {
          uri: data.image,
          name: `image.${fileType}`,
          type: `image/${fileType}`,
        }

        // append the image to the form data
        formData.append('image', file)
      

      // send the request
      await dispatch(updateUser(formData, userId)) // make sure your updateUser action sends the data as is, and sets 'Content-Type': 'multipart/form-data'
      ToastSuccess('success', 'Profil mis à jour', true)
      await dispatch(getUser(userId))
    } catch (error) {
      console.log(error.response.data.errMsg)

      if (error.response && error.response.data && error.response.data.errMsg) {
        ToastError('error', error.response.data.errMsg, true)
      } else {
        ToastError('error', "Une erreur s'est produite", true)
      }
    }
  }

  const handleDelete = async () => {
    try {
      await dispatch(deleteUser(userId))
      ToastSuccess('success', 'Compte supprimé avec succès', true)

      setTimeout(async () => {
        await dispatch(logoutUser())
        navigation.navigate('Home')
      }, 3000)
    } catch (error) {
      console.log(error.response.data.errMsg)
      ToastError('error', error.response.data.errMsg, true)
    }
  }

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    })

    if (!result.canceled) {
      setData({
        ...data,
        image: result.assets[0].uri,
      })
    }
  }

  /*   const removeImage = (index) => {
    const updatedImages = data.image.filter((_, i) => i !== index)
    setData({ ...data, image: updatedImages })
  } */

  useEffect(() => {
    dispatch(getUser(userId))
  }, [dispatch, userId])

    useEffect(() => {
    return () => {
      dispatch(resetUser())
    }
  }, [])

  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <View style={styles.formContainer}>
        <Text style={styles.formLabel}>Votre pseudo</Text>
        <TextInput
          style={styles.formInput}
          placeholder='Pseudo'
          onChangeText={(text) => setData({ ...data, userName: text })}
          defaultValue={user?.userName}
        />
        <Text style={styles.formLabel}>Votre email</Text>
        <TextInput
          style={styles.formInput}
          placeholder='Email'
          onChangeText={(text) => setData({ ...data, email: text })}
          defaultValue={user.email}
        />
        <Text style={styles.formLabel}>Votre avatar</Text>
        <Image source={{ uri: `${data.image}?t=${new Date().getTime()}` }} style={{ width: 48, height: 48 }} />
        <View style={{ marginTop: 15 }}>
          <Button title='Changer Avatar' onPress={() => pickImage()} />
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.formButtonLogin}
            onPress={() => handleUpdate()}
          >
            <Text style={styles.buttonText}>Mettre à jour</Text>
          </TouchableOpacity>
          <ToastConfig />
        </View>
      </View>

      <AlertModal
        message={'Etes vous sur de vouloir supprimer votre compte ?'}
        action={handleDelete}
        visible={modalVisible}
        setVisible={setModalVisible}
      />
      <View style={styles.deleteAccountContainer}>
        <TouchableOpacity
          style={styles.deleteAccount}
          onPress={() => handleModal()}
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
  deleteAccountContainer: button.deleteAccountContainer,
})

export default DetailsUser
