import React, { useEffect, useRef, useState } from "react";
import {
  Modal,
  View,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Switch,
  Text,
  ActivityIndicator,
} from "react-native";
import {
  Heading,
  Paragraph,
  StatText,
  ButtonText,
} from "../Text/TextComponents";
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
import { useRouter } from "expo-router";

type SkippedGoalBottomSheetProps = {
  visible: boolean;
  onClose: () => void;
  emoji?: string;
  title?: string;
  onUndo?: () => void;
  onDone?: () => void;
  activeCharacter: string;
  isLoading?: boolean;
  goalId?: string;
};

export const SkippedGoalBottomSheet = ({
  visible,
  onClose,
  emoji = "🪁", // Default emoji if none provided
  title = "Goal",
  onUndo,
  onDone,
  activeCharacter,
  isLoading = false,
  goalId,
}: SkippedGoalBottomSheetProps) => {
  const router = useRouter();
  const isDeborah = activeCharacter === "Deborah";
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(300)).current;
  const [modalVisible, setModalVisible] = useState(visible);
  const panY = useRef(new Animated.Value(0)).current;
  const [isSnoozeEnabled, setIsSnoozeEnabled] = useState(false);

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

  const handleUndoPress = () => {
    if (onUndo) {
      onUndo();
    }
    closeWithAnimation();
  };

  const handleDonePress = () => {
    if (onDone) {
      onDone();
    }
    closeWithAnimation();
  };

  const navigateToGoalReflection = () => {
    closeWithAnimation();
    // Navigate to the GoalReflection screen with all the goal data
    router.push({
      pathname: "/(authed)/(tabs)/(home)/goal/reflection",
      params: {
        goalId,
        title,
        emoji,
        activeCharacter,
        reflectionType: "skipped",
      },
    });
  };

  const toggleSnooze = () => {
    setIsSnoozeEnabled((previousState) => !previousState);
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

  const primaryColor = isDeborah
    ? colors.PrimaryPurpleBackground
    : colors.SolaraGreen;
  const backgroundColor = isDeborah
    ? colors.DarkPurpleBackground
    : colors.GabrielBackground;
  const grayTextColor = "#AAAAAA"; // Use explicit color instead of colors.LightGrayText

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
                  backgroundColor,
                  transform: [{ translateY }],
                },
              ]}
            >
              {/* Close button */}
              <TouchableOpacity
                style={styles.closeButton}
                onPress={closeWithAnimation}
              >
                <Ionicons name="close" size={24} color={colors.PrimaryWhite} />
              </TouchableOpacity>

              {/* Swipe indicator bar */}
              <View style={styles.swipeIndicator} />

              {/* Emoji container */}
              <View style={styles.emojiContainer}>
                <Text style={styles.emojiText}>{emoji}</Text>
              </View>

              {/* Skipped notification */}
              <View style={styles.skippedContainer}>
                <StatText style={styles.skippedText} color={grayTextColor}>
                  YOU SKIPPED
                </StatText>
                <Heading color={colors.PrimaryWhite} style={styles.titleText}>
                  {title}
                </Heading>
              </View>

              {/* Snooze option */}
              <View style={styles.snoozeContainer}>
                <StatText color={colors.PrimaryWhite} style={styles.snoozeText}>
                  Snooze to another day
                </StatText>
                <Switch
                  trackColor={{
                    false: "rgba(255, 255, 255, 0.2)",
                    true: primaryColor,
                  }}
                  thumbColor={isSnoozeEnabled ? colors.PrimaryWhite : "#f4f3f4"}
                  ios_backgroundColor="rgba(255, 255, 255, 0.2)"
                  onValueChange={toggleSnooze}
                  value={isSnoozeEnabled}
                />
              </View>

              {/* Divider */}
              <View style={styles.divider} />

              {/* Goal Reflection section - now clickable */}
              <TouchableOpacity
                style={styles.reflectionContainer}
                onPress={navigateToGoalReflection}
                activeOpacity={0.7}
              >
                <View style={styles.reflectionHeader}>
                  <View style={styles.journalIconContainer}>
                    <FontAwesome6
                      name="book"
                      size={24}
                      color={colors.PrimaryWhite}
                    />
                  </View>
                  <View style={styles.reflectionTextContainer}>
                    <StatText
                      style={styles.reflectionTitle}
                      color={colors.PrimaryWhite}
                    >
                      Goal Reflection
                    </StatText>
                    <StatText
                      color={grayTextColor}
                      style={styles.reflectionQuestion}
                    >
                      What made you skip '{title}'?
                    </StatText>
                  </View>
                  <View style={styles.energyBadge}>
                    <FontAwesome6
                      name="bolt"
                      size={14}
                      color={colors.EnergyColor}
                    />
                    <Text style={styles.energyText}>2+</Text>
                  </View>
                </View>
              </TouchableOpacity>

              {/* Action buttons */}
              <View style={styles.buttonActions}>
                <TouchableOpacity onPress={handleUndoPress}>
                  <StatText style={styles.undoButton} color={primaryColor}>
                    Undo
                  </StatText>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.doneButton, { backgroundColor: primaryColor }]}
                  onPress={handleDonePress}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <ActivityIndicator
                      color={colors.PrimaryWhite}
                      size="small"
                    />
                  ) : (
                    <StatText
                      style={styles.doneButtonText}
                      color={colors.PrimaryWhite}
                    >
                      Done
                    </StatText>
                  )}
                </TouchableOpacity>
              </View>
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
    paddingTop: 20,
    paddingBottom: 30,
    alignItems: "center",
  },
  swipeIndicator: {
    width: 40,
    height: 5,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    borderRadius: 5,
    marginBottom: 25,
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
    zIndex: 1,
  },
  emojiContainer: {
    width: 80,
    height: 80,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
    marginTop: 10,
  },
  emojiText: {
    fontSize: 50,
  },
  skippedContainer: {
    alignItems: "center",
    marginBottom: 30,
  },
  skippedText: {
    fontSize: 14,
    letterSpacing: 1.5,
    textTransform: "uppercase",
    marginBottom: 5,
  },
  titleText: {
    fontSize: 28,
    textAlign: "center",
  },
  snoozeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    padding: 16,
    borderRadius: 15,
    marginBottom: 30,
  },
  snoozeText: {
    fontSize: 16,
  },
  divider: {
    width: "100%",
    height: 1,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    marginBottom: 30,
  },
  reflectionContainer: {
    width: "100%",
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    borderRadius: 15,
    marginBottom: 30,
  },
  reflectionHeader: {
    flexDirection: "row",
    padding: 16,
    alignItems: "center",
  },
  reflectionTextContainer: {
    flex: 1,
  },
  journalIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 10,
    backgroundColor: "rgba(85, 188, 100, 0.3)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  reflectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 3,
  },
  reflectionQuestion: {
    fontSize: 14,
  },
  energyBadge: {
    flexDirection: "row",
    backgroundColor: "rgba(255, 204, 0, 0.15)",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
    alignItems: "center",
    marginLeft: 10,
  },
  energyText: {
    color: colors.EnergyColor,
    fontSize: 14,
    fontWeight: "600",
    marginLeft: 5,
  },
  buttonActions: {
    width: "100%",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  undoButton: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 20,
  },
  doneButton: {
    width: "100%",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  doneButtonText: {
    fontSize: 18,
    fontWeight: "600",
  },
});
