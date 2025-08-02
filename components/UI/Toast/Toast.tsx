import React, { useEffect, useRef } from "react";
import { View, Text, Animated, Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "./Toast.styles";

const { height } = Dimensions.get("window");

interface ToastProps {
  visible: boolean;
  message: string;
  onHide?: () => void;
  duration?: number;
  type?: "success" | "error" | "warning" | "info";
  icon?: string;
  position?: "top" | "bottom";
}

export default function Toast({
  visible,
  message,
  onHide,
  duration = 2000,
  type = "success",
  icon,
  position = "bottom",
}: ToastProps) {
  const toastAnim = useRef(new Animated.Value(100)).current;
  const [showToast, setShowToast] = React.useState(false);

  // Get icon based on type
  const getIcon = () => {
    if (icon) return icon;

    switch (type) {
      case "success":
        return "checkmark-circle";
      case "error":
        return "close-circle";
      case "warning":
        return "warning";
      case "info":
        return "information-circle";
      default:
        return "checkmark-circle";
    }
  };

  // Get color based on type
  const getTypeColor = () => {
    switch (type) {
      case "success":
        return "rgba(76, 205, 196, 0.9)"; // Success green
      case "error":
        return "rgba(255, 107, 157, 0.9)"; // Error red/pink
      case "warning":
        return "rgba(255, 224, 102, 0.9)"; // Warning yellow
      case "info":
        return "rgba(69, 183, 209, 0.9)"; // Info blue
      default:
        return "rgba(76, 205, 196, 0.9)";
    }
  };

  const showToastMessage = () => {
    setShowToast(true);

    // Determine animation values based on position
    const startValue = position === "bottom" ? 100 : -100;
    const endValue = position === "bottom" ? -80 : 60;

    // Reset animation position
    toastAnim.setValue(startValue);

    // Slide in animation
    Animated.timing(toastAnim, {
      toValue: endValue,
      duration: 300,
      useNativeDriver: true,
    }).start();

    // Hide toast after specified duration
    setTimeout(() => {
      Animated.timing(toastAnim, {
        toValue: startValue,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        setShowToast(false);
        onHide?.();
      });
    }, duration);
  };

  useEffect(() => {
    if (visible) {
      showToastMessage();
    }
  }, [visible, message]);

  if (!showToast) return null;

  return (
    <Animated.View
      style={[
        styles.toast,
        {
          backgroundColor: getTypeColor(),
          borderColor: getTypeColor().replace("0.9", "0.3"),
          [position]: 30,
          transform: [{ translateY: toastAnim }],
        },
      ]}
    >
      <View style={styles.toastContent}>
        <Ionicons name={getIcon() as any} size={20} color="#FFFFFF" />
        <Text style={styles.toastText}>{message}</Text>
      </View>
    </Animated.View>
  );
}

// Hook for easier usage
export const useToast = () => {
  const [toastConfig, setToastConfig] = React.useState({
    visible: false,
    message: "",
    type: "success" as ToastProps["type"],
    icon: undefined as string | undefined,
    duration: 2000,
    position: "bottom" as ToastProps["position"],
  });

  const showToast = (
    message: string,
    options?: {
      type?: ToastProps["type"];
      icon?: string;
      duration?: number;
      position?: ToastProps["position"];
    }
  ) => {
    setToastConfig({
      visible: true,
      message,
      type: options?.type || "success",
      icon: options?.icon,
      duration: options?.duration || 2000,
      position: options?.position || "bottom",
    });
  };

  const hideToast = () => {
    setToastConfig((prev) => ({ ...prev, visible: false }));
  };

  const ToastComponent = () => (
    <Toast
      visible={toastConfig.visible}
      message={toastConfig.message}
      type={toastConfig.type}
      icon={toastConfig.icon}
      duration={toastConfig.duration}
      position={toastConfig.position}
      onHide={hideToast}
    />
  );

  return { showToast, ToastComponent };
};
