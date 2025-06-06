import { makeSupabaseRequest } from "../rest-api";

// Define the UserCheckIn interface based on the database schema
export interface UserCheckIn {
  id?: string;
  created_at?: string;
  user_id: string;
  rewards_last_given?: string;
  denarii_earned: number;
  manna_earned: number;
  fruit_earned: number;
  energy_earned: number;
  questions_answers?: any; // Using 'any' for JSONB
  bonus_rewards?: any; // Using 'any' for JSONB
}

// Function to create a new user check-in record using REST API
export async function createUserCheckIn(
  checkInData: Omit<UserCheckIn, "id" | "created_at">
) {
  const { data, error } = await makeSupabaseRequest(
    "rest/v1/user_check_in",
    "POST",
    {},
    checkInData
  );

  if (error) {
    console.error("Error creating user check-in:", error);
    throw error;
  }

  // REST API may return an array, but we want a single object
  if (Array.isArray(data) && data.length > 0) {
    return data[0];
  }

  return data;
}

// Function to get user check-ins for a specific user using REST API
export async function getUserCheckIns(userId: string) {
  const { data, error } = await makeSupabaseRequest(
    "rest/v1/user_check_in",
    "GET",
    {
      "user_id.eq": userId,
      order: "created_at.desc",
    }
  );

  if (error) {
    console.error("Error fetching user check-ins:", error);
    throw error;
  }

  return data;
}

// Function to get the latest user check-in for a specific user using REST API
export async function getLatestUserCheckIn(userId: string) {
  const { data, error } = await makeSupabaseRequest(
    "rest/v1/user_check_in",
    "GET",
    {
      "user_id.eq": userId,
      order: "created_at.desc",
      limit: 1,
    }
  );

  if (error) {
    console.error("Error fetching latest user check-in:", error);
    throw error;
  }

  // REST API returns an array, but we want a single object
  if (Array.isArray(data) && data.length > 0) {
    return data[0] as UserCheckIn;
  }

  // Return null if no check-in found
  return null;
}

// Function to get user check-in by ID using REST API
export async function getUserCheckInById(id: string) {
  const { data, error } = await makeSupabaseRequest(
    "rest/v1/user_check_in",
    "GET",
    { "id.eq": id }
  );

  if (error) {
    console.error(`Error fetching user check-in with ID ${id}:`, error);
    throw error;
  }

  // REST API returns an array, but we want a single object
  if (Array.isArray(data) && data.length > 0) {
    return data[0] as UserCheckIn;
  }

  throw new Error(`User check-in with ID ${id} not found`);
}

// Function to update an existing user check-in using REST API
export async function updateUserCheckIn(
  id: string,
  checkInData: Partial<Omit<UserCheckIn, "id" | "created_at" | "user_id">>
) {
  const { data, error } = await makeSupabaseRequest(
    "rest/v1/user_check_in",
    "PATCH",
    { "id.eq": id },
    checkInData
  );

  if (error) {
    console.error(`Error updating user check-in with ID ${id}:`, error);
    throw error;
  }

  // REST API may return an array, but we want a single object
  if (Array.isArray(data) && data.length > 0) {
    return data[0];
  }

  return data;
}
