type StatType =
  | "attack"
  | "defense"
  | "specialAttack"
  | "specialDefense"
  | "speed";

export interface AbilityStats {
  attack: number;
  defense: number;
  specialAttack: number;
  specialDefense: number;
  speed: number;
}

export interface AbilityEffect {
  type: "damage" | "buff";
  value: number;
  stat?: StatType;
}

export interface Ability {
  name: string;
  type: StatType;
  effects: AbilityEffect[];
  description: string;
  uses: number;
}
