import { ScrollView, Animated } from "react-native";
import { SuggestionItem } from "../SuggestionItem";
import { useEffect, useRef } from "react";

interface ScriptureSuggestionsProps {
  onSelect: (item: {
    title: string;
    emoji: string;
    verse?: string;
    verseText?: string;
    energyCount?: number;
  }) => void;
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
      verseText:
        "Now there was a Pharisee, a man named Nicodemus who was a member of the Jewish ruling council...",
      energyCount: 1,
    },
    {
      title: "Read Psalm 23",
      emoji: "🙏",
      verse: "Psalm 23:1-6",
      verseText:
        "The Lord is my shepherd, I lack nothing. He makes me lie down in green pastures...",
      energyCount: 1,
    },
    {
      title: "Read Matthew 5 (Beatitudes)",
      emoji: "✝️",
      verse: "Matthew 5:1-12",
      verseText:
        "Blessed are the poor in spirit, for theirs is the kingdom of heaven. Blessed are those who mourn...",
      energyCount: 1,
    },
    {
      title: "Read Romans 8",
      emoji: "📚",
      verse: "Romans 8:1-39",
      verseText:
        "Therefore, there is now no condemnation for those who are in Christ Jesus...",
      energyCount: 2,
    },
    {
      title: "Read 1 Corinthians 13",
      emoji: "❤️",
      verse: "1 Corinthians 13:1-13",
      verseText:
        "If I speak in the tongues of men or of angels, but do not have love, I am only a resounding gong...",
      energyCount: 1,
    },
    {
      title: "Read Proverbs 31",
      emoji: "👑",
      verse: "Proverbs 31:10-31",
      verseText:
        "A wife of noble character who can find? She is worth far more than rubies...",
      energyCount: 2,
    },
    {
      title: "Read Genesis 1",
      emoji: "🌎",
      verse: "Genesis 1:1-31",
      verseText:
        "In the beginning God created the heavens and the earth. Now the earth was formless and empty...",
      energyCount: 2,
    },
    {
      title: "Read Exodus 20",
      emoji: "🗿",
      verse: "Exodus 20:1-17",
      verseText:
        "And God spoke all these words: 'I am the LORD your God, who brought you out of Egypt...'",
      energyCount: 1,
    },
    {
      title: "Study the Lord's Prayer",
      emoji: "🧎",
      verse: "Matthew 6:9-13",
      verseText:
        "Our Father in heaven, hallowed be your name, your kingdom come, your will be done...",
      energyCount: 2,
    },
    {
      title: "Read James 1",
      emoji: "🔍",
      verse: "James 1:1-27",
      verseText:
        "Consider it pure joy, my brothers and sisters, whenever you face trials of many kinds...",
      energyCount: 2,
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
