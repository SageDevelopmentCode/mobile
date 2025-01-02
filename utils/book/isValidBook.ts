import { bibleBooks } from "../data/books";

export const isValidBook = (book: string): boolean => {
  return bibleBooks.some(
    (bibleBook) => bibleBook.toLowerCase() === book.toLowerCase()
  );
};
