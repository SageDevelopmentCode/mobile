import React, { useEffect, useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { useNavigation, useRouter } from "expo-router";
import {
  Image,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { tabBarOptions } from "@/constants/tabBarOptions";
import { useSearchParams } from "expo-router/build/hooks";
import { FontAwesome6 } from "@/utils/icons";
import ActionButton from "@/components/Buttons/ActionButtons/ActionButtons";
import colors from "@/constants/colors";
import { styles } from "./create_success.styles";
import Background from "../../assets/Background.jpg";
import Deborah from "../../../assets/Deborah.png";
import {
  ButtonText,
  Heading,
  Paragraph,
  SubHeading,
  Title,
} from "@/components/Text/TextComponents";
import { SuggestionItem } from "@/components/Suggestion";

export default function CreateGoalSuccessScreen() {
  const navigation = useNavigation();
  const searchParams = useSearchParams();
  const goal: any = searchParams.get("goal");
  const emoji: any = searchParams.get("emoji");

  console.log("goal", goal);
  console.log("emoji", emoji);

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

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <View style={styles.contentContainer}>
          <Heading color={colors.PrimaryWhite} style={{ marginBottom: 10 }}>
            Your goal has been created! 🥳
          </Heading>
          <SuggestionItem
            title={goal}
            onPress={() => console.log("Verse you created")}
            emoji={emoji}
            style={{ shadowColor: colors.PrimarySecondaryPurpleDropShadow }}
          />
          <TouchableOpacity>
            <View style={[styles.actionContainer, { marginTop: 10 }]}>
              <SubHeading color={colors.PrimaryWhite}>Today</SubHeading>
              <FontAwesome6
                name="pencil"
                size={20}
                color={colors.PrimaryWhite}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View style={styles.actionContainer}>
              <SubHeading color={colors.PrimaryWhite}>
                Does not repeat
              </SubHeading>
              <FontAwesome6
                name="pencil"
                size={20}
                color={colors.PrimaryWhite}
              />
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.contentContainer}>
          <TouchableOpacity
            style={{ marginVertical: 10 }}
            onPress={() => console.log("Share")}
          >
            <Paragraph color={colors.PrimaryWhite}>
              Share with your friends
            </Paragraph>
          </TouchableOpacity>

          <ActionButton
            type="PrimaryGray"
            title="Done"
            onPress={() =>
              router.push({
                pathname: "/(authed)/(tabs)/(home)/HomeScreen",
                params: {
                  goal: goal,
                  emoji: emoji,
                },
              })
            }
            icon={
              <FontAwesome6
                name="check"
                size={20}
                color={colors.DarkPrimaryText}
              />
            }
          />
        </View>
      </View>
      <ImageBackground
        source={Background}
        style={styles.imageBackground}
        resizeMode="cover"
      >
        <Image source={Deborah} style={styles.character} resizeMode="contain" />
      </ImageBackground>
    </View>
  );
}
