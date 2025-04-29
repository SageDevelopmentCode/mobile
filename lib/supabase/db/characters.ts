import { makeSupabaseRequest } from "../rest-api";

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

// Function to get all characters using REST API
export async function getAllCharacters() {
  const { data, error } = await makeSupabaseRequest(
    "rest/v1/characters",
    "GET",
    { order: "created_at.desc" }
  );

  if (error) {
    console.error("Error fetching characters:", error);
    throw error;
  }

  return data;
}

// Function to get a single character by ID using REST API
export async function getCharacterById(id: string) {
  const { data, error } = await makeSupabaseRequest(
    "rest/v1/characters",
    "GET",
    { "id.eq": id },
    null
  );

  if (error) {
    console.error(`Error fetching character with ID ${id}:`, error);
    throw error;
  }

  // REST API returns an array, but we want a single object
  if (Array.isArray(data) && data.length > 0) {
    return data[0];
  }

  throw new Error(`Character with ID ${id} not found`);
}

// Function to create a new character using REST API
export async function createCharacter(
  character: Omit<Character, "id" | "created_at">
) {
  const { data, error } = await makeSupabaseRequest(
    "rest/v1/characters",
    "POST",
    {},
    character
  );

  if (error) {
    console.error("Error creating character:", error);
    throw error;
  }

  return data;
}

// Function to update an existing character using REST API
export async function updateCharacter(
  id: string,
  characterData: Partial<Omit<Character, "id" | "created_at">>
) {
  const { data, error } = await makeSupabaseRequest(
    "rest/v1/characters",
    "PATCH",
    { "id.eq": id },
    characterData
  );

  if (error) {
    console.error(`Error updating character with ID ${id}:`, error);
    throw error;
  }

  // REST API might return multiple records, we want the updated one
  if (Array.isArray(data) && data.length > 0) {
    return data[0];
  }

  return data;
}

// Function to delete a character using REST API
export async function deleteCharacter(id: string) {
  const { data, error } = await makeSupabaseRequest(
    "rest/v1/characters",
    "DELETE",
    { "id.eq": id }
  );

  if (error) {
    console.error(`Error deleting character with ID ${id}:`, error);
    throw error;
  }

  return true;
}

// Function to search characters by name using REST API
export async function searchCharactersByName(query: string) {
  const { data, error } = await makeSupabaseRequest(
    "rest/v1/characters",
    "GET",
    { "name.ilike": `%${query}%`, order: "name" }
  );

  if (error) {
    console.error("Error searching characters:", error);
    throw error;
  }

  return data;
}

// Function to filter characters by rarity using REST API
export async function getCharactersByRarity(rarity: string) {
  const { data, error } = await makeSupabaseRequest(
    "rest/v1/characters",
    "GET",
    { "rarity.eq": rarity, order: "name" }
  );

  if (error) {
    console.error(`Error fetching characters with rarity ${rarity}:`, error);
    throw error;
  }

  return data;
}
