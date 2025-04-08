import React, { useRef, useEffect } from "react";
import { View, ScrollView, Animated, Text, Image } from "react-native";
import { getCharacterSwitchMenuStyles } from "./CharacterSwitchMenu.styles";
import { CharacterCard } from "./Card/Card";

interface CharacterSwitchMenuProps {
  slideAnim: Animated.Value;
  characters: {
    name: string;
    image: any;
    backgroundImage: any;
  }[];
  onSwitchCharacter: (characterName: string) => void;
  activeCharacter: string;
  typeImage?: any;
}

export const CharacterSwitchMenu = ({
  slideAnim,
  characters,
  onSwitchCharacter,
  activeCharacter,
  typeImage,
}: CharacterSwitchMenuProps) => {
  const styles = getCharacterSwitchMenuStyles(activeCharacter);

  // Animation values for staggered card entrance
  const cardAnimations = useRef(
    characters.map(() => new Animated.Value(0))
  ).current;
  const headerAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Animate header first
    Animated.timing(headerAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();

    // Staggered animation for each card
    characters.forEach((_, index) => {
      Animated.timing(cardAnimations[index], {
        toValue: 1,
        duration: 400,
        delay: 300 + index * 150,
        useNativeDriver: true,
      }).start();
    });
  }, []);

  return (
    <Animated.View
      style={[
        styles.menu,
        {
          transform: [{ translateY: slideAnim }],
        },
      ]}
    >
      <View style={styles.decorativeCircle} />
      <View style={styles.decorativeCircle2} />

      <Animated.View
        style={[
          styles.headerContainer,
          {
            opacity: headerAnim,
            transform: [
              {
                translateY: headerAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [-20, 0],
                }),
              },
            ],
          },
        ]}
      >
        <Text style={styles.headerText}>CHOOSE YOUR CHARACTER</Text>
        <View style={styles.dividerContainer}>
          <View style={styles.divider} />
          <Image source={typeImage} style={styles.headerTypeImage} />
          <View style={styles.divider} />
        </View>
      </Animated.View>

      <ScrollView
        scrollEnabled={true}
        horizontal={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.menuScrollViewContainer}
        style={{ width: "100%" }}
      >
        <View style={styles.characterSwitchMenuContentContainer}>
          <View style={styles.cardsContainer}>
            {characters.map((character, index) => (
              <Animated.View
                key={character.name}
                style={{
                  opacity: cardAnimations[index],
                  transform: [
                    {
                      translateX: cardAnimations[index].interpolate({
                        inputRange: [0, 1],
                        outputRange: [-50, 0],
                      }),
                    },
                    {
                      scale: cardAnimations[index].interpolate({
                        inputRange: [0, 1],
                        outputRange: [0.9, 1],
                      }),
                    },
                  ],
                }}
              >
                <CharacterCard
                  characterName={character.name}
                  characterImage={character.image}
                  backgroundImage={character.backgroundImage}
                  onSwitch={() => onSwitchCharacter(character.name)}
                  isActive={character.name === activeCharacter}
                  typeImage={typeImage}
                />
              </Animated.View>
            ))}
          </View>
        </View>
      </ScrollView>
    </Animated.View>
  );
};
