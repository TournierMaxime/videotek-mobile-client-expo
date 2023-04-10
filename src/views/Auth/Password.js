import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {
  forgetPassword,
  checkForgetPasswordCode,
  resetPassword,
} from '../../redux/actions/auth/password';
import button from '../../styles/components/button';
import { ToastSuccess, ToastError } from '../../utils/Toast';
import ToastConfig from '../../utils/ToastConfig';

const PasswordScreen = () => {
  const [email, setEmail] = useState('')
  const [code, setCode] = useState('');
  const [password, setPassword] = useState({password: '', confirmPassword: ''})
  const [step, setStep] = useState(1);
  const dispatch = useDispatch();

  const handleForgetPassword = async () => {
    try {
      await dispatch(forgetPassword({email}));
      ToastSuccess('success', 'Un code de vérification vous a été envoyé par email.', true)
      setStep(2)
    } catch (error) {
      console.log(error.response.data.errMsg);
      ToastError('error', error.response.data.errMsg, false)
    }
  };

  const handleCheckForgetPasswordCode = async () => {
    try {
      await dispatch(checkForgetPasswordCode({email, code}));
      ToastSuccess('success', 'Votre code de vérification a bien été validé.', true)
      setStep(3)
    } catch (error) {
      console.log(error.response.data.errMsg);
      ToastError('error', error.response.data.errMsg, false)
    }
  };


  const handleResetPassword = async () => {
    try {
      await dispatch(resetPassword({email, password: password.password, confirmPassword: password.confirmPassword}));
      ToastSuccess('success', 'Votre mot de passe à été rénitialisé avec succès.', false)
      setStep(4)
    } catch (error) {
      console.log(error.response.data.errMsg);
      ToastError('error', error.response.data.errMsg, false)
    }
  };

  return (
    <View>
      <View>
        {step === 1 && (
          <View style={styles.formContainer}>
            <Text style={styles.formLabel}>
              Entrez votre adresse mail
            </Text>
            <TextInput
              style={styles.formInput}
              placeholder="Email"
              value={email}
              onChangeText={text => setEmail(text)}
            />
            <TouchableOpacity
              style={styles.formButton}
              onPress={handleForgetPassword}>
              <Text style={styles.buttonText}>Envoyer</Text>
              <ToastConfig />
            </TouchableOpacity>
          </View>
        )}
        {step === 2 && (
        <View style={styles.formContainer}>
          <Text style={styles.formLabel}>
              Entrez votre code de vérification
            </Text>
          <TextInput
            placeholder="Code de vérification"
            style={styles.formInput}
            value={code}
            onChangeText={text => setCode(text)}
          />
          <TouchableOpacity
            style={styles.formButton}
            onPress={handleCheckForgetPasswordCode}
          >
            <Text style={styles.buttonText}>Valider</Text>
            <ToastConfig />
          </TouchableOpacity>
        </View>
      )}

        {step === 3 && (
          <View style={styles.formContainer}>
            <Text style={styles.formLabel}>Entrez votre nouveau mot de passe</Text>
            <TextInput
              style={styles.formInput}
              placeholder="Mot de passe"
              secureTextEntry={true}
              value={password.password}
              onChangeText={text => setPassword({...password, password: text})}
            />
            <TextInput
              style={styles.formInput}
              placeholder="Confirmez mot de passe"
              secureTextEntry={true}
              value={password.confirmPassword}
              onChangeText={text => setPassword({...password, confirmPassword: text})}
            />
            <TouchableOpacity
              style={styles.formButton}
              onPress={handleResetPassword}>

              <Text style={styles.buttonText}>Envoyer</Text>
              <ToastConfig />
            </TouchableOpacity>
          </View>
        )}
        {step === 4 && (
          <View style={styles.formContainer}>
            <Text style={styles.formLabel}>
              Votre mot de passe a bien été rénitialisé.
            </Text>
            <ToastConfig />
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  formContainer: button.formContainer,
  formLabel: button.formLabel,
  formInput: button.formInput,
  buttonText: button.buttonText,
  formButton: button.formButton,
});

export default PasswordScreen;
