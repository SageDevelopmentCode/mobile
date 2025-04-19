import { supabase } from "../../../supabase";
import { Character } from "../../characters/client/characters";

// Define the UserCharacter interface based on the database schema
export interface UserCharacter {
  id?: string;
  created_at?: string;
  user_id: string;
  character_id: string;
  level: number;
  xp_points: number;
  obtained_at?: string;
  attack: number;
  defense: number;
  special_attack: number;
  special_defense: number;
  speed: number;
  character_moves: any; // Using 'any' for JSONB
  hit_points: number;
}

// Interface for joined data when we include character data
export interface UserCharacterWithDetails extends UserCharacter {
  character: Character;
}

// Function to get all user characters for a specific user
export async function getUserCharacters(userId: string) {
  const { data, error } = await supabase
    .from("user_characters")
    .select(
      `
      *,
      character:character_id(name, image_url)
    `
    )
    .eq("user_id", userId)
    .order("level", { ascending: false });

  if (error) {
    console.error("Error fetching user characters:", error);
    throw error;
  }

  return data;
}

// Function to get user characters with their character details
export async function getUserCharactersWithDetails(userId: string) {
  const { data, error } = await supabase
    .from("user_characters")
    .select(
      `
      *,
      character:character_id(*)
    `
    )
    .eq("user_id", userId)
    .order("level", { ascending: false });

  if (error) {
    console.error("Error fetching user characters with details:", error);
    throw error;
  }

  return data as UserCharacterWithDetails[];
}

// Function to get a single user character by ID
export async function getUserCharacterById(id: string) {
  const { data, error } = await supabase
    .from("user_characters")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error(`Error fetching user character with ID ${id}:`, error);
    throw error;
  }

  return data;
}

// Function to get a single user character with details by ID
export async function getUserCharacterWithDetailsById(id: string) {
  const { data, error } = await supabase
    .from("user_characters")
    .select(
      `
      *,
      character:character_id(*)
    `
    )
    .eq("id", id)
    .single();

  if (error) {
    console.error(
      `Error fetching user character with details with ID ${id}:`,
      error
    );
    throw error;
  }

  return data as UserCharacterWithDetails;
}

// Function to create a new user character
export async function createUserCharacter(
  userCharacter: Omit<UserCharacter, "id" | "created_at">
) {
  const { data, error } = await supabase
    .from("user_characters")
    .insert(userCharacter)
    .select()
    .single();

  if (error) {
    console.error("Error creating user character:", error);
    throw error;
  }

  return data;
}

// Function to update an existing user character
export async function updateUserCharacter(
  id: string,
  userCharacterData: Partial<
    Omit<UserCharacter, "id" | "created_at" | "user_id" | "character_id">
  >
) {
  const { data, error } = await supabase
    .from("user_characters")
    .update(userCharacterData)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error(`Error updating user character with ID ${id}:`, error);
    throw error;
  }

  return data;
}

// Function to delete a user character
export async function deleteUserCharacter(id: string) {
  const { error } = await supabase
    .from("user_characters")
    .delete()
    .eq("id", id);

  if (error) {
    console.error(`Error deleting user character with ID ${id}:`, error);
    throw error;
  }

  return true;
}

// Function to get user characters by character_id
export async function getUserCharactersByCharacterId(
  userId: string,
  characterId: string
) {
  const { data, error } = await supabase
    .from("user_characters")
    .select("*")
    .eq("user_id", userId)
    .eq("character_id", characterId);

  if (error) {
    console.error(
      `Error fetching user characters with character ID ${characterId}:`,
      error
    );
    throw error;
  }

  return data;
}

// Function to update character XP and level
export async function updateUserCharacterXP(
  id: string,
  xpPoints: number,
  level: number
) {
  const { data, error } = await supabase
    .from("user_characters")
    .update({
      xp_points: xpPoints,
      level: level,
    })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error(`Error updating XP for user character with ID ${id}:`, error);
    throw error;
  }

  return data;
}
