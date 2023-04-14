import { connect, Provider } from "react-redux";
import React, { Fragment } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AuthScreen from "./src/views/Auth/Auth";
import LoginScreen from "./src/views/Auth/Login";
import ForgetPasswordScreen from "./src/views/Auth/ForgetPassword";
import RegisterScreen from "./src/views/Auth/Register";
import Navbar from "./src/components/Layout/Navbar";
import store from "./src/redux/store";
import Header from "./src/components/Layout/Header";
import NowPlaying from "./src/views/Tmdb/Movies/NowPlaying";
import DetailsMovie from "./src/views/Tmdb/Movies/DetailsMovie";

const RootStack = createNativeStackNavigator();

function App({ isAuthenticated }) {
  return (
    <NavigationContainer>
      <RootStack.Navigator>
        {!isAuthenticated ? (
          <Fragment>
            <RootStack.Screen
              name="Main"
              component={Navbar}
              options={{ header: () => <Header /> }}
            />
            <RootStack.Screen
              name="En ce moment"
              component={NowPlaying}
            />
            <RootStack.Screen
              name="Details Movie"
              component={DetailsMovie}
              options={({ route }) => ({
                title: route.params.title,
              })}
            />
          </Fragment>
        ) : (
          <Fragment>
            <RootStack.Screen name="Auth" component={AuthScreen} />
            <RootStack.Screen name="Login" component={LoginScreen} />
            <RootStack.Screen name="Register" component={RegisterScreen} />
            <RootStack.Screen name="ForgetPassword" component={ForgetPasswordScreen} />
          </Fragment>
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

const ConnectedApp = connect(mapStateToProps)(App);

const AppWithRedux = () => (
  <Provider store={store}>
    <ConnectedApp />
  </Provider>
);

export default AppWithRedux;
