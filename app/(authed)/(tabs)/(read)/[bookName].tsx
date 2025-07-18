import React, { useMemo, useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  ImageBackground,
  TextInput,
} from "react-native";
import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

import { DynamicBookImage } from "@/components/UI/DynamicBookImage/DynamicBookImage";
import {
  ButtonText,
  Heading,
  Paragraph,
  SectionTitle,
  SubHeading,
  Title,
} from "@/components/Text/TextComponents";
import colors from "@/constants/colors";
import {
  oldTestamentBooks,
  OldTestamentBook,
} from "@/utils/data/oldTestamentBooks";
import {
  newTestamentBooks,
  NewTestamentBook,
} from "@/utils/data/newTestamentBooks";
import { Twemoji } from "@/components/UI/Twemoji/Twemoji";
import {
  getBookSummaryByBook,
  BookSummary,
} from "@/lib/supabase/db/book_summaries";
import { styles } from "./BookOverviewScreen.styles";
import { tabBarOptions } from "@/constants/tabBarOptions";

export default function BookOverviewScreen() {
  const router = useRouter();
  const { bookName } = useLocalSearchParams<{ bookName: string }>();
  const [bookSummary, setBookSummary] = useState<BookSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);
  const [expandedReplies, setExpandedReplies] = useState<{
    [key: number]: boolean;
  }>({});
  const [commentText, setCommentText] = useState("");
  const navigation = useNavigation();

  // Find book information and determine testament
  const bookInfo = useMemo(() => {
    if (!bookName) return null;

    // Search in Old Testament books
    const otBook = oldTestamentBooks.find(
      (book) => book.title.toLowerCase() === bookName.toLowerCase()
    );

    if (otBook) {
      return {
        ...otBook,
        testament: "Old Testament",
      };
    }

    // Search in New Testament books
    const ntBook = newTestamentBooks.find(
      (book) => book.title.toLowerCase() === bookName.toLowerCase()
    );

    if (ntBook) {
      return {
        ...ntBook,
        testament: "New Testament",
      };
    }

    return null;
  }, [bookName]);

  // Fetch book summary data on component mount
  useEffect(() => {
    const fetchBookSummary = async () => {
      if (!bookName) return;

      try {
        setLoading(true);
        const summary = await getBookSummaryByBook(bookName);
        setBookSummary(summary);
      } catch (error) {
        console.error("Error fetching book summary:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookSummary();
  }, [bookName]);

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
    navigation.getParent()?.setOptions({
      tabBarStyle: {
        display: "none",
      },
    });
    return () =>
      navigation.getParent()?.setOptions({
        ...tabBarOptions,
      });
  }, [navigation]);

  const handleBack = () => {
    router.back();
  };

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const toggleReplies = (commentId: number) => {
    setExpandedReplies((prev) => ({
      ...prev,
      [commentId]: !prev[commentId],
    }));
  };

  // Function to truncate text for inline read more
  const getTruncatedText = (text: string, maxLength: number = 130) => {
    if (text.length <= maxLength) return text;
    const truncated = text.substring(0, maxLength);
    const lastSpace = truncated.lastIndexOf(" ");
    return lastSpace > 0 ? truncated.substring(0, lastSpace) : truncated;
  };

  const renderSummaryText = () => {
    if (!bookSummary?.short_summary) return null;

    const fullText = bookSummary.short_summary;
    const shouldTruncate = fullText.length > 130;
    const themeColor = bookSummary?.theme_color || "#ECA7C8";

    if (isExpanded || !shouldTruncate) {
      return (
        <View>
          <Paragraph style={styles.summaryText}>{fullText}</Paragraph>
          {shouldTruncate && (
            <TouchableOpacity
              onPress={toggleExpanded}
              style={styles.readMoreButton}
            >
              <ButtonText style={[styles.readMoreText, { color: themeColor }]}>
                Read Less
              </ButtonText>
            </TouchableOpacity>
          )}
        </View>
      );
    }

    const truncatedText = getTruncatedText(fullText);

    return (
      <Paragraph style={styles.summaryText}>
        {truncatedText}
        <Text
          style={[styles.readMoreText, { color: themeColor }]}
          onPress={toggleExpanded}
        >
          ... Read More
        </Text>
      </Paragraph>
    );
  };

  const renderComment = (comment: any, isReply: boolean = false) => (
    <View
      key={comment.id}
      style={[styles.commentItem, isReply && styles.replyItem]}
    >
      <Image source={{ uri: comment.avatar }} style={styles.commentAvatar} />
      <View style={styles.commentContent}>
        <View style={styles.commentHeader}>
          <SubHeading style={styles.commentUsername}>
            {comment.username}
          </SubHeading>
          <Text style={styles.commentTime}>{comment.timestamp}</Text>
        </View>
        <Paragraph style={styles.commentText}>{comment.text}</Paragraph>

        {/* Action buttons */}
        <View style={styles.commentActions}>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons
              name="arrow-up"
              size={16}
              color={bookSummary?.theme_color || "#ECA7C8"}
            />
            <Text style={styles.actionText}>{comment.upvotes}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="arrow-down" size={16} color="#B5B5B5" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="chatbubble-outline" size={16} color="#B5B5B5" />
            <Text style={styles.actionText}>Reply</Text>
          </TouchableOpacity>
        </View>

        {/* View replies button */}
        {!isReply && comment.replies && comment.replies.length > 0 && (
          <TouchableOpacity
            style={styles.viewRepliesButton}
            onPress={() => toggleReplies(comment.id)}
          >
            <Text style={styles.viewRepliesText}>
              {expandedReplies[comment.id] ? "Hide" : "View"}{" "}
              {comment.replies.length} replies
            </Text>
          </TouchableOpacity>
        )}

        {/* Replies */}
        {!isReply && expandedReplies[comment.id] && comment.replies && (
          <View style={styles.repliesContainer}>
            {comment.replies.map((reply: any) => renderComment(reply, true))}
          </View>
        )}
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero Section with Background */}
        <View style={styles.heroSection}>
          {/* Background Image */}
          <View style={styles.backgroundImageContainer}>
            <DynamicBookImage
              bookName={bookName || ""}
              style={styles.backgroundImage}
            />
            {/* Dark Overlay */}
            <View style={styles.backgroundOverlay} />
          </View>

          {/* Header with Back Button, Title, and Share */}
          <View style={styles.heroHeader}>
            <TouchableOpacity style={styles.backButton} onPress={handleBack}>
              <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
            </TouchableOpacity>
            <Heading style={styles.heroTitle}>{bookName}</Heading>
            <TouchableOpacity style={styles.shareButton}>
              <Ionicons name="share-outline" size={24} color="#FFFFFF" />
            </TouchableOpacity>
          </View>

          {/* Book Image in Center */}
          <View style={styles.bookImageContainer}>
            <DynamicBookImage
              bookName={bookName || ""}
              style={styles.bookImage}
            />
          </View>
        </View>

        {/* Stats Section */}
        <View style={styles.statsSection}>
          <SectionTitle style={styles.statsTitle}>Stats</SectionTitle>
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Twemoji hex="270d" size={24} />
              <SubHeading style={styles.statValue}>
                {loading ? "..." : `${bookSummary?.verses || 0} Verses`}
              </SubHeading>
            </View>
            <View style={styles.statItem}>
              <Twemoji hex="23f1" size={24} />
              <SubHeading style={styles.statValue}>
                {loading
                  ? "..."
                  : `${bookSummary?.read_time_minutes || 0} Minutes`}
              </SubHeading>
            </View>
            <View style={styles.statItem}>
              <Twemoji hex="1f4d6" size={24} />
              <SubHeading style={styles.statValue}>
                {loading ? "..." : `${bookSummary?.chapters || 0} Chapters`}
              </SubHeading>
            </View>
          </View>
        </View>

        {/* Summary Section */}
        <View style={styles.summarySection}>
          <SectionTitle style={styles.summaryTitle}>Summary</SectionTitle>
          {loading ? (
            <Paragraph style={styles.summaryText}>Loading summary...</Paragraph>
          ) : bookSummary?.short_summary ? (
            renderSummaryText()
          ) : (
            <Paragraph style={styles.summaryText}>
              No summary available.
            </Paragraph>
          )}
        </View>

        {/* Why Read Hashtags Section */}
        {!loading &&
          bookSummary?.why_read_hashtags &&
          bookSummary.why_read_hashtags.length > 0 && (
            <View style={styles.hashtagsSection}>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.hashtagsContainer}
              >
                {bookSummary.why_read_hashtags.map((hashtag, index) => (
                  <View key={index}>
                    <SubHeading
                      style={[
                        styles.hashtagText,
                        { color: bookSummary.theme_color || "#ECA7C8" },
                      ]}
                    >
                      {hashtag}
                    </SubHeading>
                  </View>
                ))}
              </ScrollView>
            </View>
          )}

        {/* Themes Section */}
        {!loading && bookSummary?.themes && bookSummary.themes.length > 0 && (
          <View style={styles.themesSection}>
            <SectionTitle style={styles.themesTitle}>Themes</SectionTitle>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.themesContainer}
            >
              {bookSummary.themes.map((theme, index) => (
                <View
                  key={index}
                  style={[
                    styles.themeItem,
                    {
                      backgroundColor: `${
                        bookSummary.theme_color || "#ECA7C8"
                      }20`,
                      borderColor: bookSummary.theme_color || "#ECA7C8",
                    },
                  ]}
                >
                  <SubHeading
                    style={[
                      styles.themeText,
                      { color: bookSummary.theme_color || "#ECA7C8" },
                    ]}
                  >
                    {theme}
                  </SubHeading>
                </View>
              ))}
            </ScrollView>
          </View>
        )}

        {/* Key Verse Section */}
        {!loading && bookSummary?.key_verse && (
          <View style={styles.keyVerseSection}>
            <SectionTitle style={styles.keyVerseTitle}>Key Verse</SectionTitle>
            <View style={styles.keyVerseContainer}>
              {(() => {
                const parts = bookSummary.key_verse.split(" - ");
                const reference = parts[0]?.trim();
                const verseText = parts[1]?.trim();

                return (
                  <View>
                    {reference && (
                      <SubHeading
                        style={[
                          styles.keyVerseReference,
                          { color: bookSummary.theme_color || "#ECA7C8" },
                        ]}
                      >
                        {reference}
                      </SubHeading>
                    )}
                    {verseText && (
                      <Paragraph style={styles.keyVerseText}>
                        {verseText}
                      </Paragraph>
                    )}
                  </View>
                );
              })()}
            </View>
          </View>
        )}

        {/* Main Characters Section */}
        {!loading &&
          bookSummary?.main_characters &&
          bookSummary.main_characters.length > 0 && (
            <View style={styles.charactersSection}>
              <SectionTitle style={styles.charactersTitle}>
                Main Characters
              </SectionTitle>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.charactersContainer}
              >
                {bookSummary.main_characters.map((character, index) => (
                  <View
                    key={index}
                    style={[
                      styles.characterItem,
                      {
                        backgroundColor: `${
                          bookSummary.theme_color || "#ECA7C8"
                        }15`,
                        borderColor: bookSummary.theme_color || "#ECA7C8",
                      },
                    ]}
                  >
                    <SubHeading
                      style={[
                        styles.characterText,
                        { color: bookSummary.theme_color || "#ECA7C8" },
                      ]}
                    >
                      {character}
                    </SubHeading>
                  </View>
                ))}
              </ScrollView>
            </View>
          )}

        {/* Comments Section */}
        <View style={styles.commentsSection}>
          <SectionTitle style={styles.commentsTitle}>
            See what others are saying
          </SectionTitle>

          {/* Comment Input */}
          <View style={styles.commentInputContainer}>
            <TextInput
              style={styles.commentInput}
              placeholder="Share your thoughts..."
              placeholderTextColor="#888888"
              value={commentText}
              onChangeText={setCommentText}
              multiline
              maxLength={280}
            />
            <TouchableOpacity
              style={[
                styles.postButton,
                {
                  backgroundColor: commentText.trim()
                    ? `${bookSummary?.theme_color || "#ECA7C8"}95`
                    : `${bookSummary?.theme_color || "#ECA7C8"}30`,
                },
              ]}
              disabled={!commentText.trim()}
            >
              <Ionicons
                name="arrow-forward"
                size={20}
                color={commentText.trim() ? "#FFFFFF" : "#888888"}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.commentsContainer}>
            {mockComments.map((comment) => renderComment(comment))}
          </View>
        </View>
      </ScrollView>

      {/* Fixed Bottom Buttons */}
      <View style={styles.bottomButtonsContainer}>
        <TouchableOpacity style={styles.saveButton}>
          <Ionicons name="bookmark-outline" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.readNowButton,
            { backgroundColor: `${bookSummary?.theme_color || "#ECA7C8"}95` },
          ]}
          onPress={() =>
            router.push(
              `/(authed)/(tabs)/(read)/${bookName}/reading?themeColor=${encodeURIComponent(
                bookSummary?.theme_color || "#ECA7C8"
              )}`
            )
          }
        >
          <Ionicons name="book-outline" size={24} color="#FFFFFF" />
          <ButtonText style={styles.readNowButtonText}>
            Start Reading
          </ButtonText>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// Mock comments data
const mockComments = [
  {
    id: 1,
    username: "Sarah_M",
    avatar:
      "https://images.unsplash.com/photo-1494790108755-2616b0e86307?w=100&h=100&fit=crop&crop=face",
    text: "This book completely changed my perspective on faith and redemption. The stories are so powerful and relatable.",
    timestamp: "3 min. ago",
    upvotes: 12,
    replies: [
      {
        id: 11,
        username: "David_K",
        avatar:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
        text: "I agree! The character development is incredible.",
        timestamp: "1 min. ago",
        upvotes: 5,
      },
    ],
  },
  {
    id: 2,
    username: "David_K",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    text: "I've read this multiple times and each time I discover something new. The character development is incredible.",
    timestamp: "1 hour ago",
    upvotes: 8,
    replies: [
      {
        id: 21,
        username: "Sarah_M",
        avatar:
          "https://images.unsplash.com/photo-1494790108755-2616b0e86307?w=100&h=100&fit=crop&crop=face",
        text: "Me too! It's a timeless classic.",
        timestamp: "30 min. ago",
        upvotes: 3,
      },
    ],
  },
  {
    id: 3,
    username: "Grace_L",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
    text: "Perfect for understanding the foundations of faith. The historical context really brings the stories to life.",
    timestamp: "2 hours ago",
    upvotes: 15,
    replies: [
      {
        id: 31,
        username: "Michael_R",
        avatar:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
        text: "Absolutely! The themes are so profound.",
        timestamp: "1 hour ago",
        upvotes: 7,
      },
    ],
  },
  {
    id: 4,
    username: "Michael_R",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    text: "The themes of covenant and promise run throughout beautifully. Such a meaningful read.",
    timestamp: "1 day ago",
    upvotes: 6,
    replies: [
      {
        id: 41,
        username: "Grace_L",
        avatar:
          "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
        text: "Yes, the symbolism is rich throughout.",
        timestamp: "23 hours ago",
        upvotes: 4,
      },
    ],
  },
];
