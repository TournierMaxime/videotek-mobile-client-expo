import { connect, Provider } from "react-redux";
import React, { Fragment } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AuthScreen from "./src/views/Auth/Auth";
import LoginScreen from "./src/views/Auth/Login";
import ForgetPasswordScreen from "./src/views/Auth/ForgetPassword";
import RegisterScreen from "./src/views/Auth/Register";
import store from "./src/redux/store";
import Header from "./src/components/Layout/Header";
import NowPlaying from "./src/views/Tmdb/Movies/NowPlaying";
import Upcoming from "./src/views/Tmdb/Movies/Upcoming";
import DetailsMovie from "./src/views/Tmdb/Movies/DetailsMovie";
import OnTheAir from "./src/views/Tmdb/Series/OnTheAir";
import Popular from "./src/views/Tmdb/Series/Popular";
import DetailsSerie from "./src/views/Tmdb/Series/DetailsSerie";
import DetailsPeople from "./src/views/Tmdb/People/DetailsPeople";
import Home from "./src/views/Home";

const RootStack = createNativeStackNavigator();

function App({ isAuthenticated }) {
  return (
    <NavigationContainer>
      <RootStack.Navigator>
        {!isAuthenticated ? (
          <Fragment>
            <RootStack.Screen
              name="Home"
              component={Home}
              options={{ header: () => <Header backButton={false} /> }}
            />
            <RootStack.Screen
              name="NowPlaying"
              component={NowPlaying}
              options={{ header: () => <Header backButton={true} /> }}
            />
            <RootStack.Screen
              name="Upcoming"
              component={Upcoming}
              options={{ header: () => <Header backButton={true} /> }}
            />
            <RootStack.Screen
              name="DetailsMovie"
              component={DetailsMovie}
              options={({ route }) => ({
                title: route.params.title,
                header: () => <Header backButton={true} />
              })}
            />
            <RootStack.Screen
              name="OnTheAir"
              component={OnTheAir}
              options={{ header: () => <Header backButton={true} /> }}
            />
            <RootStack.Screen
              name="Popular"
              component={Popular}
              options={{ header: () => <Header backButton={true} /> }}
            />
            <RootStack.Screen
              name="DetailsSerie"
              component={DetailsSerie}
              options={({ route }) => ({
                title: route.params.title,
                header: () => <Header backButton={true} />
              })}
            />
            <RootStack.Screen
              name="DetailsPeople"
              component={DetailsPeople}
              options={({ route }) => ({
                title: route.params.name,
                header: () => <Header backButton={true} />
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
