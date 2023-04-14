import React from 'react';
import {Text, View} from 'react-native';

export default function Rate({ rate }) {
  const percent = (rate * 10).toFixed(2);

  const rating = (percent) => {
    if (percent > 1 && percent <= 50) {
        return (
            <View style={{width: 40, height: 40, textAlign:'center', justifyContent: 'center', alignItems: 'center', backgroundColor: 'red', borderRadius: 100, marginTop: 15}}>
                <Text style={{fontWeight: 'bold', color: 'white', fontSize:12 }}>{percent}</Text>
            </View>
          )
    } else if (percent > 50 && percent <= 70) {
        return (
            <View style={{width: 40, height: 40, textAlign:'center', justifyContent: 'center', alignItems: 'center', backgroundColor: 'orange', borderRadius: 100, marginTop: 15}}>
                <Text style={{fontWeight: 'bold', color: 'white', fontSize:12 }}>{percent}</Text>
            </View>
          )
    } else if (percent > 70 && percent <= 100) {
      return (
        <View style={{width: 40, height: 40, textAlign:'center', justifyContent: 'center', alignItems: 'center', backgroundColor: 'green', borderRadius: 100, marginTop: 15}}>
            <Text style={{fontWeight: 'bold', color: 'white', fontSize:12 }}>{percent}</Text>
        </View>
      )
    } else {
      return <Text style={{color: 'white', fontWeight: 'bold'}}>{percent}</Text>
    }
  };
  return rating(percent);
}