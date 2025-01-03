import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from "react-native";
import { styles } from "../ActionButtons/ActionButton.styles";
import { useCustomFonts } from "@/constants/fonts";

interface ActionButtonProps {
  title: string; // Button text
  onPress: () => void; // Click handler
  type?:
    | "primary"
    | "BrightGreen"
    | "LightBrown"
    | "PrimaryBlue"
    | "PrimaryPurple"
    | "PrimaryGreen"
    | "TransparentBlue"
    | "PrimaryGray";
  style?: ViewStyle; // Additional container styles
  textStyle?: TextStyle; // Additional text styles
  disabled?: boolean; // Disable the button
}

function ActionButton({
  title,
  onPress,
  type = "primary",
  style,
  textStyle,
  disabled = false,
}: ActionButtonProps) {
  const fontsLoaded = useCustomFonts(); // Use the custom font hook

  if (!fontsLoaded) {
    return <Text>Loading...</Text>;
  }

  const getButtonStyle = () => {
    switch (type) {
      case "BrightGreen":
        return [styles.BrightGreenButton, disabled && styles.disabled];
      case "PrimaryGreen":
        return [styles.PrimaryGreenButton, disabled && styles.disabled];
      case "LightBrown":
        return [styles.LightBrownButton, disabled && styles.disabled];
      case "PrimaryBlue":
        return [styles.PrimaryBlueButton, disabled && styles.disabled];
      case "PrimaryPurple":
        return [styles.PrimaryPurpleButton, disabled && styles.disabled];
      case "TransparentBlue":
        return [styles.TransparentButton, disabled && styles.disabled];
      case "PrimaryGray":
        return [styles.PrimaryGrayButton, disabled && styles.disabled];
      default:
        return [styles.BrightGreenButton, disabled && styles.disabled];
    }
  };

  const getTextStyle = () => {
    if (disabled) {
      return styles.DisabledText; // Use a specific style for disabled state
    }
    switch (type) {
      case "BrightGreen":
        return styles.WhiteText;
      case "LightBrown":
        return styles.DarkBrownText;
      case "PrimaryBlue":
        return styles.WhiteText;
      case "PrimaryPurple":
        return styles.WhiteText;
      case "PrimaryGreen":
        return styles.WhiteText;
      case "TransparentBlue":
        return styles.BlueText;
      case "PrimaryGray":
        return styles.WhiteText;
      default:
        return styles.WhiteText;
    }
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.button, getButtonStyle(), style]}
      disabled={disabled}
    >
      <Text
        style={[
          styles.text,
          getTextStyle(),
          textStyle,
          { fontFamily: "Nunito_800ExtraBold" },
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
}

export default ActionButton;
