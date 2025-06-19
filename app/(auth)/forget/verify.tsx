import VerifyCodeScreen from "@/components/auth/VerifyCodeScreen";
import React from "react";
import useForgetPasswordVerify from "@/hooks/auth/use-forget-password-verify";
import {useLocalSearchParams} from "expo-router";
import {parseParamsSingle} from "@/utils/params";
import useForgetPasswordResend from "@/hooks/auth/use-forget-password-resend";

export default function Verify() {
  const {email} = useLocalSearchParams();
  const {onVerify, isLoading} = useForgetPasswordVerify();
  const {onForgetPassword, isLoading: isResendLoading} = useForgetPasswordResend();

  const emailString = parseParamsSingle(email);
  return (
    <VerifyCodeScreen onVerify={onVerify} email={emailString} codeLength={6} isLoading={isLoading}
                      onResend={onForgetPassword} isLoadingResend={isResendLoading}/>
  );
}
