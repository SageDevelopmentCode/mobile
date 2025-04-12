import { supabase } from "../../supabase";

// Define types for character abilities
export type StatType =
  | "attack"
  | "defense"
  | "specialAttack"
  | "specialDefense"
  | "speed";

export interface AbilityEffect {
  type: "damage" | "buff";
  value: number;
  stat?: StatType;
}

export interface CharacterAbility {
  name: string;
  type: StatType;
  effects: AbilityEffect[];
  description: string;
  uses: number;
}

// Define the Character interface based on the database schema
export interface Character {
  id?: string;
  created_at?: string;
  name: string;
  description: string;
  image_url: string;
  rarity: string;
  base_attack: number;
  base_defense: number;
  base_special_attack: number;
  base_special_defense: number;
  base_speed: number;
  character_moves_set: CharacterAbility[];
  base_hit_points: number;
}

// Function to get all characters
export async function getAllCharacters() {
  const { data, error } = await supabase
    .from("characters")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching characters:", error);
    throw error;
  }

  return data;
}

// Function to get a single character by ID
export async function getCharacterById(id: string) {
  const { data, error } = await supabase
    .from("characters")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error(`Error fetching character with ID ${id}:`, error);
    throw error;
  }

  return data;
}

// Function to create a new character
export async function createCharacter(
  character: Omit<Character, "id" | "created_at">
) {
  const { data, error } = await supabase
    .from("characters")
    .insert(character)
    .select()
    .single();

  if (error) {
    console.error("Error creating character:", error);
    throw error;
  }

  return data;
}

// Function to update an existing character
export async function updateCharacter(
  id: string,
  characterData: Partial<Omit<Character, "id" | "created_at">>
) {
  const { data, error } = await supabase
    .from("characters")
    .update(characterData)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error(`Error updating character with ID ${id}:`, error);
    throw error;
  }

  return data;
}

// Function to delete a character
export async function deleteCharacter(id: string) {
  const { error } = await supabase.from("characters").delete().eq("id", id);

  if (error) {
    console.error(`Error deleting character with ID ${id}:`, error);
    throw error;
  }

  return true;
}

// Function to search characters by name
export async function searchCharactersByName(query: string) {
  const { data, error } = await supabase
    .from("characters")
    .select("*")
    .ilike("name", `%${query}%`)
    .order("name");

  if (error) {
    console.error("Error searching characters:", error);
    throw error;
  }

  return data;
}

// Function to filter characters by rarity
export async function getCharactersByRarity(rarity: string) {
  const { data, error } = await supabase
    .from("characters")
    .select("*")
    .eq("rarity", rarity)
    .order("name");

  if (error) {
    console.error(`Error fetching characters with rarity ${rarity}:`, error);
    throw error;
  }

  return data;
}
