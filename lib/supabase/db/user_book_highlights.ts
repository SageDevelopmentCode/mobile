import { supabase } from "../supabase";

// Define the UserBookHighlight interface based on the database schema
export interface UserBookHighlight {
  id?: string;
  created_at?: string;
  user_id: string;
  book_name: string;
  chapter: number;
  verse: number;
  verse_text: string;
  color: string;
}

// Function to get all highlights for a specific user using Supabase client
export async function getUserBookHighlights(userId: string) {
  const { data, error } = await supabase
    .schema("user_data")
    .from("user_book_highlights")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching user book highlights:", error);
    throw error;
  }

  return data;
}

// Function to get highlights for a specific book using Supabase client
export async function getUserBookHighlightsByBook(
  userId: string,
  bookName: string
) {
  const { data, error } = await supabase
    .schema("user_data")
    .from("user_book_highlights")
    .select("*")
    .eq("user_id", userId)
    .eq("book_name", bookName)
    .order("chapter", { ascending: true })
    .order("verse", { ascending: true });

  if (error) {
    console.error(
      `Error fetching user book highlights for book ${bookName}:`,
      error
    );
    throw error;
  }

  return data;
}

// Function to get highlights for a specific chapter using Supabase client
export async function getUserBookHighlightsByChapter(
  userId: string,
  bookName: string,
  chapter: number
) {
  const { data, error } = await supabase
    .schema("user_data")
    .from("user_book_highlights")
    .select("*")
    .eq("user_id", userId)
    .eq("book_name", bookName)
    .eq("chapter", chapter)
    .order("verse", { ascending: true });

  if (error) {
    console.error(
      `Error fetching user book highlights for ${bookName} chapter ${chapter}:`,
      error
    );
    throw error;
  }

  return data;
}

// Function to get highlights by color for a specific user using Supabase client
export async function getUserBookHighlightsByColor(
  userId: string,
  color: string
) {
  const { data, error } = await supabase
    .schema("user_data")
    .from("user_book_highlights")
    .select("*")
    .eq("user_id", userId)
    .eq("color", color)
    .order("book_name", { ascending: true })
    .order("chapter", { ascending: true })
    .order("verse", { ascending: true });

  if (error) {
    console.error(
      `Error fetching user book highlights by color ${color}:`,
      error
    );
    throw error;
  }

  return data;
}

// Function to get a single highlight by ID using Supabase client
export async function getUserBookHighlightById(id: string) {
  const { data, error } = await supabase
    .schema("user_data")
    .from("user_book_highlights")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error(`Error fetching user book highlight with ID ${id}:`, error);
    throw error;
  }

  return data;
}

// Function to check if a specific verse is already highlighted by a user
export async function checkIfVerseHighlighted(
  userId: string,
  bookName: string,
  chapter: number,
  verse: number
) {
  const { data, error } = await supabase
    .schema("user_data")
    .from("user_book_highlights")
    .select("id, color")
    .eq("user_id", userId)
    .eq("book_name", bookName)
    .eq("chapter", chapter)
    .eq("verse", verse)
    .single();

  if (error) {
    // If no row found, return null (verse not highlighted)
    if (error.code === "PGRST116") {
      return null;
    }
    console.error("Error checking if verse is highlighted:", error);
    throw error;
  }

  return data;
}

// Function to create a new highlight using Supabase client
export async function createUserBookHighlight(
  userBookHighlight: Omit<UserBookHighlight, "id" | "created_at">
) {
  const { data, error } = await supabase
    .schema("user_data")
    .from("user_book_highlights")
    .insert(userBookHighlight)
    .select()
    .single();

  if (error) {
    console.error("Error creating user book highlight:", error);
    throw error;
  }

  return data;
}

// Function to update an existing highlight using Supabase client
export async function updateUserBookHighlight(
  id: string,
  userBookHighlightData: Partial<
    Omit<UserBookHighlight, "id" | "created_at" | "user_id">
  >
) {
  const { data, error } = await supabase
    .schema("user_data")
    .from("user_book_highlights")
    .update(userBookHighlightData)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error(`Error updating user book highlight with ID ${id}:`, error);
    throw error;
  }

  return data;
}

// Function to update only the color of a highlight
export async function updateUserBookHighlightColor(id: string, color: string) {
  const { data, error } = await supabase
    .schema("user_data")
    .from("user_book_highlights")
    .update({ color })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error(
      `Error updating color for user book highlight with ID ${id}:`,
      error
    );
    throw error;
  }

  return data;
}

// Function to delete a highlight using Supabase client
export async function deleteUserBookHighlight(id: string) {
  const { data, error } = await supabase
    .schema("user_data")
    .from("user_book_highlights")
    .delete()
    .eq("id", id);

  if (error) {
    console.error(`Error deleting user book highlight with ID ${id}:`, error);
    throw error;
  }

  return true;
}

// Function to delete a highlight by verse details using Supabase client
export async function deleteUserBookHighlightByVerse(
  userId: string,
  bookName: string,
  chapter: number,
  verse: number
) {
  const { data, error } = await supabase
    .schema("user_data")
    .from("user_book_highlights")
    .delete()
    .eq("user_id", userId)
    .eq("book_name", bookName)
    .eq("chapter", chapter)
    .eq("verse", verse);

  if (error) {
    console.error(
      `Error deleting user book highlight for ${bookName} ${chapter}:${verse}:`,
      error
    );
    throw error;
  }

  return true;
}

// Function to get the count of highlights for a user using Supabase client
export async function getUserBookHighlightsCount(userId: string) {
  const { count, error } = await supabase
    .schema("user_data")
    .from("user_book_highlights")
    .select("*", { count: "exact", head: true })
    .eq("user_id", userId);

  if (error) {
    console.error("Error getting user book highlights count:", error);
    throw error;
  }

  return count || 0;
}

// Function to get highlights grouped by book using Supabase client
export async function getUserBookHighlightsGroupedByBook(userId: string) {
  const { data, error } = await supabase
    .schema("user_data")
    .from("user_book_highlights")
    .select("*")
    .eq("user_id", userId)
    .order("book_name", { ascending: true })
    .order("chapter", { ascending: true })
    .order("verse", { ascending: true });

  if (error) {
    console.error(
      "Error fetching user book highlights grouped by book:",
      error
    );
    throw error;
  }

  // Group the data by book name
  const groupedData: { [bookName: string]: UserBookHighlight[] } = {};

  data?.forEach((highlight) => {
    if (!groupedData[highlight.book_name]) {
      groupedData[highlight.book_name] = [];
    }
    groupedData[highlight.book_name].push(highlight);
  });

  return groupedData;
}

// Function to get highlights grouped by color using Supabase client
export async function getUserBookHighlightsGroupedByColor(userId: string) {
  const { data, error } = await supabase
    .schema("user_data")
    .from("user_book_highlights")
    .select("*")
    .eq("user_id", userId)
    .order("color", { ascending: true })
    .order("book_name", { ascending: true })
    .order("chapter", { ascending: true })
    .order("verse", { ascending: true });

  if (error) {
    console.error(
      "Error fetching user book highlights grouped by color:",
      error
    );
    throw error;
  }

  // Group the data by color
  const groupedData: { [color: string]: UserBookHighlight[] } = {};

  data?.forEach((highlight) => {
    if (!groupedData[highlight.color]) {
      groupedData[highlight.color] = [];
    }
    groupedData[highlight.color].push(highlight);
  });

  return groupedData;
}

// Function to get all unique colors used by a user for highlights
export async function getUserHighlightColors(userId: string) {
  const { data, error } = await supabase
    .schema("user_data")
    .from("user_book_highlights")
    .select("color")
    .eq("user_id", userId)
    .order("color", { ascending: true });

  if (error) {
    console.error("Error fetching user highlight colors:", error);
    throw error;
  }

  // Get unique colors
  const uniqueColors = [...new Set(data?.map((item) => item.color) || [])];
  return uniqueColors;
}
