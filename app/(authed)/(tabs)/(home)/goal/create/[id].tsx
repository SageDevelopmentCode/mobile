import React, { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { useNavigation, useRouter } from "expo-router"; //
import {
  Animated,
  Button,
  Modal,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import colors from "@/constants/colors";
import { MaterialIcons } from "@/utils/icons";
import { styles } from "./goal_create.styles";
import { tabBarOptions } from "@/constants/tabBarOptions";
import { Paragraph, Title } from "@/components/Text/TextComponents";
import EmojiSelector from "react-native-emoji-selector";
import { GoalItem } from "@/components/Goal/GoalItem";
import { SuggestionItem } from "@/components/Suggestion/SuggestionItem";
import ActionButton from "@/components/Buttons/ActionButtons/ActionButtons";
import { ScriptureSuggestions } from "@/components/Suggestion/Scripture/ScriptureSuggestion";
import { WorkplaceSuggestions } from "@/components/Suggestion/Workplace/WorkplaceSuggestions";
import { LifestyleSuggestions } from "@/components/Suggestion/Lifestyle/LifestyleSuggestion";
import { LearnSuggestions } from "@/components/Suggestion/Learn/LearnSuggestion";
import { KindnessSuggestions } from "@/components/Suggestion/Kindness/KindnessSuggestion";
import { CommunitySuggestions } from "@/components/Suggestion/Community/CommunitySuggestion";
import { ClassroomSuggestions } from "@/components/Suggestion/Classroom/ClassroomSuggestion";

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

  const { id } = useLocalSearchParams();
  const [isEmojiPickerVisible, setEmojiPickerVisible] =
    useState<boolean>(false);
  const [selectedEmoji, setSelectedEmoji] = useState<string>("");
  const [userGoal, setUserGoal] = useState<string>("");
  const [activeSuggestionTab, setActiveSuggestionTab] = useState<string>(
    suggestionTabs[0]
  );

  const handleTabPress = (tab: string): void => {
    setActiveSuggestionTab(tab);
  };

  console.log("activeSuggestionTab: ", activeSuggestionTab);

  const onEmojiSelect = (emoji: string): void => {
    setSelectedEmoji(emoji);
    setEmojiPickerVisible(false); // Close picker after selection
  };

  let SuggestionsComponent: JSX.Element | null;

  switch (activeSuggestionTab) {
    case "Scripture":
      SuggestionsComponent = <ScriptureSuggestions />;
      break;
    case "Workplace":
      SuggestionsComponent = <WorkplaceSuggestions />;
      break;
    case "Lifestyle":
      SuggestionsComponent = <LifestyleSuggestions />;
      break;
    case "Learn":
      SuggestionsComponent = <LearnSuggestions />;
      break;
    case "Kindness":
      SuggestionsComponent = <KindnessSuggestions />;
      break;
    case "Community":
      SuggestionsComponent = <CommunitySuggestions />;
      break;
    case "Classroom":
      SuggestionsComponent = <ClassroomSuggestions />;
      break;
    default:
      SuggestionsComponent = null;
  }

  console.log("id: ", id);
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
          title="Save"
          onPress={() => console.log("Hello")}
          disabled={userGoal.length === 0}
        />
        <Paragraph
          style={{ marginTop: 10 }}
          color={colors.PrimaryGrayBackground}
        >
          Suggestions
        </Paragraph>
        {SuggestionsComponent}
      </View>

      <Modal
        visible={isEmojiPickerVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setEmojiPickerVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.pickerContainer}>
            <Button
              title="Close"
              onPress={() => setEmojiPickerVisible(false)}
            />
            <EmojiSelector onEmojiSelected={onEmojiSelect} />
          </View>
        </View>
      </Modal>
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
