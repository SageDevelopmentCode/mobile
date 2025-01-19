import React, { useEffect } from "react";
import { useLocalSearchParams } from "expo-router";
import { useNavigation, useRouter } from "expo-router"; //
import { Animated, TextInput, TouchableOpacity, View } from "react-native";
import colors from "@/constants/colors";
import { MaterialIcons } from "@/utils/icons";
import { styles } from "./goal_create.styles";
import { tabBarOptions } from "@/constants/tabBarOptions";
import { Heading, Title } from "@/components/Text/TextComponents";

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
          <View style={styles.emojiSelector}>
            <Title>🎯</Title>
          </View>
          <TextInput
            placeholder="Type your goal here"
            placeholderTextColor={colors.PrimaryWhite}
            style={styles.goalInput}
          />
        </View>
      </View>
    </>
  );
}
