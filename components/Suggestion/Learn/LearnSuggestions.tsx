import { ScrollView, Animated } from "react-native";
import { SuggestionItem } from "../SuggestionItem";
import { useEffect, useRef } from "react";

interface LearnSuggestionsProps {
  onSelect: (item: {
    title: string;
    emoji: string;
    verse?: string;
    verseText?: string;
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
      verseText:
        "I have hidden your word in my heart that I might not sin against you.",
      energyCount: 2,
    },
    {
      title: "Listen to a 15-min sermon podcast",
      emoji: "🎧",
      verse: "Romans 10:17",
      verseText:
        "Consequently, faith comes from hearing the message, and the message is heard through the word about Christ.",
      energyCount: 1,
    },
    {
      title: "Study one Bible character for 20 mins",
      emoji: "👑",
      verse: "Hebrews 13:7",
      verseText:
        "Remember your leaders, who spoke the word of God to you. Consider the outcome of their way of life and imitate their faith.",
      energyCount: 2,
    },
    {
      title: "Research one tough Bible question",
      emoji: "🔍",
      verse: "Acts 17:11",
      verseText:
        "Now the Berean Jews were of more noble character, for they received the message with great eagerness and examined the Scriptures every day.",
      energyCount: 3,
    },
    {
      title: "Read one article about your faith",
      emoji: "📱",
      verse: "Proverbs 18:15",
      verseText:
        "The heart of the discerning acquires knowledge, for the ears of the wise seek it out.",
      energyCount: 1,
    },
    {
      title: "Watch a 10-min Bible study video",
      emoji: "📺",
      verse: "Proverbs 9:9",
      verseText:
        "Instruct the wise and they will be wiser still; teach the righteous and they will add to their learning.",
      energyCount: 1,
    },
    {
      title: "Learn about a different Christian tradition",
      emoji: "🌍",
      verse: "1 Corinthians 12:12-14",
      verseText:
        "Just as a body, though one, has many parts, but all its many parts form one body, so it is with Christ.",
      energyCount: 2,
    },
    {
      title: "Study one Psalm's historical context",
      emoji: "📜",
      verse: "2 Timothy 3:16-17",
      verseText:
        "All Scripture is God-breathed and is useful for teaching, rebuking, correcting and training in righteousness.",
      energyCount: 3,
    },
    {
      title: "Learn 3 facts about biblical archaeology",
      emoji: "🏺",
      verse: "Joshua 4:21-22",
      verseText:
        "In the future when your descendants ask their parents, 'What do these stones mean?' tell them, 'Israel crossed the Jordan on dry ground.'",
      energyCount: 2,
    },
    {
      title: "Explore one biblical city on a map",
      emoji: "🗺️",
      verse: "Acts 17:26",
      verseText:
        "From one man he made all the nations, that they should inhabit the whole earth; and he marked out their appointed times in history and the boundaries of their lands.",
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
