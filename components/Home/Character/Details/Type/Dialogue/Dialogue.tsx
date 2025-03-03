import React from "react";
import { View, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons"; // Assuming you're using Expo
import colors from "@/constants/colors";
import { Heading, StatText } from "@/components/Text/TextComponents";
import { styles } from "./Dialogue.styles";

interface CharacterTypeDialogProps {
  title: string;
  description: string;
  typeImage: any; // Replace with proper type for your image assets
  onClose: () => void;
  type: string;
}

export const CharacterTypeDialog = ({
  title,
  description,
  typeImage,
  onClose,
  type,
}: CharacterTypeDialogProps) => {
  return (
    <View
      style={[
        styles.dialogOverlay,
        { backgroundColor: colors.DarkPurpleButton },
      ]}
    >
      <View style={styles.dialogBox}>
        <Heading style={{ marginBottom: 5 }} color={colors.SolaraGreen}>
          {title}
        </Heading>
        <StatText color={colors.PrimaryWhite}>{description}</StatText>
      </View>
      <View style={styles.dialogImageContainer}>
        <TouchableOpacity style={styles.dialogClose} onPress={onClose}>
          <Ionicons name="close" size={25} color={colors.PrimaryWhite} />
        </TouchableOpacity>
        <Image source={typeImage} style={styles.dialogImage} />
      </View>
    </View>
  );
};
