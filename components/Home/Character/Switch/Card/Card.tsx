import { ButtonText, Heading } from "@/components/Text/TextComponents";
import colors from "@/constants/colors";
import React from "react";
import {
  View,
  ImageBackground,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { styles } from "./Card.styles";

// Import your assets and colors
// Replace these with actual imports for your project

interface CharacterCardProps {
  characterName: string;
  characterImage: any; // Replace with proper type for your image assets
  backgroundImage: any; // Replace with proper type for your image assets
  isActive?: boolean;
  onSwitch: any;
}

export const CharacterCard = ({
  characterName,
  characterImage,
  backgroundImage,
  isActive = false,
  onSwitch,
}: CharacterCardProps) => {
  return (
    <View
      style={[
        {
          width: "100%",
          paddingHorizontal: "5%",
          marginVertical: 20,
        },
      ]}
    >
      <ImageBackground
        source={backgroundImage}
        style={[styles.characterSwitchCard, { alignSelf: "center" }]}
        resizeMode="cover"
      >
        <Image
          source={characterImage}
          style={styles.characterSwitchCardImage}
        />
      </ImageBackground>
      <View
        style={[
          {
            flexDirection: "row",
            alignItems: "center",
            width: "100%",
            justifyContent: "space-between",
            marginTop: 5,
          },
        ]}
      >
        <Heading color={colors.PrimaryWhite}>{characterName}</Heading>
        <TouchableOpacity
          style={{
            backgroundColor: colors.SolaraGreen,
            paddingHorizontal: 15,
            paddingVertical: 6,
            borderRadius: 10,
            justifyContent: "center",
            alignItems: "center",
            shadowColor: colors.SolaraGreenDropShadow,
            shadowOffset: { width: 0, height: 3 },
            shadowOpacity: 1,
            shadowRadius: 0,
            elevation: 3,
          }}
          onPress={onSwitch}
        >
          <ButtonText color={colors.PrimaryWhite}>Switch</ButtonText>
        </TouchableOpacity>
      </View>
    </View>
  );
};
