export interface QuickReadItem {
  id: number;
  bookName: string;
  verse: string;
  category: string;
  categoryEmoji: string;
  borderColor: string;
}

export const quickReadStories: QuickReadItem[] = [
  {
    id: 1,
    bookName: "John",
    verse: "John 4:25-30",
    category: "Love",
    categoryEmoji: "1f495", // 💕 heart
    borderColor: "#FF6B6B", // Red
  },
  {
    id: 2,
    bookName: "Ruth",
    verse: "Ruth 2:8-12",
    category: "Work",
    categoryEmoji: "1f91d", // 🤝 handshake
    borderColor: "#FF9500", // Orange
  },
  {
    id: 3,
    bookName: "Genesis",
    verse: "Genesis 1:1-5",
    category: "Love",
    categoryEmoji: "1f495", // 💕 heart
    borderColor: "#8B5FBF", // Purple
  },
  {
    id: 4,
    bookName: "Proverbs",
    verse: "Proverbs 3:5-6",
    category: "Love",
    categoryEmoji: "1f495", // 💕 heart
    borderColor: "#FFB800", // Yellow/Gold
  },
  {
    id: 5,
    bookName: "Psalms",
    verse: "Psalms 23:1-4",
    category: "Faith",
    categoryEmoji: "1f64f", // 🙏 praying hands
    borderColor: "#34C759", // Green
  },
  {
    id: 6,
    bookName: "Matthew",
    verse: "Matthew 5:3-8",
    category: "Hope",
    categoryEmoji: "1f31f", // ⭐ star
    borderColor: "#007AFF", // Blue
  },
  {
    id: 7,
    bookName: "Romans",
    verse: "Romans 8:28-30",
    category: "Peace",
    categoryEmoji: "1f64c", // 🙌 raised hands
    borderColor: "#FF3B30", // Red variant
  },
  {
    id: 8,
    bookName: "James",
    verse: "James 1:2-4",
    category: "Joy",
    categoryEmoji: "1f973", // 🥳 party face
    borderColor: "#AF52DE", // Purple variant
  },
];
