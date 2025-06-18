import React from "react";
import {ActivityIndicator, Text, TextInput, TouchableOpacity, View} from "react-native";
import {styles} from "@/app/auth/utils/styles";
import {useForm} from "@/hooks/interaction/use-form";
import useString from "@/hooks/primitive/use-string";
import useRequest from "@/hooks/api/use-request";
import {userApi} from "@/api/user/user";
import {useNavigation} from "expo-router";
import {validateForgotPassword} from "@/app/auth/utils/validators";
import TextInputRequired from "@/components/inputs/TextInputRequired";


interface ForgotPasswordScreen {
  onGoBack: () => void;
}

const ForgotPasswordScreen: React.FC<ForgotPasswordScreen> = ({onGoBack}) => {
  const navigation = useNavigation();

  const {onRequest, isLoading} = useRequest();
  const apiResult = useString("");

  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    isValid,
    resetForm,
  } = useForm({
    initialValues: {email: ""},
    validate: validateForgotPassword,
  });

  const handleSubmit = async () => {
    apiResult.onClear();

    if (!isValid) return;

    try {
      await onRequest(userApi.forgetPassword, [values.email], null, false);
      navigation.navigate('auth/forget-password-verify-screen', {email: values.email});
      resetForm();
    } catch (e) {
      apiResult.onChangeValue("Failed to send reset email. Please try again.");
    }
  };

  return (
    <>
      <View style={styles.inputSection}>
        <Text style={styles.forgotPasswordTitle}>Forgot Password</Text>
        <Text style={styles.forgotPasswordText}>Please enter your registered email address.</Text>
        <TextInputRequired
          style={styles.input}
          value={values.email}
          onChangeText={handleChange("email")}
          onBlur={handleBlur("email")}
          touched={touched.email}
          error={errors.email}
          placeholder="Email"
          placeholderTextColor="#888"
          autoCapitalize="none"
          keyboardType="email-address"
        />
      </View>
      {apiResult.value !== "" && (
        <Text style={styles.inputError}>{apiResult.value}</Text>
      )}
      <TouchableOpacity
        style={[
          styles.loginBtn,
          (!isValid || isLoading) && {backgroundColor: "#ccc"},
        ]}
        onPress={handleSubmit}
        disabled={!isValid || isLoading}
      >
        {isLoading ? (
          <ActivityIndicator color="#fff"/>
        ) : (
          <Text style={styles.loginBtnText}>Send Reset Email</Text>
        )}
      </TouchableOpacity>
      <TouchableOpacity
        style={{marginTop: 24, alignSelf: "center"}}
        onPress={onGoBack}
      >
        <Text style={{color: "#1e88e5"}}>Back to Login</Text>
      </TouchableOpacity>
    </>
  );
}

export default ForgotPasswordScreen;
