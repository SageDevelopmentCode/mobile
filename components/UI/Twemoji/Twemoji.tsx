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
