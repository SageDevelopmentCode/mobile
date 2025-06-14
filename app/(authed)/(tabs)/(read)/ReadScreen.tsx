import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  TextInput,
  Alert,
  ScrollView,
  Dimensions,
  Image,
  ImageBackground,
} from "react-native";
import { useNavigation, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "./ReadScreen.styles";
import colors from "@/constants/colors";

// Import Psalms image
import PsalmsImage from "../../../../assets/images/books/Psalms.png";
import {
  ButtonText,
  Heading,
  Paragraph,
  SubHeading,
} from "@/components/Text/TextComponents";

const { height } = Dimensions.get("window");

interface QuickReadItem {
  id: number;
  bookName: string;
  verse: string;
  category: string;
  categoryIcon: string;
  borderColor: string;
}

export default function ReadScreen() {
  // Quick Read stories data
  const quickReadStories: QuickReadItem[] = [
    {
      id: 1,
      bookName: "JOHN",
      verse: "John 4:25-30",
      category: "Love",
      categoryIcon: "heart",
      borderColor: "#FF6B6B", // Red
    },
    {
      id: 2,
      bookName: "RUTH",
      verse: "Ruth 2:8-12",
      category: "Work",
      categoryIcon: "hammer",
      borderColor: "#FF9500", // Orange
    },
    {
      id: 3,
      bookName: "GENESIS",
      verse: "Genesis 1:1-5",
      category: "Love",
      categoryIcon: "heart",
      borderColor: "#8B5FBF", // Purple
    },
    {
      id: 4,
      bookName: "PROVERBS",
      verse: "Proverbs 3:5-6",
      category: "Love",
      categoryIcon: "heart",
      borderColor: "#FFB800", // Yellow/Gold
    },
    {
      id: 5,
      bookName: "PSALMS",
      verse: "Psalms 23:1-4",
      category: "Faith",
      categoryIcon: "star",
      borderColor: "#34C759", // Green
    },
    {
      id: 6,
      bookName: "MATTHEW",
      verse: "Matthew 5:3-8",
      category: "Hope",
      categoryIcon: "sunny",
      borderColor: "#007AFF", // Blue
    },
    {
      id: 7,
      bookName: "ROMANS",
      verse: "Romans 8:28-30",
      category: "Peace",
      categoryIcon: "leaf",
      borderColor: "#FF3B30", // Red variant
    },
    {
      id: 8,
      bookName: "JAMES",
      verse: "James 1:2-4",
      category: "Joy",
      categoryIcon: "happy",
      borderColor: "#AF52DE", // Purple variant
    },
  ];

  const renderQuickReadItem = ({ item }: { item: QuickReadItem }) => (
    <TouchableOpacity style={styles.quickReadCard}>
      <View style={[styles.quickReadCircle, { borderColor: item.borderColor }]}>
        <ImageBackground
          source={PsalmsImage}
          style={styles.quickReadImageBackground}
          imageStyle={styles.quickReadImage}
        />
      </View>
      <Paragraph
        style={styles.quickReadVerse}
        numberOfLines={1}
        ellipsizeMode="tail"
      >
        {item.verse}
      </Paragraph>
      <View style={styles.quickReadCategory}>
        <Ionicons name={item.categoryIcon as any} size={14} color="#FF6B6B" />
        <ButtonText style={styles.quickReadCategoryText}>
          {item.category}
        </ButtonText>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Search Icon in top left */}
      <TouchableOpacity style={styles.searchIconContainer}>
        <Ionicons name="search" size={24} color="#FFFFFF" />
      </TouchableOpacity>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Quick Read Section */}
        <View style={styles.quickReadSection}>
          <SubHeading style={styles.quickReadTitle}>Quick Read</SubHeading>
          <FlatList
            data={quickReadStories}
            renderItem={renderQuickReadItem}
            keyExtractor={(item) => item.id.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.quickReadList}
          />
        </View>

        {/* Content Section */}
        <View style={styles.contentSection}>
          {/* Add more content here as needed */}
          {/* Everything will scroll as one unit */}
        </View>
      </ScrollView>
    </View>
  );
}
