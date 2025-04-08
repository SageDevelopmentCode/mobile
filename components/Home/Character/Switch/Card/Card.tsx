import React from "react";
import { View, Image, TouchableOpacity, Text, StyleSheet } from "react-native";
import colors from "@/constants/colors";

interface CharacterCardProps {
  characterName: string;
  characterImage: any;
  backgroundImage: any;
  isActive?: boolean;
  onSwitch: () => void;
  typeImage?: any;
}

export const CharacterCard = ({
  characterName,
  characterImage,
  isActive = false,
  onSwitch,
  typeImage,
}: CharacterCardProps) => {
  // Determine colors based on character name
  const isDeborahType =
    characterName === "Deborah" || characterName === "Sarah";
  const cardColor = isDeborahType
    ? colors.PrimaryPurpleBackground
    : colors.SolaraGreen;

  return (
    <TouchableOpacity
      style={[
        styles.cardContainer,
        isActive && { borderColor: cardColor, borderWidth: 2 },
        { backgroundColor: isActive ? `${cardColor}10` : "#FFFFFF" },
      ]}
      onPress={onSwitch}
      activeOpacity={0.7}
    >
      <View style={styles.contentContainer}>
        <View style={styles.textContainer}>
          <Text style={[styles.nameText, { color: cardColor }]}>
            {characterName}
          </Text>
          <View style={styles.typeContainer}>
            <Image source={typeImage} style={styles.typeImage} />
            <Text style={styles.typeText}>Solara</Text>
          </View>
        </View>

        <Image
          source={characterImage}
          style={styles.characterImage}
          resizeMode="contain"
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: "100%",
    height: 88,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: "hidden",
  },
  contentContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    width: "100%",
    height: "100%",
  },
  textContainer: {
    flexDirection: "column",
    justifyContent: "center",
  },
  nameText: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 4,
  },
  typeContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  typeText: {
    fontSize: 14,
    color: "#666666",
    marginLeft: 5,
  },
  typeImage: {
    width: 18,
    height: 18,
  },
  characterImage: {
    height: 70,
    width: 70,
  },
});
