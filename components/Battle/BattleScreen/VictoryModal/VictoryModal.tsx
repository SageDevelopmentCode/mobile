import React, { useEffect, useRef } from "react";
import {
  View,
  Modal,
  TouchableOpacity,
  Animated,
  Text,
  Image,
  ScrollView,
} from "react-native";
import { MaterialIcons } from "@/utils/icons";
import { LinearGradient } from "expo-linear-gradient";
import { styles } from "./VictoryModal.styles";
import Gabriel from "../../../../assets/images/characters/Gabriel.png";

interface Reward {
  type: string;
  amount: number;
  icon: string;
  color: string;
}

interface UnlockItem {
  title: string;
  icon: string;
}

interface VictoryModalProps {
  visible: boolean;
  onClose: () => void;
  character?: {
    name: string;
    image: any;
    color1: string;
    color2: string;
  };
  rewards?: Reward[];
  unlocks?: UnlockItem[];
  xpGained?: number;
}

export const VictoryModal: React.FC<VictoryModalProps> = ({
  visible,
  onClose,
  character = {
    name: "Gabriel",
    image: Gabriel,
    color1: "#6563FF",
    color2: "#A5A4FF",
  },
  rewards = [],
  unlocks = [],
  xpGained = 150,
}) => {
  const slideUpAnim = useRef(new Animated.Value(50)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      // Reset animations
      slideUpAnim.setValue(50);
      opacityAnim.setValue(0);

      // Animate in
      Animated.parallel([
        Animated.timing(slideUpAnim, {
          toValue: 0,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible]);

  // Default rewards if none provided
  const defaultRewards: Reward[] = [
    {
      type: "Faith Points",
      amount: 100,
      icon: "star",
      color: "#FFC107",
    },
    {
      type: "Wisdom",
      amount: 50,
      icon: "auto-awesome",
      color: "#5E97F6",
    },
    {
      type: "Scripture",
      amount: 3,
      icon: "menu-book",
      color: "#4CAF50",
    },
    {
      type: "Coins",
      amount: 75,
      icon: "monetization-on",
      color: "#FF9800",
    },
  ];

  // Default unlocks if none provided
  const defaultUnlocks: UnlockItem[] = [
    { title: "New Devotional Unlocked", icon: "book" },
    { title: "Path of Gabriel Advanced", icon: "map" },
  ];

  const displayRewards = rewards.length > 0 ? rewards : defaultRewards;
  const displayUnlocks = unlocks.length > 0 ? unlocks : defaultUnlocks;

  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <Animated.View
          style={[
            styles.modalContainer,
            {
              transform: [{ translateY: slideUpAnim }],
              opacity: opacityAnim,
            },
          ]}
        >
          {/* Content section */}
          <View style={styles.contentContainer}>
            {/* Rewards section */}
            <View style={styles.rewardsSection}>
              <Text style={styles.sectionTitle}>Rewards Earned</Text>
              <View style={styles.rewardsGrid}>
                {displayRewards.map((reward, index) => (
                  <View key={index} style={styles.rewardCard}>
                    <View
                      style={[
                        styles.rewardIconContainer,
                        { backgroundColor: reward.color },
                      ]}
                    >
                      <MaterialIcons
                        name={reward.icon}
                        size={24}
                        color="#FFFFFF"
                      />
                    </View>
                    <Text style={styles.rewardAmount}>{reward.amount}</Text>
                    <Text style={styles.rewardType}>{reward.type}</Text>
                  </View>
                ))}
              </View>
            </View>

            {/* Unlocks section */}
            <View style={styles.unlockSection}>
              <View style={styles.unlockHeader}>
                <MaterialIcons name="lock-open" size={20} color="#6563FF" />
                <Text style={styles.unlockTitle}>Unlocked</Text>
              </View>
              {displayUnlocks.map((item, index) => (
                <View key={index} style={styles.unlockItem}>
                  <MaterialIcons name={item.icon} size={16} color="#6563FF" />
                  <Text style={styles.unlockText}>{item.title}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Button container */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[
                styles.continueButton,
                { backgroundColor: character.color1 },
              ]}
              onPress={onClose}
              activeOpacity={0.8}
            >
              <Text style={styles.continueText}>CONTINUE</Text>
            </TouchableOpacity>
          </View>

          {/* Close button */}
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <MaterialIcons name="close" size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </Animated.View>
      </View>
    </Modal>
  );
};
