import React from "react";
import {StyleSheet, Text, TextInput, TouchableOpacity} from "react-native";
import useString from "@/hooks/primitive/use-string";
import {styles} from "@/utils/auth/styles";
import {CARD_WIDTH} from "@/constants/themes";
import ViewCard from "@/components/layouts/ViewCard";

export interface VerifyCodeScreenProps {
  email: string;
  onVerify: (email: string, code: string) => Promise<void>;
  onResend: (email: string, code: string) => Promise<void>;
  title?: string;
  subtitle?: string | null;
  codeLength: number;
  isLoading: boolean;
  isLoadingResend: boolean;
}

const VerifyCodeScreen: React.FC<VerifyCodeScreenProps> = ({
                                                             email,
                                                             onVerify,
                                                             onResend,
                                                             title = "Verify Your Email",
                                                             subtitle = null,
                                                             codeLength = 6,
                                                             isLoading = false,
                                                             isLoadingResend = false,
                                                           }) => {
  const code = useString('');

  return (
    <ViewCard>
      <Text style={stylesLocal.title}>{title}</Text>
      <Text style={stylesLocal.subtitle}>
        {subtitle || `A ${codeLength}-digit code has been sent to ${email}.`}
      </Text>
      <TextInput
        style={stylesLocal.input}
        value={code.value}
        onChangeText={code.onChangeValue}
        keyboardType="numeric"
        placeholder={`Enter verification code`}
        maxLength={codeLength}
      />
      <TouchableOpacity
        style={styles.loginBtn}
        onPress={() => onVerify(email, code.value)}
        disabled={isLoading || code.value.length !== codeLength}
      >
        <Text style={stylesLocal.verifyBtnText}>
          {isLoading ? "Verifying..." : isLoadingResend ? 'Resending' : 'Verify'}
        </Text>
      </TouchableOpacity>
      <Text style={stylesLocal.resendText} onPress={() => onResend(email, code.value)}>
        Didn't receive the code? <Text style={stylesLocal.resendLink}>Resend</Text>
      </Text>
    </ViewCard>
  );
}

const stylesLocal = StyleSheet.create({
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

export default VerifyCodeScreen;
