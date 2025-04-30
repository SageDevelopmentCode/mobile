import { makeSupabaseRequest } from "../rest-api";

// Define the UserGoal interface based on the database schema
export interface UserGoal {
  id?: string;
  user_id: string;
  title: string;
  energy_reward: number;
  experience_reward: number;
  goal_repeat: boolean;
  goal_repeat_ends: string;
  completed_at?: string;
  goal_time_set?: string;
  related_verse?: string;
  category: string;
}

// Function to get all user goals for a specific user using REST API
export async function getUserGoals(userId: string) {
  const { data, error } = await makeSupabaseRequest(
    "rest/v1/user_goals",
    "GET",
    {
      "user_id.eq": userId,
      order: "created_at.desc",
    }
  );

  if (error) {
    console.error("Error fetching user goals:", error);
    throw error;
  }

  return data;
}

// Function to get a single user goal by ID using REST API
export async function getUserGoalById(id: string) {
  const { data, error } = await makeSupabaseRequest(
    "rest/v1/user_goals",
    "GET",
    { "id.eq": id }
  );

  if (error) {
    console.error(`Error fetching user goal with ID ${id}:`, error);
    throw error;
  }

  // REST API returns an array, but we want a single object
  if (Array.isArray(data) && data.length > 0) {
    return data[0];
  }

  throw new Error(`User goal with ID ${id} not found`);
}

// Function to create a new user goal using REST API
export async function createUserGoal(
  userGoal: Omit<UserGoal, "id" | "created_at">
) {
  const { data, error } = await makeSupabaseRequest(
    "rest/v1/user_goals",
    "POST",
    {},
    userGoal
  );

  if (error) {
    console.error("Error creating user goal:", error);
    throw error;
  }

  // REST API may return an array, but we want a single object
  if (Array.isArray(data) && data.length > 0) {
    return data[0];
  }

  return data;
}

// Function to update an existing user goal using REST API
export async function updateUserGoal(
  id: string,
  userGoalData: Partial<Omit<UserGoal, "id" | "created_at" | "user_id">>
) {
  const { data, error } = await makeSupabaseRequest(
    "rest/v1/user_goals",
    "PATCH",
    { "id.eq": id },
    userGoalData
  );

  if (error) {
    console.error(`Error updating user goal with ID ${id}:`, error);
    throw error;
  }

  // REST API may return an array, but we want a single object
  if (Array.isArray(data) && data.length > 0) {
    return data[0];
  }

  return data;
}

// Function to delete a user goal using REST API
export async function deleteUserGoal(id: string) {
  const { data, error } = await makeSupabaseRequest(
    "rest/v1/user_goals",
    "DELETE",
    { "id.eq": id }
  );

  if (error) {
    console.error(`Error deleting user goal with ID ${id}:`, error);
    throw error;
  }

  return true;
}

// Function to get user goals by category using REST API
export async function getUserGoalsByCategory(userId: string, category: string) {
  const { data, error } = await makeSupabaseRequest(
    "rest/v1/user_goals",
    "GET",
    {
      "user_id.eq": userId,
      "category.eq": category,
    }
  );

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
  const { data, error } = await makeSupabaseRequest(
    "rest/v1/user_goals",
    "PATCH",
    { "id.eq": id },
    {
      completed_at: new Date().toISOString(),
    }
  );

  if (error) {
    console.error(`Error completing user goal with ID ${id}:`, error);
    throw error;
  }

  // REST API may return an array, but we want a single object
  if (Array.isArray(data) && data.length > 0) {
    return data[0];
  }

  return data;
}
