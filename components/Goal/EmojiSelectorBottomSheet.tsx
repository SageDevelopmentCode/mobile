import React, { useEffect, useRef, useState } from "react";
import {
  Modal,
  View,
  TouchableOpacity,
  StyleSheet,
  Animated,
  TextInput,
  SafeAreaView,
  Platform,
} from "react-native";
import { Heading } from "../Text/TextComponents";
import colors from "@/constants/colors";
import { Ionicons } from "@expo/vector-icons";
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
  State,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import EmojiSelector from "react-native-emoji-selector";

type EmojiSelectorBottomSheetProps = {
  visible: boolean;
  onClose: () => void;
  onEmojiSelected: (emoji: string) => void;
  activeCharacter: string;
};

export const EmojiSelectorBottomSheet = ({
  visible,
  onClose,
  onEmojiSelected,
  activeCharacter,
}: EmojiSelectorBottomSheetProps) => {
  const isDeborah = activeCharacter === "Deborah";
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(500)).current;
  const [modalVisible, setModalVisible] = useState(visible);
  const panY = useRef(new Animated.Value(0)).current;

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
        toValue: 500,
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

  const handleEmojiSelect = (emoji: string) => {
    onEmojiSelected(emoji);
    closeWithAnimation();
  };

  // Gesture handler for bottom sheet swiping
  const onGestureEvent = Animated.event(
    [{ nativeEvent: { translationY: panY } }],
    { useNativeDriver: true }
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

  // Calculate the background color based on the active character
  const backgroundColor = isDeborah
    ? colors.DarkPurpleBackground
    : colors.GabrielBackground;

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
                  backgroundColor: backgroundColor,
                  transform: [{ translateY }],
                },
              ]}
            >
              {/* Swipe indicator bar */}
              <View style={styles.swipeIndicator} />

              {/* Title */}
              <View style={styles.headerContainer}>
                <Heading color={colors.PrimaryWhite} style={styles.title}>
                  Choose an Emoji
                </Heading>

                {/* Close button */}
                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={closeWithAnimation}
                >
                  <Ionicons
                    name="close"
                    size={24}
                    color={colors.PrimaryWhite}
                  />
                </TouchableOpacity>
              </View>

              {/* Emoji Selector with extended container */}
              <View style={styles.emojiSelectorOuterContainer}>
                <SafeAreaView style={styles.emojiSelectorContainer}>
                  <EmojiSelector
                    onEmojiSelected={handleEmojiSelect}
                    columns={8}
                    showSearchBar={false}
                    showHistory={true}
                    showSectionTitles={true}
                    category={undefined}
                  />
                </SafeAreaView>

                {/* Extra spacer to ensure full coverage */}
                <View style={styles.bottomSpacer} />
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
    height: "100%", // Use full height
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: 16,
    paddingBottom: 0, // Remove bottom padding
    alignItems: "center",
    marginBottom: -50, // Push beyond screen bounds to ensure coverage
  },
  swipeIndicator: {
    width: 40,
    height: 5,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    borderRadius: 5,
    marginBottom: 16,
  },
  headerContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    position: "relative",
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    textAlign: "center",
  },
  closeButton: {
    position: "absolute",
    right: 20,
    width: 40,
    height: 40,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  emojiSelectorOuterContainer: {
    width: "100%",
    flex: 1,
    backgroundColor: "transparent",
  },
  emojiSelectorContainer: {
    width: "100%",
    flex: 1,
    backgroundColor: "transparent",
  },
  bottomSpacer: {
    height: 100, // Extra space to ensure coverage
    width: "100%",
    backgroundColor: "transparent",
  },
});
