import React from "react";
import {ActivityIndicator, Image, Text, TextInput, TouchableOpacity, View} from "react-native";
import {styles} from "@/app/auth/utils/styles";
import {useForm} from "@/hooks/interaction/use-form";
import {validateLogin} from "@/app/auth/utils/validators";
import useLogin from "@/app/auth/hooks/use-login";
import {router} from "expo-router";
import useString from "@/hooks/primitive/use-string";
import {useBoolean} from "@/hooks/primitive/use-boolean";
import ForgotPasswordScreen from "@/app/auth/forget-password-screen";
import {useUserContext} from "@/utils/user/user-context";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LogInPanel() {
  const {onLogin, isLoading,} = useLogin();
  const loginError = useString("");
  const isForgetPassword = useBoolean(false);

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    isValid,
    setErrors,
    resetForm,
  } = useForm({
    initialValues: {
      email: "",
      password: "",
    },
    validate: validateLogin,
  });


  const {setUserContext} = useUserContext();
  const handleLogin = async () => {
    loginError.onClear();
    if (isValid) {
      try {
        const userInfo = await onLogin(values.email, values.password);
        if (userInfo != null) {
          setUserContext({
            userId: userInfo.userId,
            username: userInfo.userName,
            personalName: userInfo.personalName,
            userRole: userInfo.userRole
          });
          if (userInfo.accessToken.length > 0) {
            await AsyncStorage.setItem('token', userInfo.accessToken);
            router.replace('/(tabs)/home-screen')
          } else {
            loginError.onChangeValue("Email or password is invalid. Please try again.")
          }
        } else {
          loginError.onChangeValue("Email or password is invalid. Please try again.");
        }
        resetForm();
      } catch (e) {
        setErrors((prev) => ({
          ...prev,
          password: "Login failed. Please check your credentials.",
        }));
      }
    }
  };

  const onSocialPress = (provider: string) => {
    // Your social login logic here
  };

  if (isForgetPassword.value) {
    return (
      <ForgotPasswordScreen onGoBack={isForgetPassword.onFalse}/>
    )
  }

  return (
    <>
      <View style={styles.inputSection}>
        <TextInput
          style={styles.input}
          placeholder="Email *"
          placeholderTextColor="#888"
          value={values.email}
          onChangeText={handleChange("email")}
          onBlur={handleBlur("email")}
          autoCapitalize="none"
        />
        {touched.email && errors.email && (
          <Text style={styles.inputError}>{errors.email}</Text>
        )}

        <TextInput
          style={styles.input}
          placeholder="Password *"
          placeholderTextColor="#888"
          secureTextEntry
          value={values.password}
          onChangeText={handleChange("password")}
          onBlur={handleBlur("password")}
        />
        {touched.password && errors.password && (
          <Text style={styles.inputError}>{errors.password}</Text>
        )}

        <TouchableOpacity onPress={isForgetPassword.onToggle} style={styles.forgotPassword}>
          <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
        </TouchableOpacity>
      </View>

      {isLoading ? (
        <ActivityIndicator size="large" color="#000"/>
      ) : (
        <TouchableOpacity
          style={[styles.loginBtn, !isValid && {backgroundColor: "#ccc"}]}
          onPress={handleLogin}
          disabled={!isValid}
        >
          <Text style={styles.loginBtnText}>Log In</Text>
        </TouchableOpacity>
      )}

      {!loginError.isEmpty && <Text style={styles.inputError}>{loginError.value}</Text>}
      <Text style={styles.orText}>Or Continue with</Text>
      <View style={styles.socialRow}>
        <TouchableOpacity onPress={() => onSocialPress("google")}>
          <Image source={require("@/assets/images/google.png")} style={styles.socialIcon}/>
        </TouchableOpacity>
      </View>
    </>
  );
}
