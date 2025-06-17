import React from "react";
import {ActivityIndicator, Text, TextInput, TouchableOpacity, View} from "react-native";
import {styles} from "@/app/auth/utils/styles";
import useString from "@/hooks/primitive/use-string";
import useRegistration from "@/app/auth/hooks/use-registration";
import {useForm} from "@/hooks/interaction/use-form";
import {validateSignUp} from "@/app/auth/utils/validators";

export default function SignUpPanel() {
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
      username: "",
      firstName: "",
      middleName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validate: validateSignUp,
  });

  const handleSignUp = async () => {
    apiResult.onClear();
    if (isValid) {
      try {
        await onSignUp(values.email, values.username, values.password, values.firstName, values.middleName, values.lastName);
        apiResult.onChangeValue("Registration successful! Please verify your email.");
        resetForm();
      } catch (error) {
        setErrors((prev) => ({
          ...prev,
          email: "This email is already registered.",
        }));
      }
    }
  };

  return (
    <>
      <View style={styles.inputSection}>
        <TextInput
          style={styles.input}
          placeholder="Username *"
          placeholderTextColor="#888"
          value={values.username}
          onChangeText={handleChange('username')}
          onBlur={handleBlur("username")}
          autoCapitalize="none"
        />
        {touched.username && errors.username?.length && (
          <Text style={styles.inputError}>{errors.username}</Text>
        )}
        <TextInput
          style={styles.input}
          placeholder="First Name *"
          placeholderTextColor="#888"
          value={values.firstName}
          onChangeText={handleChange('firstName')}
          onBlur={handleBlur("firstName")}
          autoCapitalize="none"
        />
        {touched.firstName && errors.firstName?.length && (
          <Text style={styles.inputError}>{errors.firstName}</Text>
        )}
        <TextInput
          style={styles.input}
          placeholder="Middle Name"
          placeholderTextColor="#888"
          value={values.middleName}
          onChangeText={handleChange('middleName')}
          onBlur={handleBlur("middleName")}
          autoCapitalize="none"
        />
        {touched.middleName && errors.middleName?.length && (
          <Text style={styles.inputError}>{errors.middleName}</Text>
        )}
        <TextInput
          style={styles.input}
          placeholder="Last Name *"
          placeholderTextColor="#888"
          value={values.lastName}
          onChangeText={handleChange('lastName')}
          onBlur={handleBlur("lastName")}
          autoCapitalize="none"
        />
        {touched.lastName && errors.lastName?.length && (
          <Text style={styles.inputError}>{errors.lastName}</Text>
        )}

        <TextInput
          style={styles.input}
          placeholder="Email *"
          placeholderTextColor="#888"
          value={values.email}
          onChangeText={handleChange('email')}
          onBlur={handleBlur("email")}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        {touched.email && errors?.email && (
          <Text style={styles.inputError}>{errors.email}</Text>
        )}

        <TextInput
          style={styles.input}
          placeholder="Password *"
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
          placeholder="Confirm Password *"
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

      {isLoading ? (
        <ActivityIndicator size="large" color="#000"/>
      ) : (
        <TouchableOpacity
          style={[
            styles.loginBtn,
            !isValid && {backgroundColor: "#ccc"},
          ]}
          onPress={handleSignUp}
          disabled={!isValid}
        >
          <Text style={styles.loginBtnText}>Sign Up</Text>
        </TouchableOpacity>
      )}

      {!apiResult.isEmpty && <Text style={styles.successMessage}>{apiResult.value}</Text>}
    </>
  );
}
