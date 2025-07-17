import { supabase } from "../supabase";

// Define the UserCurrency interface based on the database schema
export interface UserCurrency {
  id?: string;
  created_at?: string;
  user_id: string;
  denarii: number;
  manna: number;
  fruit: number;
}

// Function to create a new user currency record using Supabase client
export async function createUserCurrency(
  currencyData: Omit<UserCurrency, "id" | "created_at">
) {
  const { data, error } = await supabase
    .schema("user_data")
    .from("user_currency")
    .insert(currencyData)
    .select()
    .single();

  if (error) {
    console.error("Error creating user currency:", error);
    throw error;
  }

  return data;
}

// Function to get user currency for a specific user using Supabase client
export async function getUserCurrency(userId: string) {
  const { data, error } = await supabase
    .schema("user_data")
    .from("user_currency")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(1)
    .single();

  if (error) {
    console.error("Error fetching user currency:", error);
    // Return null if no currency record found instead of throwing
    if (error.code === "PGRST116") {
      return null;
    }
    throw error;
  }

  return data as UserCurrency;
}

// Function to get user currency by ID using Supabase client
export async function getUserCurrencyById(id: string) {
  const { data, error } = await supabase
    .schema("user_data")
    .from("user_currency")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error(`Error fetching user currency with ID ${id}:`, error);
    throw error;
  }

  return data as UserCurrency;
}

// Function to update an existing user currency using Supabase client
export async function updateUserCurrency(
  id: string,
  currencyData: Partial<Omit<UserCurrency, "id" | "created_at" | "user_id">>
) {
  const { data, error } = await supabase
    .schema("user_data")
    .from("user_currency")
    .update(currencyData)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error(`Error updating user currency with ID ${id}:`, error);
    throw error;
  }

  return data;
}

// Function to update user currency by user_id using Supabase client
export async function updateUserCurrencyByUserId(
  userId: string,
  currencyData: Partial<Omit<UserCurrency, "id" | "created_at" | "user_id">>
) {
  const { data, error } = await supabase
    .schema("user_data")
    .from("user_currency")
    .update(currencyData)
    .eq("user_id", userId)
    .select()
    .single();

  if (error) {
    console.error(`Error updating user currency for user ${userId}:`, error);
    throw error;
  }

  return data;
}

// Function to add currency to user's existing balance using Supabase client
export async function addCurrencyToUser(
  userId: string,
  denariiToAdd: number = 0,
  mannaToAdd: number = 0,
  fruitToAdd: number = 0
) {
  // First, get the current currency
  const currentCurrency = await getUserCurrency(userId);

  if (!currentCurrency) {
    // If no currency record exists, create a new one
    return await createUserCurrency({
      user_id: userId,
      denarii: denariiToAdd,
      manna: mannaToAdd,
      fruit: fruitToAdd,
    });
  }

  // Update the existing currency by adding to current values
  const updatedCurrency = await updateUserCurrency(currentCurrency.id!, {
    denarii: currentCurrency.denarii + denariiToAdd,
    manna: currentCurrency.manna + mannaToAdd,
    fruit: currentCurrency.fruit + fruitToAdd,
  });

  return updatedCurrency;
}

// Function to subtract currency from user's existing balance using Supabase client
export async function subtractCurrencyFromUser(
  userId: string,
  denariiToSubtract: number = 0,
  mannaToSubtract: number = 0,
  fruitToSubtract: number = 0
) {
  // First, get the current currency
  const currentCurrency = await getUserCurrency(userId);

  if (!currentCurrency) {
    throw new Error(`No currency record found for user ${userId}`);
  }

  // Check if user has enough currency
  if (currentCurrency.denarii < denariiToSubtract) {
    throw new Error(
      `Insufficient denarii. Current: ${currentCurrency.denarii}, Required: ${denariiToSubtract}`
    );
  }

  if (currentCurrency.manna < mannaToSubtract) {
    throw new Error(
      `Insufficient manna. Current: ${currentCurrency.manna}, Required: ${mannaToSubtract}`
    );
  }

  if (currentCurrency.fruit < fruitToSubtract) {
    throw new Error(
      `Insufficient fruit. Current: ${currentCurrency.fruit}, Required: ${fruitToSubtract}`
    );
  }

  // Update the existing currency by subtracting from current values
  const updatedCurrency = await updateUserCurrency(currentCurrency.id!, {
    denarii: currentCurrency.denarii - denariiToSubtract,
    manna: currentCurrency.manna - mannaToSubtract,
    fruit: currentCurrency.fruit - fruitToSubtract,
  });

  return updatedCurrency;
}

// Function to get all currency records for a specific user using Supabase client
export async function getAllUserCurrencyRecords(userId: string) {
  const { data, error } = await supabase
    .schema("user_data")
    .from("user_currency")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching user currency records:", error);
    throw error;
  }

  return data;
}
