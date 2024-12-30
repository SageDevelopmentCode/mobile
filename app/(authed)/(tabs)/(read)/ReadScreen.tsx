import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";
import { useNavigation, useRouter } from "expo-router";
import { styles } from "./ReadScreen.styles";
import { Title } from "@/components/Text/TextComponents";
import colors from "@/constants/colors";

export default function ReadScreen() {
  const navigation = useNavigation();
  const router = useRouter();

  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const options = ["Option 1", "Option 2", "Option 3"];

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const selectOption = (option: string) => {
    setSelectedOption(option);
    setIsDropdownOpen(false);
  };

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.hero}>
        <View style={styles.version}>
          <Title color={colors.DarkPrimaryText}>Bible</Title>
          <TouchableOpacity
            style={styles.dropdownButton}
            onPress={toggleDropdown}
          >
            <Text style={styles.buttonText}>
              {selectedOption ? selectedOption : "Select an option"}
            </Text>
          </TouchableOpacity>
          {isDropdownOpen && (
            <View style={styles.dropdown}>
              <FlatList
                data={options}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.dropdownItem}
                    onPress={() => selectOption(item)}
                  >
                    <Text style={styles.dropdownItemText}>{item}</Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          )}
        </View>
      </View>
    </View>
  );
}
