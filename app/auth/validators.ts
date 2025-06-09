type SignUpErrors = {
  username?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
};

const validateEmail = (email: string): boolean =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export function validateLogin(values: { email: string; password: string }) {
  const errors: Partial<{ email: string; password: string }> = {};
  if (!values.email) {
    errors.email = "Email is required.";
  } else if (!validateEmail(values.email)) {
    errors.email = "Please enter a valid email address.";
  }
  if (!values.password) {
    errors.password = "Password is required.";
  }
  return errors;
}

export function validateSignUp(values: {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}): SignUpErrors {
  const errors: SignUpErrors = {};

  if (!values.username) {
    errors.username = "Username is required.";
  } else if (values.username.length < 4) {
    errors.username = "Username must be at least 4 characters.";
  } else if (values.username.length > 50) {
    errors.username = "Username can't exceed 50 characters.";
  }

  if (!values.email) {
    errors.email = "Email is required.";
  } else if (!validateEmail(values.email)) {
    errors.email = "Please enter a valid email address.";
  }

  if (!values.password) {
    errors.password = "Password is required.";
  } else if (values.password.length < 8) {
    errors.password = "Password must be at least 8 characters.";
  }

  if (!values.confirmPassword) {
    errors.confirmPassword = "Please confirm your password.";
  } else if (values.confirmPassword !== values.password) {
    errors.confirmPassword = "Passwords do not match.";
  }

  return errors;
}
