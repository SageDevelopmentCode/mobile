import { makeSupabaseRequest } from "../rest-api";
import { addCurrencyToUser } from "./user_currency";

// Type definition for user chest
interface UserChest {
  id: string;
  created_at: string;
  user_id: string;
  opened_at: string | null;
  rewards: any; // jsonb type
  chest_type: string;
}

// Function to get all chests for a specific user
export async function getUserChests(userId: string) {
  const { data, error } = await makeSupabaseRequest(
    "rest/v1/user_chests",
    "GET",
    {
      "user_id.eq": userId,
      select: "*",
      order: "created_at.desc",
    }
  );

  if (error) {
    console.error(`Error fetching chests for user ${userId}:`, error);
    throw error;
  }

  return data || [];
}

// Function to get a specific chest by ID
export async function getChestById(chestId: string) {
  const { data, error } = await makeSupabaseRequest(
    "rest/v1/user_chests",
    "GET",
    {
      "id.eq": chestId,
      select: "*",
    }
  );

  if (error) {
    console.error(`Error fetching chest with ID ${chestId}:`, error);
    throw error;
  }

  return data?.[0] || null;
}

// Function to insert a new chest for a user and update last_daily_chest_opened_at
export async function insertUserChest(
  userId: string,
  rewards: any,
  chestType: string = "daily"
) {
  const timestamp = new Date().toISOString();

  const chestPayload = {
    user_id: userId,
    opened_at: timestamp,
    rewards: rewards,
    chest_type: chestType,
  };

  // Insert the chest
  const { data: chestData, error: chestError } = await makeSupabaseRequest(
    "rest/v1/user_chests",
    "POST",
    {},
    chestPayload
  );

  if (chestError) {
    console.error(`Error inserting chest for user ${userId}:`, chestError);
    throw chestError;
  }

  // Extract currency amounts from rewards
  let fruitToAdd = 0;
  let denariiToAdd = 0;
  let mannaToAdd = 0;

  if (rewards.rewards && Array.isArray(rewards.rewards)) {
    rewards.rewards.forEach((reward: any) => {
      switch (reward.type) {
        case "fruit":
          fruitToAdd += reward.amount || 0;
          break;
        case "denarii":
          denariiToAdd += reward.amount || 0;
          break;
        case "manna":
          mannaToAdd += reward.amount || 0;
          break;
      }
    });
  }

  // Update user currency if there are any currency rewards
  if (fruitToAdd > 0 || denariiToAdd > 0 || mannaToAdd > 0) {
    try {
      await addCurrencyToUser(userId, denariiToAdd, mannaToAdd, fruitToAdd);
      console.log(
        `Added currency to user ${userId}: fruit=${fruitToAdd}, denarii=${denariiToAdd}, manna=${mannaToAdd}`
      );
    } catch (currencyError) {
      console.error(
        `Error updating currency for user ${userId}:`,
        currencyError
      );
      // Don't throw here - chest was already saved, currency update failure shouldn't block the process
    }
  }

  // Update the user's last_daily_chest_opened_at timestamp
  const { data: userData, error: userError } = await makeSupabaseRequest(
    "rest/v1/users",
    "PATCH",
    { "id.eq": userId },
    { last_daily_chest_opened_at: timestamp }
  );

  if (userError) {
    console.error(
      `Error updating last_daily_chest_opened_at for user ${userId}:`,
      userError
    );
    throw userError;
  }

  return chestData?.[0] || null;
}

// Function to get user's chest statistics
export async function getUserChestStats(userId: string) {
  const chests = await getUserChests(userId);

  const stats = {
    totalChests: chests.length,
    openedChests: chests.filter((chest: UserChest) => chest.opened_at !== null)
      .length,
    unopenedChests: chests.filter(
      (chest: UserChest) => chest.opened_at === null
    ).length,
    lastChestCreated: chests.length > 0 ? chests[0].created_at : null,
    lastChestOpened:
      chests
        .filter((chest: UserChest) => chest.opened_at !== null)
        .sort(
          (a: UserChest, b: UserChest) =>
            new Date(b.opened_at!).getTime() - new Date(a.opened_at!).getTime()
        )[0]?.opened_at || null,
    chestsByType: chests.reduce(
      (acc: Record<string, number>, chest: UserChest) => {
        acc[chest.chest_type] = (acc[chest.chest_type] || 0) + 1;
        return acc;
      },
      {}
    ),
  };

  return stats;
}

// Function to get chest statistics by type
export async function getChestStatsByType(userId: string, chestType: string) {
  const chests = await getChestsByType(userId, chestType);

  const stats = {
    totalChests: chests.length,
    openedChests: chests.filter((chest: UserChest) => chest.opened_at !== null)
      .length,
    unopenedChests: chests.filter(
      (chest: UserChest) => chest.opened_at === null
    ).length,
    lastChestCreated: chests.length > 0 ? chests[0].created_at : null,
    lastChestOpened:
      chests
        .filter((chest: UserChest) => chest.opened_at !== null)
        .sort(
          (a: UserChest, b: UserChest) =>
            new Date(b.opened_at!).getTime() - new Date(a.opened_at!).getTime()
        )[0]?.opened_at || null,
  };

  return stats;
}

// Function to get unopened chests for a user
export async function getUnopenedChests(userId: string) {
  const { data, error } = await makeSupabaseRequest(
    "rest/v1/user_chests",
    "GET",
    {
      "user_id.eq": userId,
      "opened_at.is": "null",
      select: "*",
      order: "created_at.desc",
    }
  );

  if (error) {
    console.error(`Error fetching unopened chests for user ${userId}:`, error);
    throw error;
  }

  return data || [];
}

// Function to get opened chests for a user
export async function getOpenedChests(userId: string) {
  const { data, error } = await makeSupabaseRequest(
    "rest/v1/user_chests",
    "GET",
    {
      "user_id.eq": userId,
      "opened_at.not.is": "null",
      select: "*",
      order: "opened_at.desc",
    }
  );

  if (error) {
    console.error(`Error fetching opened chests for user ${userId}:`, error);
    throw error;
  }

  return data || [];
}

// Function to get chests by type for a user
export async function getChestsByType(userId: string, chestType: string) {
  const { data, error } = await makeSupabaseRequest(
    "rest/v1/user_chests",
    "GET",
    {
      "user_id.eq": userId,
      "chest_type.eq": chestType,
      select: "*",
      order: "created_at.desc",
    }
  );

  if (error) {
    console.error(
      `Error fetching ${chestType} chests for user ${userId}:`,
      error
    );
    throw error;
  }

  return data || [];
}

// Function to get user's most recent chest of a specific type
export async function getUserLastChestByType(
  userId: string,
  chestType: string
) {
  const { data, error } = await makeSupabaseRequest(
    "rest/v1/user_chests",
    "GET",
    {
      "user_id.eq": userId,
      "chest_type.eq": chestType,
      select: "*",
      order: "created_at.desc",
      limit: 1,
    }
  );

  if (error) {
    console.error(
      `Error fetching last ${chestType} chest for user ${userId}:`,
      error
    );
    throw error;
  }

  return data?.[0] || null;
}

// Function to delete a chest (admin only or for cleanup)
export async function deleteChest(chestId: string) {
  const { data, error } = await makeSupabaseRequest(
    "rest/v1/user_chests",
    "DELETE",
    { "id.eq": chestId }
  );

  if (error) {
    console.error(`Error deleting chest ${chestId}:`, error);
    throw error;
  }

  return { success: true };
}
