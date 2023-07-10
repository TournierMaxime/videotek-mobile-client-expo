import { moderateScale } from '../../utils/Responsive'

const loginButton = {
  flex: 1,
  padding: 5,
  alignItems: 'center',
  margin: 1,
  backgroundColor: '#00AD4F',
  width: 'auto',
}

const registerButton = {
  flex: 1,
  padding: 5,
  alignItems: 'center',
  margin: 1,
  backgroundColor: '#476EFF',
  width: 'auto',
}

const forgetPasswordButton = {
  flex: 1,
  padding: 5,
  alignItems: 'center',
  margin: 1,
  backgroundColor: '#C90404',
  width: 'auto',
}

const buttonText = {
  color: '#fff',
  fontSize: moderateScale(16),
  fontWeight: 'bold',
}

const buttonContainer = {
  flexDirection: 'row',
  justifyContent: 'center',
}

const formButton = {
  backgroundColor: '#22C55E',
  padding: 10,
  borderRadius: 5,
  alignItems: 'center',
  marginRight: 10,
  width: 'auto',
}

const formButtonRegister = {
  backgroundColor: '#476EFF',
  padding: 10,
  alignItems: 'center',
  marginRight: 10,
  width: 'auto',
  borderRadius: 5,
}

const formButtonLogin = {
  backgroundColor: '#00AD4F',
  padding: 10,
  borderRadius: 5,
  alignItems: 'center',
  marginRight: 10,
  width: 'auto',
}

const formButtonForgetPassword = {
  backgroundColor: '#C90404',
  padding: 10,
  alignItems: 'center',
  marginRight: 10,
  width: 'auto',
  borderRadius: 5,
}

const orderButton = {
  padding: 5,
  alignItems: 'center',
  margin: 10,
  backgroundColor: '#476EFF',
}

const criticButton = {
  padding: 5,
  alignItems: 'center',
  margin: 10,
  backgroundColor: '#476EFF',
  width: 'auto',
}

const deleteButton = {
  padding: 5,
  width: 'auto',
  backgroundColor: 'red',
}

const cancelButton = {
  padding: 5,
  width: 'auto',
  backgroundColor: '#476EFF',
}

const deleteAccount = {
  padding: 5,
  backgroundColor: 'red',
}

const deleteAccountContainer = {
  alignItems: 'center',
}

const trashButton = {
  padding: 5,
  width: moderateScale(40),
  alignItems: 'center',
}

const threeDots = {
  padding: 10,
  right: 0,
  top: 5,
}

export default {
  threeDots,
  cancelButton,
  deleteAccountContainer,
  deleteAccount,
  deleteButton,
  orderButton,
  formButtonForgetPassword,
  formButtonLogin,
  formButtonRegister,
  formButton,
  loginButton,
  registerButton,
  forgetPasswordButton,
  buttonText,
  buttonContainer,
  criticButton,
  trashButton,
}
