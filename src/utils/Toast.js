import React, {forwardRef} from 'react';
import Toast from 'react-native-toast-message';

const ToastWithRef = forwardRef((props, ref) => {
  return <Toast {...props} ref={ref} />;
});

export default ToastWithRef;
