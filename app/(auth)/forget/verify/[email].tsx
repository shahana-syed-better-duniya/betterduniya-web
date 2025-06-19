import VerifyCodeScreen from "@/components/auth/VerifyCodeScreen";
import React from "react";
import useForgetPasswordVerify from "@/hooks/auth/use-forget-password-verify";
import {useLocalSearchParams} from "expo-router";

export default function Verify() {
  const {email} = useLocalSearchParams();
  const {onVerify, isLoading} = useForgetPasswordVerify();
  const {onVerify: onResend, isLoading: isLoadingResend} = useForgetPasswordVerify();


  const emailString = Array.isArray(email) ? email[0] : email;
  return (
    <VerifyCodeScreen onVerify={onVerify} email={emailString} codeLength={6} isLoading={isLoading}
                      onResend={onResend} isLoadingResend={isLoadingResend}/>
  );
}
