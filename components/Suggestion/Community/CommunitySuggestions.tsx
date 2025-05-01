import { ScrollView, Animated } from "react-native";
import { SuggestionItem } from "../SuggestionItem";
import { useEffect, useRef } from "react";

interface CommunitySuggestionsProps {
  onSelect: (item: {
    title: string;
    emoji: string;
    verse?: string;
    verseText?: string;
    energyCount?: number;
  }) => void;
}

export const CommunitySuggestions = ({
  onSelect,
}: CommunitySuggestionsProps) => {
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

  // Specific Christian community suggestion items
  const suggestionItems = [
    {
      title: "Volunteer 2 hours at a local shelter",
      emoji: "🏠",
      verse: "Isaiah 58:7",
      verseText:
        "Is it not to share your food with the hungry and to provide the poor wanderer with shelter?",
      energyCount: 3,
    },
    {
      title: "Donate 5 items to a food bank today",
      emoji: "🥫",
      verse: "Matthew 25:35-36",
      verseText:
        "For I was hungry and you gave me something to eat, I was thirsty and you gave me something to drink.",
      energyCount: 2,
    },
    {
      title: "Attend a church small group meeting",
      emoji: "👥",
      verse: "Hebrews 10:24-25",
      verseText:
        "And let us consider how we may spur one another on toward love and good deeds, not giving up meeting together.",
      energyCount: 2,
    },
    {
      title: "Clean up trash in your neighborhood",
      emoji: "🧹",
      verse: "1 Peter 4:10",
      verseText:
        "Each of you should use whatever gift you have received to serve others, as faithful stewards of God's grace in its various forms.",
      energyCount: 2,
    },
    {
      title: "Support a local small business today",
      emoji: "🏪",
      verse: "Proverbs 3:27-28",
      verseText:
        "Do not withhold good from those to whom it is due, when it is in your power to act.",
      energyCount: 1,
    },
    {
      title: "Invite a neighbor over for coffee",
      emoji: "☕",
      verse: "Romans 12:13",
      verseText:
        "Share with the Lord's people who are in need. Practice hospitality.",
      energyCount: 2,
    },
    {
      title: "Offer to babysit for a single parent",
      emoji: "👶",
      verse: "Galatians 6:2",
      verseText:
        "Carry each other's burdens, and in this way you will fulfill the law of Christ.",
      energyCount: 3,
    },
    {
      title: "Call an isolated elderly person",
      emoji: "📞",
      verse: "James 1:27",
      verseText:
        "Religion that God our Father accepts as pure and faultless is this: to look after orphans and widows in their distress.",
      energyCount: 2,
    },
    {
      title: "Participate in a community prayer walk",
      emoji: "🚶",
      verse: "1 Timothy 2:1-2",
      verseText:
        "I urge, then, first of all, that petitions, prayers, intercession and thanksgiving be made for all people.",
      energyCount: 2,
    },
    {
      title: "Donate unused clothing to a shelter",
      emoji: "👕",
      verse: "Luke 3:11",
      verseText:
        "Anyone who has two shirts should share with the one who has none, and anyone who has food should do the same.",
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
