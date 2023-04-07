import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import http from '../../services/axios';
import {useDispatch} from 'react-redux';
import Toast from 'react-native-toast-message';

import {
  forgetPassword,
  checkForgetPasswordCode,
  resetPassword,
} from '../../redux/actions/auth/password';

const PasswordScreen = () => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm;
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [step, setStep] = useState(1);
  const dispatch = useDispatch();

  const handleForgetPassword = async () => {
    try {
      if (!emailRegex.test(email)) {
        throw new Error('Please enter a valid email address.');
      }
      await http.post('auth/forget-password-mobile', {email});
      dispatch(forgetPassword(email));
      setStep(2);
      Toast.show({
        type: 'success',
        test1: 'success',
        text2: 'A verification code has been sent to your email address.',
        topOffset: Dimensions.get('window').height / 2 - 25,
      });
    } catch (error) {
      console.log(error);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: error.message,
        topOffset: Dimensions.get('window').height / 2 - 25,
      });
    }
  };

  const handleCheckForgetPasswordCode = async () => {
    try {
      if (!emailRegex.test(email)) {
        throw new Error('Please enter a valid email address.');
      }
      if (!code) {
        throw new Error('Please enter a verification code.');
      }
      await http.post('auth/check-forget-password-code', {
        email,
        code,
      });
      dispatch(checkForgetPasswordCode(email, code));
      setStep(3);
      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: 'Your verification code has been verified successfully.',
        topOffset: Dimensions.get('window').height / 2 - 25,
      });
    } catch (error) {
      console.log(error);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: error.message,
        topOffset: Dimensions.get('window').height / 2 - 25,
      });
    }
  };

  const handleResetPassword = async () => {
    try {
      if (!emailRegex.test(email)) {
        throw new Error('Please enter a valid email address.');
      }
      if (!code) {
        throw new Error('Please enter a verification code.');
      }
      if (!passwordRegex.test(newPassword)) {
        throw new Error(
          'Password must be at least 8 characters long, and include at least one uppercase letter, one lowercase letter, and one number.',
        );
      }
      await http.post('auth/reset-password-mobile', {
        email,
        forgetPassword: code,
        passwordHash: newPassword,
      });
      dispatch(resetPassword(email));
      setStep(4);
      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: 'Your password has been reset successfully.',
        topOffset: Dimensions.get('window').height / 2 - 25,
      });
    } catch (error) {
      console.log(error);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: error.message,
        topOffset: Dimensions.get('window').height / 2 - 25,
      });
    }
  };

  return (
    <View>
      <Toast ref={ref => Toast.setRef(ref)} />

      <View>
        {step === 1 && (
          <View style={styles.formContainer}>
            <Text style={styles.formLabel}>
              Enter your email address to reset your password:
            </Text>
            <TextInput
              style={styles.formInput}
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
            />
            <TouchableOpacity
              style={styles.formButton}
              onPress={handleForgetPassword}>
              <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
          </View>
        )}
        {step === 2 && (
          <View style={styles.formContainer}>
            <Text style={styles.formLabel}>
              A verification code has been sent to your email address.
            </Text>
            <TextInput
              style={styles.formInput}
              placeholder="Verification Code"
              value={code}
              onChangeText={setCode}
            />
            <TouchableOpacity
              style={styles.formButton}
              onPress={handleCheckForgetPasswordCode}>
              <Text style={styles.buttonText}>Submit</Text>{' '}
            </TouchableOpacity>
          </View>
        )}
        {step === 3 && (
          <View style={styles.formContainer}>
            <Text style={styles.formLabel}>Enter your new password:</Text>
            <TextInput
              style={styles.formInput}
              placeholder="New Password"
              secureTextEntry={true}
              value={newPassword}
              onChangeText={setNewPassword}
            />
            <TouchableOpacity
              style={styles.formButton}
              onPress={handleResetPassword}>
              {' '}
              <Text style={styles.buttonText}>Submit</Text>{' '}
            </TouchableOpacity>
          </View>
        )}
        {step === 4 && (
          <View>
            <Text style={styles.formLabel}>
              Your password has been reset successfully.
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  formContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    margin: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  formLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  formInput: {
    backgroundColor: '#f2f2f2',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  formButton: {
    backgroundColor: '#22C55E',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
    alignItems: 'center',
    marginRight: 10,
  },
});

export default PasswordScreen;
