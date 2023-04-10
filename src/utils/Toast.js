import Toast from 'react-native-toast-message';

const ToastSuccess = (type, message, autoHide) => {
  return (
    Toast.show({
      type: type,
      text1: message,
      autoHide: autoHide
    })
  )
}

const ToastInfo = (type, message, autoHide) => {
  return (
    Toast.show({
      type: type,
      text1: message,
      autoHide: autoHide
    })
  )
}

const ToastError = (type, message, autoHide) => {
  return (
    Toast.show({
      type: type,
      text1: message,
      autoHide: autoHide
    })
  )
}

export { ToastSuccess, ToastError, ToastInfo }
