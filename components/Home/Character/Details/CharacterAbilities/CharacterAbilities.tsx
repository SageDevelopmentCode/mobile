import { ScrollView, Text, View } from "react-native";
import { CharacterAbility } from "./Ability/CharacterAbility";
import JudgeWisdom from "./Ability/assets/JudgeWisdom.png";
import { Ability } from "@/types/CharacterAbilities";

interface CharacterAbilitiesProps {
  characterMoves: Ability[];
}

export const CharacterAbilities = ({
  characterMoves,
}: CharacterAbilitiesProps) => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{
        paddingVertical: 20,
        alignItems: "center",
      }}
    >
      {characterMoves.map((ability, index) => (
        <CharacterAbility
          key={index}
          icon={JudgeWisdom}
          name={ability.name}
          type={ability.type}
          effects={ability.effects}
          description={ability.description}
          uses={ability.uses}
        />
      ))}
    </ScrollView>
  );
};
