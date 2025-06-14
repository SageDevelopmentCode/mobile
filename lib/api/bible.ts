import { BIBLE_API_URL } from "../../utils/constants";
import { BOOK_NAME_MAP } from "../../utils/data/bookNameMap";
import { TRANSLATION_MAP } from "../../utils/data/translationMap";
import { BOOK_CATEGORIES } from "../../utils/data/bookCategories";
import { LIFE_CATEGORIES } from "../../utils/data/lifeCategories";

// Types for API responses
interface Book {
  id: number;
  name: string;
  testament: "OT" | "NT";
  genre: {
    id: number;
    name: string;
  };
}

interface Translation {
  id: number;
  table: string;
  language: string;
  abbreviation: string;
  version: string;
  infoUrl: string;
}

interface Verse {
  id: number;
  book: Book;
  chapterId: number;
  verseId: number;
  verse: string;
}

interface SearchResult {
  id: number;
  book: Book;
  chapterId: number;
  verseId: number;
  verse: string;
}

interface CrossReference {
  id: number;
  book: Book;
  chapterId: number;
  verseId: number;
  verse: string;
}

interface Genre {
  id: number;
  name: string;
}

// Helper function to get book ID from name
function getBookId(bookName: string): number {
  const normalizedName = bookName.toLowerCase().trim();
  const bookId = BOOK_NAME_MAP[normalizedName];

  if (!bookId) {
    throw new Error(
      `Book "${bookName}" not found. Please use a valid book name or abbreviation.`
    );
  }

  return bookId;
}

// Helper function to normalize translation
function normalizeTranslation(translation?: string): string {
  if (!translation) return "KJV"; // Default to KJV

  const normalized = translation.toUpperCase();
  return TRANSLATION_MAP[normalized.toLowerCase()] || normalized;
}

// Helper function to make API requests
async function apiRequest<T>(endpoint: string): Promise<T> {
  const response = await fetch(`${BIBLE_API_URL}${endpoint}`);

  if (!response.ok) {
    throw new Error(
      `API request failed: ${response.status} ${response.statusText}`
    );
  }

  return response.json();
}

// API Functions

/**
 * Get all available translations
 */
export async function getTranslations(): Promise<Translation[]> {
  return apiRequest<Translation[]>("/translations");
}

/**
 * Get a specific translation by ID or abbreviation
 */
export async function getTranslation(
  idOrAbbr: string | number
): Promise<Translation> {
  if (typeof idOrAbbr === "string") {
    // If it's a string, find by abbreviation
    const translations = await getTranslations();
    const translation = translations.find(
      (t) => t.abbreviation.toLowerCase() === idOrAbbr.toLowerCase()
    );

    if (!translation) {
      throw new Error(`Translation "${idOrAbbr}" not found`);
    }

    return translation;
  }

  return apiRequest<Translation>(`/translations/${idOrAbbr}`);
}

/**
 * Get all books of the Bible
 */
export async function getBooks(): Promise<Book[]> {
  return apiRequest<Book[]>("/books");
}

/**
 * Get a specific book by name or ID
 */
export async function getBook(bookNameOrId: string | number): Promise<Book> {
  const bookId =
    typeof bookNameOrId === "string" ? getBookId(bookNameOrId) : bookNameOrId;
  return apiRequest<Book>(`/books/${bookId}`);
}

/**
 * Get all verses in a chapter
 * @param bookName - Book name (e.g., "John", "Genesis", "1 Corinthians")
 * @param chapter - Chapter number
 * @param translation - Translation abbreviation (default: "KJV")
 */
export async function getChapter(
  bookName: string,
  chapter: number,
  translation?: string
): Promise<Verse[]> {
  const bookId = getBookId(bookName);
  const trans = normalizeTranslation(translation);

  return apiRequest<Verse[]>(
    `/books/${bookId}/chapters/${chapter}?translation=${trans}`
  );
}

/**
 * Get a specific verse
 * @param bookName - Book name (e.g., "John", "Genesis", "1 Corinthians")
 * @param chapter - Chapter number
 * @param verse - Verse number
 * @param translation - Translation abbreviation (default: "KJV")
 */
export async function getVerse(
  bookName: string,
  chapter: number,
  verse: number,
  translation?: string
): Promise<Verse> {
  const bookId = getBookId(bookName);
  const trans = normalizeTranslation(translation);

  // The API uses a specific verse ID format: bookId + chapter (3 digits) + verse (3 digits)
  const verseId = parseInt(
    `${bookId}${chapter.toString().padStart(3, "0")}${verse
      .toString()
      .padStart(3, "0")}`
  );

  return apiRequest<Verse>(
    `/books/${bookId}/chapters/${chapter}/${verseId}?translation=${trans}`
  );
}

/**
 * Get a passage (range of verses)
 * @param bookName - Book name (e.g., "John", "Genesis", "1 Corinthians")
 * @param chapter - Chapter number
 * @param startVerse - Starting verse number
 * @param endVerse - Ending verse number (optional, defaults to startVerse)
 * @param translation - Translation abbreviation (default: "KJV")
 */
export async function getPassage(
  bookName: string,
  chapter: number,
  startVerse: number,
  endVerse?: number,
  translation?: string
): Promise<Verse[]> {
  const allVerses = await getChapter(bookName, chapter, translation);
  const end = endVerse || startVerse;

  return allVerses.filter((v) => v.verseId >= startVerse && v.verseId <= end);
}

/**
 * Search the Bible for a specific term
 * @param query - Search term
 * @param translation - Translation abbreviation (default: "KJV")
 * @param limit - Maximum number of results (default: 100)
 * @param offset - Number of results to skip (default: 0)
 */
export async function searchBible(
  query: string,
  translation?: string,
  limit: number = 100,
  offset: number = 0
): Promise<SearchResult[]> {
  const trans = normalizeTranslation(translation);
  const params = new URLSearchParams({
    query,
    translation: trans,
    limit: limit.toString(),
    offset: offset.toString(),
  });

  return apiRequest<SearchResult[]>(`/search?${params}`);
}

/**
 * Get cross-references for a specific verse
 * @param bookName - Book name
 * @param chapter - Chapter number
 * @param verse - Verse number
 * @param translation - Translation abbreviation (default: "KJV")
 */
export async function getCrossReferences(
  bookName: string,
  chapter: number,
  verse: number,
  translation?: string
): Promise<CrossReference[]> {
  const bookId = getBookId(bookName);
  const trans = normalizeTranslation(translation);

  // Generate verse ID
  const verseId = parseInt(
    `${bookId}${chapter.toString().padStart(3, "0")}${verse
      .toString()
      .padStart(3, "0")}`
  );

  return apiRequest<CrossReference[]>(
    `/verse/${verseId}/relations?translation=${trans}`
  );
}

/**
 * Get all genres
 */
export async function getGenres(): Promise<Genre[]> {
  return apiRequest<Genre[]>("/genres");
}

/**
 * Get a specific genre by ID
 */
export async function getGenre(genreId: number): Promise<Genre> {
  return apiRequest<Genre>(`/genres/${genreId}`);
}

/**
 * Parse a scripture reference string and return the components
 * @param reference - Scripture reference (e.g., "John 3:16", "Genesis 1:1-3", "Psalm 23")
 */
export function parseReference(reference: string): {
  book: string;
  chapter: number;
  startVerse?: number;
  endVerse?: number;
} {
  // Remove extra spaces and normalize
  const cleanRef = reference.trim().replace(/\s+/g, " ");

  // Match patterns like "Book Chapter:Verse" or "Book Chapter:Verse-Verse" or "Book Chapter"
  const match = cleanRef.match(/^(.+?)\s+(\d+)(?::(\d+)(?:-(\d+))?)?$/);

  if (!match) {
    throw new Error(`Invalid scripture reference format: "${reference}"`);
  }

  const [, book, chapterStr, startVerseStr, endVerseStr] = match;

  return {
    book: book.trim(),
    chapter: parseInt(chapterStr),
    startVerse: startVerseStr ? parseInt(startVerseStr) : undefined,
    endVerse: endVerseStr ? parseInt(endVerseStr) : undefined,
  };
}

/**
 * Get scripture by reference string
 * @param reference - Scripture reference (e.g., "John 3:16", "Genesis 1:1-3", "Psalm 23")
 * @param translation - Translation abbreviation (default: "KJV")
 */
export async function getByReference(
  reference: string,
  translation?: string
): Promise<Verse[]> {
  const parsed = parseReference(reference);

  if (parsed.startVerse) {
    if (parsed.endVerse) {
      // Range of verses
      return getPassage(
        parsed.book,
        parsed.chapter,
        parsed.startVerse,
        parsed.endVerse,
        translation
      );
    } else {
      // Single verse
      const verse = await getVerse(
        parsed.book,
        parsed.chapter,
        parsed.startVerse,
        translation
      );
      return [verse];
    }
  } else {
    // Entire chapter
    return getChapter(parsed.book, parsed.chapter, translation);
  }
}

/**
 * Get a random verse from a specific book
 * @param bookName - Book name (optional, if not provided returns from entire Bible)
 * @param translation - Translation abbreviation (default: "KJV")
 */
export async function getRandomVerse(
  bookName?: string,
  translation?: string
): Promise<Verse> {
  // This is a simple implementation - get a random book/chapter/verse
  // For a more sophisticated random verse, you might want to implement weighted selection

  const books = await getBooks();
  const targetBooks = bookName
    ? books.filter(
        (b) =>
          b.name.toLowerCase() === bookName.toLowerCase() ||
          getBookId(bookName) === b.id
      )
    : books;

  if (targetBooks.length === 0) {
    throw new Error(`Book "${bookName}" not found`);
  }

  const randomBook =
    targetBooks[Math.floor(Math.random() * targetBooks.length)];

  // Get a random chapter (this is approximate since we don't know chapter counts)
  const randomChapter = Math.floor(Math.random() * 50) + 1; // Most books have fewer than 50 chapters

  try {
    const verses = await getChapter(
      randomBook.name,
      randomChapter,
      translation
    );
    if (verses.length === 0) {
      // Try chapter 1 if random chapter doesn't exist
      const fallbackVerses = await getChapter(randomBook.name, 1, translation);
      return fallbackVerses[Math.floor(Math.random() * fallbackVerses.length)];
    }

    return verses[Math.floor(Math.random() * verses.length)];
  } catch {
    // Fallback to first chapter if random chapter doesn't exist
    const verses = await getChapter(randomBook.name, 1, translation);
    return verses[Math.floor(Math.random() * verses.length)];
  }
}

// Export helpful constants
export { BOOK_NAME_MAP, TRANSLATION_MAP, BOOK_CATEGORIES, LIFE_CATEGORIES };

// Export types for use in other files
export type { Book, Translation, Verse, SearchResult, CrossReference, Genre };

/**
 * Get the category for a book by name or ID
 * @param bookNameOrId - Book name or ID
 * @returns The category of the book
 */
export function getBookCategory(bookNameOrId: string | number): string {
  const bookId =
    typeof bookNameOrId === "string" ? getBookId(bookNameOrId) : bookNameOrId;
  const category = BOOK_CATEGORIES[bookId];

  if (!category) {
    throw new Error(`Category not found for book ID: ${bookId}`);
  }

  return category;
}

/**
 * Get books related to a specific life category
 * @param category - The life category to search for
 * @returns Array of book IDs in that category
 */
export function getBooksByLifeCategory(category: string): number[] {
  const books = LIFE_CATEGORIES[category];

  if (!books) {
    throw new Error(`Life category "${category}" not found`);
  }

  return books;
}

/**
 * Get all available life categories
 * @returns Array of all life category names
 */
export function getLifeCategories(): string[] {
  return Object.keys(LIFE_CATEGORIES);
}
