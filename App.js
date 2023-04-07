// import des dépendances
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {connect, Provider} from 'react-redux';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './src/views/Home';
import LoginScreen from './src/views/Auth/Login';
import PasswordScreen from './src/views/Auth/Password';
import RegisterScreen from './src/views/Auth/Register';
import Navbar from './src/components/Navbar';
import store from './src/redux/store';

// création des stacks de navigation
const AuthStack = createNativeStackNavigator();
const MainStack = createNativeStackNavigator();

// composant pour la navigation de l'authentification
function AuthStackNavigator() {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen name="Home" component={HomeScreen} />
      <AuthStack.Screen name="Login" component={LoginScreen} />
      <AuthStack.Screen name="Register" component={RegisterScreen} />
      <AuthStack.Screen name="Password" component={PasswordScreen} />
    </AuthStack.Navigator>
  );
}

// composant pour la navigation principale
function MainStackNavigator() {
  return (
    <MainStack.Navigator>
      <MainStack.Screen name="Navbar" component={Navbar} />
    </MainStack.Navigator>
  );
}

// composant principal connecté à Redux
const App = ({isAuthenticated}) => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        {isAuthenticated ? <MainStackNavigator /> : <AuthStackNavigator />}
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

// fonction pour mapper l'état Redux au composant
const mapStateToProps = (state) => state;

const ConnectedApp = connect(mapStateToProps)(App);

const AppWithRedux = () => (
  <Provider store={store}>
    <ConnectedApp />
  </Provider>
);

export default AppWithRedux;

