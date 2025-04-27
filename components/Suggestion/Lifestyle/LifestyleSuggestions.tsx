import { ScrollView, Animated } from "react-native";
import { SuggestionItem } from "../SuggestionItem";
import { useEffect, useRef } from "react";

interface LifestyleSuggestionsProps {
  onSelect: (item: { title: string; emoji: string; verse?: string }) => void;
}

export const LifestyleSuggestions = ({
  onSelect,
}: LifestyleSuggestionsProps) => {
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

  // Specific Christian lifestyle suggestion items
  const suggestionItems = [
    {
      title: "Wake up 15 mins early for prayer",
      emoji: "⏰",
      verse: "Psalm 5:3",
    },
    {
      title: "Drink water instead of soda today",
      emoji: "💧",
      verse: "1 Corinthians 6:19-20",
    },
    {
      title: "Fast from social media for 24 hours",
      emoji: "📵",
      verse: "Matthew 6:16-18",
    },
    {
      title: "Call a family member to encourage them",
      emoji: "📞",
      verse: "1 Thessalonians 5:11",
    },
    {
      title: "Declutter one small space in your home",
      emoji: "🧹",
      verse: "1 Corinthians 14:40",
    },
    {
      title: "Go on a 20-minute prayer walk",
      emoji: "🚶",
      verse: "Genesis 3:8",
    },
    {
      title: "Give away one item you don't need",
      emoji: "🎁",
      verse: "Acts 20:35",
    },
    {
      title: "Eat dinner with family without devices",
      emoji: "🍽️",
      verse: "Acts 2:46",
    },
    {
      title: "Go to bed 30 mins early for better rest",
      emoji: "🛌",
      verse: "Psalm 127:2",
    },
    {
      title: "Write down 3 things you're thankful for",
      emoji: "✏️",
      verse: "1 Thessalonians 5:18",
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
