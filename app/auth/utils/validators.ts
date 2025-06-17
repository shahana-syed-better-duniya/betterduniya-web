type SignUpErrors = {
  username?: string;
  firstName?: string;
  middleName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
};

const validateEmail = (email: string): boolean =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const validatePasswords = (values: { password?: string; confirmPassword?: string }) => {
  const errors: { password?: string; confirmPassword?: string } = {};

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
  firstName: string;
  middleName?: string;
  lastName: string;
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

  if (!values.firstName) {
    errors.firstName = "First name is required.";
  } else if (values.firstName.length < 4) {
    errors.firstName = "First name must be at least 4 characters.";
  } else if (values.firstName.length > 150) {
    errors.firstName = "First name can't exceed 150 characters.";
  }

  if (values.lastName.length < 4) {
    errors.lastName = "Middle name must be at least 4 characters.";
  } else if (values.lastName.length > 150) {
    errors.lastName = "Middle name can't exceed 150 characters.";
  }

    if (!values.lastName) {
    errors.lastName = "Last name is required.";
  } else if (values.lastName.length < 4) {
    errors.lastName = "Last name must be at least 4 characters.";
  } else if (values.lastName.length > 150) {
    errors.lastName = "Last name can't exceed 150 characters.";
  }

  if (!values.email) {
    errors.email = "Email is required.";
  } else if (!validateEmail(values.email)) {
    errors.email = "Please enter a valid email address.";
  }
  Object.assign(errors, validatePasswords((values)));
  return errors;
}

export const validateForgotPassword = (values: { email: string }) => {
  const errors: { email?: string } = {};

  if (!values.email || values.email.length === 0) {
    errors.email = "Email is required";
  } else if (!validateEmail(values.email)) {
    errors.email = "Enter a valid email";
  }

  return errors;
};

export function validateResetPassword(values: {
  password: string;
  confirmPassword: string;
}): SignUpErrors {
  return validatePasswords(values);
}
