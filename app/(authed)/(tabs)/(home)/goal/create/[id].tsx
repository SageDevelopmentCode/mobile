import React, { useEffect } from "react";
import { useLocalSearchParams } from "expo-router";
import { useNavigation, useRouter } from "expo-router"; //
import { Animated, TouchableOpacity, View } from "react-native";
import colors from "@/constants/colors";
import { MaterialIcons } from "@/utils/icons";
import { styles } from "./goal_create.styles";

export default function PlaygroundScreen() {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  const { id } = useLocalSearchParams();

  console.log("id: ", id);
  return (
    <>
      <View style={styles.container}>
        <View style={styles.topSection}>
          <View style={{ width: "100%", alignItems: "flex-start" }}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <MaterialIcons
                name="arrow-back-ios-new"
                color={colors.PrimaryWhite}
                size={25}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </>
  );
}
