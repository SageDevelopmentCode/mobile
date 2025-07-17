import { supabase } from "../supabase";

// Define the UserGoal interface based on the database schema
export interface UserGoal {
  id?: string;
  user_id: string;
  title: string;
  energy_count: number;
  experience_reward: number;
  goal_repeat: string;
  emoji?: string;
  completed_at?: string;
  goal_time_set?: string;
  related_verse?: string;
  category: string;
  goal_color: string;
}

// Function to get all user goals for a specific user using Supabase client
export async function getUserGoals(userId: string) {
  const { data, error } = await supabase
    .schema("user_data")
    .from("user_goals")
    .select("*")
    .eq("user_id", userId)
    .eq("is_deleted", false)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching user goals:", error);
    throw error;
  }

  return data;
}

// Function to get a single user goal by ID using Supabase client
export async function getUserGoalById(id: string) {
  const { data, error } = await supabase
    .schema("user_data")
    .from("user_goals")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error(`Error fetching user goal with ID ${id}:`, error);
    throw error;
  }

  return data;
}

// Function to create a new user goal using Supabase client
export async function createUserGoal(
  userGoal: Omit<UserGoal, "id" | "created_at">
) {
  const { data, error } = await supabase
    .schema("user_data")
    .from("user_goals")
    .insert(userGoal)
    .select()
    .single();

  if (error) {
    console.error("Error creating user goal:", error);
    throw error;
  }

  return data;
}

// Function to update an existing user goal using Supabase client
export async function updateUserGoal(
  id: string,
  userGoalData: Partial<Omit<UserGoal, "id" | "created_at" | "user_id">>
) {
  const { data, error } = await supabase
    .schema("user_data")
    .from("user_goals")
    .update(userGoalData)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error(`Error updating user goal with ID ${id}:`, error);
    throw error;
  }

  return data;
}

// Function to delete a user goal using Supabase client
export async function deleteUserGoal(id: string) {
  const { data, error } = await supabase
    .schema("user_data")
    .from("user_goals")
    .delete()
    .eq("id", id);

  if (error) {
    console.error(`Error deleting user goal with ID ${id}:`, error);
    throw error;
  }

  return true;
}

// Function to get user goals by category using Supabase client
export async function getUserGoalsByCategory(userId: string, category: string) {
  const { data, error } = await supabase
    .schema("user_data")
    .from("user_goals")
    .select("*")
    .eq("user_id", userId)
    .eq("category", category);

  if (error) {
    console.error(
      `Error fetching user goals with category ${category}:`,
      error
    );
    throw error;
  }

  return data;
}

// Function to mark a goal as completed
export async function completeUserGoal(id: string) {
  const { data, error } = await supabase
    .schema("user_data")
    .from("user_goals")
    .update({
      completed_at: new Date().toISOString(),
    })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error(`Error completing user goal with ID ${id}:`, error);
    throw error;
  }

  return data;
}

// Function to mark a user goal as deleted (soft delete)
export async function softDeleteUserGoal(id: string) {
  const { data, error } = await supabase
    .schema("user_data")
    .from("user_goals")
    .update({
      is_deleted: true,
      deleted_at: new Date().toISOString(),
    })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error(`Error soft-deleting user goal with ID ${id}:`, error);
    throw error;
  }

  return data;
}

// Function to reset a missed goal to today
export async function resetGoalToToday(id: string) {
  const now = new Date().toISOString();

  const { data, error } = await supabase
    .schema("user_data")
    .from("user_goals")
    .update({
      goal_time_set: now,
      updated_at: now,
    })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error(`Error resetting goal with ID ${id} to today:`, error);
    throw error;
  }

  return data;
}
