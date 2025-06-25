import useString from "@/hooks/primitive/use-string";
import {useForm} from "@/hooks/interaction/use-form";
import {validateResetPassword} from "@/utils/auth/validators";
import {Text, TouchableOpacity, View} from "react-native";
import {styles} from "@/utils/auth/styles";
import React from "react";
import useResetPassword from "@/hooks/auth/use-reset-password";
import TextInputRequired from "@/components/inputs/TextInputRequired";
import {parseParamsSingle} from "@/utils/params";
import {useLocalSearchParams} from "expo-router";
import ViewCard from "@/components/layouts/ViewCard";

const Reset = () => {
  const {email, code} = useLocalSearchParams();
  const emailString = parseParamsSingle(email);
  const codeString = parseParamsSingle(code);

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
      await onResetPassword(emailString, codeString, values.password,);
      resetForm();
    } catch (e) {
      apiResult.onChangeValue("Failed to reset password. Please try again.");
    }
  };

  return (
    <ViewCard>
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
    </ViewCard>
  )
}

export default Reset;
