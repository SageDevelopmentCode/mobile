import { Heading } from "@/components/Text/TextComponents";
import colors from "@/constants/colors";
import { TouchableOpacity, View, Text, ViewStyle } from "react-native";
import React from "react";
import { styles } from "./ActionButton.styles";

type ActionButtonProps = {
  backgroundColor: string;
  buttonDropShadow: string;
  title: string;
  onPress: () => void;
  textAlign?: "center" | "left" | "right";
  emoji?: string;
  disabled?: boolean;
  icon?: React.ReactElement;
  titleColor?: string;
  fullWidth?: boolean;
};

export const ActionButton = ({
  backgroundColor,
  title,
  onPress,
  buttonDropShadow,
  textAlign = "center",
  emoji,
  disabled = false,
  icon,
  titleColor,
  fullWidth = true,
}: ActionButtonProps) => {
  const getJustifyContent = (): ViewStyle["justifyContent"] => {
    switch (textAlign) {
      case "left":
        return "flex-start";
      case "right":
        return "flex-end";
      case "center":
      default:
        return "center";
    }
  };

  const getButtonStyle = (): ViewStyle => {
    const baseStyle: ViewStyle = {
      justifyContent: getJustifyContent(),
      width: fullWidth ? "100%" : "auto",
      alignSelf: fullWidth ? "stretch" : "center",
    };

    if (disabled) {
      return {
        ...baseStyle,
        backgroundColor: "rgba(255, 255, 255, 0.3)",
        shadowColor: "rgba(0, 0, 0, 0.1)",
      };
    }
    return {
      ...baseStyle,
      backgroundColor: backgroundColor,
      shadowColor: buttonDropShadow,
    };
  };

  const getTitleColor = () => {
    if (disabled) {
      return titleColor ? `${titleColor}60` : "rgba(255, 255, 255, 0.6)"; // Add transparency to custom color
    }
    return titleColor || colors.PrimaryWhite;
  };

  return (
    <TouchableOpacity
      style={[styles.difficultyButton, getButtonStyle()]}
      onPress={disabled ? undefined : onPress}
      disabled={disabled}
    >
      {emoji && <Text style={{ fontSize: 20, marginRight: 14 }}>{emoji}</Text>}
      <Heading color={getTitleColor()}>{title}</Heading>
      {icon && <View style={{ marginLeft: 8 }}>{icon}</View>}
    </TouchableOpacity>
  );
};
