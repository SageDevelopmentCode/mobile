import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  TextInput,
  Alert,
  ScrollView,
} from "react-native";
import { useNavigation, useRouter } from "expo-router";
import { styles } from "./ReadScreen.styles";
export default function ReadScreen() {
  return (
    <View style={styles.container}>
      <Text>Hello</Text>
    </View>
  );
}
