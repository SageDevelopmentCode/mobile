import { CharacterService } from "./characterService";
import { Character, CharacterAbility } from "./characters";

/**
 * Examples of how to use the CharacterService
 */

// Example: Get all characters
async function getAllCharactersExample() {
  try {
    const characters = await CharacterService.getAll();
    console.log("All characters:", characters);
    return characters;
  } catch (error) {
    console.error("Error getting all characters:", error);
  }
}

// Example: Get a character by ID
async function getCharacterByIdExample(id: string) {
  try {
    const character = await CharacterService.getById(id);
    console.log(`Character with ID ${id}:`, character);
    return character;
  } catch (error) {
    console.error(`Error getting character with ID ${id}:`, error);
  }
}

// Example: Create a new character
async function createCharacterExample() {
  // Sample abilities for a new character
  const sampleAbilities: CharacterAbility[] = [
    {
      name: "Flame Strike",
      type: "specialAttack",
      effects: [
        { type: "damage", value: 120 },
        { type: "buff", value: 15, stat: "speed" },
      ],
      description: "Engulfs enemies in flames, dealing heavy special damage.",
      uses: 3,
    },
    {
      name: "Protective Aura",
      type: "defense",
      effects: [
        { type: "buff", value: 25, stat: "defense" },
        { type: "buff", value: 15, stat: "specialDefense" },
      ],
      description:
        "Creates a protective barrier that boosts defense and special defense.",
      uses: 4,
    },
  ];

  // Sample new character
  const newCharacter: Omit<Character, "id" | "created_at"> = {
    name: "Flame Guardian",
    description: "A powerful guardian with command over fire elements.",
    image_url: "https://example.com/images/flame-guardian.jpg",
    rarity: "Legendary",
    base_attack: 85,
    base_defense: 70,
    base_special_attack: 110,
    base_special_defense: 90,
    base_speed: 75,
    character_moves_set: sampleAbilities,
    base_hit_points: 95,
  };

  try {
    const createdCharacter = await CharacterService.create(newCharacter);
    console.log("Created character:", createdCharacter);
    return createdCharacter;
  } catch (error) {
    console.error("Error creating character:", error);
  }
}

// Example: Update a character
async function updateCharacterExample(id: string) {
  // Sample update data
  const updateData = {
    description: "Updated description for this character.",
    base_attack: 90,
    base_defense: 75,
  };

  try {
    const updatedCharacter = await CharacterService.update(id, updateData);
    console.log("Updated character:", updatedCharacter);
    return updatedCharacter;
  } catch (error) {
    console.error(`Error updating character with ID ${id}:`, error);
  }
}

// Example: Delete a character
async function deleteCharacterExample(id: string) {
  try {
    const result = await CharacterService.delete(id);
    console.log(`Character with ID ${id} deleted:`, result);
    return result;
  } catch (error) {
    console.error(`Error deleting character with ID ${id}:`, error);
  }
}

// Example: Search characters by name
async function searchCharactersByNameExample(query: string) {
  try {
    const characters = await CharacterService.searchByName(query);
    console.log(`Characters matching "${query}":`, characters);
    return characters;
  } catch (error) {
    console.error(`Error searching characters with query "${query}":`, error);
  }
}

// Example: Get characters by rarity
async function getCharactersByRarityExample(rarity: string) {
  try {
    const characters = await CharacterService.getByRarity(rarity);
    console.log(`Characters with rarity "${rarity}":`, characters);
    return characters;
  } catch (error) {
    console.error(`Error getting characters with rarity "${rarity}":`, error);
  }
}
