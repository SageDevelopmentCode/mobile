import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  TextInput,
} from "react-native";
import { useNavigation, useRouter } from "expo-router";
import { styles } from "./ReadScreen.styles";
import { ButtonText, Title } from "@/components/Text/TextComponents";
import colors from "@/constants/colors";
import { FontAwesome5 } from "@/utils/icons";

export default function ReadScreen() {
  const navigation = useNavigation();
  const router = useRouter();
  const options = ["NIV", "ESV", "KJV"];

  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

  const [selectedOption, setSelectedOption] = useState<string | null>(
    options[0]
  );

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
          <Title color={colors.BrownPrimaryText}>Bible</Title>
          <TouchableOpacity
            style={styles.dropdownButton}
            onPress={toggleDropdown}
          >
            <ButtonText color={colors.BrownPrimaryText}>
              {selectedOption}
            </ButtonText>
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
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            alignItems: "center", // Ensures vertical alignment
            marginTop: 20, // Added margin here instead of inside searchBar
          }}
        >
          <FontAwesome5
            style={{
              marginRight: 10,
            }}
            name="search"
            size={25}
            color={colors.DarkPrimaryText}
          />
          <TextInput
            style={styles.searchBar}
            placeholder="Search book"
            placeholderTextColor={colors.GrayText}
          ></TextInput>
        </View>
      </View>
    </View>
  );
}
