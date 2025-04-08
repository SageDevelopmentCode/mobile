import React from "react";
import { View, ImageBackground, Image, TouchableOpacity } from "react-native";
import { HeroBar } from "./HeroBar/HeroBar";
import { getHeroSectionStyles } from "./HeroSection.styles";

interface HeroSectionProps {
  characterName: string;
  characterImage: any;
  backgroundImage: any;
  onCharacterPress: () => void;
  onSwitchPress: () => void;
}

export const HeroSection = ({
  characterName,
  characterImage,
  backgroundImage,
  onCharacterPress,
  onSwitchPress,
}: HeroSectionProps) => {
  const styles = getHeroSectionStyles();

  return (
    <ImageBackground
      source={backgroundImage}
      style={styles.imageBackground}
      resizeMode="cover"
    >
      <View style={styles.heroContent}>
        <HeroBar characterName={characterName} onSwitchPress={onSwitchPress} />

        <TouchableOpacity
          onPress={onCharacterPress}
          style={styles.characterImage}
        >
          <Image
            source={characterImage}
            style={styles.character}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};
