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
