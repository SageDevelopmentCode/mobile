import React, { useEffect, useState } from "react";
import { router, useNavigation } from "expo-router";
import { useSearchParams } from "expo-router/build/hooks";
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import colors from "@/constants/colors";
import { FontAwesome6, MaterialIcons, FontAwesome } from "@/utils/icons";
import { tabBarOptions } from "@/constants/tabBarOptions";
import {
  Paragraph,
  Title,
  Heading,
  StatText,
} from "@/components/Text/TextComponents";
import ActionButton from "@/components/Buttons/ActionButtons/ActionButtons";
import { SuggestionItem } from "@/components/Suggestion";

// Custom Goal Preview component
const GoalPreview = ({
  emoji,
  title,
  verse,
}: {
  emoji: string;
  title: string;
  verse: string;
}) => {
  return (
    <View style={previewStyles.container}>
      <View style={previewStyles.leftContainer}>
        <View style={previewStyles.emojiContainer}>
          <Heading>{emoji}</Heading>
        </View>
        <View style={previewStyles.textContainer}>
          <Heading color={colors.PrimaryWhite} style={previewStyles.title}>
            {title}
          </Heading>
          {verse ? (
            <StatText color="#CCCCCC" style={previewStyles.verse}>
              {verse}
            </StatText>
          ) : null}
        </View>
      </View>
      <View style={previewStyles.rightContainer}>
        <View style={previewStyles.energyContainer}>
          <FontAwesome6
            name="bolt"
            size={14}
            color={colors.EnergyColor}
            style={previewStyles.energyIcon}
          />
          <StatText color={colors.EnergyColor}>2</StatText>
        </View>
      </View>
    </View>
  );
};

const previewStyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#3C8A81",
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
    marginBottom: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 6,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
  },
  leftContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  emojiContainer: {
    width: 45,
    height: 45,
    borderRadius: 8,
    backgroundColor: "rgba(255, 255, 255, 0.25)",
    justifyContent: "center",
    alignItems: "center",
  },
  textContainer: {
    marginLeft: 12,
    flex: 1,
  },
  title: {
    fontSize: 16,
    flexWrap: "wrap",
  },
  verse: {
    fontSize: 12,
    marginTop: 4,
  },
  rightContainer: {
    marginLeft: 10,
  },
  energyContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 204, 0, 0.25)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  energyIcon: {
    marginRight: 4,
  },
});

export default function BibleVerseSelectScreen() {
  const navigation = useNavigation();
  const searchParams = useSearchParams();
  const goal: any = searchParams.get("goal");
  const emoji: any = searchParams.get("emoji");
  const suggestedVerse: any = searchParams.get("verse");
  const suggestedVerseText: any = searchParams.get("verseText");
  const category: any = searchParams.get("category");

  const [selectedReference, setSelectedReference] = useState<string>(
    suggestedVerse || ""
  );
  const [selectedVerseText, setSelectedVerseText] = useState<string>(
    suggestedVerseText || ""
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Verse categories
  const verseCategories: string[] = [
    "Faith",
    "Strength",
    "Wisdom",
    "Love",
    "Hope",
    "Peace",
    "Joy",
  ];

  const [activeCategory, setActiveCategory] = useState<string>(
    verseCategories[0]
  );

  const handleCategoryPress = (category: string): void => {
    setActiveCategory(category);
  };

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
    navigation.getParent()?.setOptions({
      tabBarStyle: {
        display: "none",
      },
    });
    // Don't restore tab bar on unmount - let GoalCreate handle it
    return () => {};
  }, [navigation]);

  // Organized verses by category
  const categorizedVerses = {
    Faith: [
      {
        title:
          "Hebrews 11:1 - Now faith is confidence in what we hope for and assurance about what we do not see.",
        emoji: "📖",
        reference: "Hebrews 11:1",
        text: "Now faith is confidence in what we hope for and assurance about what we do not see.",
      },
      {
        title:
          "Romans 10:17 - Consequently, faith comes from hearing the message, and the message is heard through the word about Christ.",
        emoji: "📖",
        reference: "Romans 10:17",
        text: "Consequently, faith comes from hearing the message, and the message is heard through the word about Christ.",
      },
      {
        title: "2 Corinthians 5:7 - For we live by faith, not by sight.",
        emoji: "📖",
        reference: "2 Corinthians 5:7",
        text: "For we live by faith, not by sight.",
      },
    ],
    Strength: [
      {
        title:
          "Philippians 4:13 - I can do all things through Christ who strengthens me.",
        emoji: "📖",
        reference: "Philippians 4:13",
        text: "I can do all things through Christ who strengthens me.",
      },
      {
        title:
          "Isaiah 40:31 - But those who hope in the LORD will renew their strength.",
        emoji: "📖",
        reference: "Isaiah 40:31",
        text: "But those who hope in the LORD will renew their strength. They will soar on wings like eagles; they will run and not grow weary, they will walk and not be faint.",
      },
      {
        title:
          "Ephesians 6:10 - Finally, be strong in the Lord and in his mighty power.",
        emoji: "📖",
        reference: "Ephesians 6:10",
        text: "Finally, be strong in the Lord and in his mighty power.",
      },
    ],
    Wisdom: [
      {
        title:
          "Proverbs 3:5-6 - Trust in the LORD with all your heart and lean not on your own understanding.",
        emoji: "📖",
        reference: "Proverbs 3:5-6",
        text: "Trust in the LORD with all your heart and lean not on your own understanding; in all your ways submit to him, and he will make your paths straight.",
      },
      {
        title:
          "James 1:5 - If any of you lacks wisdom, you should ask God, who gives generously.",
        emoji: "📖",
        reference: "James 1:5",
        text: "If any of you lacks wisdom, you should ask God, who gives generously to all without finding fault, and it will be given to you.",
      },
      {
        title:
          "Proverbs 18:15 - The heart of the discerning acquires knowledge, for the ears of the wise seek it out.",
        emoji: "📖",
        reference: "Proverbs 18:15",
        text: "The heart of the discerning acquires knowledge, for the ears of the wise seek it out.",
      },
    ],
    Love: [
      {
        title:
          "1 Corinthians 13:4-7 - Love is patient, love is kind. It does not envy, it does not boast.",
        emoji: "📖",
        reference: "1 Corinthians 13:4-7",
        text: "Love is patient, love is kind. It does not envy, it does not boast, it is not proud. It does not dishonor others, it is not self-seeking, it is not easily angered, it keeps no record of wrongs.",
      },
      {
        title:
          "John 3:16 - For God so loved the world that he gave his one and only Son.",
        emoji: "📖",
        reference: "John 3:16",
        text: "For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life.",
      },
      {
        title:
          "Romans 12:9-10 - Love must be sincere. Hate what is evil; cling to what is good.",
        emoji: "📖",
        reference: "Romans 12:9-10",
        text: "Love must be sincere. Hate what is evil; cling to what is good. Be devoted to one another in love. Honor one another above yourselves.",
      },
    ],
    Hope: [
      {
        title:
          "Jeremiah 29:11 - For I know the plans I have for you, declares the Lord, plans to prosper you and not to harm you.",
        emoji: "📖",
        reference: "Jeremiah 29:11",
        text: "For I know the plans I have for you, declares the Lord, plans to prosper you and not to harm you, plans to give you hope and a future.",
      },
      {
        title:
          "Romans 15:13 - May the God of hope fill you with all joy and peace as you trust in him.",
        emoji: "📖",
        reference: "Romans 15:13",
        text: "May the God of hope fill you with all joy and peace as you trust in him, so that you may overflow with hope by the power of the Holy Spirit.",
      },
      {
        title:
          "Romans 8:28 - And we know that in all things God works for the good of those who love him.",
        emoji: "📖",
        reference: "Romans 8:28",
        text: "And we know that in all things God works for the good of those who love him, who have been called according to his purpose.",
      },
    ],
    Peace: [
      {
        title: "John 14:27 - Peace I leave with you; my peace I give you.",
        emoji: "📖",
        reference: "John 14:27",
        text: "Peace I leave with you; my peace I give you. I do not give to you as the world gives. Do not let your hearts be troubled and do not be afraid.",
      },
      {
        title:
          "Philippians 4:6-7 - Do not be anxious about anything, but in every situation, by prayer and petition...",
        emoji: "📖",
        reference: "Philippians 4:6-7",
        text: "Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God. And the peace of God, which transcends all understanding, will guard your hearts and your minds in Christ Jesus.",
      },
      {
        title:
          "Isaiah 26:3 - You will keep in perfect peace those whose minds are steadfast, because they trust in you.",
        emoji: "📖",
        reference: "Isaiah 26:3",
        text: "You will keep in perfect peace those whose minds are steadfast, because they trust in you.",
      },
    ],
    Joy: [
      {
        title:
          "James 1:2-3 - Consider it pure joy, my brothers and sisters, whenever you face trials of many kinds.",
        emoji: "📖",
        reference: "James 1:2-3",
        text: "Consider it pure joy, my brothers and sisters, whenever you face trials of many kinds, because you know that the testing of your faith produces perseverance.",
      },
      {
        title:
          "Psalm 16:11 - You make known to me the path of life; you will fill me with joy in your presence.",
        emoji: "📖",
        reference: "Psalm 16:11",
        text: "You make known to me the path of life; you will fill me with joy in your presence, with eternal pleasures at your right hand.",
      },
      {
        title: "Nehemiah 8:10 - The joy of the LORD is your strength.",
        emoji: "📖",
        reference: "Nehemiah 8:10",
        text: "Nehemiah said, 'Go and enjoy choice food and sweet drinks, and send some to those who have nothing prepared. This day is holy to our Lord. Do not grieve, for the joy of the LORD is your strength.'",
      },
    ],
  };

  // Get verses for the active category
  const suggestedVerses =
    categorizedVerses[activeCategory as keyof typeof categorizedVerses] || [];

  const handleContinue = () => {
    router.push({
      pathname: "/(authed)/(tabs)/(home)/goal/create/success/GoalCreateSuccess",
      params: {
        goal,
        emoji,
        verse: selectedReference,
        category,
      },
    });
  };

  const handleSelectSuggestedVerse = (reference: string, text: string) => {
    setSelectedReference(reference);
    setSelectedVerseText(text);
  };

  return (
    <View style={styles.container}>
      <View
        style={{ width: "100%", alignItems: "flex-start", marginBottom: 20 }}
      >
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcons
            name="arrow-back-ios-new"
            color={colors.PrimaryWhite}
            size={30}
          />
        </TouchableOpacity>
      </View>
      <Heading color={colors.PrimaryWhite} style={{ marginBottom: 20 }}>
        Add a Bible verse to your goal
      </Heading>

      <GoalPreview emoji={emoji} title={goal} verse={selectedReference} />

      <View style={styles.verseContainer}>
        <View style={styles.referenceContainer}>
          <StatText color={colors.PrimaryGrayBackground}>Reference</StatText>
          <TextInput
            value={selectedReference}
            editable={false}
            placeholder="Select a verse below"
            placeholderTextColor="rgba(255, 255, 255, 0.5)"
            style={styles.referenceInput}
          />
        </View>

        <View style={styles.textContainer}>
          <StatText color={colors.PrimaryGrayBackground}>Verse</StatText>
          <TextInput
            value={selectedVerseText}
            editable={false}
            placeholder="Verse text will appear here"
            placeholderTextColor="rgba(255, 255, 255, 0.5)"
            style={styles.verseTextInput}
            multiline
            textAlignVertical="top"
            numberOfLines={3}
          />
        </View>
      </View>

      <ActionButton
        type="PrimaryGray"
        title={isLoading ? "Loading..." : "Continue"}
        onPress={handleContinue}
        disabled={isLoading}
        icon={
          isLoading ? (
            <ActivityIndicator size="small" color={colors.DarkPrimaryText} />
          ) : (
            <FontAwesome6
              name="arrow-right"
              size={20}
              color={colors.DarkPrimaryText}
            />
          )
        }
      />

      <View style={styles.suggestionSection}>
        <Paragraph
          color={colors.PrimaryGrayBackground}
          style={{ marginTop: 20, marginBottom: 10 }}
        >
          Suggested Verses
        </Paragraph>

        {/* Category tabs */}
        <View style={styles.categoriesContainer}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.tabContainer}
          >
            {verseCategories.map((category, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.tab,
                  activeCategory === category && styles.activeTab,
                ]}
                onPress={() => handleCategoryPress(category)}
              >
                <Text style={[styles.tabText]}>{category}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <ScrollView style={styles.suggestionsContainer}>
          {suggestedVerses.map((verse, index) => (
            <SuggestionItem
              key={index}
              emoji={verse.emoji}
              title={verse.title}
              onPress={() =>
                handleSelectSuggestedVerse(verse.reference, verse.text)
              }
              energyCount={0}
              style={[styles.suggestionItem]}
            />
          ))}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#51B7AB",
    padding: 20,
    paddingTop: 80,
  },
  verseContainer: {
    marginBottom: 20,
  },
  referenceContainer: {
    marginBottom: 12,
  },
  textContainer: {
    marginBottom: 12,
  },
  referenceInput: {
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    borderRadius: 8,
    paddingHorizontal: 20,
    paddingVertical: 10,
    fontWeight: "600",
    color: colors.PrimaryWhite,
    fontSize: 18,
    textAlign: "center",
    height: 50,
    marginTop: 5,
  },
  verseTextInput: {
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    borderRadius: 8,
    paddingHorizontal: 20,
    paddingVertical: 12,
    fontWeight: "600",
    color: colors.PrimaryWhite,
    fontSize: 16,
    height: 100,
    marginTop: 5,
  },
  suggestionSection: {
    flex: 1,
    marginTop: 10,
  },
  suggestionsContainer: {
    flex: 1,
  },
  suggestionItem: {
    marginBottom: 8,
  },
  selectedSuggestion: {
    backgroundColor: "rgba(255, 255, 255, 0.25)",
  },
  categoriesContainer: {
    marginBottom: 10,
  },
  tabContainer: {
    paddingVertical: 5,
    paddingHorizontal: 5,
  },
  tab: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginHorizontal: 5,
    borderRadius: 8,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
  activeTab: {
    backgroundColor: "rgba(255, 255, 255, 0.25)",
  },
  tabText: {
    fontWeight: "600",
    color: colors.PrimaryWhite,
    fontSize: 14,
  },
});
