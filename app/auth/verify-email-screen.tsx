import React from "react";
import {StyleSheet, Text, TextInput, TouchableOpacity, View,} from "react-native";
import {RootStackParamList} from "@/interfaces/screen-props";
import {RouteProp, useRoute} from "@react-navigation/core";
import useRegistrationVerify from "@/app/auth/use-registration-verify";
import useString from "@/hooks/primitive/use-string";

export default function VerifyEmailScreen() {
  const {params} = useRoute<RouteProp<RootStackParamList, "auth/verify-email-screen">>();
  const {onVerify} = useRegistrationVerify();

  const code = useString('');

  const onResendCode = () => {
    console.log("Resending code...");
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoSection}>
        <View style={styles.logoCircle}>
          <Text style={styles.logoText}>★</Text>
        </View>
      </View>

      <Text style={styles.title}>Verify Your Email</Text>
      <Text style={styles.subtitle}>
        A 6-digit code has been sent to {params.email}.
      </Text>

      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="Enter verification code"
        value={code.value}
        onChangeText={code.onChangeValue}
        maxLength={6}
      />

      <TouchableOpacity style={styles.verifyBtn} onPress={() => onVerify(params.email, code.value)}>
        <Text style={styles.verifyBtnText}>Verify</Text>
      </TouchableOpacity>
      <Text style={styles.resendText} onPress={onResendCode}>
        Didn't receive the code? <Text style={styles.resendLink}>Resend</Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    paddingHorizontal: 16,
  },
  logoSection: {
    alignItems: "center",
    marginBottom: 24,
  },
  logoCircle: {
    backgroundColor: "#fff",
    borderRadius: 100,
    width: 80,
    height: 80,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
  },
  logoText: {
    fontSize: 36,
    color: "#FFD740",
    fontWeight: "bold",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#222",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#555",
    textAlign: "center",
    marginBottom: 24,
  },
  input: {
    width: "85%",
    height: 45,
    borderBottomWidth: 1,
    borderColor: "#ddd",
    fontSize: 18,
    textAlign: "center",
    marginBottom: 24,
    color: "#222",
  },
  verifyBtn: {
    width: "85%",
    backgroundColor: "#FFD740",
    borderRadius: 30,
    paddingVertical: 12,
    alignItems: "center",
    shadowColor: "#FFD740",
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 2,
    marginBottom: 16,
  },
  verifyBtnText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  resendText: {
    fontSize: 14,
    color: "#888",
    textAlign: "center",
  },
  resendLink: {
    color: "#FFD740",
    fontWeight: "600",
  },
});
