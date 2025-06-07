import {ActivityIndicator, Image, Text, TextInput, TouchableOpacity, View} from "react-native";
import React, {useEffect, useState} from "react";
import {styles} from "@/app/auth/styles";
import useString from "@/hooks/primitive/use-string";
import {userApi} from "@/api/user/user";
import useRequest from "@/hooks/api/use-request";
import {UserLoginSuccessInfo} from "@/interfaces/users/userLoginSuccessInfo";
import {router} from "expo-router";

const defaultErrors = {email: '', password: ''};

function LogInPanel() {
  const {onRequest} = useRequest<UserLoginSuccessInfo>()
  const email = useString("");
  const password = useString("");

  const [touched, setTouched] = useState({username: false, password: false});
  const [errors, setErrors] = useState(defaultErrors);
  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState("");

  const onForgotPassword = () => {
  };
  const onSocialPress = (provider: string) => {
  };

  useEffect(() => {
    const newErrors = {email: '', password: ''};

    if (!email.value.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!password.value.trim()) {
      newErrors.password = "Password is required.";
    }

    setErrors(newErrors);
  }, [email.value, password.value]);

  const isFormValid = errors.email == "" && errors.password == "";

  const handleBlur = (field) => {
    setTouched((prev) => ({...prev, [field]: true}));
  };

  const onLogin = async () => {
    setLoginError("");
    setLoading(true);

    if (!isFormValid) {
      setLoading(false);
      return;
    }

    try {
      const body = {
        email: email.value,
        password: password.value,
      };
      const response = await onRequest(userApi.loginAccount, [], body, false);
      const userInfo = response.result;
      if (userInfo?.accessToken != '') {
        router.replace('/(tabs)/home-screen')
      } else {
        setLoginError("Email or password is invalid. Please try again.");
      }

      console.log("User Login Success:", userInfo);
    } catch (error) {
      console.error("Login failed:", error);
      setLoginError("Invalid credentials. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <View style={styles.inputSection}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#888"
          value={email.value}
          onChangeText={email.onChangeValue}
          onBlur={() => handleBlur("username")}
          autoCapitalize="none"
        />
        {touched.username && errors.email && (
          <Text style={styles.inputError}>{errors.email}</Text>
        )}

        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#888"
          secureTextEntry
          value={password.value}
          onChangeText={password.onChangeValue}
          onBlur={() => handleBlur("password")}
        />
        {touched.password && errors.password && (
          <Text style={styles.inputError}>{errors.password}</Text>
        )}

        <TouchableOpacity onPress={onForgotPassword} style={styles.forgotPassword}>
          <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#000"/>
      ) : (
        <TouchableOpacity
          style={[styles.loginBtn, !isFormValid && {backgroundColor: "#ccc"}]}
          onPress={onLogin}
          disabled={!isFormValid}
        >
          <Text style={styles.loginBtnText}>Log In</Text>
        </TouchableOpacity>
      )}

      {loginError && <Text style={styles.inputError}>{loginError}</Text>}

      <Text style={styles.orText}>Or Continue with</Text>
      <View style={styles.socialRow}>
        <TouchableOpacity onPress={() => onSocialPress("google")}>
          <Image source={require("@/assets/images/google.png")} style={styles.socialIcon}/>
        </TouchableOpacity>
      </View>
    </>
  );
}

export default LogInPanel;
