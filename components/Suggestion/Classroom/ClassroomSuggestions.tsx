import { ScrollView, Animated } from "react-native";
import { SuggestionItem } from "../SuggestionItem";
import { useEffect, useRef } from "react";

interface ClassroomSuggestionsProps {
  onSelect: (item: {
    title: string;
    emoji: string;
    verse?: string;
    verseText?: string;
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
      verseText:
        "Do not be anxious about anything, but in every situation, by prayer and petition, present your requests to God.",
      energyCount: 1,
    },
    {
      title: "Help a struggling classmate with homework",
      emoji: "📚",
      verse: "Galatians 6:2",
      verseText:
        "Carry each other's burdens, and in this way you will fulfill the law of Christ.",
      energyCount: 2,
    },
    {
      title: "Write a thank-you note to a teacher",
      emoji: "✏️",
      verse: "1 Thessalonians 5:18",
      verseText:
        "Give thanks in all circumstances; for this is God's will for you in Christ Jesus.",
      energyCount: 1,
    },
    {
      title: "Include someone sitting alone at lunch",
      emoji: "🍎",
      verse: "Romans 15:7",
      verseText:
        "Accept one another, then, just as Christ accepted you, in order to bring praise to God.",
      energyCount: 2,
    },
    {
      title: "Study 30 mins with full concentration",
      emoji: "⏱️",
      verse: "Colossians 3:23",
      verseText:
        "Whatever you do, work at it with all your heart, as working for the Lord, not for human masters.",
      energyCount: 2,
    },
    {
      title: "Stand up for someone being picked on",
      emoji: "🛡️",
      verse: "Proverbs 31:8-9",
      verseText:
        "Speak up for those who cannot speak for themselves, for the rights of all who are destitute.",
      energyCount: 3,
    },
    {
      title: "Ask a respectful question in class",
      emoji: "🙋",
      verse: "Proverbs 18:15",
      verseText:
        "The heart of the discerning acquires knowledge, for the ears of the wise seek it out.",
      energyCount: 1,
    },
    {
      title: "Pick up 3 pieces of trash at school",
      emoji: "🗑️",
      verse: "Genesis 2:15",
      verseText:
        "The Lord God took the man and put him in the Garden of Eden to work it and take care of it.",
      energyCount: 1,
    },
    {
      title: "Offer to help teacher with a task",
      emoji: "🤝",
      verse: "Matthew 20:28",
      verseText:
        "Just as the Son of Man did not come to be served, but to serve, and to give his life as a ransom for many.",
      energyCount: 2,
    },
    {
      title: "Start a study group with 2-3 friends",
      emoji: "👩‍🎓",
      verse: "Ecclesiastes 4:9-10",
      verseText:
        "Two are better than one, because they have a good return for their labor. If either of them falls down, one can help the other up.",
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
