import React from "react";
import {RootStackParamList} from "@/interfaces/screen-props";
import {RouteProp, useRoute} from "@react-navigation/core";
import useRegistrationVerify from "@/app/auth/hooks/use-registration-verify";
import VerifyCodeScreen from "@/app/auth/components/verify-code-screen";

export default function VerifyEmailScreen() {
  const {params} = useRoute<RouteProp<RootStackParamList, "auth/verify-email-screen">>();
  const {onVerify, isLoading} = useRegistrationVerify();

  return (
    <VerifyCodeScreen onVerify={onVerify} email={params.email} codeLength={6} isLoading={isLoading}
                      onResend={onVerify}/>
  );
}
