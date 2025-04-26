import React, { useEffect, useRef, useState } from "react";
import {
  Modal,
  View,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from "react-native";
import { Heading, StatText, ButtonText } from "../Text/TextComponents";
import colors from "@/constants/colors";
import { FontAwesome6, Ionicons, MaterialIcons } from "@expo/vector-icons";

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
  activeCharacter: string;
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
  activeCharacter,
}: GoalItemBottomSheetProps) => {
  const isDeborah = activeCharacter === "Deborah";
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(300)).current;
  const [modalVisible, setModalVisible] = useState(visible);

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
    });
  };

  useEffect(() => {
    if (visible) {
      // Show modal immediately when requested
      setModalVisible(true);

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
        <Animated.View
          style={[
            styles.bottomSheet,
            {
              backgroundColor: isDeborah
                ? colors.DarkPurpleBackground
                : colors.GabrielBackground,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          {/* Book emoji container */}
          <View style={styles.emojiContainer}>
            <Heading style={styles.emoji}>{emoji}</Heading>
          </View>

          {/* Devotional title */}
          <Heading color={colors.PrimaryWhite} style={styles.title}>
            {title}
          </Heading>

          {/* Read Today's Devotional text */}
          <StatText color="#AAAAAA" style={styles.description}>
            {description}
          </StatText>

          {/* Energy count */}
          <View style={styles.energyContainer}>
            <Heading color={colors.PrimaryWhite} style={styles.energyCount}>
              {energyCount}
            </Heading>
            <MaterialIcons name="bolt" size={24} color="#F6C833" />
          </View>

          {/* Action buttons */}
          <View style={styles.buttonContainer}>
            {/* Skip button */}
            <TouchableOpacity
              style={styles.button}
              onPress={() => handleActionPress(onSkip)}
            >
              <View style={styles.iconContainer}>
                <FontAwesome6 name="forward-fast" size={24} color="#D95858" />
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
              <ButtonText color={colors.PrimaryWhite}>Complete</ButtonText>
            </TouchableOpacity>

            {/* Snooze button */}
            <TouchableOpacity
              style={styles.button}
              onPress={() => handleActionPress(onSnooze)}
            >
              <View style={styles.iconContainer}>
                <Ionicons name="calendar-outline" size={24} color="#5878D9" />
              </View>
              <ButtonText color={colors.PrimaryWhite}>Snooze</ButtonText>
            </TouchableOpacity>
          </View>

          {/* Close button */}
          <TouchableOpacity
            style={styles.closeButton}
            onPress={closeWithAnimation}
          >
            <Ionicons name="close" size={24} color={colors.PrimaryWhite} />
          </TouchableOpacity>
        </Animated.View>
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
  emojiContainer: {
    width: 60,
    height: 60,
    borderRadius: 8,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
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
    marginBottom: 32,
  },
  energyCount: {
    marginRight: 4,
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
});
