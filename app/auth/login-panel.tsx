import {Image, Text, TextInput, TouchableOpacity, View} from "react-native";
import React from "react";
import {styles} from "@/app/auth/styles";

function LogInPanel({ onForgotPassword, onLogin, onSocialPress, username, password }) {
  return (
    <>
      <View style={styles.inputSection}>
        <TextInput
          style={styles.input}
          placeholder="Email or Username"
          placeholderTextColor="#888"
          value={username.value}
          onChangeText={username.onChangeValue}
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#888"
          secureTextEntry
          value={password.value}
          onChangeText={password.onChangeValue}
        />
        <TouchableOpacity
          onPress={onForgotPassword}
          style={styles.forgotPassword}
        >
          <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.loginBtn} onPress={onLogin}>
        <Text style={styles.loginBtnText}>Log In</Text>
      </TouchableOpacity>

      <Text style={styles.orText}>Or Continue with</Text>
      <View style={styles.socialRow}>
        <TouchableOpacity onPress={() => onSocialPress("google")}>
          <Image source={require("@/assets/images/google.png")} style={styles.socialIcon} />
        </TouchableOpacity>
      </View>
    </>
  );
}

export default LogInPanel;
