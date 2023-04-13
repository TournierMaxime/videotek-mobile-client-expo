import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Ionicons} from 'react-native-vector-icons';
import HomeScreen from "../../views/Home";


const Tab = createBottomTabNavigator();

const Navbar = () => {


  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: () => <Ionicons name="home" size={25} />,
        headerShown:false
        }}
      />
    </Tab.Navigator>
  );
};

export default Navbar;