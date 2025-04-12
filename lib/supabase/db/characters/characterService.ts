import {
  Character,
  createCharacter,
  deleteCharacter,
  getAllCharacters,
  getCharacterById,
  getCharactersByRarity,
  searchCharactersByName,
  updateCharacter,
} from "./characters";

import {
  UserCharacter,
  UserCharacterWithDetails,
  createUserCharacter,
  deleteUserCharacter,
  getUserCharacterById,
  getUserCharacters,
  getUserCharactersByCharacterId,
  getUserCharactersWithDetails,
  getUserCharacterWithDetailsById,
  updateUserCharacter,
  updateUserCharacterXP,
} from "./user_characters";

/**
 * CharacterService provides an easier interface to work with character data
 */
export class CharacterService {
  /**
   * Get all characters from the database
   */
  static async getAll(): Promise<Character[]> {
    return getAllCharacters();
  }

  /**
   * Get a character by ID
   */
  static async getById(id: string): Promise<Character> {
    return getCharacterById(id);
  }

  /**
   * Create a new character
   */
  static async create(
    character: Omit<Character, "id" | "created_at">
  ): Promise<Character> {
    return createCharacter(character);
  }

  /**
   * Update an existing character
   */
  static async update(
    id: string,
    characterData: Partial<Omit<Character, "id" | "created_at">>
  ): Promise<Character> {
    return updateCharacter(id, characterData);
  }

  /**
   * Delete a character
   */
  static async delete(id: string): Promise<boolean> {
    return deleteCharacter(id);
  }

  /**
   * Search characters by name
   */
  static async searchByName(query: string): Promise<Character[]> {
    return searchCharactersByName(query);
  }

  /**
   * Filter characters by rarity
   */
  static async getByRarity(rarity: string): Promise<Character[]> {
    return getCharactersByRarity(rarity);
  }
}

/**
 * UserCharacterService provides an easier interface to work with user character data
 */
export class UserCharacterService {
  /**
   * Get all user characters for a user
   */
  static async getAllForUser(userId: string): Promise<UserCharacter[]> {
    return getUserCharacters(userId);
  }

  /**
   * Get all user characters with character details for a user
   */
  static async getAllWithDetailsForUser(
    userId: string
  ): Promise<UserCharacterWithDetails[]> {
    return getUserCharactersWithDetails(userId);
  }

  /**
   * Get a user character by ID
   */
  static async getById(id: string): Promise<UserCharacter> {
    return getUserCharacterById(id);
  }

  /**
   * Get a user character with details by ID
   */
  static async getWithDetailsById(
    id: string
  ): Promise<UserCharacterWithDetails> {
    return getUserCharacterWithDetailsById(id);
  }

  /**
   * Create a new user character
   */
  static async create(
    userCharacter: Omit<UserCharacter, "id" | "created_at">
  ): Promise<UserCharacter> {
    return createUserCharacter(userCharacter);
  }

  /**
   * Update an existing user character
   */
  static async update(
    id: string,
    userCharacterData: Partial<
      Omit<UserCharacter, "id" | "created_at" | "user_id" | "character_id">
    >
  ): Promise<UserCharacter> {
    return updateUserCharacter(id, userCharacterData);
  }

  /**
   * Delete a user character
   */
  static async delete(id: string): Promise<boolean> {
    return deleteUserCharacter(id);
  }

  /**
   * Get user characters by character ID
   */
  static async getByCharacterId(
    userId: string,
    characterId: string
  ): Promise<UserCharacter[]> {
    return getUserCharactersByCharacterId(userId, characterId);
  }

  /**
   * Update character XP and level
   */
  static async updateXPAndLevel(
    id: string,
    xpPoints: number,
    level: number
  ): Promise<UserCharacter> {
    return updateUserCharacterXP(id, xpPoints, level);
  }

  /**
   * Add XP to a character and level up if necessary
   * @param id The user character ID
   * @param xpToAdd The amount of XP to add
   * @param currentXP The current XP
   * @param currentLevel The current level
   * @param xpThreshold Amount of XP needed to level up
   */
  static async addXP(
    id: string,
    xpToAdd: number,
    currentXP: number,
    currentLevel: number,
    xpThreshold: number = 100
  ): Promise<UserCharacter> {
    const newXP = currentXP + xpToAdd;

    // Check if character should level up
    let newLevel = currentLevel;
    if (newXP >= xpThreshold) {
      newLevel = currentLevel + Math.floor(newXP / xpThreshold);
      // Optional: reset XP or keep remainder
      // const remainderXP = newXP % xpThreshold;
    }

    return updateUserCharacterXP(id, newXP, newLevel);
  }
}
