import React from 'react';
import {Text, View, StyleSheet} from 'react-native';

const Rate = ({ rate }) => {
  const percent = (rate * 10).toFixed(0);

  const rating = (percent) => {
    if (percent > 1 && percent <= 50) {
        return (
            <View style={[styles.viewContainer, { backgroundColor: 'red' }]}>
                <Text style={styles.textContent}>{percent}</Text>
            </View>
          )
    } else if (percent > 50 && percent <= 70) {
        return (
            <View style={[styles.viewContainer, { backgroundColor: 'orange' }]}>
                <Text style={styles.textContent}>{percent}</Text>
            </View>
          )
    } else if (percent > 70 && percent <= 100) {
      return (
        <View style={[styles.viewContainer, { backgroundColor: 'green' }]}>
            <Text style={styles.textContent}>{percent}</Text>
        </View>
      )
    } else {
      return <Text style={styles.textContent}>{percent}</Text>
    }
  };
  return rating(percent);
}

const styles = StyleSheet.create({
  viewContainer: {
    width: 40,
    height: 40,
    textAlign:'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
    borderRadius: 5
  },
  textContent: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 20
  }
})

export default Rate