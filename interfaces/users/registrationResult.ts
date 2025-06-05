export interface RegistrationResult {
  isEmailValid: boolean;
  isPasswordValid: boolean;
  isUsernameValid: boolean;
  isEmailDuplicated: boolean;
  isRegisterOk: boolean;
  isRegistered: boolean;
  testVerifyUrl: string;
}
