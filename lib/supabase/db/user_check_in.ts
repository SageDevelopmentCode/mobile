import { supabase } from "../supabase";

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

// Function to create a new user check-in record using Supabase client
export async function createUserCheckIn(
  checkInData: Omit<UserCheckIn, "id" | "created_at">
) {
  const { data, error } = await supabase
    .schema("user_data")
    .from("user_check_in")
    .insert(checkInData)
    .select()
    .single();

  if (error) {
    console.error("Error creating user check-in:", error);
    throw error;
  }

  return data;
}

// Function to get user check-ins for a specific user using Supabase client
export async function getUserCheckIns(userId: string) {
  const { data, error } = await supabase
    .schema("user_data")
    .from("user_check_in")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching user check-ins:", error);
    throw error;
  }

  return data;
}

// Function to get the latest user check-in for a specific user using Supabase client
export async function getLatestUserCheckIn(userId: string) {
  const { data, error } = await supabase
    .schema("user_data")
    .from("user_check_in")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(1)
    .single();

  if (error) {
    console.error("Error fetching latest user check-in:", error);
    // Return null if no check-in found instead of throwing
    if (error.code === "PGRST116") {
      return null;
    }
    throw error;
  }

  return data as UserCheckIn;
}

// Function to get user check-in by ID using Supabase client
export async function getUserCheckInById(id: string) {
  const { data, error } = await supabase
    .schema("user_data")
    .from("user_check_in")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error(`Error fetching user check-in with ID ${id}:`, error);
    throw error;
  }

  return data as UserCheckIn;
}

// Function to update an existing user check-in using Supabase client
export async function updateUserCheckIn(
  id: string,
  checkInData: Partial<Omit<UserCheckIn, "id" | "created_at" | "user_id">>
) {
  const { data, error } = await supabase
    .schema("user_data")
    .from("user_check_in")
    .update(checkInData)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error(`Error updating user check-in with ID ${id}:`, error);
    throw error;
  }

  return data;
}

// Function to get the count of user check-ins for today's date using Supabase client
export async function getUserCheckInCountForToday(
  userId: string
): Promise<number> {
  // Get today's date in YYYY-MM-DD format
  const today = new Date();
  const todayStart = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  );
  const todayEnd = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() + 1
  );

  // Format dates for Supabase query (ISO string format)
  const startDate = todayStart.toISOString();
  const endDate = todayEnd.toISOString();

  const { data, error } = await supabase
    .schema("user_data")
    .from("user_check_in")
    .select("id", { count: "exact" })
    .eq("user_id", userId)
    .gte("created_at", startDate)
    .lt("created_at", endDate);

  if (error) {
    console.error("Error fetching user check-ins for today:", error);
    throw error;
  }

  // Return the count of check-ins
  return data?.length || 0;
}
