import { ScrollView, Animated } from "react-native";
import { SuggestionItem } from "../SuggestionItem";
import { useEffect, useRef } from "react";

interface KindnessSuggestionsProps {
  onSelect: (item: {
    title: string;
    emoji: string;
    verse?: string;
    energyCount?: number;
  }) => void;
}

export const KindnessSuggestions = ({ onSelect }: KindnessSuggestionsProps) => {
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

  // Specific Christian kindness suggestion items
  const suggestionItems = [
    {
      title: "Pay for a stranger's coffee today",
      emoji: "☕",
      verse: "Proverbs 11:25",
      energyCount: 2,
    },
    {
      title: "Write an encouraging note to a friend",
      emoji: "✉️",
      verse: "1 Thessalonians 5:11",
      energyCount: 1,
    },
    {
      title: "Give a specific compliment to 3 people",
      emoji: "👏",
      verse: "Ephesians 4:29",
      energyCount: 1,
    },
    {
      title: "Bring a meal to someone in need",
      emoji: "🍲",
      verse: "Matthew 25:35",
      energyCount: 3,
    },
    {
      title: "Let someone go ahead of you in line",
      emoji: "🚶",
      verse: "Philippians 2:3-4",
      energyCount: 1,
    },
    {
      title: "Send an encouraging text to 5 friends",
      emoji: "📱",
      verse: "Hebrews 10:24-25",
      energyCount: 2,
    },
    {
      title: "Hold the door for 10 people today",
      emoji: "🚪",
      verse: "Romans 12:10",
      energyCount: 1,
    },
    {
      title: "Leave a generous tip for your server",
      emoji: "💰",
      verse: "Luke 6:38",
      energyCount: 2,
    },
    {
      title: "Help a neighbor with a specific chore",
      emoji: "🏡",
      verse: "Galatians 5:13-14",
      energyCount: 3,
    },
    {
      title: "Visit an elderly person for 30 minutes",
      emoji: "👵",
      verse: "James 1:27",
      energyCount: 3,
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
                energyCount: item.energyCount,
              })
            }
            emoji={item.emoji}
            verse={item.verse}
            energyCount={item.energyCount}
          />
        </Animated.View>
      ))}
    </ScrollView>
  );
};
