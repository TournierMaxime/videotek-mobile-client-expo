import { videotekApi as http } from "./axios.js"

const Register = async (data: any) => {
  const response = await http.post("/auth/register", data)
  return response
}

const Login = async (data: any) => {
  const response = await http.post("/auth/login", data)
  return response
}

const Logout = async () => {
  await http.post("/auth/logout", {}, { withCredentials: true })
  return {}
}

const ConfirmEmail = async (userId: string, data: any) => {
  const response = await http.post(`/auth/verify/${userId}`, data)
  return response
}

const VerifyAppleToken = async (identityToken: string) => {
  const response = await http.post(`/auth/verify-apple-token`, identityToken)
  return response
}

const ForgetPasswordMobile = async (data: any) => {
  const response = await http.post(`/auth/forget-password-mobile`, data)
  return response
}

const CheckForgetPasswordCodeMobile = async (data: any) => {
  const response = await http.post(
    `/auth/check-forget-password-code-mobile`,
    data,
  )
  return response
}

const ResetPasswordMobile = async (data: any) => {
  const response = await http.post(`/auth/reset-password-mobile`, data)
  return response
}
export {
  Register,
  Login,
  Logout,
  ConfirmEmail,
  VerifyAppleToken,
  ForgetPasswordMobile,
  CheckForgetPasswordCodeMobile,
  ResetPasswordMobile,
}
