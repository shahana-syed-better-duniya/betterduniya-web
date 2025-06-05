import React, {useEffect, useState} from "react";
import {ActivityIndicator, Text, TextInput, TouchableOpacity, View} from "react-native";
import {styles} from "@/app/auth/styles";
import {UseStringReturn} from "@/hooks/primitive/use-string";

type SignUpPanelProps = {
  onSignUp: (email: string, username: string, password: string) => Promise<void>;
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
  const [loading, setLoading] = useState(false); // Loading state
  const [success, setSuccess] = useState<string | null>(null); // Success message

  // Validate fields based on backend rules
  useEffect(() => {
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
  }, [username.value, email.value, password.value, confirmPassword.value]);

  const handleBlur = (field: keyof SignUpErrors) => {
    setTouched((prev) => ({...prev, [field]: true}));
  };

  const isFormValid = Object.keys(errors).length === 0;

  const handleSignUp = async () => {
    setSuccess(null); // Reset success message
    setLoading(true); // Show loading indicator
    if (isFormValid) {
      try {
        await onSignUp(email.value, username.value, password.value);
        setSuccess("Registration successful! Please verify your email.");
        username.onChangeValue(""); // Clear form fields
        email.onChangeValue("");
        password.onChangeValue("");
        confirmPassword.onChangeValue("");
      } catch (error) {
        console.error("Sign-up error:", error);
        setErrors((prev) => ({
          ...prev,
          email: "This email is already registered.",
        }));
      }
    }
    setLoading(false); // Hide loading indicator
  };

  return (
    <>
      <View style={styles.inputSection}>
        <TextInput
          style={styles.input}
          placeholder="Username"
          placeholderTextColor="#888"
          value={username.value}
          onChangeText={(v) => username.onChangeValue(v)}
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
          onChangeText={(v) => email.onChangeValue(v)}
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
          onChangeText={(v) => password.onChangeValue(v)}
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
          onChangeText={(v) => confirmPassword.onChangeValue(v)}
          onBlur={() => handleBlur("confirmPassword")}
        />
        {touched.confirmPassword && errors.confirmPassword && (
          <Text style={styles.inputError}>{errors.confirmPassword}</Text>
        )}
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#000"/>
      ) : (
        <TouchableOpacity
          style={[
            styles.loginBtn,
            !isFormValid && {backgroundColor: "#ccc"},
          ]}
          onPress={handleSignUp}
          disabled={!isFormValid}
        >
          <Text style={styles.loginBtnText}>Sign Up</Text>
        </TouchableOpacity>
      )}

      {success && <Text style={styles.successMessage}>{success}</Text>}
    </>
  );
}
