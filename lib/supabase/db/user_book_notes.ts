import { supabase } from "../supabase";

// Define the UserBookNote interface based on the database schema
export interface UserBookNote {
  id?: string;
  created_at?: string;
  user_id: string;
  book_name: string;
  chapter: number;
  verse: number;
  note_text: string;
  updated_at?: string;
  is_private: boolean;
  label?: string;
}

// Function to get all notes for a specific user using Supabase client
export async function getUserBookNotes(userId: string) {
  const { data, error } = await supabase
    .schema("user_data")
    .from("user_book_notes")
    .select("*")
    .eq("user_id", userId)
    .order("updated_at", { ascending: false });

  if (error) {
    console.error("Error fetching user book notes:", error);
    throw error;
  }

  return data;
}

// Function to get notes for a specific book using Supabase client
export async function getUserBookNotesByBook(userId: string, bookName: string) {
  const { data, error } = await supabase
    .schema("user_data")
    .from("user_book_notes")
    .select("*")
    .eq("user_id", userId)
    .eq("book_name", bookName)
    .order("chapter", { ascending: true })
    .order("verse", { ascending: true });

  if (error) {
    console.error(
      `Error fetching user book notes for book ${bookName}:`,
      error
    );
    throw error;
  }

  return data;
}

// Function to get notes for a specific chapter using Supabase client
export async function getUserBookNotesByChapter(
  userId: string,
  bookName: string,
  chapter: number
) {
  const { data, error } = await supabase
    .schema("user_data")
    .from("user_book_notes")
    .select("*")
    .eq("user_id", userId)
    .eq("book_name", bookName)
    .eq("chapter", chapter)
    .order("verse", { ascending: true });

  if (error) {
    console.error(
      `Error fetching user book notes for ${bookName} chapter ${chapter}:`,
      error
    );
    throw error;
  }

  return data;
}

// Function to get notes for a specific verse using Supabase client
export async function getUserBookNotesByVerse(
  userId: string,
  bookName: string,
  chapter: number,
  verse: number
) {
  const { data, error } = await supabase
    .schema("user_data")
    .from("user_book_notes")
    .select("*")
    .eq("user_id", userId)
    .eq("book_name", bookName)
    .eq("chapter", chapter)
    .eq("verse", verse)
    .order("updated_at", { ascending: false });

  if (error) {
    console.error(
      `Error fetching user book notes for ${bookName} ${chapter}:${verse}:`,
      error
    );
    throw error;
  }

  return data;
}

// Function to get notes by label for a specific user using Supabase client
export async function getUserBookNotesByLabel(userId: string, label: string) {
  const { data, error } = await supabase
    .schema("user_data")
    .from("user_book_notes")
    .select("*")
    .eq("user_id", userId)
    .eq("label", label)
    .order("book_name", { ascending: true })
    .order("chapter", { ascending: true })
    .order("verse", { ascending: true });

  if (error) {
    console.error(`Error fetching user book notes by label ${label}:`, error);
    throw error;
  }

  return data;
}

// Function to get public notes for a specific book (excluding private notes)
export async function getPublicBookNotes(bookName: string) {
  const { data, error } = await supabase
    .schema("user_data")
    .from("user_book_notes")
    .select("*")
    .eq("book_name", bookName)
    .eq("is_private", false)
    .order("chapter", { ascending: true })
    .order("verse", { ascending: true });

  if (error) {
    console.error(`Error fetching public book notes for ${bookName}:`, error);
    throw error;
  }

  return data;
}

// Function to get a single note by ID using Supabase client
export async function getUserBookNoteById(id: string) {
  const { data, error } = await supabase
    .schema("user_data")
    .from("user_book_notes")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error(`Error fetching user book note with ID ${id}:`, error);
    throw error;
  }

  return data;
}

// Function to check if a user has notes for a specific verse
export async function checkIfVerseHasNotes(
  userId: string,
  bookName: string,
  chapter: number,
  verse: number
) {
  const { data, error } = await supabase
    .schema("user_data")
    .from("user_book_notes")
    .select("id")
    .eq("user_id", userId)
    .eq("book_name", bookName)
    .eq("chapter", chapter)
    .eq("verse", verse);

  if (error) {
    console.error("Error checking if verse has notes:", error);
    throw error;
  }

  return data && data.length > 0;
}

// Function to create a new note using Supabase client
export async function createUserBookNote(
  userBookNote: Omit<UserBookNote, "id" | "created_at" | "updated_at">
) {
  const { data, error } = await supabase
    .schema("user_data")
    .from("user_book_notes")
    .insert(userBookNote)
    .select()
    .single();

  if (error) {
    console.error("Error creating user book note:", error);
    throw error;
  }

  return data;
}

// Function to update an existing note using Supabase client
export async function updateUserBookNote(
  id: string,
  userBookNoteData: Partial<Omit<UserBookNote, "id" | "created_at" | "user_id">>
) {
  const { data, error } = await supabase
    .schema("user_data")
    .from("user_book_notes")
    .update({
      ...userBookNoteData,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error(`Error updating user book note with ID ${id}:`, error);
    throw error;
  }

  return data;
}

// Function to update only the note text
export async function updateUserBookNoteText(id: string, noteText: string) {
  const { data, error } = await supabase
    .schema("user_data")
    .from("user_book_notes")
    .update({
      note_text: noteText,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error(
      `Error updating note text for user book note with ID ${id}:`,
      error
    );
    throw error;
  }

  return data;
}

// Function to update only the privacy setting of a note
export async function updateUserBookNotePrivacy(
  id: string,
  isPrivate: boolean
) {
  const { data, error } = await supabase
    .schema("user_data")
    .from("user_book_notes")
    .update({
      is_private: isPrivate,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error(
      `Error updating privacy for user book note with ID ${id}:`,
      error
    );
    throw error;
  }

  return data;
}

// Function to update only the label of a note
export async function updateUserBookNoteLabel(
  id: string,
  label: string | null
) {
  const { data, error } = await supabase
    .schema("user_data")
    .from("user_book_notes")
    .update({
      label: label,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error(
      `Error updating label for user book note with ID ${id}:`,
      error
    );
    throw error;
  }

  return data;
}

// Function to delete a note using Supabase client
export async function deleteUserBookNote(id: string) {
  const { data, error } = await supabase
    .schema("user_data")
    .from("user_book_notes")
    .delete()
    .eq("id", id);

  if (error) {
    console.error(`Error deleting user book note with ID ${id}:`, error);
    throw error;
  }

  return true;
}

// Function to delete all notes for a specific verse using Supabase client
export async function deleteUserBookNotesByVerse(
  userId: string,
  bookName: string,
  chapter: number,
  verse: number
) {
  const { data, error } = await supabase
    .schema("user_data")
    .from("user_book_notes")
    .delete()
    .eq("user_id", userId)
    .eq("book_name", bookName)
    .eq("chapter", chapter)
    .eq("verse", verse);

  if (error) {
    console.error(
      `Error deleting user book notes for ${bookName} ${chapter}:${verse}:`,
      error
    );
    throw error;
  }

  return true;
}

// Function to get the count of notes for a user using Supabase client
export async function getUserBookNotesCount(userId: string) {
  const { count, error } = await supabase
    .schema("user_data")
    .from("user_book_notes")
    .select("*", { count: "exact", head: true })
    .eq("user_id", userId);

  if (error) {
    console.error("Error getting user book notes count:", error);
    throw error;
  }

  return count || 0;
}

// Function to get notes count by privacy setting
export async function getUserBookNotesCountByPrivacy(
  userId: string,
  isPrivate: boolean
) {
  const { count, error } = await supabase
    .schema("user_data")
    .from("user_book_notes")
    .select("*", { count: "exact", head: true })
    .eq("user_id", userId)
    .eq("is_private", isPrivate);

  if (error) {
    console.error("Error getting user book notes count by privacy:", error);
    throw error;
  }

  return count || 0;
}

// Function to get notes grouped by book using Supabase client
export async function getUserBookNotesGroupedByBook(userId: string) {
  const { data, error } = await supabase
    .schema("user_data")
    .from("user_book_notes")
    .select("*")
    .eq("user_id", userId)
    .order("book_name", { ascending: true })
    .order("chapter", { ascending: true })
    .order("verse", { ascending: true });

  if (error) {
    console.error("Error fetching user book notes grouped by book:", error);
    throw error;
  }

  // Group the data by book name
  const groupedData: { [bookName: string]: UserBookNote[] } = {};

  data?.forEach((note) => {
    if (!groupedData[note.book_name]) {
      groupedData[note.book_name] = [];
    }
    groupedData[note.book_name].push(note);
  });

  return groupedData;
}

// Function to get notes grouped by label using Supabase client
export async function getUserBookNotesGroupedByLabel(userId: string) {
  const { data, error } = await supabase
    .schema("user_data")
    .from("user_book_notes")
    .select("*")
    .eq("user_id", userId)
    .order("label", { ascending: true })
    .order("book_name", { ascending: true })
    .order("chapter", { ascending: true })
    .order("verse", { ascending: true });

  if (error) {
    console.error("Error fetching user book notes grouped by label:", error);
    throw error;
  }

  // Group the data by label
  const groupedData: { [label: string]: UserBookNote[] } = {};

  data?.forEach((note) => {
    const labelKey = note.label || "unlabeled";
    if (!groupedData[labelKey]) {
      groupedData[labelKey] = [];
    }
    groupedData[labelKey].push(note);
  });

  return groupedData;
}

// Function to get all unique labels used by a user for notes
export async function getUserNoteLabels(userId: string) {
  const { data, error } = await supabase
    .schema("user_data")
    .from("user_book_notes")
    .select("label")
    .eq("user_id", userId)
    .not("label", "is", null)
    .order("label", { ascending: true });

  if (error) {
    console.error("Error fetching user note labels:", error);
    throw error;
  }

  // Get unique labels
  const uniqueLabels = [...new Set(data?.map((item) => item.label) || [])];
  return uniqueLabels;
}

// Function to search notes by text content
export async function searchUserBookNotes(userId: string, searchText: string) {
  const { data, error } = await supabase
    .schema("user_data")
    .from("user_book_notes")
    .select("*")
    .eq("user_id", userId)
    .ilike("note_text", `%${searchText}%`)
    .order("updated_at", { ascending: false });

  if (error) {
    console.error("Error searching user book notes:", error);
    throw error;
  }

  return data;
}

// Function to get recent notes (last N days)
export async function getUserRecentBookNotes(userId: string, days: number = 7) {
  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - days);

  const { data, error } = await supabase
    .schema("user_data")
    .from("user_book_notes")
    .select("*")
    .eq("user_id", userId)
    .gte("updated_at", cutoffDate.toISOString())
    .order("updated_at", { ascending: false });

  if (error) {
    console.error("Error fetching recent user book notes:", error);
    throw error;
  }

  return data;
}

// Function to get notes with pagination
export async function getUserBookNotesWithPagination(
  userId: string,
  page: number = 1,
  pageSize: number = 20
) {
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  const { data, error, count } = await supabase
    .schema("user_data")
    .from("user_book_notes")
    .select("*", { count: "exact" })
    .eq("user_id", userId)
    .order("updated_at", { ascending: false })
    .range(from, to);

  if (error) {
    console.error("Error fetching paginated user book notes:", error);
    throw error;
  }

  return {
    data,
    count: count || 0,
    page,
    pageSize,
    totalPages: Math.ceil((count || 0) / pageSize),
  };
}
