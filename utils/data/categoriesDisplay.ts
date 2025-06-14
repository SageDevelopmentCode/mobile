export interface CategoryDisplayItem {
  id: string;
  name: string;
  emojiHex: string;
  color: string;
}

export const categoriesDisplay: CategoryDisplayItem[] = [
  {
    id: "love-relationships",
    name: "Love & Relationships",
    emojiHex: "1f495", // 💕 two hearts
    color: "#4B2C43",
  },
  {
    id: "work-purpose",
    name: "Work & Purpose",
    emojiHex: "1f91d", // 🤝 handshake
    color: "#4B3B2C",
  },
  {
    id: "growth-wisdom",
    name: "Growth & Wisdom",
    emojiHex: "1f31f", // ⭐ star
    color: "#2C4B3D",
  },
  {
    id: "struggle-suffering",
    name: "Struggle & Suffering",
    emojiHex: "1f623", // 😣 persevering
    color: "#2C3F4B",
  },
  {
    id: "faith-trust",
    name: "Faith & Trust",
    emojiHex: "1f64f", // 🙏 praying hands
    color: "#4B2C43",
  },
  {
    id: "hope-encouragement",
    name: "Hope & Encouragement",
    emojiHex: "1f31f", // ⭐ star
    color: "#4B3B2C",
  },
  {
    id: "family-parenting",
    name: "Family & Parenting",
    emojiHex: "1f495", // 💕 two hearts
    color: "#2C4B3D",
  },
  {
    id: "prayer-worship",
    name: "Prayer & Worship",
    emojiHex: "1f64c", // 🙌 hands raised
    color: "#2C3F4B",
  },
  {
    id: "courage-strength",
    name: "Courage & Strength",
    emojiHex: "1f64c", // 🙌 hands raised
    color: "#4B2C43",
  },
  {
    id: "anxiety-fear",
    name: "Anxiety & Fear",
    emojiHex: "1f64f", // 🙏 praying hands
    color: "#4B3B2C",
  },
  {
    id: "peace-rest",
    name: "Peace & Rest",
    emojiHex: "1f634", // 😴 sleeping
    color: "#2C4B3D",
  },
  {
    id: "gratitude-contentment",
    name: "Gratitude & Contentment",
    emojiHex: "1f973", // 🥳 celebrating
    color: "#2C3F4B",
  },
];
