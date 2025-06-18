import {KeyboardTypeOptions, Text, TextInput} from "react-native";
import {styles} from "@/app/auth/utils/styles";
import React from "react";

interface TextInputRequiredProps {
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
                                                             }) => (
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
    />
    {touched && error != null && (
      <Text style={styles.inputError}>{error}</Text>
    )}
  </>
)

export default TextInputRequired;
