import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {createUser} from '../../redux/actions/auth/register';
import {useNavigation} from '@react-navigation/native';

const RegisterScreen = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const error = useSelector(state => state.auth.error);

  const cameraLaunch = () => {
    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    launchCamera(options, res => {
      console.log('Response = ', res);
      if (res.didCancel) {
        console.log('User cancelled image picker');
      } else if (res.error) {
        console.log('ImagePicker Error: ', res.error);
      } else if (res.customButton) {
        console.log('User tapped custom button: ', res.customButton);
        alert(res.customButton);
      } else {
        console.log('response', JSON.stringify(res));
        setProfilePicture({
          uri: res.assets[0].uri,
          name: res.assets[0].fileName,
          type: res.assets[0].type,
        });
      }
    });
  };

  const imageGalleryLaunch = () => {
    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    launchImageLibrary(options, res => {
      console.log('Response = ', res);
      if (res.didCancel) {
        console.log('User cancelled image picker');
      } else if (res.error) {
        console.log('ImagePicker Error: ', res.error);
      } else if (res.customButton) {
        console.log('User tapped custom button: ', res.customButton);
        alert(res.customButton);
      } else {
        console.log('response', JSON.stringify(res));
        setProfilePicture({
          uri: res.assets[0].uri,
          name: res.assets[0].fileName,
          type: res.assets[0].type,
        });
      }
    });
  };

  const handleRegister = async () => {
    const formData = new FormData();
    formData.append('firstName', firstName);
    formData.append('lastName', lastName);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('profilePicture', profilePicture);
    try {
      await dispatch(createUser(formData));
      // Si l'enregistrement réussit, redirigez l'utilisateur vers la page de connexion.
      navigation.navigate('Login');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>
      <TextInput
        style={styles.input}
        placeholder="First name"
        value={firstName}
        onChangeText={setFirstName}
      />
      <TextInput
        style={styles.input}
        placeholder="Last name"
        value={lastName}
        onChangeText={setLastName}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      {profilePicture && (
        <Image
          source={{uri: profilePicture.uri}}
          style={styles.profilePicture}
        />
      )}
      <TouchableOpacity style={styles.imagePicker} onPress={cameraLaunch}>
        <Text style={styles.imagePickerText}>Take a photo</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.imagePicker} onPress={imageGalleryLaunch}>
        <Text style={styles.imagePickerText}>Choose from gallery</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button1} onPress={handleRegister}>
        <Text style={styles.imagePickerText}>Register</Text>
      </TouchableOpacity>
      {error && <Text style={styles.errorText}>{error}</Text>}
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
  button1: {
    backgroundColor: '#22C55E',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
    alignItems: 'center',
    marginRight: 10,
  },
  profilePicture: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginVertical: 20,
  },
  imagePicker: {
    backgroundColor: '#1E90FF',
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
  },
  imagePickerText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default RegisterScreen;
