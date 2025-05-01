import { ScrollView, Animated } from "react-native";
import { SuggestionItem } from "../SuggestionItem";
import { useEffect, useRef } from "react";

interface LifestyleSuggestionsProps {
  onSelect: (item: {
    title: string;
    emoji: string;
    verse?: string;
    verseText?: string;
    energyCount?: number;
  }) => void;
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
      verseText:
        "In the morning, LORD, you hear my voice; in the morning I lay my requests before you and wait expectantly.",
      energyCount: 2,
    },
    {
      title: "Drink water instead of soda today",
      emoji: "💧",
      verse: "1 Corinthians 6:19-20",
      verseText:
        "Do you not know that your bodies are temples of the Holy Spirit? Therefore honor God with your bodies.",
      energyCount: 1,
    },
    {
      title: "Fast from social media for 24 hours",
      emoji: "📵",
      verse: "Matthew 6:16-18",
      verseText:
        "When you fast, do not look somber as the hypocrites do, for they disfigure their faces to show others they are fasting.",
      energyCount: 3,
    },
    {
      title: "Call a family member to encourage them",
      emoji: "📞",
      verse: "1 Thessalonians 5:11",
      verseText:
        "Therefore encourage one another and build each other up, just as in fact you are doing.",
      energyCount: 2,
    },
    {
      title: "Declutter one small space in your home",
      emoji: "🧹",
      verse: "1 Corinthians 14:40",
      verseText: "But everything should be done in a fitting and orderly way.",
      energyCount: 2,
    },
    {
      title: "Go on a 20-minute prayer walk",
      emoji: "🚶",
      verse: "Genesis 3:8",
      verseText:
        "Then the man and his wife heard the sound of the LORD God as he was walking in the garden in the cool of the day.",
      energyCount: 2,
    },
    {
      title: "Give away one item you don't need",
      emoji: "🎁",
      verse: "Acts 20:35",
      verseText:
        "In everything I did, I showed you that by this kind of hard work we must help the weak, remembering the words of the Lord Jesus himself: 'It is more blessed to give than to receive.'",
      energyCount: 1,
    },
    {
      title: "Eat dinner with family without devices",
      emoji: "🍽️",
      verse: "Acts 2:46",
      verseText:
        "Every day they continued to meet together in the temple courts. They broke bread in their homes and ate together with glad and sincere hearts.",
      energyCount: 2,
    },
    {
      title: "Go to bed 30 mins early for better rest",
      emoji: "🛌",
      verse: "Psalm 127:2",
      verseText:
        "In vain you rise early and stay up late, toiling for food to eat—for he grants sleep to those he loves.",
      energyCount: 1,
    },
    {
      title: "Write down 3 things you're thankful for",
      emoji: "✏️",
      verse: "1 Thessalonians 5:18",
      verseText:
        "Give thanks in all circumstances; for this is God's will for you in Christ Jesus.",
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
                verseText: item.verseText,
                energyCount: item.energyCount,
              })
            }
            emoji={item.emoji}
            verse={item.verse}
            verseText={item.verseText}
            energyCount={item.energyCount}
          />
        </Animated.View>
      ))}
    </ScrollView>
  );
};
