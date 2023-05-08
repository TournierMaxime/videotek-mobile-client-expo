import { videotekApi as http } from "./axios.js";

const Register = async (data) => {
    const response = await http.post("/auth/register", data);
    return response;
};

const Login = (data) => {
  return http.post("/auth/login", data, { withCredentials: true });
};

const LoginWithUserId = (data) => {
  return http.post("/auth/login-with-userId", data, { withCredentials: true });
};

const ForgetPasswordReq = async (data) => {
  const response = await http.post("/auth/forget-password", data);
  return response;
};

const ResetPasswordReq = async (data, token) => {
  const response = await http.put(`/auth/reset-password/${token}`, data);
  return response;
};

const Logout = async () => {
  await http.post("/auth/logout", {}, { withCredentials: true });
  return {};
};

const ConfirmEmail = async (userId, data) => {
  const response = await http.post(`/auth/verify/${userId}`, data);
  return response
};

const ForgetPasswordMobile = async (data) => {
  const response = await http.post(`/auth/forget-password-mobile`, data);
  return response
};

const CheckForgetPasswordCodeMobile = async (data) => {
  const response = await http.post(`/auth/check-forget-password-code-mobile`, data);
  return response
};

const ResetPasswordMobile = async (data) => {
  const response = await http.post(`/auth/reset-password-mobile`, data);
  return response
};
export {
  Register,
  Login,
  LoginWithUserId,
  ForgetPasswordReq,
  ResetPasswordReq,
  Logout,
  ConfirmEmail,
  ForgetPasswordMobile,
  CheckForgetPasswordCodeMobile,
  ResetPasswordMobile
};
