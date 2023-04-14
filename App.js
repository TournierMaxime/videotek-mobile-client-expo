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
import Upcoming from "./src/views/Tmdb/Movies/Upcoming";
import DetailsMovie from "./src/views/Tmdb/Movies/DetailsMovie";
import OnTheAir from "./src/views/Tmdb/Series/OnTheAir";
import Popular from "./src/views/Tmdb/Series/Popular";
import DetailsSerie from "./src/views/Tmdb/Series/DetailsSerie";

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
              name="A Venir"
              component={Upcoming}
            />
            <RootStack.Screen
              name="Details Movie"
              component={DetailsMovie}
              options={({ route }) => ({
                title: route.params.title,
              })}
            />
            <RootStack.Screen
              name="Série en cours de diffusion"
              component={OnTheAir}
            />
            <RootStack.Screen
              name="Séries populaires"
              component={Popular}
            />
            <RootStack.Screen
              name="Details Serie"
              component={DetailsSerie}
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
