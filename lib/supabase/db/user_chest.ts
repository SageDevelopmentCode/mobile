import { makeSupabaseRequest } from "../rest-api";

// Type definition for user chest
interface UserChest {
  id: string;
  created_at: string;
  user_id: string;
  opened_at: string | null;
  rewards: any; // jsonb type
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

// Function to insert a new chest for a user and update last_chest_opened_at
export async function insertUserChest(userId: string, rewards: any) {
  const timestamp = new Date().toISOString();

  const chestPayload = {
    user_id: userId,
    opened_at: timestamp,
    rewards: rewards,
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

  // Update the user's last_chest_opened_at timestamp
  const { data: userData, error: userError } = await makeSupabaseRequest(
    "rest/v1/users",
    "PATCH",
    { "id.eq": userId },
    { last_chest_opened_at: timestamp }
  );

  if (userError) {
    console.error(
      `Error updating last_chest_opened_at for user ${userId}:`,
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
