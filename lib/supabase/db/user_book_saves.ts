import { supabase } from "../supabase";

// Define the UserBookSave interface based on the database schema
export interface UserBookSave {
  id?: string;
  created_at?: string;
  user_id: string;
  book_name: string;
  chapter: number;
  verse: number;
  verse_text: string;
  translation: string;
  saved_at?: string;
  personal_note?: string;
}

// Function to get all saved verses for a specific user using Supabase client
export async function getUserBookSaves(userId: string) {
  const { data, error } = await supabase
    .schema("user_data")
    .from("user_saved_verses")
    .select("*")
    .eq("user_id", userId)
    .order("saved_at", { ascending: false });

  if (error) {
    console.error("Error fetching user book saves:", error);
    throw error;
  }

  return data;
}

// Function to get saved verses for a specific book using Supabase client
export async function getUserBookSavesByBook(userId: string, bookName: string) {
  const { data, error } = await supabase
    .schema("user_data")
    .from("user_saved_verses")
    .select("*")
    .eq("user_id", userId)
    .eq("book_name", bookName)
    .order("chapter", { ascending: true })
    .order("verse", { ascending: true });

  if (error) {
    console.error(
      `Error fetching user book saves for book ${bookName}:`,
      error
    );
    throw error;
  }

  return data;
}

// Function to get saved verses for a specific chapter using Supabase client
export async function getUserBookSavesByChapter(
  userId: string,
  bookName: string,
  chapter: number
) {
  const { data, error } = await supabase
    .schema("user_data")
    .from("user_saved_verses")
    .select("*")
    .eq("user_id", userId)
    .eq("book_name", bookName)
    .eq("chapter", chapter)
    .order("verse", { ascending: true });

  if (error) {
    console.error(
      `Error fetching user book saves for ${bookName} chapter ${chapter}:`,
      error
    );
    throw error;
  }

  return data;
}

// Function to get a single saved verse by ID using Supabase client
export async function getUserBookSaveById(id: string) {
  const { data, error } = await supabase
    .schema("user_data")
    .from("user_saved_verses")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error(`Error fetching user book save with ID ${id}:`, error);
    throw error;
  }

  return data;
}

// Function to check if a specific verse is already saved by a user
export async function checkIfVerseSaved(
  userId: string,
  bookName: string,
  chapter: number,
  verse: number
) {
  const { data, error } = await supabase
    .schema("user_data")
    .from("user_saved_verses")
    .select("id")
    .eq("user_id", userId)
    .eq("book_name", bookName)
    .eq("chapter", chapter)
    .eq("verse", verse)
    .single();

  if (error) {
    // If no row found, return false (verse not saved)
    if (error.code === "PGRST116") {
      return false;
    }
    console.error("Error checking if verse is saved:", error);
    throw error;
  }

  return data ? true : false;
}

// Function to create a new saved verse using Supabase client
export async function createUserBookSave(
  userBookSave: Omit<UserBookSave, "id" | "created_at" | "saved_at">
) {
  const { data, error } = await supabase
    .schema("user_data")
    .from("user_saved_verses")
    .insert({
      ...userBookSave,
      saved_at: new Date().toISOString(),
    })
    .select()
    .single();

  if (error) {
    console.error("Error creating user book save:", error);
    throw error;
  }

  return data;
}

// Function to update an existing saved verse using Supabase client
export async function updateUserBookSave(
  id: string,
  userBookSaveData: Partial<
    Omit<UserBookSave, "id" | "created_at" | "user_id" | "saved_at">
  >
) {
  const { data, error } = await supabase
    .schema("user_data")
    .from("user_saved_verses")
    .update(userBookSaveData)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error(`Error updating user book save with ID ${id}:`, error);
    throw error;
  }

  return data;
}

// Function to update only the personal note of a saved verse
export async function updateUserBookSaveNote(id: string, personalNote: string) {
  const { data, error } = await supabase
    .schema("user_data")
    .from("user_saved_verses")
    .update({ personal_note: personalNote })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error(
      `Error updating note for user book save with ID ${id}:`,
      error
    );
    throw error;
  }

  return data;
}

// Function to delete a saved verse using Supabase client
export async function deleteUserBookSave(id: string) {
  const { data, error } = await supabase
    .schema("user_data")
    .from("user_saved_verses")
    .delete()
    .eq("id", id);

  if (error) {
    console.error(`Error deleting user book save with ID ${id}:`, error);
    throw error;
  }

  return true;
}

// Function to delete a saved verse by verse details using Supabase client
export async function deleteUserBookSaveByVerse(
  userId: string,
  bookName: string,
  chapter: number,
  verse: number
) {
  const { data, error } = await supabase
    .schema("user_data")
    .from("user_saved_verses")
    .delete()
    .eq("user_id", userId)
    .eq("book_name", bookName)
    .eq("chapter", chapter)
    .eq("verse", verse);

  if (error) {
    console.error(
      `Error deleting user book save for ${bookName} ${chapter}:${verse}:`,
      error
    );
    throw error;
  }

  return true;
}

// Function to get the count of saved verses for a user using Supabase client
export async function getUserBookSavesCount(userId: string) {
  const { count, error } = await supabase
    .schema("user_data")
    .from("user_saved_verses")
    .select("*", { count: "exact", head: true })
    .eq("user_id", userId);

  if (error) {
    console.error("Error getting user book saves count:", error);
    throw error;
  }

  return count || 0;
}

// Function to get saved verses grouped by book using Supabase client
export async function getUserBookSavesGroupedByBook(userId: string) {
  const { data, error } = await supabase
    .schema("user_data")
    .from("user_saved_verses")
    .select("*")
    .eq("user_id", userId)
    .order("book_name", { ascending: true })
    .order("chapter", { ascending: true })
    .order("verse", { ascending: true });

  if (error) {
    console.error("Error fetching user book saves grouped by book:", error);
    throw error;
  }

  // Group the data by book name
  const groupedData: { [bookName: string]: UserBookSave[] } = {};

  data?.forEach((save) => {
    if (!groupedData[save.book_name]) {
      groupedData[save.book_name] = [];
    }
    groupedData[save.book_name].push(save);
  });

  return groupedData;
}
