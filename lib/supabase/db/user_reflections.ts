import { makeSupabaseRequest } from "../rest-api";

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

// Function to get all user reflections for a specific user using REST API
export async function getUserReflections(userId: string) {
  const { data, error } = await makeSupabaseRequest(
    "rest/v1/user_reflections",
    "GET",
    {
      "user_id.eq": userId,
      "is_deleted.eq": false,
      order: "created_at.desc",
    }
  );

  if (error) {
    console.error("Error fetching user reflections:", error);
    throw error;
  }

  return data;
}

// Function to get a single user reflection by ID using REST API
export async function getUserReflectionById(id: string) {
  const { data, error } = await makeSupabaseRequest(
    "rest/v1/user_reflections",
    "GET",
    { "id.eq": id }
  );

  if (error) {
    console.error(`Error fetching user reflection with ID ${id}:`, error);
    throw error;
  }

  // REST API returns an array, but we want a single object
  if (Array.isArray(data) && data.length > 0) {
    return data[0];
  }

  throw new Error(`User reflection with ID ${id} not found`);
}

// Function to get user reflections by goal ID using REST API
export async function getUserReflectionsByGoalId(goalId: string) {
  const { data, error } = await makeSupabaseRequest(
    "rest/v1/user_reflections",
    "GET",
    {
      "goal_id.eq": goalId,
      "is_deleted.eq": false,
      order: "created_at.desc",
    }
  );

  if (error) {
    console.error(
      `Error fetching user reflections for goal ID ${goalId}:`,
      error
    );
    throw error;
  }

  return data;
}

// Function to create a new user reflection using REST API
export async function createUserReflection(
  userReflection: Omit<
    UserReflection,
    "id" | "created_at" | "updated_at" | "is_deleted" | "deleted_at"
  >
) {
  const { data, error } = await makeSupabaseRequest(
    "rest/v1/user_reflections",
    "POST",
    {},
    userReflection
  );

  if (error) {
    console.error("Error creating user reflection:", error);
    throw error;
  }

  // REST API may return an array, but we want a single object
  if (Array.isArray(data) && data.length > 0) {
    return data[0];
  }

  return data;
}

// Function to update an existing user reflection using REST API
export async function updateUserReflection(
  id: string,
  userReflectionData: Partial<
    Omit<UserReflection, "id" | "created_at" | "user_id" | "goal_id">
  >
) {
  const { data, error } = await makeSupabaseRequest(
    "rest/v1/user_reflections",
    "PATCH",
    { "id.eq": id },
    userReflectionData
  );

  if (error) {
    console.error(`Error updating user reflection with ID ${id}:`, error);
    throw error;
  }

  // REST API may return an array, but we want a single object
  if (Array.isArray(data) && data.length > 0) {
    return data[0];
  }

  return data;
}

// Function to delete a user reflection (hard delete) using REST API
export async function deleteUserReflection(id: string) {
  const { data, error } = await makeSupabaseRequest(
    "rest/v1/user_reflections",
    "DELETE",
    { "id.eq": id }
  );

  if (error) {
    console.error(`Error deleting user reflection with ID ${id}:`, error);
    throw error;
  }

  return true;
}

// Function to mark a user reflection as deleted (soft delete)
export async function softDeleteUserReflection(id: string) {
  const { data, error } = await makeSupabaseRequest(
    "rest/v1/user_reflections",
    "PATCH",
    { "id.eq": id },
    {
      is_deleted: true,
      deleted_at: new Date().toISOString(),
    }
  );

  if (error) {
    console.error(`Error soft-deleting user reflection with ID ${id}:`, error);
    throw error;
  }

  // REST API may return an array, but we want a single object
  if (Array.isArray(data) && data.length > 0) {
    return data[0];
  }

  return data;
}

// Function to get recent reflections with pagination
export async function getRecentUserReflections(
  userId: string,
  limit: number = 10,
  offset: number = 0
) {
  const { data, error } = await makeSupabaseRequest(
    "rest/v1/user_reflections",
    "GET",
    {
      "user_id.eq": userId,
      "is_deleted.eq": false,
      order: "created_at.desc",
      limit: limit.toString(),
      offset: offset.toString(),
    }
  );

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
  const { data, error } = await makeSupabaseRequest(
    "rest/v1/user_reflections",
    "GET",
    {
      "user_id.eq": userId,
      "mood_rating.eq": moodRating,
      "is_deleted.eq": false,
      order: "created_at.desc",
    }
  );

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
  const { data, error } = await makeSupabaseRequest(
    "rest/v1/user_reflections",
    "GET",
    {
      "user_id.eq": userId,
      "goal_status.eq": goalStatus,
      "is_deleted.eq": false,
      order: "created_at.desc",
    }
  );

  if (error) {
    console.error(
      `Error fetching user reflections with goal status ${goalStatus}:`,
      error
    );
    throw error;
  }

  return data;
}
