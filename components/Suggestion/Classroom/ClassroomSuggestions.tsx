import { ScrollView, Animated } from "react-native";
import { SuggestionItem } from "../SuggestionItem";
import { useEffect, useRef } from "react";

interface ClassroomSuggestionsProps {
  onSelect: (item: {
    title: string;
    emoji: string;
    verse?: string;
    energyCount?: number;
  }) => void;
}

export const ClassroomSuggestions = ({
  onSelect,
}: ClassroomSuggestionsProps) => {
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

  // Specific Christian classroom suggestion items
  const suggestionItems = [
    {
      title: "Pray silently before a test today",
      emoji: "🙏",
      verse: "Philippians 4:6-7",
      energyCount: 1,
    },
    {
      title: "Help a struggling classmate with homework",
      emoji: "📚",
      verse: "Galatians 6:2",
      energyCount: 2,
    },
    {
      title: "Write a thank-you note to a teacher",
      emoji: "✏️",
      verse: "1 Thessalonians 5:18",
      energyCount: 1,
    },
    {
      title: "Include someone sitting alone at lunch",
      emoji: "🍎",
      verse: "Romans 15:7",
      energyCount: 2,
    },
    {
      title: "Study 30 mins with full concentration",
      emoji: "⏱️",
      verse: "Colossians 3:23",
      energyCount: 2,
    },
    {
      title: "Stand up for someone being picked on",
      emoji: "🛡️",
      verse: "Proverbs 31:8-9",
      energyCount: 3,
    },
    {
      title: "Ask a respectful question in class",
      emoji: "🙋",
      verse: "Proverbs 18:15",
      energyCount: 1,
    },
    {
      title: "Pick up 3 pieces of trash at school",
      emoji: "🗑️",
      verse: "Genesis 2:15",
      energyCount: 1,
    },
    {
      title: "Offer to help teacher with a task",
      emoji: "🤝",
      verse: "Matthew 20:28",
      energyCount: 2,
    },
    {
      title: "Start a study group with 2-3 friends",
      emoji: "👩‍🎓",
      verse: "Ecclesiastes 4:9-10",
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
