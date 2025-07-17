import { supabase } from "../supabase";

// Define the UserReflection interface based on the database schema
export interface UserReflection {
  id?: string;
  created_at?: string;
  updated_at?: string;
  user_id: string;
  goal_id: string;
  energy_count: number;
  user_answer: string;
  is_deleted?: boolean;
  deleted_at?: string;
  goal_status: string;
  reason?: string;
  mood_rating?: string;
}

// Function to get all user reflections for a specific user using Supabase client
export async function getUserReflections(userId: string) {
  const { data, error } = await supabase
    .schema("user_data")
    .from("user_reflections")
    .select("*")
    .eq("user_id", userId)
    .eq("is_deleted", false)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching user reflections:", error);
    throw error;
  }

  return data;
}

// Function to get a single user reflection by ID using Supabase client
export async function getUserReflectionById(id: string) {
  const { data, error } = await supabase
    .schema("user_data")
    .from("user_reflections")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error(`Error fetching user reflection with ID ${id}:`, error);
    throw error;
  }

  return data;
}

// Function to get user reflections by goal ID using Supabase client
export async function getUserReflectionsByGoalId(goalId: string) {
  const { data, error } = await supabase
    .schema("user_data")
    .from("user_reflections")
    .select("*")
    .eq("goal_id", goalId)
    .eq("is_deleted", false)
    .order("created_at", { ascending: false });

  if (error) {
    console.error(
      `Error fetching user reflections for goal ID ${goalId}:`,
      error
    );
    throw error;
  }

  return data;
}

// Function to create a new user reflection using Supabase client
export async function createUserReflection(
  userReflection: Omit<
    UserReflection,
    "id" | "created_at" | "updated_at" | "is_deleted" | "deleted_at"
  >
) {
  const { data, error } = await supabase
    .schema("user_data")
    .from("user_reflections")
    .insert(userReflection)
    .select()
    .single();

  if (error) {
    console.error("Error creating user reflection:", error);
    throw error;
  }

  return data;
}

// Function to update an existing user reflection using Supabase client
export async function updateUserReflection(
  id: string,
  userReflectionData: Partial<
    Omit<UserReflection, "id" | "created_at" | "user_id" | "goal_id">
  >
) {
  const { data, error } = await supabase
    .schema("user_data")
    .from("user_reflections")
    .update(userReflectionData)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error(`Error updating user reflection with ID ${id}:`, error);
    throw error;
  }

  return data;
}

// Function to delete a user reflection (hard delete) using Supabase client
export async function deleteUserReflection(id: string) {
  const { data, error } = await supabase
    .schema("user_data")
    .from("user_reflections")
    .delete()
    .eq("id", id);

  if (error) {
    console.error(`Error deleting user reflection with ID ${id}:`, error);
    throw error;
  }

  return true;
}

// Function to mark a user reflection as deleted (soft delete)
export async function softDeleteUserReflection(id: string) {
  const { data, error } = await supabase
    .schema("user_data")
    .from("user_reflections")
    .update({
      is_deleted: true,
      deleted_at: new Date().toISOString(),
    })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error(`Error soft-deleting user reflection with ID ${id}:`, error);
    throw error;
  }

  return data;
}

// Function to get recent reflections with pagination
export async function getRecentUserReflections(
  userId: string,
  limit: number = 10,
  offset: number = 0
) {
  const { data, error } = await supabase
    .schema("user_data")
    .from("user_reflections")
    .select("*")
    .eq("user_id", userId)
    .eq("is_deleted", false)
    .order("created_at", { ascending: false })
    .range(offset, offset + limit - 1);

  if (error) {
    console.error("Error fetching recent user reflections:", error);
    throw error;
  }

  return data;
}

// Function to get user reflections by mood rating
export async function getUserReflectionsByMoodRating(
  userId: string,
  moodRating: string
) {
  const { data, error } = await supabase
    .schema("user_data")
    .from("user_reflections")
    .select("*")
    .eq("user_id", userId)
    .eq("mood_rating", moodRating)
    .eq("is_deleted", false)
    .order("created_at", { ascending: false });

  if (error) {
    console.error(
      `Error fetching user reflections with mood rating ${moodRating}:`,
      error
    );
    throw error;
  }

  return data;
}

// Function to get user reflections by goal status
export async function getUserReflectionsByGoalStatus(
  userId: string,
  goalStatus: string
) {
  const { data, error } = await supabase
    .schema("user_data")
    .from("user_reflections")
    .select("*")
    .eq("user_id", userId)
    .eq("goal_status", goalStatus)
    .eq("is_deleted", false)
    .order("created_at", { ascending: false });

  if (error) {
    console.error(
      `Error fetching user reflections with goal status ${goalStatus}:`,
      error
    );
    throw error;
  }

  return data;
}
