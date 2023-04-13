import React from 'react';
import { View, Image } from 'react-native';

export default function Header() {

  return (
    <View style={{alignItems: 'center'}}>
        <Image style={{width: 300, height: 150, resizeMode: 'contain'}} source={require('../../assets/image/videotek_logo.webp')} />
    </View>
  );

}