import TextInputRequired from "@/components/inputs/TextInputRequired";
import useRegistration from "@/hooks/auth/use-registration";
import { useForm } from "@/hooks/interaction/use-form";
import { styles } from "@/utils/auth/styles";
import { validateSignUp } from "@/utils/auth/validators";
import React from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";


export default function Signup() {
  const {onSignUp, isLoading} = useRegistration();

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
    if (isValid) {
      try {
        await onSignUp(values.email, values.username, values.password, values.firstName, values.lastName);
        resetForm();
      } catch (error) {
        setErrors((prev) => ({
          ...prev,
          email: "This email is already registered.",
        }));
      }
    }
  };

  const FormWrapper = Platform.OS === 'web' ? 'form' as any : View;
  const formProps = Platform.OS === 'web' ? {
    onSubmit: (e: any) => {
      e.preventDefault();
      handleSignUp();
    },
    method: 'post',
    autoComplete: 'on'
  } : {};

  return (
     
    <KeyboardAvoidingView
      style={{ flex: 1, paddingHorizontal: 0, paddingTop: 20 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
    >
      <KeyboardAwareScrollView
        contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 0, paddingVertical: 0, marginLeft: 20 }}
        keyboardShouldPersistTaps="always"
        enableOnAndroid={true}
        extraScrollHeight={20}
      >
        <View style={[styles.inputSection, {alignItems: 'flex-start'}]}>
          <FormWrapper {...formProps}>
            <TextInputRequired
              value={values.email}
              onChangeText={handleChange('email')}
              onBlur={handleBlur("email")}
              touched={touched.email}
              error={errors.email}
              placeholder="Email *"
              placeholderTextColor="#888"
              keyboardType="email-address"
              autoCapitalize="none"
              editable={true}
            />
            <TextInputRequired
              value={values.username}
              onChangeText={handleChange('username')}
              onBlur={handleBlur("username")}
              touched={touched.username}
              error={errors.username}
              placeholder="Username *"
              placeholderTextColor="#888"
              autoCapitalize="none"
              editable={true}
            />
            <TextInputRequired
              value={values.firstName}
              onChangeText={handleChange('firstName')}
              onBlur={handleBlur("firstName")}
              touched={touched.firstName}
              error={errors.firstName}
              placeholder="First Name *"
              placeholderTextColor="#888"
              autoCapitalize="none"
              editable={true}
            />
            <TextInputRequired
              value={values.lastName}
              onChangeText={handleChange('lastName')}
              onBlur={handleBlur("lastName")}
              touched={touched.lastName}
              error={errors.lastName}
              placeholder="Last Name *"
              placeholderTextColor="#888"
              autoCapitalize="none"
              editable={true}
            />
            <TextInputRequired
              value={values.password}
              onChangeText={handleChange('password')}
              onBlur={handleBlur("password")}
              touched={touched.password}
              error={errors.password}
              placeholder="Password *"
              placeholderTextColor="#888"
              secureTextEntry
              editable={true}
            />
            <TextInputRequired
              placeholder="Confirm Password *"
              placeholderTextColor="#888"
              value={values.confirmPassword}
              onChangeText={handleChange('confirmPassword')}
              onBlur={handleBlur("confirmPassword")}
              touched={touched.confirmPassword}
              error={errors.confirmPassword}
              secureTextEntry
              editable={true}
            />
          </FormWrapper>
        </View>
        {isLoading ? (
          <ActivityIndicator size="large" color="#000"/>
        ) : (
          <TouchableOpacity
            style={[
              styles.loginBtn,
              {alignSelf: "flex-end"},
              !isValid && {backgroundColor: "#ccc"},
            ]}
            onPress={handleSignUp}
            disabled={!isValid}
          >
            <Text style={styles.loginBtnText}>Sign Up</Text>
          </TouchableOpacity>
        )}
      </KeyboardAwareScrollView>
    </KeyboardAvoidingView>
    
  );
}

