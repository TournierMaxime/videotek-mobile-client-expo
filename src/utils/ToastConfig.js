import React from 'react'
import Toast, { SuccessToast, ErrorToast, InfoToast } from 'react-native-toast-message';
import { View, Text } from 'react-native';
import { moderateScale } from './Responsive'

const ToastConfig = () => {
    const toastConfig = {

        success: (props) => (
          <SuccessToast
            {...props}
            style={{
                borderLeftColor: 'green',
                position: 'absolute',
                bottom: -100
            }}
            contentContainerStyle={{ paddingHorizontal: 15 }}
            text1Style={{
                fontSize: moderateScale(13),
                fontWeight: '400'
            }}
          />
        ),

        info: (props) => {
            <InfoToast 
                {...props}
                style={{
                    borderLeftColor: 'blue',
                    position: 'absolute',
                    bottom: -100
                }}
                contentContainerStyle={{ paddingHorizontal: 15 }}
                text1Style={{
                    fontSize: moderateScale(13),
                    fontWeight: '400'
                }}
            />
        },

        error: (props) => (
          <ErrorToast
            {...props}
            style={{
                borderLeftColor: 'red',
                position: 'absolute',
                bottom: -100
            }}
            contentContainerStyle={{ paddingHorizontal: 15 }}
            text1Style={{
                fontSize: moderateScale(13),
                fontWeight: '400'
            }}
          />
        ),

        tomatoToast: ({ text1, props }) => (
          <View style={{ height: moderateScale(60), width: '100%', backgroundColor: 'tomato' }}>
            <Text>{text1}</Text>
            <Text>{props.uuid}</Text>
          </View>
        )
      };
 return <Toast config={toastConfig} /> 
}

export default ToastConfig;