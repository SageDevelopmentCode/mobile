import { Book } from "./Book";

export interface Verse {
  id: number;
  book: Book;
  chapterId: number;
  verseId: number;
  verse: string;
}
