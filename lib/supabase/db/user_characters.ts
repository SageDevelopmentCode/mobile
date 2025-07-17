import { supabase } from "../supabase";
import { Character } from "./characters";

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
  user_character_mood: any;
}

// Interface for joined data when we include character data
export interface UserCharacterWithDetails extends UserCharacter {
  character: Character;
}

// Function to get all user characters for a specific user using Supabase client
export async function getUserCharacters(userId: string) {
  const { data, error } = await supabase
    .schema("user_data")
    .from("user_characters")
    .select("*")
    .eq("user_id", userId)
    .order("level", { ascending: false });

  if (error) {
    console.error("Error fetching user characters:", error);
    throw error;
  }

  return data;
}

// Function to get user characters with their character details using Supabase client
export async function getUserCharactersWithDetails(userId: string) {
  // First get user characters
  const { data: userCharacters, error: userCharactersError } = await supabase
    .schema("user_data")
    .from("user_characters")
    .select("*")
    .eq("user_id", userId)
    .order("level", { ascending: false });

  if (userCharactersError) {
    console.error(
      "Error fetching user characters with details:",
      userCharactersError
    );
    throw userCharactersError;
  }

  if (!userCharacters || userCharacters.length === 0) {
    return [];
  }

  // Get all character IDs
  const characterIds = userCharacters.map((uc) => uc.character_id);

  // Get character details from content schema
  const { data: characters, error: charactersError } = await supabase
    .schema("content")
    .from("characters")
    .select("*")
    .in("id", characterIds);

  if (charactersError) {
    console.error("Error fetching character details:", charactersError);
    throw charactersError;
  }

  // Combine the data
  const userCharactersWithDetails = userCharacters.map((userCharacter) => {
    const character = characters?.find(
      (c) => c.id === userCharacter.character_id
    );
    return {
      ...userCharacter,
      character,
    };
  });

  return userCharactersWithDetails as UserCharacterWithDetails[];
}

// Function to get the user's active character for the current week using Supabase client
export async function getUserActiveCharacterForWeek(userId: string) {
  // First get the user character
  const { data: userCharacter, error: userCharacterError } = await supabase
    .schema("user_data")
    .from("user_characters")
    .select("*")
    .eq("user_id", userId)
    .eq("is_active_week", true)
    .single();

  if (userCharacterError) {
    console.error(
      "Error fetching user's active character for the week:",
      userCharacterError
    );
    // Return null if no active character found instead of throwing
    if (userCharacterError.code === "PGRST116") {
      return null;
    }
    throw userCharacterError;
  }

  // Then get the character details from content schema
  const { data: character, error: characterError } = await supabase
    .schema("content")
    .from("characters")
    .select("*")
    .eq("id", userCharacter.character_id)
    .single();

  if (characterError) {
    console.error("Error fetching character details:", characterError);
    throw characterError;
  }

  // Combine the data
  return {
    ...userCharacter,
    character,
  } as UserCharacterWithDetails;
}

// Function to get a single user character by ID using Supabase client
export async function getUserCharacterById(id: string) {
  const { data, error } = await supabase
    .schema("user_data")
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

// Function to get a single user character with details by ID using Supabase client
export async function getUserCharacterWithDetailsById(id: string) {
  // First get the user character
  const { data: userCharacter, error: userCharacterError } = await supabase
    .schema("user_data")
    .from("user_characters")
    .select("*")
    .eq("id", id)
    .single();

  if (userCharacterError) {
    console.error(
      `Error fetching user character with details with ID ${id}:`,
      userCharacterError
    );
    throw userCharacterError;
  }

  // Then get the character details from content schema
  const { data: character, error: characterError } = await supabase
    .schema("content")
    .from("characters")
    .select("*")
    .eq("id", userCharacter.character_id)
    .single();

  if (characterError) {
    console.error("Error fetching character details:", characterError);
    throw characterError;
  }

  // Combine the data
  return {
    ...userCharacter,
    character,
  } as UserCharacterWithDetails;
}

// Function to create a new user character using Supabase client
export async function createUserCharacter(
  userCharacter: Omit<UserCharacter, "id" | "created_at">
) {
  const { data, error } = await supabase
    .schema("user_data")
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

// Function to update an existing user character using Supabase client
export async function updateUserCharacter(
  id: string,
  userCharacterData: Partial<
    Omit<UserCharacter, "id" | "created_at" | "user_id" | "character_id">
  >
) {
  const { data, error } = await supabase
    .schema("user_data")
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

// Function to delete a user character using Supabase client
export async function deleteUserCharacter(id: string) {
  const { data, error } = await supabase
    .schema("user_data")
    .from("user_characters")
    .delete()
    .eq("id", id);

  if (error) {
    console.error(`Error deleting user character with ID ${id}:`, error);
    throw error;
  }

  return true;
}

// Function to get user characters by character_id using Supabase client
export async function getUserCharactersByCharacterId(
  userId: string,
  characterId: string
) {
  const { data, error } = await supabase
    .schema("user_data")
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

// Function to update character XP and level using Supabase client
export async function updateUserCharacterXP(
  id: string,
  xpPoints: number,
  level: number
) {
  const { data, error } = await supabase
    .schema("user_data")
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
