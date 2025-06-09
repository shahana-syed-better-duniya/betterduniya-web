import useRegistration from "@/app/auth/hooks/use-registration";
import useString from "@/hooks/primitive/use-string";
import {useForm} from "@/hooks/interaction/use-form";
import {validateResetPassword, validateSignUp} from "@/app/auth/utils/validators";
import {Text, TextInput} from "react-native";
import {styles} from "@/app/auth/utils/styles";
import React from "react";

const ForgetPasswordResetScreen = ()=> {
  const {onSignUp, isLoading} = useRegistration();
  const apiResult = useString('');

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    resetForm,
    isValid,
    setErrors,
  } = useForm({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validate: validateResetPassword,
  });

  return(
    <>

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
    </>
  )
}

export default ForgetPasswordResetScreen;
