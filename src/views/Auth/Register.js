import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import {createUser} from '../../redux/actions/auth/register';
//import {useNavigation} from '@react-navigation/native';
import button from '../../styles/components/button';
import { ToastSuccess, ToastError } from '../../utils/Toast';
import ToastConfig from '../../utils/ToastConfig';

const RegisterScreen = () => {
  const [data, setData] = useState({userName: '', email: '', password: ''});
  const dispatch = useDispatch();
  //const navigation = useNavigation();

  const handleRegister = async () => {
    try {
      await dispatch(createUser(data));
      ToastSuccess('success', 'Votre compte a bien été créé', true)
      //navigation.navigate('Connexion');
    } catch (error) {
      console.log(error.response.data.errMsg);
      ToastError('error', error.response.data.errMsg, false)
    }
  };

  return (
    <View style={styles.formContainer}>
      <Text style={styles.formLabel}>Votre pseudo</Text>
      <TextInput
        style={styles.formInput}
        placeholder="Pseudo"
        value={data.userName}
        onChangeText={text => setData({...data, userName: text})}
      />
      <Text style={styles.formLabel}>Votre email</Text>
      <TextInput
        style={styles.formInput}
        placeholder="Email"
        value={data.email}
        onChangeText={text => setData({...data, email: text})}
      />
      <Text style={styles.formLabel}>Votre mot de passe</Text>
      <TextInput
        style={styles.formInput}
        placeholder="Mot de passe"
        secureTextEntry
        value={data.password}
        onChangeText={text => setData({...data, password: text})}
      />
      <TouchableOpacity style={styles.formButtonRegister} onPress={handleRegister}>
        <Text style={styles.buttonText}>S&apos;inscrire</Text>
        <ToastConfig />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  formContainer: button.formContainer,
  formLabel: button.formLabel,
  formInput: button.formInput,
  buttonText: button.buttonText,
  formButtonRegister: button.formButtonRegister,
  buttonContainer: button.buttonContainer,
});

export default RegisterScreen;
