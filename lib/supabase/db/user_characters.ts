import { makeSupabaseRequest } from "../rest-api";
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

// Function to get all user characters for a specific user using REST API
export async function getUserCharacters(userId: string) {
  const { data, error } = await makeSupabaseRequest(
    "rest/v1/user_characters",
    "GET",
    {
      "user_id.eq": userId,
      order: "level.desc",
      select: "*,character:character_id(name,image_url,headshot_image_url)",
    }
  );

  if (error) {
    console.error("Error fetching user characters:", error);
    throw error;
  }

  return data;
}

// Function to get user characters with their character details using REST API
export async function getUserCharactersWithDetails(userId: string) {
  const { data, error } = await makeSupabaseRequest(
    "rest/v1/user_characters",
    "GET",
    {
      "user_id.eq": userId,
      order: "level.desc",
      select: "*,character:character_id(*)",
    }
  );

  if (error) {
    console.error("Error fetching user characters with details:", error);
    throw error;
  }

  return data as UserCharacterWithDetails[];
}

// Function to get the user's active character for the current week using REST API
export async function getUserActiveCharacterForWeek(userId: string) {
  const { data, error } = await makeSupabaseRequest(
    "rest/v1/user_characters",
    "GET",
    {
      "user_id.eq": userId,
      "is_active_week.eq": true,
      select:
        "*,character:character_id(*),user_character_mood!user_character_id(current_mood_id,character_moods!current_mood_id(*))",
    }
  );

  if (error) {
    console.error(
      "Error fetching user's active character for the week:",
      error
    );
    throw error;
  }

  // REST API returns an array, but we want a single object
  if (Array.isArray(data) && data.length > 0) {
    return data[0] as UserCharacterWithDetails;
  }

  // Return null if no active character found for the week
  return null;
}

// Function to get a single user character by ID using REST API
export async function getUserCharacterById(id: string) {
  const { data, error } = await makeSupabaseRequest(
    "rest/v1/user_characters",
    "GET",
    { "id.eq": id }
  );

  if (error) {
    console.error(`Error fetching user character with ID ${id}:`, error);
    throw error;
  }

  // REST API returns an array, but we want a single object
  if (Array.isArray(data) && data.length > 0) {
    return data[0];
  }

  throw new Error(`User character with ID ${id} not found`);
}

// Function to get a single user character with details by ID using REST API
export async function getUserCharacterWithDetailsById(id: string) {
  const { data, error } = await makeSupabaseRequest(
    "rest/v1/user_characters",
    "GET",
    {
      "id.eq": id,
      select: "*,character:character_id(*)",
    }
  );

  if (error) {
    console.error(
      `Error fetching user character with details with ID ${id}:`,
      error
    );
    throw error;
  }

  // REST API returns an array, but we want a single object
  if (Array.isArray(data) && data.length > 0) {
    return data[0] as UserCharacterWithDetails;
  }

  throw new Error(`User character with ID ${id} not found`);
}

// Function to create a new user character using REST API
export async function createUserCharacter(
  userCharacter: Omit<UserCharacter, "id" | "created_at">
) {
  const { data, error } = await makeSupabaseRequest(
    "rest/v1/user_characters",
    "POST",
    {},
    userCharacter
  );

  if (error) {
    console.error("Error creating user character:", error);
    throw error;
  }

  // REST API may return an array, but we want a single object
  if (Array.isArray(data) && data.length > 0) {
    return data[0];
  }

  return data;
}

// Function to update an existing user character using REST API
export async function updateUserCharacter(
  id: string,
  userCharacterData: Partial<
    Omit<UserCharacter, "id" | "created_at" | "user_id" | "character_id">
  >
) {
  const { data, error } = await makeSupabaseRequest(
    "rest/v1/user_characters",
    "PATCH",
    { "id.eq": id },
    userCharacterData
  );

  if (error) {
    console.error(`Error updating user character with ID ${id}:`, error);
    throw error;
  }

  // REST API may return an array, but we want a single object
  if (Array.isArray(data) && data.length > 0) {
    return data[0];
  }

  return data;
}

// Function to delete a user character using REST API
export async function deleteUserCharacter(id: string) {
  const { data, error } = await makeSupabaseRequest(
    "rest/v1/user_characters",
    "DELETE",
    { "id.eq": id }
  );

  if (error) {
    console.error(`Error deleting user character with ID ${id}:`, error);
    throw error;
  }

  return true;
}

// Function to get user characters by character_id using REST API
export async function getUserCharactersByCharacterId(
  userId: string,
  characterId: string
) {
  const { data, error } = await makeSupabaseRequest(
    "rest/v1/user_characters",
    "GET",
    {
      "user_id.eq": userId,
      "character_id.eq": characterId,
    }
  );

  if (error) {
    console.error(
      `Error fetching user characters with character ID ${characterId}:`,
      error
    );
    throw error;
  }

  return data;
}

// Function to update character XP and level using REST API
export async function updateUserCharacterXP(
  id: string,
  xpPoints: number,
  level: number
) {
  const { data, error } = await makeSupabaseRequest(
    "rest/v1/user_characters",
    "PATCH",
    { "id.eq": id },
    {
      xp_points: xpPoints,
      level: level,
    }
  );

  if (error) {
    console.error(`Error updating XP for user character with ID ${id}:`, error);
    throw error;
  }

  // REST API may return an array, but we want a single object
  if (Array.isArray(data) && data.length > 0) {
    return data[0];
  }

  return data;
}
