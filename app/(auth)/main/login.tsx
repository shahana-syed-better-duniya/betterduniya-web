import ForgotPasswordScreen from "@/app/(auth)/forget";
import TextInputRequired from "@/components/inputs/TextInputRequired";
import useLogin from "@/hooks/auth/use-login";
import useLoginGoogle from "@/hooks/auth/use-login-google";
import useLoginSave from "@/hooks/auth/use-login-save";
import { useForm } from "@/hooks/interaction/use-form";
import { useBoolean } from "@/hooks/primitive/use-boolean";
import useString from "@/hooks/primitive/use-string";
import { styles } from "@/utils/auth/styles";
import { validateLogin } from "@/utils/auth/validators";
import { router } from "expo-router";
import React from "react";
import { ActivityIndicator, Image, Text, TouchableOpacity, View } from "react-native";

export default function Login() {
  const {onLogin, isLoading,} = useLogin();
  const saveLoginResult = useLoginSave();

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

  const handleLogin = async () => {
    loginError.onClear();
    if (isValid) {
      try {
        const userInfo = await onLogin(values.email, values.password);
        if (userInfo != null) {
          await saveLoginResult(userInfo);
          if (userInfo.accessToken.length > 0) {
            router.replace('/(tabs)/home')
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


  const {onLogin:onLoginGoogle} = useLoginGoogle();

  const onSocialPress = async (provider: string) => {
    console.log('🎯 [Login Component] Google Sign-In button pressed');
    console.log('🎯 [Login Component] Provider:', provider);
    
    try {
      console.log('🎯 [Login Component] Calling onLoginGoogle()...');
      await onLoginGoogle();
      console.log('🎉 [Login Component] Google Sign-In completed successfully!');
    } catch (error: any) {
      console.error('🎯 [Login Component] Google login failed in component:', error);
      console.error('🎯 [Login Component] Error message:', error?.message);
      loginError.onChangeValue(`Google sign-in failed: ${error?.message || 'Unknown error'}. Please try email/password login.`);
    }
  };

  if (isForgetPassword.value) {
    return (
      <ForgotPasswordScreen onGoBack={isForgetPassword.onFalse}/>
    )
  }

  return (
    <>
      <View style={styles.inputSection}>
        <TextInputRequired
          value={values.email}
          onChangeText={handleChange("email")}
          onBlur={handleBlur("email")}
          touched={touched.email}
          error={errors.email}
          placeholder="Email *"
          placeholderTextColor="#888"
          autoCapitalize="none"
        />
        <TextInputRequired
          secureTextEntry
          value={values.password}
          onChangeText={handleChange("password")}
          onBlur={handleBlur("password")}
          touched={touched.password}
          error={errors.password}
          placeholder="Password *"
          placeholderTextColor="#888"
        />

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
