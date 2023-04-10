import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Text,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {loginUser} from '../../redux/actions/auth/auth';
import {useNavigation} from '@react-navigation/native';
import button from '../../styles/components/button';
import { ToastSuccess, ToastError } from '../../utils/Toast';
import ToastConfig from '../../utils/ToastConfig';

const LoginScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [data, setData] = useState({email: '', password: ''})

  const handleLogin = async () => {
    try {
      await dispatch(loginUser(data));
      ToastSuccess('success', 'Connexion réussie', true)
    } catch(error) {
      console.log(error.response.data.errMsg);
      ToastError('error', error.response.data.errMsg, false)
    }
  };

  const handleForgetPassword = () => {
    navigation.navigate('Mot de passe oublié');
  };

  return (
    <View style={styles.formContainer}>
      <Text style={styles.formLabel}>Votre email</Text>
      <TextInput
        style={styles.formInput}
        placeholder="Email"
        onChangeText={text => setData({...data, email: text})}
        value={data.email}
      />
      <Text style={styles.formLabel}>Votre mot de passe</Text>
      <TextInput
        style={styles.formInput}
        placeholder="Mot de passe"
        onChangeText={text => setData({...data, password: text})}
        value={data.password}
        secureTextEntry={true}
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.formButtonLogin} onPress={handleLogin}>
          <Text style={styles.buttonText}>Connexion</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.formButtonForgetPassword} onPress={handleForgetPassword}>
          <Text style={styles.buttonText}>Mot de passe oublié</Text>
        </TouchableOpacity>
        <ToastConfig />
      </View>
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
  formButtonLogin: button.formButtonLogin,
  formButtonForgetPassword: button.formButtonForgetPassword
});
export default LoginScreen;
