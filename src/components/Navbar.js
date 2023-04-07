import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useDispatch} from 'react-redux';
import {logoutUser} from '../redux/actions/auth/auth';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

const Navbar = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  const LogoutScreen = () => {
    return null; // You can customize this screen with your own UI
  };

  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Logout"
        component={LogoutScreen}
        listeners={{
          tabPress: e => {
            e.preventDefault();
            handleLogout();
          },
        }}
        options={{
          tabBarIcon: () => <Ionicons name="ios-log-out" size={25} />,
        }}
      />
    </Tab.Navigator>
  );
};

export default Navbar;
