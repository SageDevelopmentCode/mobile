import { View, ScrollView, Animated } from "react-native";
import { SuggestionItem } from "../SuggestionItem";
import { useEffect, useRef } from "react";

interface WorkplaceSuggestionsProps {
  onSelect: (item: {
    title: string;
    emoji: string;
    verse?: string;
    verseText?: string;
    energyCount?: number;
  }) => void;
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
      verseText:
        "Give thanks in all circumstances; for this is God's will for you in Christ Jesus.",
      energyCount: 2,
    },
    {
      title: "Pray for 3 coworkers by name today",
      emoji: "🙏",
      verse: "1 Timothy 2:1",
      verseText:
        "I urge, then, first of all, that petitions, prayers, intercession and thanksgiving be made for all people.",
      energyCount: 1,
    },
    {
      title: "Bring coffee for a stressed teammate",
      emoji: "☕",
      verse: "Galatians 6:2",
      verseText:
        "Carry each other's burdens, and in this way you will fulfill the law of Christ.",
      energyCount: 2,
    },
    {
      title: "Reply to emails with grace and kindness",
      emoji: "📧",
      verse: "Colossians 4:6",
      verseText:
        "Let your conversation be always full of grace, seasoned with salt, so that you may know how to answer everyone.",
      energyCount: 1,
    },
    {
      title: "Take 10 mins to help someone's project",
      emoji: "⏱️",
      verse: "Philippians 2:4",
      verseText:
        "not looking to your own interests but each of you to the interests of the others.",
      energyCount: 2,
    },
    {
      title: "Admit a mistake without making excuses",
      emoji: "🙌",
      verse: "Proverbs 28:13",
      verseText:
        "Whoever conceals their sins does not prosper, but the one who confesses and renounces them finds mercy.",
      energyCount: 2,
    },
    {
      title: "Start team meeting with words of encouragement",
      emoji: "🗣️",
      verse: "1 Thessalonians 5:11",
      verseText:
        "Therefore encourage one another and build each other up, just as in fact you are doing.",
      energyCount: 1,
    },
    {
      title: "Complete one difficult task before lunch",
      emoji: "✅",
      verse: "Colossians 3:23",
      verseText:
        "Whatever you do, work at it with all your heart, as working for the Lord, not for human masters.",
      energyCount: 3,
    },
    {
      title: "Listen fully without interrupting today",
      emoji: "👂",
      verse: "James 1:19",
      verseText:
        "Everyone should be quick to listen, slow to speak and slow to become angry.",
      energyCount: 2,
    },
    {
      title: "Share credit for a success with your team",
      emoji: "🏆",
      verse: "Romans 12:10",
      verseText:
        "Be devoted to one another in love. Honor one another above yourselves.",
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
