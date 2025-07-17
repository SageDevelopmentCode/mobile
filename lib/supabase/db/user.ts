import { supabase } from "../supabase";

// Function to get a user by ID
export async function getUserById(id: string) {
  const { data, error } = await supabase
    .schema("app") // Specify schema here
    .from("users")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw error;
  return data;
}

// Function to get the current authenticated user
export async function getCurrentUser() {
  const { data: authData, error: authError } = await supabase.auth.getUser();

  if (authError) {
    console.error("Error getting authenticated user:", authError);
    throw authError;
  }

  if (!authData?.user?.id) {
    throw new Error("No authenticated user found");
  }

  return getUserById(authData.user.id);
}

// Function to update a user's last login timestamp
export async function updateLastLogin(userId: string) {
  const { data, error } = await supabase
    .schema("app")
    .from("users")
    .update({ last_login: new Date().toISOString() })
    .eq("id", userId);

  if (error) {
    console.error(`Error updating last_login for user ${userId}:`, error);
    throw error;
  }

  return getUserById(userId);
}

// Function to update a user's energy points
export async function updateEnergyPoints(userId: string, points: number) {
  const { data, error } = await supabase
    .schema("app")
    .from("users")
    .update({ energy_points: points })
    .eq("id", userId);

  if (error) {
    console.error(`Error updating energy_points for user ${userId}:`, error);
    throw error;
  }

  return getUserById(userId);
}

// Function to reset a user's energy points
export async function resetEnergyPoints(
  userId: string,
  defaultPoints: number = 100
) {
  const { data, error } = await supabase
    .schema("app")
    .from("users")
    .update({
      energy_points: defaultPoints,
      energy_last_reset: new Date().toISOString(),
    })
    .eq("id", userId);

  if (error) {
    console.error(`Error resetting energy for user ${userId}:`, error);
    throw error;
  }

  return getUserById(userId);
}

// Function to update a user's level and experience points
export async function updateLevelAndExperience(
  userId: string,
  level: number,
  experiencePoints: number
) {
  const { data, error } = await supabase
    .schema("app")
    .from("users")
    .update({
      level,
      experience_points: experiencePoints,
    })
    .eq("id", userId);

  if (error) {
    console.error(
      `Error updating level and experience for user ${userId}:`,
      error
    );
    throw error;
  }

  return getUserById(userId);
}

// Function to add experience points and potentially level up
export async function addExperiencePoints(userId: string, pointsToAdd: number) {
  // First get the current user's level and experience
  const user = await getUserById(userId);

  if (!user) {
    throw new Error(`User with ID ${userId} not found`);
  }

  // Calculate new experience and level
  const newExperience = user.experience_points + pointsToAdd;
  let newLevel = user.level;

  // Simple leveling formula: level up every 100 * current_level points
  const pointsForNextLevel = 100 * user.level;
  if (newExperience >= pointsForNextLevel) {
    newLevel += 1;
  }

  // Update the user with new values
  return updateLevelAndExperience(userId, newLevel, newExperience);
}

// Function to update a user's username
export async function updateUsername(userId: string, newUsername: string) {
  const { data, error } = await supabase
    .schema("app")
    .from("users")
    .update({ username: newUsername })
    .eq("id", userId);

  if (error) {
    console.error(`Error updating username for user ${userId}:`, error);
    throw error;
  }

  return getUserById(userId);
}

// Function to get all users (admin only)
export async function getAllUsers() {
  const { data, error } = await supabase
    .schema("app")
    .from("users")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching users:", error);
    throw error;
  }

  return data || [];
}
