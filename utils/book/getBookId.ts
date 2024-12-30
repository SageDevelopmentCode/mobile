import { books } from "../data/books";

// Create a mapping object
const bookToIdMap: { [key: string]: number } = {};
const bookNamesArray: string[] = [];

// Populate the mapping object
books.forEach((book) => {
  bookToIdMap[book.name.toLowerCase()] = book.id;
});

books.forEach((book) => {
  bookNamesArray.push(book.name);
});

export const getBookNamesArray = () => {
  return bookNamesArray;
};

// Function to get the book ID by name
export const getBookId = (bookName: string): number | undefined => {
  console.log("book name: ", bookName);
  console.log("book name to lower case: ", bookName.toLowerCase());
  return bookToIdMap[bookName.toLowerCase()];
};

export const getBookById = (bookId: number) => {
  const book = books.find((b) => b.id === bookId);
  return book || null; // Return null if no book is found
};
