export interface UserCharacter {
  image_url: string;
  name: string;
}

export interface UserCharacterMove {
  name: string;
  description: string;
  type: "attack" | "defense" | "speed" | "specialDefense";
  uses: number;
  effects: any[]; // You can define a stricter type if you know the structure of each effect
}

export interface UserCharacterProps {
  id: string;
  character_id: string;
  user_id: string;
  character: UserCharacter;
  character_moves: UserCharacterMove[];
  attack: number;
  defense: number;
  special_attack: number;
  special_defense: number;
  speed: number;
  hit_points: number;
  level: number;
  nickname: string;
  xp_points: number;
  created_at: string;
  obtained_at: string;
}

export interface UserCharacterStats {
  attack: number;
  defense: number;
  special_attack: number;
  special_defense: number;
  speed: number;
  hit_points: number;
}
