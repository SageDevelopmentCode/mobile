import { ScrollView, Animated } from "react-native";
import { SuggestionItem } from "../SuggestionItem";
import { useEffect, useRef } from "react";

interface LearnSuggestionsProps {
  onSelect: (item: {
    title: string;
    emoji: string;
    verse?: string;
    energyCount?: number;
  }) => void;
}

export const LearnSuggestions = ({ onSelect }: LearnSuggestionsProps) => {
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

  // Specific Christian learning suggestion items
  const suggestionItems = [
    {
      title: "Learn 1 new Bible verse today",
      emoji: "🧠",
      verse: "Psalm 119:11",
      energyCount: 2,
    },
    {
      title: "Listen to a 15-min sermon podcast",
      emoji: "🎧",
      verse: "Romans 10:17",
      energyCount: 1,
    },
    {
      title: "Study one Bible character for 20 mins",
      emoji: "👑",
      verse: "Hebrews 13:7",
      energyCount: 2,
    },
    {
      title: "Research one tough Bible question",
      emoji: "🔍",
      verse: "Acts 17:11",
      energyCount: 3,
    },
    {
      title: "Read one article about your faith",
      emoji: "📱",
      verse: "Proverbs 18:15",
      energyCount: 1,
    },
    {
      title: "Watch a 10-min Bible study video",
      emoji: "📺",
      verse: "Proverbs 9:9",
      energyCount: 1,
    },
    {
      title: "Learn about a different Christian tradition",
      emoji: "🌍",
      verse: "1 Corinthians 12:12-14",
      energyCount: 2,
    },
    {
      title: "Study one Psalm's historical context",
      emoji: "📜",
      verse: "2 Timothy 3:16-17",
      energyCount: 3,
    },
    {
      title: "Learn 3 facts about biblical archaeology",
      emoji: "🏺",
      verse: "Joshua 4:21-22",
      energyCount: 2,
    },
    {
      title: "Explore one biblical city on a map",
      emoji: "🗺️",
      verse: "Acts 17:26",
      energyCount: 1,
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
