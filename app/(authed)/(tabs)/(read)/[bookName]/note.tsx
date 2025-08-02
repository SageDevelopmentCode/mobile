import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { ButtonText, Heading } from "@/components/Text/TextComponents";
import { bookThemeColor } from "@/utils/data/bookThemeColor";
import { styles } from "./note.styles";
import { tabBarOptions } from "@/constants/tabBarOptions";
import { useAuth } from "@/context/AuthContext";
import { createUserBookNote } from "@/lib/supabase/db/user_book_notes";

interface Category {
  id: string;
  label: string;
  color: string;
}

export default function NoteScreen() {
  const navigation = useNavigation();
  const router = useRouter();
  const { session } = useAuth();
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
        tabBarStyle: {
          ...tabBarOptions.tabBarStyle,
          backgroundColor: "#282828",
        },
        tabBarActiveTintColor: resolvedThemeColor || "#888888",
      });
  }, [navigation, resolvedThemeColor]);

  const [noteText, setNoteText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isPrivate, setIsPrivate] = useState(true);
  const [customCategory, setCustomCategory] = useState("");
  const [isEditingCategory, setIsEditingCategory] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

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

  const handleSaveNote = async () => {
    if (!noteText.trim()) {
      Alert.alert("Note Required", "Please enter a note before saving.");
      return;
    }

    if (!session?.user?.id) {
      Alert.alert("Authentication Error", "Please log in to save notes.");
      return;
    }

    if (!bookName || !chapter || !verseId) {
      Alert.alert("Error", "Missing verse information. Please try again.");
      return;
    }

    setIsSaving(true);

    try {
      // Get the selected category label
      const selectedCategoryLabel = selectedCategory
        ? categories.find((cat) => cat.id === selectedCategory)?.label
        : undefined;

      // Create the note data
      const noteData = {
        user_id: session.user.id,
        book_name: bookName,
        chapter: parseInt(chapter),
        verse: parseInt(verseId),
        note_text: noteText.trim(),
        is_private: isPrivate,
        label: selectedCategoryLabel,
      };

      // Save to database
      await createUserBookNote(noteData);

      // Navigate back automatically after successful save
      router.back();
    } catch (error) {
      console.error("Error saving note:", error);
      Alert.alert(
        "Save Failed",
        "There was an error saving your note. Please try again.",
        [{ text: "OK" }]
      );
    } finally {
      setIsSaving(false);
    }
  };

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(selectedCategory === categoryId ? null : categoryId);
    setIsEditingCategory(false);
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
      setIsEditingCategory(false);
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

  const renderCategoryPill = (category: Category) => {
    const isSelected = selectedCategory === category.id;
    const backgroundColor = isSelected
      ? resolvedThemeColor
      : `${resolvedThemeColor}40`; // 25% opacity

    return (
      <TouchableOpacity
        key={category.id}
        style={[
          styles.categoryPill,
          {
            backgroundColor,
            borderColor: resolvedThemeColor,
            borderWidth: 1,
          },
        ]}
        onPress={() => handleCategorySelect(category.id)}
        activeOpacity={0.7}
      >
        <ButtonText
          style={[
            styles.categoryText,
            {
              color: isSelected ? "#1A1A1A" : "#FFFFFF",
            },
          ]}
        >
          {category.label}
        </ButtonText>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Heading style={styles.headerTitle}>Add Note</Heading>
        <TouchableOpacity
          onPress={handleSaveNote}
          style={[styles.saveButton, { opacity: isSaving ? 0.6 : 1 }]}
          disabled={isSaving}
        >
          {isSaving ? (
            <ActivityIndicator size="small" color={resolvedThemeColor} />
          ) : (
            <ButtonText
              style={[styles.saveText, { color: resolvedThemeColor }]}
            >
              Save
            </ButtonText>
          )}
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Verse Display */}
        <View style={styles.verseContainer}>
          <ButtonText
            style={[styles.verseReference, { color: resolvedThemeColor }]}
          >
            {bookName} {chapter}:{verseId}
          </ButtonText>
          <ButtonText style={styles.verseText}>{verseText}</ButtonText>
        </View>

        {/* Note Input */}
        <View style={styles.noteInputContainer}>
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
          <ButtonText style={styles.characterCount}>
            {noteText.length}/1000
          </ButtonText>
        </View>
      </ScrollView>

      {/* Bottom Categories and Actions */}
      <View style={styles.bottomContainer}>
        {/* Category Pills */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categoryScrollView}
          contentContainerStyle={styles.categoriesWrapper}
        >
          {/* Add Category Pill */}
          {isEditingCategory ? (
            <View style={[styles.categoryPill, styles.addCategoryInputPill]}>
              <TextInput
                style={styles.inlineCategoryInput}
                placeholder="Category name..."
                placeholderTextColor="#999999"
                value={customCategory}
                onChangeText={setCustomCategory}
                maxLength={15}
                autoFocus
                onSubmitEditing={() => {
                  if (customCategory.trim()) {
                    handleAddCustomCategory();
                  }
                  setIsEditingCategory(false);
                }}
                onBlur={() => {
                  if (customCategory.trim()) {
                    handleAddCustomCategory();
                  }
                  setIsEditingCategory(false);
                }}
              />
            </View>
          ) : (
            <TouchableOpacity
              style={[
                styles.categoryPill,
                styles.addCategoryPill,
                {
                  backgroundColor: `${resolvedThemeColor}40`,
                  borderColor: resolvedThemeColor,
                  borderWidth: 1,
                },
              ]}
              onPress={() => setIsEditingCategory(true)}
              activeOpacity={0.7}
            >
              <Ionicons name="add" size={16} color="#FFFFFF" />
              <ButtonText style={[styles.categoryText, { color: "#FFFFFF" }]}>
                Add Category
              </ButtonText>
            </TouchableOpacity>
          )}

          {categories.map(renderCategoryPill)}
        </ScrollView>

        {/* Action Buttons */}
        <View style={styles.actionButtonsRow}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={handleShareNote}
            activeOpacity={0.7}
          >
            <Ionicons name="share-outline" size={20} color="#FFFFFF" />
            <ButtonText style={styles.actionButtonText}>Share</ButtonText>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionButton}
            onPress={handleSeeOthersComments}
            activeOpacity={0.7}
          >
            <Ionicons name="chatbubbles-outline" size={20} color="#FFFFFF" />
            <ButtonText style={styles.actionButtonText}>See Others</ButtonText>
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
            <ButtonText
              style={[
                styles.actionButtonText,
                { color: isPrivate ? resolvedThemeColor : "#FFFFFF" },
              ]}
            >
              {isPrivate ? "Private" : "Public"}
            </ButtonText>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
