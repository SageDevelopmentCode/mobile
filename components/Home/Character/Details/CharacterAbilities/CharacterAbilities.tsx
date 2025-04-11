import { ScrollView, Text, View } from "react-native";
import { CharacterAbility } from "./Ability/CharacterAbility";
import JudgeWisdom from "./Ability/assets/JudgeWisdom.png";
import JudgeWisdomBg from "./Ability/assets/JudgeWisdomBg.jpg";

type StatType =
  | "attack"
  | "defense"
  | "specialAttack"
  | "specialDefense"
  | "speed";

interface AbilityStats {
  attack: number;
  defense: number;
  specialAttack: number;
  specialDefense: number;
  speed: number;
}

interface Ability {
  name: string;
  type: StatType;
  stats: AbilityStats;
  description: string;
}

const abilities: Ability[] = [
  {
    name: "Prophetic Insight",
    type: "specialDefense",
    stats: {
      attack: 0,
      defense: 0,
      specialAttack: 0,
      specialDefense: 15,
      speed: 0,
    },
    description:
      "Heightened spiritual awareness grants resistance to special attacks and reveals enemy intentions.",
  },
  {
    name: "Judgment Call",
    type: "defense",
    stats: {
      attack: 0,
      defense: 10,
      specialAttack: 0,
      specialDefense: 0,
      speed: 0,
    },
    description:
      "Delivers a wise ruling that steadies the team and reinforces defense.",
  },
  {
    name: "Command Barak",
    type: "specialAttack",
    stats: {
      attack: 0,
      defense: 0,
      specialAttack: 50,
      specialDefense: 0,
      speed: 0,
    },
    description:
      "Inspires an ally to strike with divine power; launches a special attack through leadership.",
  },
  {
    name: "Palm Tree Wisdom",
    type: "defense",
    stats: {
      attack: 0,
      defense: 5,
      specialAttack: 0,
      specialDefense: 5,
      speed: 0,
    },
    description:
      "Passive aura of wisdom emanates from Deborah, gently boosting both defense and special defense over time.",
  },
  {
    name: "Swift Wind",
    type: "speed",
    stats: {
      attack: 0,
      defense: 0,
      specialAttack: 0,
      specialDefense: 0,
      speed: 25,
    },
    description:
      "A divine wind stirs at Deborah's command, increasing her speed or hastening allies.",
  },
];

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
      {abilities.map((ability, index) => (
        <CharacterAbility
          key={index}
          icon={JudgeWisdom}
          name={ability.name}
          type={ability.type}
          stats={ability.stats}
          description={ability.description}
        />
      ))}
    </ScrollView>
  );
};
