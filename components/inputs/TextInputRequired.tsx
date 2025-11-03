import { styles } from "@/utils/auth/styles";
import React from "react";
import { KeyboardTypeOptions, Platform, Text, TextInput } from "react-native";

export interface TextInputRequiredProps {
  value: string;
  onChangeText: (val: string) => void;
  onBlur: () => void;
  touched?: boolean;
  error?: string;
  placeholder?: string;
  placeholderTextColor?: string;
  style?: object,
  multiline?: boolean;
  numberOfLines?: number;
  secureTextEntry?: boolean;
  keyboardType?: KeyboardTypeOptions;
  autoCapitalize?: "none" | "sentences" | "words" | "characters" | undefined;
}

const TextInputRequired: React.FC<TextInputRequiredProps> = ({
                                                               value,
                                                               onChangeText,
                                                               onBlur,
                                                               touched,
                                                               error,
                                                               placeholder,
                                                               placeholderTextColor,
                                                               style,
                                                               multiline = false,
                                                               numberOfLines,
                                                               secureTextEntry = false,
                                                               keyboardType,
                                                               autoCapitalize,
                                                             }) => {
  // Web-specific props for better form integration
  const getAutoCompleteValue = () => {
    if (secureTextEntry) return 'current-password' as const;
    if (keyboardType === 'email-address') return 'email' as const;
    if (placeholder?.toLowerCase().includes('username')) return 'username' as const;
    if (placeholder?.toLowerCase().includes('name')) return 'name' as const;
    return undefined;
  };

  const webProps = Platform.OS === 'web' ? {
    autoComplete: getAutoCompleteValue(),
    //@ts-ignore - Web-specific props
    required: placeholder?.includes('*') ? true : false,
    //@ts-ignore - Web-specific props  
    name: placeholder?.toLowerCase().replace(/\s+/g, '').replace('*', '') || 'input',
  } : {};

  return (
    <>
      <TextInput
        style={style ?? styles.input}
        placeholder={placeholder}
        placeholderTextColor={placeholderTextColor ?? "#bbb"}
        value={value}
        onChangeText={onChangeText}
        onBlur={onBlur}
        multiline={multiline}
        numberOfLines={numberOfLines}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        {...webProps}
      />
      {touched && error != null && (
        <Text style={styles.inputError}>{error}</Text>
      )}
    </>
  )
}

export default TextInputRequired;
