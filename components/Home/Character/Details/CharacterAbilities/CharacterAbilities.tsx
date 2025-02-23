import { ScrollView, Text, View } from "react-native";
import { CharacterAbility } from "./Ability/CharacterAbility";
import JudgeWisdom from "./Ability/assets/JudgeWisdom.png";
import JudgeWisdomBg from "./Ability/assets/JudgeWisdomBg.jpg";

interface CharacterAbilitiesProps {}

export const CharacterAbilities = ({}: CharacterAbilitiesProps) => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{
        paddingVertical: 20,
        alignItems: "center",
      }}
    >
      <CharacterAbility
        icon={JudgeWisdom}
        name="Judge's Wisdom"
        defense={15}
        accuracy={15}
        cardBackground={JudgeWisdomBg}
      />
      <CharacterAbility
        icon={JudgeWisdom}
        name="Judge's Wisdom"
        defense={15}
        accuracy={15}
        cardBackground={JudgeWisdomBg}
      />
      <CharacterAbility
        icon={JudgeWisdom}
        name="Judge's Wisdom"
        defense={15}
        accuracy={15}
        cardBackground={JudgeWisdomBg}
      />
      <CharacterAbility
        icon={JudgeWisdom}
        name="Judge's Wisdom"
        defense={15}
        accuracy={15}
        cardBackground={JudgeWisdomBg}
      />
    </ScrollView>
  );
};
