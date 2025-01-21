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
import {
  Heading,
  Paragraph,
  StatText,
  Title,
} from "@/components/Text/TextComponents";
import EmojiSelector from "react-native-emoji-selector";
import { GoalItem } from "@/components/Goal/GoalItem";
import { SuggestionItem } from "@/components/Suggestion/SuggestionItem";
import ActionButton from "@/components/Buttons/ActionButtons/ActionButtons";

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

  const { id } = useLocalSearchParams();
  const [isEmojiPickerVisible, setEmojiPickerVisible] =
    useState<boolean>(false);
  const [selectedEmoji, setSelectedEmoji] = useState<string>("");
  const [userGoal, setUserGoal] = useState<string>("");
  const [activeSuggestionTab, setActiveSuggestionTab] = useState<number>(0);

  const suggestionTabs: string[] = [
    "Scripture",
    "Workplace",
    "Classroom",
    "Kindness",
    "Community",
    "Lifestyle",
    "Learn",
  ];

  const handleTabPress = (index: number): void => {
    setActiveSuggestionTab(index);
  };

  const onEmojiSelect = (emoji: string): void => {
    setSelectedEmoji(emoji);
    setEmojiPickerVisible(false); // Close picker after selection
  };

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
        <View style={styles.suggestionsContainer}>
          <SuggestionItem
            title="Read a Verse"
            onPress={() => console.log("Read a Verse")}
            emoji="📖"
          />
          <SuggestionItem
            title="Read a Verse"
            onPress={() => console.log("Read a Verse")}
            emoji="📖"
          />
          <SuggestionItem
            title="Read a Verse"
            onPress={() => console.log("Read a Verse")}
            emoji="📖"
          />
        </View>
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
                activeSuggestionTab === index && styles.activeTab,
              ]}
              onPress={() => setActiveSuggestionTab(index)}
            >
              <Text style={[styles.tabText]}>{tab}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </>
  );
}
