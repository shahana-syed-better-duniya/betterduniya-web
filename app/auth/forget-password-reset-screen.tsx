import useString from "@/hooks/primitive/use-string";
import {useForm} from "@/hooks/interaction/use-form";
import {validateResetPassword} from "@/app/auth/utils/validators";
import {Text, TextInput, TouchableOpacity, View} from "react-native";
import {styles} from "@/app/auth/utils/styles";
import React from "react";
import useResetPassword from "@/app/auth/hooks/use-reset-password";
import {RouteProp, useRoute} from "@react-navigation/core";
import {RootStackParamList} from "@/interfaces/screen-props";
import ScreenLayout from "@/app/auth/screen-layout";

const ForgetPasswordResetScreen = () => {
  const {params} = useRoute<RouteProp<RootStackParamList, "auth/forget-password-reset-screen">>();

  const {onResetPassword, isLoading} = useResetPassword();
  const apiResult = useString('');

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    resetForm,
    isValid,
  } = useForm({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validate: validateResetPassword,
  });

  const handleSubmit = async () => {
    apiResult.onClear();

    if (!isValid) return;

    try {
      await onResetPassword(params.email, params.code, values.password,);
      resetForm();
    } catch (e) {
      apiResult.onChangeValue("Failed to reset password. Please try again.");
    }
  };


  return (
    <ScreenLayout>
      <View style={styles.inputSection}>
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#888"
          secureTextEntry
          value={values.password}
          onChangeText={handleChange('password')}
          onBlur={handleBlur("password")}
        />
        {touched.password && errors?.password && (
          <Text style={styles.inputError}>{errors.password}</Text>
        )}

        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          placeholderTextColor="#888"
          secureTextEntry
          value={values.confirmPassword}
          onChangeText={handleChange('confirmPassword')}
          onBlur={handleBlur("confirmPassword")}
        />
        {touched.confirmPassword && errors?.confirmPassword && (
          <Text style={styles.inputError}>{errors.confirmPassword}</Text>
        )}
      </View>
      <TouchableOpacity
        style={styles.verifyBtn}
        onPress={handleSubmit}
        disabled={!isValid || isLoading}
      >
        <Text style={styles.verifyBtnText}>
          {isLoading ? "Verifying..." : "Verify"}
        </Text>
      </TouchableOpacity>
    </ScreenLayout>
  )
}

export default ForgetPasswordResetScreen;
