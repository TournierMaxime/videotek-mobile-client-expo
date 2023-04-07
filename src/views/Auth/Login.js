import React, {useState, useRef, useEffect} from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Text,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {loginUser} from '../../redux/actions/auth/auth';
import {useNavigation} from '@react-navigation/native';
import Toast from 'react-native-toast-message';

const LoginScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const emailInputRef = useRef(null);
  const passwordInputRef = useRef(null);

  const authState = useSelector(state => state.auth);

  const handleSignUp = () => {
    navigation.navigate('Register');
  };
  const handleLogin = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!emailRegex.test(email)) {
      Toast.show({
        type: 'error',
        text1: 'Invalid email',
        visibilityTime: 3000,
        autoHide: true,
      });
      emailInputRef.current.focus();
      return;
    }
    if (!passwordRegex.test(password)) {
      Toast.show({
        type: 'error',
        text1: 'Invalid Password ',
        visibilityTime: 3000,
        autoHide: true,
      });
      passwordInputRef.current.focus();
      return;
    }
    dispatch(loginUser(email, password));
  };

  useEffect(() => {
    if (authState.error) {
      Toast.show({
        type: 'error',
        text1: 'Login failed',
        text2: authState.error,
        visibilityTime: 3000,
        autoHide: true,
      });
    }
  }, [authState.error]);

  const handleForgetPassword = () => {
    navigation.navigate('Password');
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={setEmail}
        value={email}
        keyboardType="email-address"
        ref={emailInputRef}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        onChangeText={setPassword}
        value={password}
        secureTextEntry={true}
        ref={passwordInputRef}
      />
      <View style={styles.container1}>
        <TouchableOpacity style={styles.button1} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button2} onPress={handleSignUp}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.button3} onPress={handleForgetPassword}>
        <Text style={styles.buttonText1}>Forget Password</Text>
      </TouchableOpacity>
      <Toast />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '80%',
    height: 50,
    margin: 10,
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#ccc',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  button1: {
    backgroundColor: '#22C55E',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
    alignItems: 'center',
    marginRight: 10,
  },
  button2: {
    backgroundColor: '#3B82F6',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
    alignItems: 'center',
  },
  button3: {
    alignItems: 'center',
  },

  buttonText1: {
    color: '#EF4444',
    fontSize: 13,
  },
  container1: {
    justifyContent: 'center',
    flexDirection: 'row',
    padding: 5,
  },
});
export default LoginScreen;
