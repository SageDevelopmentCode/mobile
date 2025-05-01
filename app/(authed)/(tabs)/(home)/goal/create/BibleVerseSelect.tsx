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

  // List of suggested verses as objects with title and emoji
  const suggestedVerses = [
    {
      title:
        "Philippians 4:13 - I can do all things through Christ who strengthens me.",
      emoji: "📖",
      reference: "Philippians 4:13",
      text: "I can do all things through Christ who strengthens me.",
    },
    {
      title:
        "Proverbs 16:3 - Commit to the Lord whatever you do, and he will establish your plans.",
      emoji: "📖",
      reference: "Proverbs 16:3",
      text: "Commit to the Lord whatever you do, and he will establish your plans.",
    },
    {
      title: "Matthew 19:26 - With God all things are possible.",
      emoji: "📖",
      reference: "Matthew 19:26",
      text: "With God all things are possible.",
    },
    {
      title:
        "2 Timothy 1:7 - For God has not given us a spirit of fear, but of power and of love and of a sound mind.",
      emoji: "📖",
      reference: "2 Timothy 1:7",
      text: "For God has not given us a spirit of fear, but of power and of love and of a sound mind.",
    },
    {
      title:
        "Psalm 37:4 - Delight yourself in the Lord, and he will give you the desires of your heart.",
      emoji: "📖",
      reference: "Psalm 37:4",
      text: "Delight yourself in the Lord, and he will give you the desires of your heart.",
    },
    {
      title:
        "Joshua 1:9 - Be strong and courageous. Do not be afraid; do not be discouraged, for the Lord your God will be with you wherever you go.",
      emoji: "📖",
      reference: "Joshua 1:9",
      text: "Be strong and courageous. Do not be afraid; do not be discouraged, for the Lord your God will be with you wherever you go.",
    },
    {
      title:
        "Romans 8:28 - And we know that in all things God works for the good of those who love him.",
      emoji: "📖",
      reference: "Romans 8:28",
      text: "And we know that in all things God works for the good of those who love him.",
    },
    {
      title:
        "Jeremiah 29:11 - For I know the plans I have for you, declares the Lord, plans to prosper you and not to harm you.",
      emoji: "📖",
      reference: "Jeremiah 29:11",
      text: "For I know the plans I have for you, declares the Lord, plans to prosper you and not to harm you.",
    },
  ];

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

      <Heading color={colors.PrimaryWhite} style={styles.goalText}>
        {emoji} {goal}
      </Heading>

      <Heading color={colors.PrimaryWhite} style={{ marginBottom: 20 }}>
        Add a Bible verse to your goal
      </Heading>

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
  goalText: {
    fontSize: 22,
    marginBottom: 30,
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
  goalInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  emojiContainer: {
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    borderRadius: 8,
  },
  goalInput: {
    flex: 1,
    height: 100,
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    borderRadius: 8,
    paddingHorizontal: 20,
    paddingVertical: 10,
    fontWeight: "600",
    color: colors.PrimaryWhite,
    fontSize: 18,
    textAlign: "center",
    justifyContent: "center",
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
});
