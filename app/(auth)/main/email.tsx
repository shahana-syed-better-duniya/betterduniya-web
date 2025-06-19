import React from "react";
import {RootStackParamList} from "@/interfaces/screen-props";
import {RouteProp, useRoute} from "@react-navigation/core";
import useRegistrationVerify from "@/hooks/auth/use-registration-verify";
import VerifyCodeScreen from "@/components/auth/VerifyCodeScreen";
import {useLocalSearchParams} from "expo-router";
import {parseParamsSingle} from "@/utils/params";

export default function Email() {
  const {email } = useLocalSearchParams();
  const emailString = parseParamsSingle(email);

  const {onVerify, isLoading} = useRegistrationVerify();
  const {onResend, isLoading: isLoadingResend} = useRegistrationVerify();

  return (
    <VerifyCodeScreen onVerify={onVerify} email={emailString} codeLength={6} isLoading={isLoading}
                      onResend={onResend} isLoadingResend={isLoadingResend}/>
  );
}
