import { CharacterService, UserCharacterService } from "./characterService";
import { Character, CharacterAbility } from "./characters";
import { UserCharacter } from "./user_characters";

/**
 * Examples of how to use the CharacterService and UserCharacterService
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

// Example: Get user characters for a specific user
async function getUserCharactersExample(userId: string) {
  try {
    const userCharacters = await UserCharacterService.getAllForUser(userId);
    console.log("User characters:", userCharacters);
    return userCharacters;
  } catch (error) {
    console.error("Error getting user characters:", error);
  }
}

// Example: Get user characters with character details
async function getUserCharactersWithDetailsExample(userId: string) {
  try {
    const userCharactersWithDetails =
      await UserCharacterService.getAllWithDetailsForUser(userId);
    console.log("User characters with details:", userCharactersWithDetails);

    // Access character details
    userCharactersWithDetails.forEach((uc) => {
      console.log(
        `${uc.character.name} (Level ${uc.level}): ${uc.character.description}`
      );
    });

    return userCharactersWithDetails;
  } catch (error) {
    console.error("Error getting user characters with details:", error);
  }
}

// Example: Create a new user character
async function createUserCharacterExample(userId: string, characterId: string) {
  // Sample character moves
  const characterMoves: CharacterAbility[] = [
    {
      name: "Quick Attack",
      type: "attack",
      effects: [
        { type: "damage", value: 80 },
        { type: "buff", value: 10, stat: "speed" },
      ],
      description: "A swift attack that may increase speed.",
      uses: 5,
    },
  ];

  // Create a new user character
  const newUserCharacter: Omit<UserCharacter, "id" | "created_at"> = {
    user_id: userId,
    character_id: characterId,
    level: 1,
    xp_points: 0,
    obtained_at: new Date().toISOString(),
    attack: 80,
    defense: 70,
    special_attack: 90,
    special_defense: 75,
    speed: 85,
    character_moves: characterMoves,
    hit_points: 100,
  };

  try {
    const createdUserCharacter = await UserCharacterService.create(
      newUserCharacter
    );
    console.log("Created user character:", createdUserCharacter);
    return createdUserCharacter;
  } catch (error) {
    console.error("Error creating user character:", error);
  }
}

// Example: Update user character stats
async function updateUserCharacterStatsExample(userCharacterId: string) {
  const updateData = {
    attack: 85,
    defense: 75,
    hit_points: 110,
  };

  try {
    const updatedUserCharacter = await UserCharacterService.update(
      userCharacterId,
      updateData
    );
    console.log("Updated user character:", updatedUserCharacter);
    return updatedUserCharacter;
  } catch (error) {
    console.error(
      `Error updating user character with ID ${userCharacterId}:`,
      error
    );
  }
}

// Example: Add XP to a user character
async function addXPToUserCharacterExample(
  userCharacterId: string,
  currentXP: number,
  currentLevel: number
) {
  const xpToAdd = 75;

  try {
    const updatedUserCharacter = await UserCharacterService.addXP(
      userCharacterId,
      xpToAdd,
      currentXP,
      currentLevel
    );
    console.log("Updated user character with new XP:", updatedUserCharacter);
    return updatedUserCharacter;
  } catch (error) {
    console.error(
      `Error updating XP for user character with ID ${userCharacterId}:`,
      error
    );
  }
}

// Example: Delete a user character
async function deleteUserCharacterExample(userCharacterId: string) {
  try {
    const result = await UserCharacterService.delete(userCharacterId);
    console.log(`User character with ID ${userCharacterId} deleted:`, result);
    return result;
  } catch (error) {
    console.error(
      `Error deleting user character with ID ${userCharacterId}:`,
      error
    );
  }
}

// Example: Get user characters for a specific character
async function getUserCharactersByCharacterIdExample(
  userId: string,
  characterId: string
) {
  try {
    const userCharacters = await UserCharacterService.getByCharacterId(
      userId,
      characterId
    );
    console.log(
      `User characters for character ID ${characterId}:`,
      userCharacters
    );
    return userCharacters;
  } catch (error) {
    console.error(
      `Error getting user characters for character ID ${characterId}:`,
      error
    );
  }
}
