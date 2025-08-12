import * as Sharing from "expo-sharing";
import { Alert, Platform } from "react-native";
import * as Clipboard from "expo-clipboard";

// Configuration for your domain - replace with your actual domain
const APP_DOMAIN = "yourbibleapp.com"; // Replace with your domain
const APP_NAME = "Your Bible App"; // Replace with your app name

export interface VerseReference {
  bookName: string;
  chapter: number;
  verse: number;
  verseText: string;
  translation?: string;
}

/**
 * Generates a shareable URL for a specific verse
 * Format: https://yourbibleapp.com/verse/{book}/{chapter}/{verse}?translation={translation}
 */
export function generateVerseShareUrl(reference: VerseReference): string {
  const { bookName, chapter, verse, translation = "NIV" } = reference;

  // URL-encode the book name to handle spaces and special characters
  const encodedBookName = encodeURIComponent(bookName);

  // Build the URL
  const baseUrl = `https://${APP_DOMAIN}/verse/${encodedBookName}/${chapter}/${verse}`;
  const url = new URL(baseUrl);

  // Add translation as query parameter
  if (translation && translation !== "NIV") {
    url.searchParams.set("translation", translation);
  }

  return url.toString();
}

/**
 * Generates a deep link URL for the mobile app
 * Format: myapp://verse/{book}/{chapter}/{verse}?translation={translation}
 */
export function generateVerseDeepLink(reference: VerseReference): string {
  const { bookName, chapter, verse, translation = "NIV" } = reference;

  // URL-encode the book name
  const encodedBookName = encodeURIComponent(bookName);

  // Build the deep link
  const baseUrl = `myapp://verse/${encodedBookName}/${chapter}/${verse}`;
  const url = new URL(baseUrl);

  // Add translation as query parameter
  if (translation && translation !== "NIV") {
    url.searchParams.set("translation", translation);
  }

  return url.toString();
}

/**
 * Formats the verse text for sharing
 */
export function formatVerseForSharing(reference: VerseReference): string {
  const {
    bookName,
    chapter,
    verse,
    verseText,
    translation = "NIV",
  } = reference;

  return `"${verseText}"\n\n— ${bookName} ${chapter}:${verse} (${translation})\n\nRead more: ${generateVerseShareUrl(
    reference
  )}`;
}

/**
 * Formats a simple verse text without URL (for copy to clipboard)
 */
export function formatVerseTextOnly(reference: VerseReference): string {
  const {
    bookName,
    chapter,
    verse,
    verseText,
    translation = "NIV",
  } = reference;

  return `"${verseText}" — ${bookName} ${chapter}:${verse} (${translation})`;
}

/**
 * Copies verse text to clipboard
 */
export async function copyVerseToClipboard(
  reference: VerseReference
): Promise<boolean> {
  try {
    const formattedText = formatVerseTextOnly(reference);
    await Clipboard.setStringAsync(formattedText);
    return true;
  } catch (error) {
    console.error("Error copying to clipboard:", error);
    return false;
  }
}

/**
 * Shares a verse using the native Share API
 */
export async function shareVerse(reference: VerseReference): Promise<boolean> {
  try {
    const shareUrl = generateVerseShareUrl(reference);
    const shareText = formatVerseForSharing(reference);

    if (Platform.OS === "ios" || Platform.OS === "android") {
      // Use React Native's built-in Share API
      const { Share } = require("react-native");

      const shareOptions = {
        message: shareText,
        url: shareUrl,
        title: `${reference.bookName} ${reference.chapter}:${reference.verse}`,
      };

      const result = await Share.share(shareOptions);

      if (result.action === Share.sharedAction) {
        return true;
      } else if (result.action === Share.dismissedAction) {
        return false;
      }
    } else {
      // Web platform - use Web Share API if available, otherwise copy to clipboard
      if (navigator.share) {
        await navigator.share({
          title: `${reference.bookName} ${reference.chapter}:${reference.verse}`,
          text: shareText,
          url: shareUrl,
        });
        return true;
      } else {
        // Fallback: copy to clipboard
        await copyVerseToClipboard(reference);
        Alert.alert(
          "Copied to Clipboard",
          "The verse has been copied to your clipboard."
        );
        return true;
      }
    }

    return false;
  } catch (error) {
    console.error("Error sharing verse:", error);

    // Fallback: try to copy to clipboard
    try {
      await copyVerseToClipboard(reference);
      Alert.alert(
        "Copied to Clipboard",
        "Could not share, but the verse has been copied to your clipboard."
      );
      return true;
    } catch (clipboardError) {
      console.error("Error with clipboard fallback:", clipboardError);
      Alert.alert("Error", "Failed to share or copy the verse.");
      return false;
    }
  }
}

/**
 * Parses a verse URL to extract verse reference information
 * Used for handling incoming shared links
 */
export function parseVerseUrl(url: string): VerseReference | null {
  try {
    const urlObj = new URL(url);
    const pathname = urlObj.pathname;

    // Handle both web URLs and deep links
    const isDeepLink = url.startsWith("myapp://");
    const isWebUrl = url.includes(APP_DOMAIN);

    if (!isDeepLink && !isWebUrl) {
      return null;
    }

    // Parse the path: /verse/{book}/{chapter}/{verse}
    const pathParts = pathname.split("/").filter((part) => part.length > 0);

    if (pathParts.length < 4 || pathParts[0] !== "verse") {
      return null;
    }

    const bookName = decodeURIComponent(pathParts[1]);
    const chapter = parseInt(pathParts[2]);
    const verse = parseInt(pathParts[3]);
    const translation = urlObj.searchParams.get("translation") || "NIV";

    if (isNaN(chapter) || isNaN(verse) || chapter < 1 || verse < 1) {
      return null;
    }

    return {
      bookName,
      chapter,
      verse,
      verseText: "", // Will be fetched when navigating
      translation,
    };
  } catch (error) {
    console.error("Error parsing verse URL:", error);
    return null;
  }
}

/**
 * Validates if a book name is valid (you can enhance this with your book list)
 */
export function isValidBook(bookName: string): boolean {
  // Add your validation logic here
  // For now, just check if it's not empty
  return bookName.length > 0;
}

/**
 * Gets the share message for social media
 */
export function getSocialShareMessage(reference: VerseReference): string {
  const { bookName, chapter, verse, verseText } = reference;

  return `"${verseText}" — ${bookName} ${chapter}:${verse}\n\nRead the full chapter in ${APP_NAME}: ${generateVerseShareUrl(
    reference
  )}`;
}
