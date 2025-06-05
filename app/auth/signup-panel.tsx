import React, {useState} from "react";
import {Text, TextInput, TouchableOpacity, View} from "react-native";
import {styles} from "@/app/auth/styles";
import {UseStringReturn} from "@/hooks/primitive/use-string";

type SignUpPanelProps = {
  onSignUp: (email: string, username: string, password: string) => void;
  onSocialPress?: (provider: string) => void;
  username: UseStringReturn;
  email: UseStringReturn;
  password: UseStringReturn;
  confirmPassword: UseStringReturn;
};

type SignUpErrors = {
  username?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
};

const validateEmail = (email: string): boolean =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export default function SignUpPanel({
                                      onSignUp,
                                      username,
                                      email,
                                      password,
                                      confirmPassword,
                                    }: SignUpPanelProps) {
  const [touched, setTouched] = useState<Partial<Record<keyof SignUpErrors, boolean>>>({});
  const [errors, setErrors] = useState<SignUpErrors>({});

  // Validate fields based on backend rules
  const validate = (): SignUpErrors => {
    const newErrors: SignUpErrors = {};
    // Username
    if (!username.value) {
      newErrors.username = "Username is required.";
    } else if (username.value.length < 4) {
      newErrors.username = "Username must be at least 4 characters.";
    } else if (username.value.length > 50) {
      newErrors.username = "Username can't exceed 50 characters.";
    }
    // Email
    if (!email.value) {
      newErrors.email = "Email is required.";
    } else if (!validateEmail(email.value)) {
      newErrors.email = "Please enter a valid email address.";
    }
    // Password
    if (!password.value) {
      newErrors.password = "Password is required.";
    } else if (password.value.length < 8) {
      newErrors.password = "Password must be at least 8 characters.";
    }
    // Confirm Password
    if (!confirmPassword.value) {
      newErrors.confirmPassword = "Please confirm your password.";
    } else if (confirmPassword.value !== password.value) {
      newErrors.confirmPassword = "Passwords do not match.";
    }
    setErrors(newErrors);
    return newErrors;
  };

  const handleBlur = (field: keyof SignUpErrors) => {
    setTouched(prev => ({...prev, [field]: true}));
    validate();
  };

  const handleSignUp = () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {
      onSignUp(username.value, email.value, password.value);
    }
  };

  return (
    <>
      <View style={styles.inputSection}>
        <TextInput
          style={styles.input}
          placeholder="Username"
          placeholderTextColor="#888"
          value={username.value}
          onChangeText={v => {
            username.onChangeValue(v);
            if (touched.username) validate();
          }}
          onBlur={() => handleBlur("username")}
          autoCapitalize="none"
        />
        {touched.username && errors.username && (
          <Text style={styles.inputError}>{errors.username}</Text>
        )}

        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#888"
          value={email.value}
          onChangeText={v => {
            email.onChangeValue(v);
            if (touched.email) validate();
          }}
          onBlur={() => handleBlur("email")}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        {touched.email && errors.email && (
          <Text style={styles.inputError}>{errors.email}</Text>
        )}

        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#888"
          secureTextEntry
          value={password.value}
          onChangeText={v => {
            password.onChangeValue(v);
            if (touched.password) validate();
          }}
          onBlur={() => handleBlur("password")}
        />
        {touched.password && errors.password && (
          <Text style={styles.inputError}>{errors.password}</Text>
        )}

        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          placeholderTextColor="#888"
          secureTextEntry
          value={confirmPassword.value}
          onChangeText={v => {
            confirmPassword.onChangeValue(v);
            if (touched.confirmPassword) validate();
          }}
          onBlur={() => handleBlur("confirmPassword")}
        />
        {touched.confirmPassword && errors.confirmPassword && (
          <Text style={styles.inputError}>{errors.confirmPassword}</Text>
        )}
      </View>

      <TouchableOpacity
        style={[
          styles.loginBtn,
          Object.keys(errors).length > 0 && {backgroundColor: "#ccc"},
        ]}
        onPress={handleSignUp}
        disabled={Object.keys(errors).length > 0}
      >
        <Text style={styles.loginBtnText}>Sign Up</Text>
      </TouchableOpacity>
    </>
  );
}
