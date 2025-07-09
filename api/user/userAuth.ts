import requestMethods from "@/api/request-methods";

export const userAuthApi = {
  getUserInfo: {
    method: requestMethods.get,
    path: () => `/user/info`,
    okMessage: 'User info is fetched',
  },
  registerAccount: {
    method: requestMethods.post,
    path: () => `/user/register`,
    okMessage: `Account is registered`,
  },
  verifyAccount: {
    method: requestMethods.get,
    path: (email: string, code: string) => `/user/register/verify?email=${email}&code=${code}`,
    okMessage: `Account is verified`,
  },
  resendVerify: {
    method: requestMethods.post,
    path: (email: string) => `/user/register/verify/resend?email=${email}`,
    okMessage: `Account is verified`,
  },
  forgetPassword: {
    method: requestMethods.post,
    path: (email: string) => `/user/forget-password?email=${email}`,
    okMessage: `Verification code is sent. Please check your email box.`,
  },
  resetPassword: {
    method: requestMethods.post,
    path: () => `/user/reset-password`,
    okMessage: `Password reset is done. Please login again.`,
  },
  verifyForgetPassword: {
    method: requestMethods.post,
    path: (email: string, code: string) =>
      `/user/forget-password/verify?email=${email}&code=${code}`,
    okMessage: `Verification code is verified.`,
  },
  loginAccount: {
    method: requestMethods.post,
    path: () => `/user/login`,
    okMessage: `Login is successful`,
  },
  loginUserAccount: {
    method: requestMethods.get,
    path: (userId: string) => `/user/login/as?userId=${userId}`,
    okMessage: `Login as user is successful`,
  },
  loginAccountByGoogle: {
    method: requestMethods.post,
    path: () => `/user/login/google`,
    okMessage: `Login is successful`,
  },
};
