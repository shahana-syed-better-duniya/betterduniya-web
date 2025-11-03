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

  // Enhanced styles for better web display
  const getInputStyle = () => {
    const baseStyle = style ?? styles.input;
    if (Platform.OS === 'web') {
      return [
        baseStyle,
        keyboardType === 'email-address' && {
          minWidth: 280,
          width: '100%' as any,
          maxWidth: 350,
        },
        {
          //@ts-ignore - Web-specific CSS properties
          display: 'block',
          //@ts-ignore - Web-specific CSS properties
          boxSizing: 'border-box',
        }
      ];
    }
    return baseStyle;
  };

  const getErrorStyle = () => {
    if (Platform.OS === 'web') {
      return [
        styles.inputError,
        {
          //@ts-ignore - Web-specific CSS properties
          display: 'block',
          //@ts-ignore - Web-specific CSS properties
          width: '100%',
          marginTop: 4,
          marginBottom: 8,
        }
      ] as any;
    }
    return styles.inputError;
  };

  return (
    <>
      <TextInput
        style={getInputStyle()}
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
        <Text style={getErrorStyle()}>{error}</Text>
      )}
    </>
  )
}

export default TextInputRequired;
