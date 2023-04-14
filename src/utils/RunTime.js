import React from 'react';
import {Text} from 'react-native';

export default function Runtime({ time }) {
  const runtime = () => (
    <Text style={{color: 'white'}}>Durée {Math.floor(time / 60) + "H" + (time % 60)}</Text>
  )
  return runtime();
}
