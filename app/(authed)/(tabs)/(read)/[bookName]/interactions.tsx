import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  ActivityIndicator,
  FlatList,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { getChapter, Verse } from "@/lib/api/bible";
import { bookThemeColor } from "@/utils/data/bookThemeColor";
import { useAuth } from "@/context/AuthContext";
import colors from "@/constants/colors";
import { styles } from "./interactions.styles";

interface UserInteraction {
  id: string;
  userId: string;
  userName: string;
  userInitials: string;
  userColor: string;
  type: "comment" | "reaction" | "prayer" | "insight";
  content: string;
  emoji?: string;
  timestamp: Date;
  likes: number;
  replies?: UserInteraction[];
}

interface VersePill {
  verseId: number;
  displayText: string;
  isSelected: boolean;
}

export default function VerseInteractionsScreen() {
  const router = useRouter();
  const { session } = useAuth();
  const { bookName, chapter, verseId, verseText, themeColor } =
    useLocalSearchParams<{
      bookName: string;
      chapter: string;
      verseId: string;
      verseText: string;
      themeColor?: string;
    }>();

  // Get theme color from bookThemeColor.ts if not provided in params
  const resolvedThemeColor =
    themeColor ||
    (bookName
      ? bookThemeColor[bookName as keyof typeof bookThemeColor] || undefined
      : undefined);

  const [currentChapter] = useState(chapter ? parseInt(chapter) : 1);
  const [currentVerseId, setCurrentVerseId] = useState(
    verseId ? parseInt(verseId) : 1
  );
  const [verses, setVerses] = useState<Verse[]>([]);
  const [versePills, setVersePills] = useState<VersePill[]>([]);
  const [loading, setLoading] = useState(true);
  const [interactions, setInteractions] = useState<UserInteraction[]>([]);
  const [newComment, setNewComment] = useState("");
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);

  const versePillsRef = useRef<FlatList>(null);
  const commentsRef = useRef<FlatList>(null);

  // Mock interactions data - in real app this would come from your backend
  const mockInteractions: UserInteraction[] = [
    {
      id: "1",
      userId: "user1",
      userName: "Sarah Johnson",
      userInitials: "SJ",
      userColor: "#FF6B6B",
      type: "comment",
      content:
        "This verse really spoke to my heart. The way it describes God's love is so powerful and comforting.",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      likes: 12,
      replies: [
        {
          id: "1-1",
          userId: "user2",
          userName: "Mike Chen",
          userInitials: "MC",
          userColor: "#4ECDC4",
          type: "comment",
          content:
            "I completely agree! This has been my go-to verse during difficult times.",
          timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000),
          likes: 3,
        },
      ],
    },
    {
      id: "2",
      userId: "user3",
      userName: "Emma Davis",
      userInitials: "ED",
      userColor: "#45B7D1",
      type: "prayer",
      content:
        "Praying for everyone who needs to feel God's unconditional love today. May this verse bring you peace.",
      timestamp: new Date(Date.now() - 45 * 60 * 1000), // 45 minutes ago
      likes: 8,
    },
    {
      id: "3",
      userId: "user4",
      userName: "David Rodriguez",
      userInitials: "DR",
      userColor: "#96CEB4",
      type: "insight",
      content:
        "In the original Greek, the word used here for love is 'agape' - the highest form of love, unconditional and sacrificial.",
      timestamp: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
      likes: 15,
    },
    {
      id: "4",
      userId: "user5",
      userName: "Lisa Wang",
      userInitials: "LW",
      userColor: "#FFEAA7",
      type: "reaction",
      content: "This gives me hope! 🙏",
      emoji: "1f64f", // 🙏
      timestamp: new Date(Date.now() - 10 * 60 * 1000), // 10 minutes ago
      likes: 6,
    },
  ];

  useEffect(() => {
    if (bookName && currentChapter) {
      fetchChapterVerses();
    }
  }, [bookName, currentChapter]);

  useEffect(() => {
    if (verses.length > 0) {
      generateVersePills();
      setInteractions(mockInteractions);
    }
  }, [verses, currentVerseId]);

  const fetchChapterVerses = async () => {
    try {
      setLoading(true);
      const chapterVerses = await getChapter(bookName || "", currentChapter);
      setVerses(chapterVerses);
    } catch (error) {
      console.error("Error fetching chapter:", error);
    } finally {
      setLoading(false);
    }
  };

  const generateVersePills = () => {
    const pills: VersePill[] = verses.map((verse) => ({
      verseId: verse.verseId,
      displayText: `${bookName} ${currentChapter}:${verse.verseId}`,
      isSelected: verse.verseId === currentVerseId,
    }));
    setVersePills(pills);

    // Auto-scroll to selected verse pill
    if (versePillsRef.current) {
      const selectedIndex = pills.findIndex((pill) => pill.isSelected);
      if (selectedIndex !== -1) {
        setTimeout(() => {
          versePillsRef.current?.scrollToIndex({
            index: selectedIndex,
            animated: true,
            viewPosition: 0.5,
          });
        }, 100);
      }
    }
  };

  const handleVersePillPress = (verseId: number) => {
    setCurrentVerseId(verseId);
    // Navigate to the detailed verse screen
    const selectedVerse = verses.find((v) => v.verseId === verseId);
    if (selectedVerse) {
      router.push({
        pathname: `/(authed)/(tabs)/(read)/[bookName]/interactions`,
        params: {
          bookName: bookName,
          chapter: currentChapter.toString(),
          verseId: verseId.toString(),
          verseText: selectedVerse.verse,
          ...(resolvedThemeColor && { themeColor: resolvedThemeColor }),
        },
      });
    }
  };

  const handleBack = () => {
    router.back();
  };

  const handleSubmitComment = async () => {
    if (!newComment.trim() || !session?.user) return;

    setIsSubmittingComment(true);
    try {
      // In real app, submit to backend
      const newInteraction: UserInteraction = {
        id: Date.now().toString(),
        userId: session.user.id,
        userName: session.user.email || "User", // You might want to fetch user's display name
        userInitials: (
          session.user.email?.substring(0, 2) || "U"
        ).toUpperCase(),
        userColor: "#C77DFF",
        type: "comment",
        content: newComment.trim(),
        timestamp: new Date(),
        likes: 0,
      };

      setInteractions((prev) => [newInteraction, ...prev]);
      setNewComment("");
    } catch (error) {
      console.error("Error submitting comment:", error);
    } finally {
      setIsSubmittingComment(false);
    }
  };

  const formatTimeAgo = (timestamp: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor(
      (now.getTime() - timestamp.getTime()) / (1000 * 60)
    );

    if (diffInMinutes < 1) return "just now";
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  const getInteractionIcon = (type: string) => {
    switch (type) {
      case "comment":
        return "chatbubble-outline";
      case "prayer":
        return "heart-outline";
      case "insight":
        return "bulb-outline";
      case "reaction":
        return "happy-outline";
      default:
        return "chatbubble-outline";
    }
  };

  const getInteractionLabel = (type: string) => {
    switch (type) {
      case "comment":
        return "commented";
      case "prayer":
        return "prayed";
      case "insight":
        return "shared insight";
      case "reaction":
        return "reacted";
      default:
        return "commented";
    }
  };

  const renderVersePill = ({ item }: { item: VersePill }) => (
    <TouchableOpacity
      style={[
        styles.versePill,
        item.isSelected && {
          backgroundColor: resolvedThemeColor || "#888888",
          borderColor: resolvedThemeColor || "#888888",
        },
      ]}
      onPress={() => handleVersePillPress(item.verseId)}
      activeOpacity={0.7}
    >
      <Text
        style={[
          styles.versePillText,
          item.isSelected && styles.versePillTextSelected,
        ]}
      >
        {item.displayText}
      </Text>
    </TouchableOpacity>
  );

  const renderInteraction = ({ item }: { item: UserInteraction }) => (
    <View style={styles.interactionCard}>
      <View style={styles.interactionHeader}>
        <View style={[styles.userAvatar, { backgroundColor: item.userColor }]}>
          <Text style={styles.userInitials}>{item.userInitials}</Text>
        </View>
        <View style={styles.interactionMeta}>
          <View style={styles.userInfo}>
            <Text style={styles.userName}>{item.userName}</Text>
            <View style={styles.interactionBadge}>
              <Ionicons
                name={getInteractionIcon(item.type)}
                size={12}
                color={resolvedThemeColor || "#888888"}
              />
              <Text
                style={[
                  styles.interactionType,
                  { color: resolvedThemeColor || "#888888" },
                ]}
              >
                {getInteractionLabel(item.type)}
              </Text>
            </View>
          </View>
          <Text style={styles.timestamp}>{formatTimeAgo(item.timestamp)}</Text>
        </View>
      </View>

      <View style={styles.interactionContent}>
        <Text style={styles.interactionText}>{item.content}</Text>
      </View>

      <View style={styles.interactionFooter}>
        <TouchableOpacity style={styles.likeButton}>
          <Ionicons name="heart-outline" size={16} color="#888888" />
          <Text style={styles.likeCount}>{item.likes}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.replyButton}>
          <Ionicons name="chatbubble-outline" size={16} color="#888888" />
          <Text style={styles.replyText}>Reply</Text>
        </TouchableOpacity>
      </View>

      {/* Render replies if any */}
      {item.replies && item.replies.length > 0 && (
        <View style={styles.repliesContainer}>
          {item.replies.map((reply) => (
            <View key={reply.id} style={styles.replyCard}>
              <View
                style={[
                  styles.userAvatar,
                  styles.replyAvatar,
                  { backgroundColor: reply.userColor },
                ]}
              >
                <Text style={[styles.userInitials, styles.replyInitials]}>
                  {reply.userInitials}
                </Text>
              </View>
              <View style={styles.replyContent}>
                <Text style={styles.replyUserName}>{reply.userName}</Text>
                <Text style={styles.replyText}>{reply.content}</Text>
                <View style={styles.replyFooter}>
                  <Text style={styles.replyTimestamp}>
                    {formatTimeAgo(reply.timestamp)}
                  </Text>
                  <TouchableOpacity style={styles.replyLikeButton}>
                    <Ionicons name="heart-outline" size={14} color="#666666" />
                    <Text style={styles.replyLikeCount}>{reply.likes}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))}
        </View>
      )}
    </View>
  );

  const currentVerse = verses.find((v) => v.verseId === currentVerseId);

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleBack} style={styles.backButton}>
            <Ionicons name="chevron-back" size={24} color="#FFFFFF" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Verse Interactions</Text>
          <View style={styles.placeholder} />
        </View>
        <View style={styles.loadingContainer}>
          <ActivityIndicator
            size="large"
            color={resolvedThemeColor || "#888888"}
          />
          <Text style={styles.loadingText}>Loading interactions...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header with Back Button and Verse Pills */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>

        <View style={styles.versePillsContainer}>
          <FlatList
            ref={versePillsRef}
            data={versePills}
            renderItem={renderVersePill}
            keyExtractor={(item) => item.verseId.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.versePillsList}
            getItemLayout={(data, index) => ({
              length: 110,
              offset: 110 * index,
              index,
            })}
          />
        </View>
      </View>

      {/* Current Verse Display */}
      <View style={styles.currentVerseContainer}>
        <Text
          style={[
            styles.verseReference,
            { color: resolvedThemeColor || "#888888" },
          ]}
        >
          {bookName} {currentChapter}:{currentVerseId}
        </Text>
        <Text style={styles.verseText}>{currentVerse?.verse || verseText}</Text>
      </View>

      {/* Interactions List */}
      <FlatList
        ref={commentsRef}
        data={interactions}
        renderItem={renderInteraction}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.interactionsList}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Ionicons name="chatbubbles-outline" size={48} color="#666666" />
            <Text style={styles.emptyStateText}>No interactions yet</Text>
            <Text style={styles.emptyStateSubtext}>
              Be the first to share your thoughts!
            </Text>
          </View>
        }
      />

      {/* Comment Input */}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.commentInputContainer}
      >
        <View style={styles.commentInputRow}>
          <TextInput
            style={styles.commentInput}
            placeholder="Share your thoughts..."
            placeholderTextColor="#666666"
            value={newComment}
            onChangeText={setNewComment}
            multiline
            maxLength={500}
          />
          <TouchableOpacity
            style={[
              styles.sendButton,
              { backgroundColor: resolvedThemeColor || "#888888" },
              (!newComment.trim() || isSubmittingComment) &&
                styles.sendButtonDisabled,
            ]}
            onPress={handleSubmitComment}
            disabled={!newComment.trim() || isSubmittingComment}
          >
            {isSubmittingComment ? (
              <ActivityIndicator size="small" color="#FFFFFF" />
            ) : (
              <Ionicons name="send" size={20} color="#FFFFFF" />
            )}
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
