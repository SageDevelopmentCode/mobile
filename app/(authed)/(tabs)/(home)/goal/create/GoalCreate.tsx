import React, { useEffect, useState } from "react";
import { router } from "expo-router";
import { useNavigation } from "expo-router";
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import colors from "@/constants/colors";
import { FontAwesome6, MaterialIcons } from "@/utils/icons";
import { styles } from "./GoalCreate.styles";
import { tabBarOptions } from "@/constants/tabBarOptions";
import { Paragraph, Title } from "@/components/Text/TextComponents";
import ActionButton from "@/components/Buttons/ActionButtons/ActionButtons";
import {
  ClassroomSuggestions,
  CommunitySuggestions,
  KindnessSuggestions,
  LearnSuggestions,
  LifestyleSuggestions,
  ScriptureSuggestions,
  WorkplaceSuggestions,
} from "@/components/Suggestion";
import { EmojiSelectorBottomSheet } from "@/components/Goal/EmojiSelectorBottomSheet";

export default function CreateGoalScreen() {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
    navigation.getParent()?.setOptions({
      tabBarStyle: {
        display: "none",
      },
    });
    return () =>
      navigation.getParent()?.setOptions({
        ...tabBarOptions,
      });
  }, [navigation]);

  const suggestionTabs: string[] = [
    "Scripture",
    "Workplace",
    "Classroom",
    "Kindness",
    "Community",
    "Lifestyle",
    "Learn",
  ];

  const [isEmojiPickerVisible, setEmojiPickerVisible] =
    useState<boolean>(false);
  const [selectedEmoji, setSelectedEmoji] = useState<string>("🎯");
  const [userGoal, setUserGoal] = useState<string>("");
  const [selectedVerse, setSelectedVerse] = useState<string | undefined>();
  const [selectedVerseText, setSelectedVerseText] = useState<
    string | undefined
  >();
  const [activeSuggestionTab, setActiveSuggestionTab] = useState<string>(
    suggestionTabs[0]
  );

  const handleTabPress = (tab: string): void => {
    setActiveSuggestionTab(tab);
  };

  const onEmojiSelect = (emoji: string): void => {
    setSelectedEmoji(emoji);
    // No need to close the picker here as the bottom sheet will handle closing itself
  };

  const handleSuggestionSelect = (item: {
    title: string;
    emoji: string;
    verse?: string;
    verseText?: string;
    energyCount?: number;
  }): void => {
    console.log("Selected Suggestion:", item);
    setUserGoal(item.title);
    setSelectedEmoji(item.emoji);
    setSelectedVerse(item.verse);
    setSelectedVerseText(item.verseText);
  };

  let SuggestionsComponent: JSX.Element | null;

  switch (activeSuggestionTab) {
    case "Scripture":
      SuggestionsComponent = (
        <ScriptureSuggestions onSelect={handleSuggestionSelect} />
      );
      break;
    case "Workplace":
      SuggestionsComponent = (
        <WorkplaceSuggestions onSelect={handleSuggestionSelect} />
      );
      break;
    case "Lifestyle":
      SuggestionsComponent = (
        <LifestyleSuggestions onSelect={handleSuggestionSelect} />
      );
      break;
    case "Learn":
      SuggestionsComponent = (
        <LearnSuggestions onSelect={handleSuggestionSelect} />
      );
      break;
    case "Kindness":
      SuggestionsComponent = (
        <KindnessSuggestions onSelect={handleSuggestionSelect} />
      );
      break;
    case "Community":
      SuggestionsComponent = (
        <CommunitySuggestions onSelect={handleSuggestionSelect} />
      );
      break;
    case "Classroom":
      SuggestionsComponent = (
        <ClassroomSuggestions onSelect={handleSuggestionSelect} />
      );
      break;
    default:
      SuggestionsComponent = null;
  }

  return (
    <>
      <View style={styles.container}>
        <View
          style={{ width: "100%", alignItems: "flex-start", marginBottom: 40 }}
        >
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <MaterialIcons
              name="arrow-back-ios-new"
              color={colors.PrimaryWhite}
              size={30}
            />
          </TouchableOpacity>
        </View>
        <Title color={colors.PrimaryWhite}>
          What's one goal that you want to accomplish?
        </Title>
        <View style={styles.goalInputContainer}>
          <TouchableOpacity
            onPress={() => setEmojiPickerVisible(true)}
            style={styles.emojiSelector}
          >
            <Title>{selectedEmoji ? selectedEmoji : "🎯"}</Title>
          </TouchableOpacity>
          <TextInput
            value={userGoal}
            onChangeText={setUserGoal}
            placeholder="Type your goal here"
            placeholderTextColor={colors.PrimaryWhite}
            style={styles.goalInput}
          />
        </View>
        <ActionButton
          type="PrimaryGray"
          title="Create Goal"
          onPress={() =>
            router.push({
              pathname: "/(authed)/(tabs)/(home)/goal/create/BibleVerseSelect",
              params: {
                goal: userGoal,
                emoji: selectedEmoji,
                verse: selectedVerse,
                verseText: selectedVerseText,
                category: selectedVerse ? activeSuggestionTab : "Custom",
              },
            })
          }
          disabled={userGoal.length === 0}
          icon={
            <FontAwesome6
              name="plus"
              size={20}
              color={
                userGoal.length === 0
                  ? colors.DisabledText
                  : colors.DarkPrimaryText
              }
            />
          }
        />
        <Paragraph
          style={{ marginTop: 10 }}
          color={colors.PrimaryGrayBackground}
        >
          Suggestions
        </Paragraph>
        {SuggestionsComponent}
      </View>

      {/* Emoji Selector Bottom Sheet */}
      <EmojiSelectorBottomSheet
        visible={isEmojiPickerVisible}
        onClose={() => setEmojiPickerVisible(false)}
        onEmojiSelected={onEmojiSelect}
        activeCharacter="Deborah" // You may want to pass the actual active character from your state
      />

      <View style={styles.suggestionsNavigator}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.tabContainer}
        >
          {suggestionTabs.map((tab, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.tab,
                activeSuggestionTab === tab && styles.activeTab,
              ]}
              onPress={() => handleTabPress(tab)}
            >
              <Text style={[styles.tabText]}>{tab}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </>
  );
}
