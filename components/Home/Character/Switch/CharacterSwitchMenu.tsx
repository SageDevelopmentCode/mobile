import React from "react";
import { View, ScrollView, Animated } from "react-native";
import HeadingBar from "@/components/Heading/HeadingBar";
import { CharacterCard } from "./Card/Card";
import { getCharacterSwitchMenuStyles } from "./CharacterSwitchMenu.styles";

interface CharacterSwitchMenuProps {
  slideAnim: Animated.Value;
  characters: {
    name: string;
    image: any;
    backgroundImage: any;
  }[];
  onSwitchCharacter: (characterName: string) => void;
  activeCharacter: string;
}

export const CharacterSwitchMenu = ({
  slideAnim,
  characters,
  onSwitchCharacter,
  activeCharacter,
}: CharacterSwitchMenuProps) => {
  const styles = getCharacterSwitchMenuStyles(activeCharacter);

  return (
    <Animated.View
      style={[
        styles.menu,
        {
          transform: [{ translateY: slideAnim }],
        },
      ]}
    >
      <ScrollView
        scrollEnabled={true}
        horizontal={false}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.menuScrollViewContainer}
        style={{ width: "100%" }}
      >
        <View style={styles.characterSwitchMenuContentContainer}>
          <HeadingBar headingText="Your Characters" />
          {characters.map((character) => (
            <CharacterCard
              key={character.name}
              characterName={character.name}
              characterImage={character.image}
              backgroundImage={character.backgroundImage}
              onSwitch={() => onSwitchCharacter(character.name)}
            />
          ))}
        </View>
      </ScrollView>
    </Animated.View>
  );
};
