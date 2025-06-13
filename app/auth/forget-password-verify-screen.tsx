import {RouteProp, useRoute} from "@react-navigation/core";
import {RootStackParamList} from "@/interfaces/screen-props";
import VerifyCodeScreen from "@/app/auth/components/verify-code-screen";
import React from "react";
import useForgetPasswordVerify from "@/app/auth/hooks/use-forget-password-verify";

export default function ForgetPasswordVerifyScreen() {
  const {params} = useRoute<RouteProp<RootStackParamList, "auth/forget-password-verify-screen">>();
  const {onVerify, isLoading} = useForgetPasswordVerify();

  return (
    <VerifyCodeScreen onVerify={onVerify} email={params.email} codeLength={6} isLoading={isLoading}
                      onResend={onVerify}/>
  );
}
