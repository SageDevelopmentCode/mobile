import React, { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { useNavigation, useRouter } from "expo-router"; //
import {
  Animated,
  Button,
  Modal,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import colors from "@/constants/colors";
import { MaterialIcons } from "@/utils/icons";
import { styles } from "./goal_create.styles";
import { tabBarOptions } from "@/constants/tabBarOptions";
import { Heading, Title } from "@/components/Text/TextComponents";
import EmojiSelector from "react-native-emoji-selector";

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
            placeholder="Type your goal here"
            placeholderTextColor={colors.PrimaryWhite}
            style={styles.goalInput}
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
    </>
  );
}
