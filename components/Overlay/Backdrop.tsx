import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";

interface BackdropProps {
  onPress: () => void;
}

export const Backdrop = ({ onPress }: BackdropProps) => {
  return <TouchableOpacity style={styles.overlay} onPress={onPress} />;
};

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 11,
  },
});
