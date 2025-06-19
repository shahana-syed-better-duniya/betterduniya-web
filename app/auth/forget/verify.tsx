import {RouteProp, useRoute} from "@react-navigation/core";
import {RootStackParamList} from "@/interfaces/screen-props";
import VerifyCodeScreen from "@/components/auth/VerifyCodeScreen";
import React from "react";
import useForgetPasswordVerify from "@/hooks/auth/use-forget-password-verify";

export default function Verify() {
  const {params} = useRoute<RouteProp<RootStackParamList, "auth/forget-password-verify-screen">>();
  const {onVerify, isLoading} = useForgetPasswordVerify();

  return (
    <VerifyCodeScreen onVerify={onVerify} email={params.email} codeLength={6} isLoading={isLoading}
                      onResend={onVerify}/>
  );
}
