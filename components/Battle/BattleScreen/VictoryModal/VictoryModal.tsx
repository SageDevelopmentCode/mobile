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
import colors from "@/constants/colors";

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

// Default rewards
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

// Default unlocks
const defaultUnlocks: UnlockItem[] = [
  { title: "New Devotional Unlocked", icon: "book" },
  { title: "Path of Gabriel Advanced", icon: "map" },
];

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
  const scaleAnim = useRef(new Animated.Value(0.95)).current;
  const rewardAnimations = useRef<Animated.Value[]>([]).current;
  const unlockAnimations = useRef<Animated.Value[]>([]).current;

  const displayRewards = rewards.length > 0 ? rewards : defaultRewards;
  const displayUnlocks = unlocks.length > 0 ? unlocks : defaultUnlocks;

  // Initialize reward animations
  if (rewardAnimations.length === 0) {
    displayRewards.forEach(() => {
      rewardAnimations.push(new Animated.Value(0));
    });
  }

  // Initialize unlock animations
  if (unlockAnimations.length === 0) {
    displayUnlocks.forEach(() => {
      unlockAnimations.push(new Animated.Value(0));
    });
  }

  useEffect(() => {
    if (visible) {
      // Reset animations
      slideUpAnim.setValue(50);
      opacityAnim.setValue(0);
      scaleAnim.setValue(0.95);
      rewardAnimations.forEach((anim) => anim.setValue(0));
      unlockAnimations.forEach((anim) => anim.setValue(0));

      // Animate modal in
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
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
      ]).start();

      // Animate rewards with staggered delay
      displayRewards.forEach((_, index) => {
        Animated.timing(rewardAnimations[index], {
          toValue: 1,
          duration: 300,
          delay: 400 + index * 100, // Staggered start
          useNativeDriver: true,
        }).start();
      });

      // Animate unlocks with staggered delay
      displayUnlocks.forEach((_, index) => {
        Animated.timing(unlockAnimations[index], {
          toValue: 1,
          duration: 300,
          delay: 700 + index * 100, // Staggered start after rewards
          useNativeDriver: true,
        }).start();
      });
    }
  }, [visible]);

  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType="none"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <Animated.View
          style={[
            styles.modalContainer,
            {
              transform: [{ translateY: slideUpAnim }, { scale: scaleAnim }],
              opacity: opacityAnim,
            },
          ]}
        >
          {/* Header gradient */}
          <LinearGradient
            colors={[character.color1, character.color2]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.backgroundGradient}
          >
            {/* Character image */}
            <View style={styles.headerSection}>
              <View style={styles.titleContainer}>
                <MaterialIcons
                  name="emoji-events"
                  size={28}
                  color="#FFFFFF"
                  style={styles.trophyIcon}
                />
                <Text style={styles.titleText}>VICTORY!</Text>
              </View>
              <View style={styles.xpBadge}>
                <MaterialIcons
                  name="trending-up"
                  size={16}
                  color={character.color1}
                />
                <Text style={[styles.xpText, { color: character.color1 }]}>
                  +{xpGained} XP
                </Text>
              </View>
            </View>

            <Image source={character.image} style={styles.characterImage} />
          </LinearGradient>

          {/* Content section */}
          <ScrollView
            style={{ width: "100%" }}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.contentContainer}>
              {/* Rewards section */}
              <View style={styles.rewardsSection}>
                <Text style={styles.sectionTitle}>Rewards Earned</Text>
                <View style={styles.rewardsGrid}>
                  {displayRewards.map((reward, index) => (
                    <Animated.View
                      key={index}
                      style={[
                        styles.rewardCard,
                        {
                          opacity: rewardAnimations[index],
                          transform: [
                            {
                              translateY: rewardAnimations[index].interpolate({
                                inputRange: [0, 1],
                                outputRange: [20, 0],
                              }),
                            },
                            {
                              scale: rewardAnimations[index].interpolate({
                                inputRange: [0, 1],
                                outputRange: [0.9, 1],
                              }),
                            },
                          ],
                        },
                      ]}
                    >
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
                    </Animated.View>
                  ))}
                </View>
              </View>

              {/* Unlocks section */}
              <View
                style={[
                  styles.unlockSection,
                  {
                    borderColor: character.color1,
                    borderWidth: 1,
                    backgroundColor: `${character.color1}10`,
                  },
                ]}
              >
                <View style={styles.unlockHeader}>
                  <MaterialIcons
                    name="lock-open"
                    size={20}
                    color={character.color1}
                  />
                  <Text
                    style={[styles.unlockTitle, { color: character.color1 }]}
                  >
                    Unlocked
                  </Text>
                </View>
                {displayUnlocks.map((item, index) => (
                  <Animated.View
                    key={index}
                    style={[
                      styles.unlockItem,
                      {
                        opacity: unlockAnimations[index],
                        transform: [
                          {
                            translateX: unlockAnimations[index].interpolate({
                              inputRange: [0, 1],
                              outputRange: [-20, 0],
                            }),
                          },
                        ],
                      },
                    ]}
                  >
                    <MaterialIcons
                      name={item.icon}
                      size={16}
                      color={character.color1}
                    />
                    <Text style={styles.unlockText}>{item.title}</Text>
                  </Animated.View>
                ))}
              </View>
            </View>
          </ScrollView>

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
