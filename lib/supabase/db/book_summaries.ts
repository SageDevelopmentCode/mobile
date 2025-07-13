import { makeSupabaseRequest } from "../rest-api";

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
  why_read_hashtag: string[] | null;
  theme_color: string;
}

// Function to get all book summaries using REST API
export async function getAllBookSummaries() {
  const { data, error } = await makeSupabaseRequest(
    "rest/v1/book_summaries",
    "GET",
    { order: "book" }
  );

  if (error) {
    console.error("Error fetching book summaries:", error);
    throw error;
  }

  return data;
}

// Function to get a book summary by book name using REST API
export async function getBookSummaryByBook(bookName: string) {
  const { data, error } = await makeSupabaseRequest(
    "rest/v1/book_summaries",
    "GET",
    { "book.eq": bookName }
  );

  if (error) {
    console.error(`Error fetching book summary for ${bookName}:`, error);
    throw error;
  }

  // REST API returns an array, but we want a single object
  if (Array.isArray(data) && data.length > 0) {
    return data[0];
  }

  throw new Error(`Book summary for ${bookName} not found`);
}

// Function to get a single book summary by ID using REST API
export async function getBookSummaryById(id: string) {
  const { data, error } = await makeSupabaseRequest(
    "rest/v1/book_summaries",
    "GET",
    { "id.eq": id }
  );

  if (error) {
    console.error(`Error fetching book summary with ID ${id}:`, error);
    throw error;
  }

  // REST API returns an array, but we want a single object
  if (Array.isArray(data) && data.length > 0) {
    return data[0];
  }

  throw new Error(`Book summary with ID ${id} not found`);
}

// Function to create a new book summary using REST API
export async function createBookSummary(
  bookSummary: Omit<BookSummary, "id" | "created_at">
) {
  const { data, error } = await makeSupabaseRequest(
    "rest/v1/book_summaries",
    "POST",
    {},
    bookSummary
  );

  if (error) {
    console.error("Error creating book summary:", error);
    throw error;
  }

  return data;
}

// Function to update an existing book summary using REST API
export async function updateBookSummary(
  id: string,
  bookSummaryData: Partial<Omit<BookSummary, "id" | "created_at">>
) {
  const { data, error } = await makeSupabaseRequest(
    "rest/v1/book_summaries",
    "PATCH",
    { "id.eq": id },
    bookSummaryData
  );

  if (error) {
    console.error(`Error updating book summary with ID ${id}:`, error);
    throw error;
  }

  // REST API might return multiple records, we want the updated one
  if (Array.isArray(data) && data.length > 0) {
    return data[0];
  }

  return data;
}

// Function to delete a book summary using REST API
export async function deleteBookSummary(id: string) {
  const { data, error } = await makeSupabaseRequest(
    "rest/v1/book_summaries",
    "DELETE",
    { "id.eq": id }
  );

  if (error) {
    console.error(`Error deleting book summary with ID ${id}:`, error);
    throw error;
  }

  return true;
}

// Function to search book summaries by book name using REST API
export async function searchBookSummariesByName(query: string) {
  const { data, error } = await makeSupabaseRequest(
    "rest/v1/book_summaries",
    "GET",
    { "book.ilike": `%${query}%`, order: "book" }
  );

  if (error) {
    console.error("Error searching book summaries:", error);
    throw error;
  }

  return data;
}

// Function to filter book summaries by genre using REST API
export async function getBookSummariesByGenre(genre: string) {
  const { data, error } = await makeSupabaseRequest(
    "rest/v1/book_summaries",
    "GET",
    { "genre.cs": `["${genre}"]`, order: "book" }
  );

  if (error) {
    console.error(`Error fetching book summaries with genre ${genre}:`, error);
    throw error;
  }

  return data;
}

// Function to filter book summaries by author using REST API
export async function getBookSummariesByAuthor(author: string) {
  const { data, error } = await makeSupabaseRequest(
    "rest/v1/book_summaries",
    "GET",
    { "author.eq": author, order: "book" }
  );

  if (error) {
    console.error(`Error fetching book summaries by author ${author}:`, error);
    throw error;
  }

  return data;
}

// Function to get book summaries by reading time range using REST API
export async function getBookSummariesByReadingTime(
  minMinutes: number,
  maxMinutes?: number
) {
  const filters: any = {
    "read_time_minutes.gte": minMinutes,
    order: "read_time_minutes",
  };

  if (maxMinutes) {
    filters["read_time_minutes.lte"] = maxMinutes;
  }

  const { data, error } = await makeSupabaseRequest(
    "rest/v1/book_summaries",
    "GET",
    filters
  );

  if (error) {
    console.error(`Error fetching book summaries by reading time:`, error);
    throw error;
  }

  return data;
}
