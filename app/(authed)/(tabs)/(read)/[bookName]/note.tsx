import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Alert,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { ButtonText, Heading } from "@/components/Text/TextComponents";
import { bookThemeColor } from "@/utils/data/bookThemeColor";
import { styles } from "./note.styles";

interface Category {
  id: string;
  label: string;
  color: string;
}

export default function NoteScreen() {
  const router = useRouter();
  const { bookName, chapter, verseId, verseText, themeColor } =
    useLocalSearchParams<{
      bookName: string;
      chapter: string;
      verseId: string;
      verseText: string;
      themeColor?: string;
    }>();

  // Get theme color from bookThemeColor.ts if not provided in params
  const resolvedThemeColor =
    themeColor ||
    (bookName
      ? bookThemeColor[bookName as keyof typeof bookThemeColor] || "#888888"
      : "#888888");

  const [noteText, setNoteText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isPrivate, setIsPrivate] = useState(true);
  const [customCategory, setCustomCategory] = useState("");
  const [showCustomInput, setShowCustomInput] = useState(false);

  // Default categories
  const defaultCategories: Category[] = [
    { id: "encouragement", label: "Encouragement", color: "#4ECDC4" },
    { id: "obedience", label: "Obedience", color: "#95E1D3" },
    { id: "sin", label: "Sin", color: "#F38BA8" },
    { id: "wisdom", label: "Wisdom", color: "#FFE066" },
    { id: "prayer", label: "Prayer", color: "#C77DFF" },
    { id: "gratitude", label: "Gratitude", color: "#FFB347" },
  ];

  const [categories, setCategories] = useState<Category[]>(defaultCategories);

  const handleBack = () => {
    router.back();
  };

  const handleSaveNote = () => {
    if (!noteText.trim()) {
      Alert.alert("Note Required", "Please enter a note before saving.");
      return;
    }

    // TODO: Implement actual save functionality
    console.log("Saving note:", {
      bookName,
      chapter,
      verseId,
      noteText,
      selectedCategory,
      isPrivate,
    });

    Alert.alert("Note Saved", "Your note has been saved successfully!", [
      { text: "OK", onPress: () => router.back() },
    ]);
  };

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(selectedCategory === categoryId ? null : categoryId);
    setShowCustomInput(false);
  };

  const handleCustomCategoryPress = () => {
    setShowCustomInput(!showCustomInput);
    setSelectedCategory(null);
  };

  const handleAddCustomCategory = () => {
    if (customCategory.trim()) {
      const newCategory: Category = {
        id: `custom-${Date.now()}`,
        label: customCategory.trim(),
        color: resolvedThemeColor,
      };
      setCategories([...categories, newCategory]);
      setSelectedCategory(newCategory.id);
      setCustomCategory("");
      setShowCustomInput(false);
    }
  };

  const handleShareNote = () => {
    // TODO: Implement share functionality
    console.log("Sharing note for verse:", `${bookName} ${chapter}:${verseId}`);
    Alert.alert("Share", "Share functionality coming soon!");
  };

  const handleSeeOthersComments = () => {
    // TODO: Implement community comments functionality
    console.log(
      "See others' comments for verse:",
      `${bookName} ${chapter}:${verseId}`
    );
    Alert.alert("Community", "Community comments coming soon!");
  };

  const togglePrivacy = () => {
    setIsPrivate(!isPrivate);
  };

  const renderCategoryPill = (category: Category) => (
    <TouchableOpacity
      key={category.id}
      style={[
        styles.categoryPill,
        {
          backgroundColor:
            selectedCategory === category.id ? category.color : "transparent",
          borderColor: category.color,
        },
      ]}
      onPress={() => handleCategorySelect(category.id)}
      activeOpacity={0.7}
    >
      <Text
        style={[
          styles.categoryText,
          {
            color:
              selectedCategory === category.id ? "#1A1A1A" : category.color,
          },
        ]}
      >
        {category.label}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Heading style={styles.headerTitle}>Add Note</Heading>
        <TouchableOpacity onPress={handleSaveNote} style={styles.saveButton}>
          <ButtonText style={[styles.saveText, { color: resolvedThemeColor }]}>
            Save
          </ButtonText>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Verse Display */}
        <View style={styles.verseContainer}>
          <Text style={[styles.verseReference, { color: resolvedThemeColor }]}>
            {bookName} {chapter}:{verseId}
          </Text>
          <Text style={styles.verseText}>{verseText}</Text>
        </View>

        {/* Note Input */}
        <View style={styles.noteInputContainer}>
          <Text style={styles.inputLabel}>Your Note</Text>
          <TextInput
            style={styles.noteInput}
            placeholder="Write your thoughts, insights, or reflections..."
            placeholderTextColor="#666666"
            multiline
            textAlignVertical="top"
            value={noteText}
            onChangeText={setNoteText}
            maxLength={1000}
          />
          <Text style={styles.characterCount}>{noteText.length}/1000</Text>
        </View>

        {/* Category Selection */}
        <View style={styles.categoryContainer}>
          <Text style={styles.sectionTitle}>Category</Text>
          <View style={styles.categoriesWrapper}>
            {categories.map(renderCategoryPill)}
            <TouchableOpacity
              style={[
                styles.categoryPill,
                styles.addCategoryPill,
                { borderColor: resolvedThemeColor },
              ]}
              onPress={handleCustomCategoryPress}
              activeOpacity={0.7}
            >
              <Ionicons name="add" size={16} color={resolvedThemeColor} />
              <Text
                style={[styles.categoryText, { color: resolvedThemeColor }]}
              >
                Add Custom
              </Text>
            </TouchableOpacity>
          </View>

          {/* Custom Category Input */}
          {showCustomInput && (
            <View style={styles.customCategoryContainer}>
              <TextInput
                style={styles.customCategoryInput}
                placeholder="Enter custom category..."
                placeholderTextColor="#666666"
                value={customCategory}
                onChangeText={setCustomCategory}
                maxLength={20}
              />
              <TouchableOpacity
                style={[
                  styles.addButton,
                  { backgroundColor: resolvedThemeColor },
                ]}
                onPress={handleAddCustomCategory}
              >
                <Text style={styles.addButtonText}>Add</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </ScrollView>

      {/* Bottom Action Buttons */}
      <View style={styles.bottomActions}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={handleShareNote}
          activeOpacity={0.7}
        >
          <Ionicons name="share-outline" size={20} color="#FFFFFF" />
          <Text style={styles.actionButtonText}>Share</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionButton}
          onPress={handleSeeOthersComments}
          activeOpacity={0.7}
        >
          <Ionicons name="chatbubbles-outline" size={20} color="#FFFFFF" />
          <Text style={styles.actionButtonText}>See Others</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionButton}
          onPress={togglePrivacy}
          activeOpacity={0.7}
        >
          <Ionicons
            name={isPrivate ? "lock-closed" : "globe-outline"}
            size={20}
            color={isPrivate ? resolvedThemeColor : "#FFFFFF"}
          />
          <Text
            style={[
              styles.actionButtonText,
              { color: isPrivate ? resolvedThemeColor : "#FFFFFF" },
            ]}
          >
            {isPrivate ? "Private" : "Public"}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
