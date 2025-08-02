import React from "react";
import { Image, ImageStyle } from "react-native";

// Import all available emoji assets
const emojiAssets: { [key: string]: any } = {
  "1f929": require("@/assets/images/emojis/1f929.png"), // 🤩 star-struck
  "1f642": require("@/assets/images/emojis/1f642.png"), // 🙂 slightly smiling
  "1f610": require("@/assets/images/emojis/1f610.png"), // 😐 neutral
  "1f634": require("@/assets/images/emojis/1f634.png"), // 😴 sleeping
  "1f623": require("@/assets/images/emojis/1f623.png"), // 😣 persevering
  "1f971": require("@/assets/images/emojis/1f971.png"), // 🥱 yawning
  "1f44b": require("@/assets/images/emojis/1f44b.png"), // 👋 waving
  "1f64f": require("@/assets/images/emojis/1f64f.png"), // 🙏 folded hands (pray)
  "1f50d": require("@/assets/images/emojis/1f50d.png"), // 🔍 seeking
  "1f932": require("@/assets/images/emojis/1f932.png"), // 🙌 grateful
  "1f636": require("@/assets/images/emojis/1f636.png"), // 😶 distant (face without mouth)
  "1f6ab": require("@/assets/images/emojis/1f6ab.png"), // 🚫 rebellious
  "1f494": require("@/assets/images/emojis/1f494.png"), // 💔 broken heart
  "1f495": require("@/assets/images/emojis/1f495.png"), // 💕 two hearts
  "1f91d": require("@/assets/images/emojis/1f91d.png"), // 🤝 forgiving (handshake)
  "1f64c": require("@/assets/images/emojis/1f64c.png"), // 🙌 serving (hands raised)
  "1f31f": require("@/assets/images/emojis/1f31f.png"), // ⭐ encouraging (star)
  "23f2": require("@/assets/images/emojis/23f2.png"), // ⏲️ patient (timer)
  "1f644": require("@/assets/images/emojis/1f644.png"), // 🙄 selfish (eye roll)
  "1f32b": require("@/assets/images/emojis/1f32b.png"), // ◻️ isolated (white square)
  "1f973": require("@/assets/images/emojis/1f973.png"), // 🥳 celebrating (party face)
  "270d": require("@/assets/images/emojis/270d.png"), // ✍️ writing hand (verses)
  "23f1": require("@/assets/images/emojis/23f1.png"), // ⏱️ stopwatch (minutes)
  "1f4d6": require("@/assets/images/emojis/1f4d6.png"), // 📖 open book (chapters)
  "1f4dd": require("@/assets/images/emojis/1f4dd.png"), // 📝 memo (annotations)
  "1f517": require("@/assets/images/emojis/1f517.png"), // 🔗 link (cross references)
  "1f524": require("@/assets/images/emojis/1f524.png"), // 🔤 abc (fonts & settings)
  "1f516": require("@/assets/images/emojis/1f516.png"), // 🔖 bookmark (save)
  "1f4cb": require("@/assets/images/emojis/1f4cb.png"), // 📋 clipboard (copy)
  "1f5bc": require("@/assets/images/emojis/1f5bc.png"), // 🖼️ framed picture (image)
  "2696": require("@/assets/images/emojis/2696.png"), // ⚖️ balance scale (compare)
  "1f4da": require("@/assets/images/emojis/1f4da.png"), // 📚 books (collection)
  "1f9e9": require("@/assets/images/emojis/1f9e9.png"), // 🧩 puzzle piece (cross reference)
};

interface TwemojiProps {
  /** The hex code of the emoji (without 'U+' prefix) */
  hex: string;
  /** Size of the emoji image */
  size?: number;
  /** Additional styles for the image */
  style?: ImageStyle | ImageStyle[];
  /** Resize mode for the image */
  resizeMode?: "cover" | "contain" | "stretch" | "repeat" | "center";
}

/**
 * Twemoji component for rendering emoji images from hex codes
 *
 * @param hex - The hex code of the emoji (e.g., "1f642" for 🙂)
 * @param size - The size of the emoji (defaults to 24)
 * @param style - Additional styles to apply to the image
 * @param resizeMode - How the image should be resized (defaults to "contain")
 */
export const Twemoji: React.FC<TwemojiProps> = ({
  hex,
  size = 24,
  style,
  resizeMode = "contain",
}) => {
  // Get the emoji asset, fallback to slightly smiling face if not found
  const source = emojiAssets[hex.toLowerCase()] || emojiAssets["1f642"];

  const imageStyle: ImageStyle = {
    width: size,
    height: size,
  };

  return (
    <Image
      source={source}
      style={[imageStyle, style]}
      resizeMode={resizeMode}
    />
  );
};

/**
 * Helper function to convert Unicode emoji to hex code
 * Usage: unicodeToHex("🙂") returns "1f642"
 */
export const unicodeToHex = (emoji: string): string => {
  const codePoint = emoji.codePointAt(0);
  return codePoint ? codePoint.toString(16).toLowerCase() : "1f642";
};

/**
 * Helper function to check if an emoji hex code is available
 */
export const isEmojiAvailable = (hex: string): boolean => {
  return hex.toLowerCase() in emojiAssets;
};

export default Twemoji;
