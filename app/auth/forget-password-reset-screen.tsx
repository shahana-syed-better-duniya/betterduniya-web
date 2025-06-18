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
import TextInputRequired from "@/components/inputs/TextInputRequired";

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
        <TextInputRequired
          style={styles.input}
          value={values.password}
          onChangeText={handleChange('password')}
          onBlur={handleBlur("password")}
          touched={touched.password}
          error={errors.password}
          placeholder="Password"
          placeholderTextColor="#888"
          secureTextEntry
        />

        <TextInputRequired
          style={styles.input}
          value={values.confirmPassword}
          onChangeText={handleChange('confirmPassword')}
          onBlur={handleBlur("confirmPassword")}
          touched={touched.confirmPassword}
          error={errors.confirmPassword}
          placeholder="Confirm Password"
          placeholderTextColor="#888"
          secureTextEntry
        />
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
