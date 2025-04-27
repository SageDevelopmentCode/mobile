import { View, ScrollView, Animated } from "react-native";
import { SuggestionItem } from "../SuggestionItem";
import { useEffect, useRef } from "react";

interface WorkplaceSuggestionsProps {
  onSelect: (item: { title: string; emoji: string; verse?: string }) => void;
}

export const WorkplaceSuggestions = ({
  onSelect,
}: WorkplaceSuggestionsProps) => {
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

  // More specific workplace suggestion items with biblical themes
  const suggestionItems = [
    {
      title: "Handwrite a thank-you note to a colleague",
      emoji: "✍️",
      verse: "1 Thessalonians 5:18",
    },
    {
      title: "Pray for 3 coworkers by name today",
      emoji: "🙏",
      verse: "1 Timothy 2:1",
    },
    {
      title: "Bring coffee for a stressed teammate",
      emoji: "☕",
      verse: "Galatians 6:2",
    },
    {
      title: "Reply to emails with grace and kindness",
      emoji: "📧",
      verse: "Colossians 4:6",
    },
    {
      title: "Take 10 mins to help someone's project",
      emoji: "⏱️",
      verse: "Philippians 2:4",
    },
    {
      title: "Admit a mistake without making excuses",
      emoji: "🙌",
      verse: "Proverbs 28:13",
    },
    {
      title: "Start team meeting with words of encouragement",
      emoji: "🗣️",
      verse: "1 Thessalonians 5:11",
    },
    {
      title: "Complete one difficult task before lunch",
      emoji: "✅",
      verse: "Colossians 3:23",
    },
    {
      title: "Listen fully without interrupting today",
      emoji: "👂",
      verse: "James 1:19",
    },
    {
      title: "Share credit for a success with your team",
      emoji: "🏆",
      verse: "Romans 12:10",
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
