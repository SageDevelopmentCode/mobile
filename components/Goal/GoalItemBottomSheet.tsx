import React, { useEffect, useRef, useState } from "react";
import {
  Modal,
  View,
  TouchableOpacity,
  StyleSheet,
  Animated,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { Heading, StatText, ButtonText } from "../Text/TextComponents";
import colors from "@/constants/colors";
import {
  FontAwesome6,
  Ionicons,
  MaterialIcons,
  FontAwesome,
} from "@expo/vector-icons";
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
  State,
  GestureHandlerRootView,
} from "react-native-gesture-handler";

// Define available colors for goals
const goalColors = [
  "#FFB682", // Peach/Orange (from image)
  "#C180FF", // Purple (from image)
  "#78CBFF", // Light Blue (from image)
  "#7EFFB0", // Mint Green (from image)
  "#FF8F8F", // Coral/Pink (from image)
  "#F8F37D", // Yellow (from image)
];

type GoalItemBottomSheetProps = {
  visible: boolean;
  onClose: () => void;
  emoji?: string;
  title?: string;
  description?: string;
  energyCount?: number;
  onSkip: () => void;
  onComplete: () => void;
  onSnooze: () => void;
  onEdit?: () => void;
  onReset?: () => void;
  onColorChange?: (color: string) => void; // Add handler for color change
  customColor?: string; // Add prop for current custom color
  activeCharacter: string;
  related_verse?: string;
  goal_repeat?: string;
  energy_count?: number;
  experience_reward?: number;
  category?: string;
  isMissed?: boolean;
};

export const GoalItemBottomSheet = ({
  visible,
  onClose,
  emoji,
  title,
  description,
  energyCount = 2,
  onSkip,
  onComplete,
  onSnooze,
  onEdit,
  onReset,
  onColorChange,
  customColor,
  activeCharacter,
  related_verse,
  goal_repeat,
  energy_count,
  experience_reward,
  category,
  isMissed = false,
}: GoalItemBottomSheetProps) => {
  const isDeborah = activeCharacter === "Deborah";
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(300)).current;
  const [modalVisible, setModalVisible] = useState(visible);
  const panY = useRef(new Animated.Value(0)).current;
  const [colorPickerVisible, setColorPickerVisible] = useState(false);

  // Function to reset the pan position when the modal is shown
  const resetPanPosition = () => {
    panY.setValue(0);
  };

  const closeWithAnimation = () => {
    // Fade out overlay and slide down sheet
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 300,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => {
      // Only hide the modal after animation completes
      setModalVisible(false);
      onClose();
      resetPanPosition();
    });
  };

  useEffect(() => {
    if (visible) {
      // Show modal immediately when requested
      setModalVisible(true);
      resetPanPosition();

      // Fade in overlay and slide up sheet
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    } else if (modalVisible) {
      // If we're closing the modal, don't immediately set modalVisible to false
      // Instead, let closeWithAnimation handle it after animation completes
      closeWithAnimation();
    }
  }, [visible]);

  const handleOverlayPress = () => {
    closeWithAnimation();
  };

  const handleActionPress = (action: () => void) => {
    action();
    closeWithAnimation();
  };

  const handleEditPress = () => {
    if (onEdit) {
      onEdit();
      closeWithAnimation();
    }
  };

  const handleColorPress = (color: string) => {
    if (onColorChange) {
      onColorChange(color);
      setColorPickerVisible(false);
    }
  };

  // Modified gesture event to only allow downward movement
  const onGestureEvent = Animated.event(
    [{ nativeEvent: { translationY: panY } }],
    {
      useNativeDriver: true,
      listener: (event: any) => {
        // Prevent upward movement by resetting panY to 0 if translationY is negative
        const { translationY } = event.nativeEvent;
        if (translationY < 0) {
          panY.setValue(0);
        }
      },
    }
  );

  // Handle when the gesture ends
  const onHandlerStateChange = (event: PanGestureHandlerGestureEvent) => {
    if (event.nativeEvent.state === State.END) {
      const { translationY } = event.nativeEvent;

      // If user has swiped down more than 50 pixels, close the sheet
      if (translationY > 50) {
        closeWithAnimation();
      } else {
        // If not, snap back to original position
        Animated.spring(panY, {
          toValue: 0,
          useNativeDriver: true,
          bounciness: 5,
        }).start();
      }
    }
  };

  // Combine both the slideAnim and panY for the sheet's translation
  const translateY = Animated.add(slideAnim, panY);

  return (
    <Modal
      transparent
      visible={modalVisible}
      animationType="none"
      onRequestClose={closeWithAnimation}
    >
      <Animated.View
        style={[
          styles.overlay,
          {
            opacity: fadeAnim,
          },
        ]}
      >
        <TouchableOpacity
          style={styles.overlayTouchable}
          activeOpacity={1}
          onPress={handleOverlayPress}
        />

        <GestureHandlerRootView style={{ flex: 0 }}>
          <PanGestureHandler
            onGestureEvent={onGestureEvent}
            onHandlerStateChange={onHandlerStateChange}
          >
            <Animated.View
              style={[
                styles.bottomSheet,
                {
                  backgroundColor: isDeborah
                    ? colors.DarkPurpleBackground
                    : colors.GabrielBackground,
                  transform: [{ translateY }],
                },
              ]}
            >
              {/* Swipe indicator bar */}
              <View style={styles.swipeIndicator} />

              {/* Book emoji container */}
              <View style={styles.emojiContainer}>
                <Heading style={styles.emoji}>{emoji}</Heading>
              </View>

              {/* Devotional title */}
              <Heading color={colors.PrimaryWhite} style={styles.title}>
                {title}
              </Heading>

              {/* Related Verse */}
              {related_verse && (
                <View style={styles.verseContainer}>
                  <FontAwesome
                    name="book"
                    size={16}
                    color="#AAAAAA"
                    style={styles.verseIcon}
                  />
                  <StatText color="#AAAAAA" style={styles.verse}>
                    {related_verse}
                  </StatText>
                </View>
              )}

              {/* Read Today's Devotional text */}
              <StatText color="#AAAAAA" style={styles.description}>
                {description}
              </StatText>

              {/* Energy count */}
              <View style={styles.energyContainer}>
                <FontAwesome6
                  name="bolt"
                  size={16}
                  color={colors.EnergyColor}
                  style={{ marginRight: 4 }}
                />
                <StatText color={colors.EnergyColor}>{energyCount}</StatText>
              </View>

              {/* Color Picker */}
              {!isMissed && (
                <View style={styles.colorPickerContainer}>
                  <TouchableOpacity
                    style={styles.colorPickerButton}
                    onPress={() => setColorPickerVisible(!colorPickerVisible)}
                  >
                    <View style={styles.colorButtonContainer}>
                      <FontAwesome6 name="palette" size={16} color="#FFFFFF" />
                      <ButtonText
                        color={colors.PrimaryWhite}
                        style={{ marginLeft: 8 }}
                      >
                        Customize Background
                      </ButtonText>
                    </View>
                  </TouchableOpacity>

                  {colorPickerVisible && (
                    <ScrollView
                      horizontal
                      showsHorizontalScrollIndicator={false}
                      contentContainerStyle={
                        styles.colorSwatchesContentContainer
                      }
                      style={styles.colorSwatchesContainer}
                    >
                      {goalColors.map((color, index) => (
                        <TouchableOpacity
                          key={index}
                          style={[
                            styles.colorSwatch,
                            { backgroundColor: color },
                            customColor === color && styles.selectedColorSwatch,
                          ]}
                          onPress={() => handleColorPress(color)}
                        >
                          {customColor === color && (
                            <FontAwesome6
                              name="check"
                              size={16}
                              color="#FFFFFF"
                            />
                          )}
                        </TouchableOpacity>
                      ))}
                    </ScrollView>
                  )}
                </View>
              )}

              {/* Action buttons */}
              {isMissed ? (
                // Show only Reset button for missed goals
                <View style={styles.resetButtonContainer}>
                  <TouchableOpacity
                    style={styles.resetButton}
                    onPress={() => handleActionPress(onReset!)}
                  >
                    <View
                      style={[
                        styles.resetIconContainer,
                        { backgroundColor: "rgba(255, 100, 100, 0.15)" },
                      ]}
                    >
                      <FontAwesome6 name="rotate" size={24} color="#FF6464" />
                    </View>
                    <ButtonText color={colors.PrimaryWhite}>
                      Reset Goal
                    </ButtonText>
                  </TouchableOpacity>
                </View>
              ) : (
                // Show regular action buttons for normal goals
                <View style={styles.buttonContainer}>
                  {/* Skip button */}
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => handleActionPress(onSkip)}
                  >
                    <View style={styles.iconContainer}>
                      <FontAwesome6
                        name="forward-fast"
                        size={24}
                        color="#D95858"
                      />
                    </View>
                    <ButtonText color={colors.PrimaryWhite}>Skip</ButtonText>
                  </TouchableOpacity>

                  {/* Complete button */}
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => handleActionPress(onComplete)}
                  >
                    <View
                      style={[
                        styles.iconContainer,
                        { backgroundColor: "rgba(103, 205, 149, 0.15)" },
                      ]}
                    >
                      <FontAwesome6 name="play" size={24} color="#67CD95" />
                    </View>
                    <ButtonText color={colors.PrimaryWhite}>
                      Complete
                    </ButtonText>
                  </TouchableOpacity>

                  {/* Snooze button */}
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => handleActionPress(onSnooze)}
                  >
                    <View style={styles.iconContainer}>
                      <Ionicons
                        name="calendar-outline"
                        size={24}
                        color="#5878D9"
                      />
                    </View>
                    <ButtonText color={colors.PrimaryWhite}>Snooze</ButtonText>
                  </TouchableOpacity>
                </View>
              )}

              {/* Edit button */}
              <TouchableOpacity
                style={styles.editButton}
                onPress={handleEditPress}
              >
                <FontAwesome
                  name="pencil"
                  size={20}
                  color={colors.PrimaryWhite}
                />
              </TouchableOpacity>

              {/* Close button */}
              <TouchableOpacity
                style={styles.closeButton}
                onPress={closeWithAnimation}
              >
                <Ionicons name="close" size={24} color={colors.PrimaryWhite} />
              </TouchableOpacity>
            </Animated.View>
          </PanGestureHandler>
        </GestureHandlerRootView>
      </Animated.View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    justifyContent: "flex-end",
  },
  overlayTouchable: {
    flex: 1,
  },
  bottomSheet: {
    width: "100%",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 24,
    paddingVertical: 32,
    alignItems: "center",
  },
  swipeIndicator: {
    width: 40,
    height: 5,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    borderRadius: 5,
    marginBottom: 16,
    position: "absolute",
    top: 10,
    alignSelf: "center",
  },
  emojiContainer: {
    width: 60,
    height: 60,
    borderRadius: 8,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
    marginTop: 10,
  },
  emoji: {
    fontSize: 28,
  },
  title: {
    fontSize: 24,
    textAlign: "center",
    marginBottom: 8,
  },
  description: {
    textAlign: "center",
    marginBottom: 20,
  },
  energyContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    backgroundColor: "rgba(255, 204, 0, 0.15)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  colorPickerContainer: {
    width: "100%",
    marginBottom: 16,
    alignItems: "center",
  },
  colorPickerButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
  colorButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
  },
  colorSwatchesContainer: {
    marginTop: 12,
    paddingHorizontal: 4,
    maxWidth: "100%",
  },
  colorSwatchesContentContainer: {
    paddingVertical: 4,
    alignItems: "center",
  },
  colorSwatch: {
    width: 34,
    height: 34,
    borderRadius: 17,
    marginHorizontal: 8,
    borderWidth: 2,
    borderColor: "rgba(255, 255, 255, 0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  selectedColorSwatch: {
    borderColor: "#FFFFFF",
    borderWidth: 2,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 10,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    width: "30%",
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 8,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  closeButton: {
    position: "absolute",
    top: 20,
    right: 20,
    width: 40,
    height: 40,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  editButton: {
    position: "absolute",
    top: 20,
    right: 70, // Position it to the left of the close button
    width: 40,
    height: 40,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  verseContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    alignSelf: "center",
    maxWidth: "90%",
  },
  verseIcon: {
    marginRight: 8,
  },
  verse: {
    fontSize: 14,
    fontStyle: "italic",
    textAlign: "center",
  },
  // New styles for reset button
  resetButtonContainer: {
    width: "100%",
    alignItems: "center",
    marginBottom: 10,
  },
  resetButton: {
    alignItems: "center",
    justifyContent: "center",
    width: "50%",
  },
  resetIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 8,
    backgroundColor: "rgba(255, 100, 100, 0.15)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
});
