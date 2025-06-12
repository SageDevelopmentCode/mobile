import { BIBLE_API_URL } from "../../utils/constants";

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

// Book name to ID mapping - includes variations and abbreviations
const BOOK_NAME_MAP: Record<string, number> = {
  // Old Testament
  genesis: 1,
  gen: 1,
  ge: 1,
  gn: 1,
  exodus: 2,
  exod: 2,
  ex: 2,
  exo: 2,
  leviticus: 3,
  lev: 3,
  le: 3,
  lv: 3,
  numbers: 4,
  num: 4,
  nu: 4,
  nm: 4,
  nb: 4,
  deuteronomy: 5,
  deut: 5,
  dt: 5,
  de: 5,
  joshua: 6,
  josh: 6,
  jos: 6,
  jsh: 6,
  judges: 7,
  judg: 7,
  jdg: 7,
  jg: 7,
  jdgs: 7,
  ruth: 8,
  rth: 8,
  ru: 8,
  "1 samuel": 9,
  "1sam": 9,
  "1 sam": 9,
  "1s": 9,
  "i samuel": 9,
  "1 sa": 9,
  "1sa": 9,
  "2 samuel": 10,
  "2sam": 10,
  "2 sam": 10,
  "2s": 10,
  "ii samuel": 10,
  "2 sa": 10,
  "2sa": 10,
  "1 kings": 11,
  "1kgs": 11,
  "1 kgs": 11,
  "1k": 11,
  "i kings": 11,
  "1 ki": 11,
  "1ki": 11,
  "2 kings": 12,
  "2kgs": 12,
  "2 kgs": 12,
  "2k": 12,
  "ii kings": 12,
  "2 ki": 12,
  "2ki": 12,
  "1 chronicles": 13,
  "1chr": 13,
  "1 chr": 13,
  "1ch": 13,
  "i chronicles": 13,
  "1 chron": 13,
  "2 chronicles": 14,
  "2chr": 14,
  "2 chr": 14,
  "2ch": 14,
  "ii chronicles": 14,
  "2 chron": 14,
  ezra: 15,
  ezr: 15,
  ez: 15,
  nehemiah: 16,
  neh: 16,
  ne: 16,
  esther: 17,
  esth: 17,
  est: 17,
  es: 17,
  job: 18,
  jb: 18,
  psalms: 19,
  psalm: 19,
  ps: 19,
  psa: 19,
  psm: 19,
  pss: 19,
  proverbs: 20,
  prov: 20,
  pro: 20,
  prv: 20,
  pr: 20,
  ecclesiastes: 21,
  eccl: 21,
  ec: 21,
  ecc: 21,
  qoh: 21,
  "song of solomon": 22,
  song: 22,
  songs: 22,
  sos: 22,
  so: 22,
  canticle: 22,
  canticles: 22,
  cant: 22,
  isaiah: 23,
  isa: 23,
  is: 23,
  jeremiah: 24,
  jer: 24,
  je: 24,
  jr: 24,
  lamentations: 25,
  lam: 25,
  la: 25,
  ezekiel: 26,
  ezek: 26,
  eze: 26,
  ezk: 26,
  daniel: 27,
  dan: 27,
  da: 27,
  dn: 27,
  hosea: 28,
  hos: 28,
  ho: 28,
  joel: 29,
  joe: 29,
  jl: 29,
  amos: 30,
  am: 30,
  obadiah: 31,
  obad: 31,
  ob: 31,
  jonah: 32,
  jnh: 32,
  jon: 32,
  micah: 33,
  mic: 33,
  mi: 33,
  nahum: 34,
  nah: 34,
  na: 34,
  habakkuk: 35,
  hab: 35,
  hb: 35,
  zephaniah: 36,
  zeph: 36,
  zep: 36,
  zp: 36,
  haggai: 37,
  hag: 37,
  hg: 37,
  zechariah: 38,
  zech: 38,
  zec: 38,
  zc: 38,
  malachi: 39,
  mal: 39,
  ml: 39,

  // New Testament
  matthew: 40,
  matt: 40,
  mt: 40,
  mat: 40,
  mark: 41,
  mrk: 41,
  mk: 41,
  mr: 41,
  luke: 42,
  luk: 42,
  lk: 42,
  john: 43,
  joh: 43,
  jn: 43,
  acts: 44,
  act: 44,
  ac: 44,
  romans: 45,
  rom: 45,
  ro: 45,
  rm: 45,
  "1 corinthians": 46,
  "1cor": 46,
  "1 cor": 46,
  "1co": 46,
  "i corinthians": 46,
  "1 corin": 46,
  "2 corinthians": 47,
  "2cor": 47,
  "2 cor": 47,
  "2co": 47,
  "ii corinthians": 47,
  "2 corin": 47,
  galatians: 48,
  gal: 48,
  ga: 48,
  ephesians: 49,
  eph: 49,
  ephes: 49,
  philippians: 50,
  phil: 50,
  php: 50,
  pp: 50,
  colossians: 51,
  col: 51,
  colo: 51,
  "1 thessalonians": 52,
  "1thess": 52,
  "1 thess": 52,
  "1th": 52,
  "i thessalonians": 52,
  "1 thes": 52,
  "2 thessalonians": 53,
  "2thess": 53,
  "2 thess": 53,
  "2th": 53,
  "ii thessalonians": 53,
  "2 thes": 53,
  "1 timothy": 54,
  "1tim": 54,
  "1 tim": 54,
  "1ti": 54,
  "i timothy": 54,
  "2 timothy": 55,
  "2tim": 55,
  "2 tim": 55,
  "2ti": 55,
  "ii timothy": 55,
  titus: 56,
  tit: 56,
  ti: 56,
  philemon: 57,
  phlm: 57,
  phm: 57,
  hebrews: 58,
  heb: 58,
  he: 58,
  james: 59,
  jas: 59,
  jm: 59,
  "1 peter": 60,
  "1pet": 60,
  "1 pet": 60,
  "1pe": 60,
  "i peter": 60,
  "1 pt": 60,
  "2 peter": 61,
  "2pet": 61,
  "2 pet": 61,
  "2pe": 61,
  "ii peter": 61,
  "2 pt": 61,
  "1 john": 62,
  "1jn": 62,
  "1 jn": 62,
  "1j": 62,
  "i john": 62,
  "2 john": 63,
  "2jn": 63,
  "2 jn": 63,
  "2j": 63,
  "ii john": 63,
  "3 john": 64,
  "3jn": 64,
  "3 jn": 64,
  "3j": 64,
  "iii john": 64,
  jude: 65,
  jud: 65,
  jd: 65,
  revelation: 66,
  rev: 66,
  re: 66,
  apocalypse: 66,
  apoc: 66,
};

// Translation abbreviation mapping
const TRANSLATION_MAP: Record<string, string> = {
  asv: "ASV",
  bbe: "BBE",
  darby: "DARBY",
  esv: "ESV",
  kjv: "KJV",
  niv: "NIV",
  nlt: "NLT",
  web: "WEB",
  ylt: "YLT",
};

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
export { BOOK_NAME_MAP, TRANSLATION_MAP };

// Export types for use in other files
export type { Book, Translation, Verse, SearchResult, CrossReference, Genre };
