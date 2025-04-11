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

interface AbilityEffect {
  type: "damage" | "buff";
  value: number;
  stat?: StatType;
}

interface Ability {
  name: string;
  type: StatType;
  effects: AbilityEffect[];
  description: string;
  uses: number;
}

const abilities: Ability[] = [
  {
    name: "Voice of Thunder",
    type: "specialAttack",
    effects: [
      { type: "damage", value: 120 },
      { type: "buff", value: -10, stat: "speed" },
    ],
    description:
      "Unleashes divine power with a thunderous voice, dealing heavy special damage and possibly stunning.",
    uses: 2,
  },
  {
    name: "Shield of Faith",
    type: "specialDefense",
    effects: [{ type: "buff", value: 30, stat: "specialDefense" }],
    description:
      "Summons a spiritual barrier, greatly increasing resistance to special damage.",
    uses: 4,
  },
  {
    name: "Call to Arms",
    type: "attack",
    effects: [
      { type: "damage", value: 85 },
      { type: "buff", value: 10, stat: "defense" },
      { type: "buff", value: 10, stat: "speed" },
    ],
    description:
      "A rallying cry that raises physical attack power while boosting minor speed and defense.",
    uses: 3,
  },
  {
    name: "Encampment of Peace",
    type: "defense",
    effects: [
      { type: "buff", value: 20, stat: "defense" },
      { type: "buff", value: 10, stat: "specialDefense" },
    ],
    description:
      "Fortifies an area with divine protection, enhancing defense and special defense.",
    uses: 4,
  },
  {
    name: "Holy Surge",
    type: "specialAttack",
    effects: [
      { type: "damage", value: 95 },
      { type: "buff", value: 15, stat: "speed" },
    ],
    description:
      "Strikes with sacred energy, hitting faster and harder if used after defensive moves.",
    uses: 3,
  },
  {
    name: "Heavenly Counsel",
    type: "specialDefense",
    effects: [
      { type: "buff", value: 25, stat: "specialDefense" },
      { type: "buff", value: 10, stat: "specialAttack" },
      { type: "buff", value: 5, stat: "speed" },
    ],
    description:
      "Receives divine insight, improving resistance and boosting focus for precise counterattacks.",
    uses: 3,
  },
  {
    name: "Wise Delay",
    type: "defense",
    effects: [
      { type: "buff", value: 25, stat: "defense" },
      { type: "buff", value: -5, stat: "speed" },
    ],
    description:
      "With calculated patience, delays conflict and builds up defensive posture.",
    uses: 4,
  },
  {
    name: "Sacrifice of Praise",
    type: "specialDefense",
    effects: [
      { type: "buff", value: 30, stat: "specialDefense" },
      { type: "buff", value: -10, stat: "speed" },
    ],
    description:
      "Offers up protection through worship, granting powerful spiritual resistance at a cost of speed.",
    uses: 2,
  },
  {
    name: "Chainbreaker",
    type: "speed",
    effects: [{ type: "buff", value: 30, stat: "speed" }],
    description:
      "Breaks free from restraints, boosting speed dramatically and removing all slow effects.",
    uses: 3,
  },
  {
    name: "Banner of Victory",
    type: "attack",
    effects: [
      { type: "damage", value: 75 },
      { type: "buff", value: 10, stat: "defense" },
      { type: "buff", value: 10, stat: "speed" },
    ],
    description:
      "Raises a symbol of triumph that empowers physical might and boosts forward momentum.",
    uses: 4,
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
          effects={ability.effects}
          description={ability.description}
          uses={ability.uses}
        />
      ))}
    </ScrollView>
  );
};
