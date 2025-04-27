import { ScrollView, Animated } from "react-native";
import { SuggestionItem } from "../SuggestionItem";
import { useEffect, useRef } from "react";

interface ScriptureSuggestionsProps {
  onSelect: (item: { title: string; emoji: string; verse?: string }) => void;
}

export const ScriptureSuggestions = ({
  onSelect,
}: ScriptureSuggestionsProps) => {
  // Create animated values for each item
  const fadeAnims = useRef(
    Array(10)
      .fill(0)
      .map(() => new Animated.Value(0))
  ).current;
  const slideAnims = useRef(
    Array(10)
      .fill(0)
      .map(() => new Animated.Value(20))
  ).current;

  useEffect(() => {
    // Animate each item sequentially
    fadeAnims.forEach((anim, index) => {
      Animated.sequence([
        Animated.delay(index * 100), // Stagger the animations
        Animated.parallel([
          Animated.timing(anim, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
          }),
          Animated.timing(slideAnims[index], {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
          }),
        ]),
      ]).start();
    });
  }, []);

  // Suggestion items with their data
  const suggestionItems = [
    {
      title: "Read John 3",
      emoji: "📖",
      verse: "John 3:1-36",
    },
    {
      title: "Read Psalm 23",
      emoji: "🙏",
      verse: "Psalm 23:1-6",
    },
    {
      title: "Read Matthew 5 (Beatitudes)",
      emoji: "✝️",
      verse: "Matthew 5:1-12",
    },
    {
      title: "Read Romans 8",
      emoji: "📚",
      verse: "Romans 8:1-39",
    },
    {
      title: "Read 1 Corinthians 13",
      emoji: "❤️",
      verse: "1 Corinthians 13:1-13",
    },
    {
      title: "Read Proverbs 31",
      emoji: "👑",
      verse: "Proverbs 31:10-31",
    },
    {
      title: "Read Genesis 1",
      emoji: "🌎",
      verse: "Genesis 1:1-31",
    },
    {
      title: "Read Exodus 20",
      emoji: "🗿",
      verse: "Exodus 20:1-17",
    },
    {
      title: "Study the Lord's Prayer",
      emoji: "🧎",
      verse: "Matthew 6:9-13",
    },
    {
      title: "Read James 1",
      emoji: "🔍",
      verse: "James 1:1-27",
    },
  ];

  return (
    <ScrollView
      showsVerticalScrollIndicator={true}
      contentContainerStyle={{ paddingBottom: 20 }}
    >
      {suggestionItems.map((item, index) => (
        <Animated.View
          key={item.title}
          style={{
            opacity: fadeAnims[index],
            transform: [{ translateY: slideAnims[index] }],
          }}
        >
          <SuggestionItem
            title={item.title}
            onPress={() =>
              onSelect({
                title: item.title,
                emoji: item.emoji,
                verse: item.verse,
              })
            }
            emoji={item.emoji}
            verse={item.verse}
          />
        </Animated.View>
      ))}
    </ScrollView>
  );
};
