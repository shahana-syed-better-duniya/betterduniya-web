import React from "react";
import {RootStackParamList} from "@/interfaces/screen-props";
import {RouteProp, useRoute} from "@react-navigation/core";
import useRegistrationVerify from "@/hooks/auth/use-registration-verify";
import VerifyCodeScreen from "@/components/auth/VerifyCodeScreen";

export default function Email() {
  const {params} = useRoute<RouteProp<RootStackParamList, "auth/verify-email-screen">>();
  const {onVerify, isLoading} = useRegistrationVerify();

  return (
    <VerifyCodeScreen onVerify={onVerify} email={params.email} codeLength={6} isLoading={isLoading}
                      onResend={onVerify}/>
  );
}
