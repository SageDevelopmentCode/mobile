import { supabase } from "../supabase";

// Define the BookSummary interface based on the database schema
export interface BookSummary {
  id?: string;
  created_at?: string;
  book: string;
  chapters: number;
  verses: number;
  word_count_estimate: number;
  pages_estimate: string;
  read_time_minutes: number;
  genre: string[] | null;
  author: string;
  date_written: string;
  setting: string;
  period: string;
  main_characters: string[] | null;
  themes: string[] | null;
  key_verse: string;
  short_summary: string;
  why_read_hashtags: string[] | null;
  theme_color: string;
}

// Function to get all book summaries using Supabase client
export async function getAllBookSummaries() {
  const { data, error } = await supabase
    .schema("content")
    .from("book_summaries")
    .select("*")
    .order("book");

  if (error) {
    console.error("Error fetching book summaries:", error);
    throw error;
  }

  return data;
}

// Function to get a book summary by book name using Supabase client
export async function getBookSummaryByBook(bookName: string) {
  const { data, error } = await supabase
    .schema("content")
    .from("book_summaries")
    .select("*")
    .eq("book", bookName)
    .single();

  if (error) {
    console.error(`Error fetching book summary for ${bookName}:`, error);
    throw error;
  }

  return data;
}

// Function to get a single book summary by ID using Supabase client
export async function getBookSummaryById(id: string) {
  const { data, error } = await supabase
    .schema("content")
    .from("book_summaries")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error(`Error fetching book summary with ID ${id}:`, error);
    throw error;
  }

  return data;
}

// Function to create a new book summary using Supabase client
export async function createBookSummary(
  bookSummary: Omit<BookSummary, "id" | "created_at">
) {
  const { data, error } = await supabase
    .schema("content")
    .from("book_summaries")
    .insert(bookSummary)
    .select()
    .single();

  if (error) {
    console.error("Error creating book summary:", error);
    throw error;
  }

  return data;
}

// Function to update an existing book summary using Supabase client
export async function updateBookSummary(
  id: string,
  bookSummaryData: Partial<Omit<BookSummary, "id" | "created_at">>
) {
  const { data, error } = await supabase
    .schema("content")
    .from("book_summaries")
    .update(bookSummaryData)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error(`Error updating book summary with ID ${id}:`, error);
    throw error;
  }

  return data;
}

// Function to delete a book summary using Supabase client
export async function deleteBookSummary(id: string) {
  const { data, error } = await supabase
    .schema("content")
    .from("book_summaries")
    .delete()
    .eq("id", id);

  if (error) {
    console.error(`Error deleting book summary with ID ${id}:`, error);
    throw error;
  }

  return true;
}

// Function to search book summaries by book name using Supabase client
export async function searchBookSummariesByName(query: string) {
  const { data, error } = await supabase
    .schema("content")
    .from("book_summaries")
    .select("*")
    .ilike("book", `%${query}%`)
    .order("book");

  if (error) {
    console.error("Error searching book summaries:", error);
    throw error;
  }

  return data;
}

// Function to filter book summaries by genre using Supabase client
export async function getBookSummariesByGenre(genre: string) {
  const { data, error } = await supabase
    .schema("content")
    .from("book_summaries")
    .select("*")
    .contains("genre", [genre])
    .order("book");

  if (error) {
    console.error(`Error fetching book summaries with genre ${genre}:`, error);
    throw error;
  }

  return data;
}

// Function to filter book summaries by author using Supabase client
export async function getBookSummariesByAuthor(author: string) {
  const { data, error } = await supabase
    .schema("content")
    .from("book_summaries")
    .select("*")
    .eq("author", author)
    .order("book");

  if (error) {
    console.error(`Error fetching book summaries by author ${author}:`, error);
    throw error;
  }

  return data;
}

// Function to get book summaries by reading time range using Supabase client
export async function getBookSummariesByReadingTime(
  minMinutes: number,
  maxMinutes?: number
) {
  let query = supabase
    .schema("content")
    .from("book_summaries")
    .select("*")
    .gte("read_time_minutes", minMinutes);

  if (maxMinutes) {
    query = query.lte("read_time_minutes", maxMinutes);
  }

  const { data, error } = await query.order("read_time_minutes");

  if (error) {
    console.error(`Error fetching book summaries by reading time:`, error);
    throw error;
  }

  return data;
}
