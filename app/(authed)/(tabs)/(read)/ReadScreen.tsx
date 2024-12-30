import React, { useEffect } from "react";
import { View, Text } from "react-native";
import { useNavigation, useRouter } from "expo-router";

export default function ReadScreen() {
  const navigation = useNavigation();

  const router = useRouter();

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Hello Read</Text>
    </View>
  );
}
