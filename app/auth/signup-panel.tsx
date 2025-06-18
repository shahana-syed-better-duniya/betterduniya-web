import React from "react";
import {ActivityIndicator, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import {styles} from "@/app/auth/utils/styles";
import useString from "@/hooks/primitive/use-string";
import useRegistration from "@/app/auth/hooks/use-registration";
import {useForm} from "@/hooks/interaction/use-form";
import {validateSignUp} from "@/app/auth/utils/validators";
import TextInputRequired from "@/components/inputs/TextInputRequired";



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
        await onSignUp(values.email, values.username, values.password, values.firstName, values.lastName);
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
        <TextInputRequired
          style={styles.input}
          value={values.email}
          onChangeText={handleChange('email')}
          onBlur={handleBlur("email")}
          touched={touched.email}
          error={errors.email}
          placeholder="Email *"
          placeholderTextColor="#888"
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInputRequired
          style={styles.input}
          value={values.username}
          onChangeText={handleChange('username')}
          onBlur={handleBlur("username")}
          touched={touched.username}
          error={errors.username}
          placeholder="Username *"
          placeholderTextColor="#888"
          autoCapitalize="none"
        />
        <View style={stylesLocal.rowContainer}>
          <View style={stylesLocal.inputWrapper}>
            <TextInputRequired
              style={styles.input}
              value={values.firstName}
              onChangeText={handleChange('firstName')}
              onBlur={handleBlur("firstName")}
              touched={touched.lastName}
              error={errors.lastName}
              placeholder="First Name *"
              placeholderTextColor="#888"
              autoCapitalize="none"
            />
          </View>
          <View style={stylesLocal.inputWrapper}>
            <TextInputRequired
              style={styles.input}
              value={values.lastName}
              onChangeText={handleChange('lastName')}
              onBlur={handleBlur("lastName")}
              touched={touched.lastName}
              error={errors.lastName}
              placeholder="Last Name *"
              placeholderTextColor="#888"
              autoCapitalize="none"
            />
          </View>
        </View>
        <TextInputRequired
          style={styles.input}
          value={values.password}
          onChangeText={handleChange('password')}
          onBlur={handleBlur("password")}
          touched={touched.password}
          error={errors.password}
          placeholder="Password *"
          placeholderTextColor="#888"
          secureTextEntry
        />
        <TextInputRequired
          style={styles.input}
          placeholder="Confirm Password *"
          placeholderTextColor="#888"
          value={values.confirmPassword}
          onChangeText={handleChange('confirmPassword')}
          onBlur={handleBlur("confirmPassword")}
          touched={touched.confirmPassword}
          error={errors.confirmPassword}
          secureTextEntry
        />
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
const stylesLocal = StyleSheet.create({
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between', // Add spacing between the inputs
    alignItems: 'flex-start', // Align inputs to the top
  },
  inputWrapper: {
    flex: 1, // Allow inputs to share available space
    marginRight: 8, // Add spacing between the two inputs
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    fontSize: 16,
  },
  inputError: {
    color: 'red',
    fontSize: 12,
    marginTop: 4,
  },
});
