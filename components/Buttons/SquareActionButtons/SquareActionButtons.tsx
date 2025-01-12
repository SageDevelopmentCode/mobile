import React from "react";
import { TouchableOpacity, Text, ViewStyle, TextStyle } from "react-native";
import { useCustomFonts } from "@/constants/fonts";
import { styles } from "./SquareActionButtons.styles";

interface ActionButtonProps {
  title?: string; // Button text
  onPress: () => void; // Click handler
  icon?: any;
  type?: "PrimaryGray";
  style?: ViewStyle; // Additional container styles
  textStyle?: TextStyle; // Additional text styles
  disabled?: boolean; // Disable the button
}

function SquareActionButton({
  title,
  onPress,
  icon,
  type = "PrimaryGray",
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
      case "PrimaryGray":
        return [styles.PrimaryGrayButton, disabled && styles.disabled];
      default:
        return [styles.PrimaryGrayButton, disabled && styles.disabled];
    }
  };

  const getTextStyle = () => {
    if (disabled) {
      return styles.DisabledText; // Use a specific style for disabled state
    }
    switch (type) {
      case "PrimaryGray":
        return styles.DarkNavyText;
      default:
        return styles.DarkNavyText;
    }
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.squareButton, getButtonStyle(), style]}
      disabled={disabled}
    >
      {icon ? (
        <>{icon}</> // Render the icon if provided
      ) : (
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
      )}
    </TouchableOpacity>
  );
}

export default SquareActionButton;
