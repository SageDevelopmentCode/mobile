import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Animated,
  Modal,
  Pressable,
} from "react-native";
import { styles } from "./CharacterAbility.styles";
import colors from "@/constants/colors";
import { useState, useRef } from "react";
import React from "react";

type StatType =
  | "attack"
  | "defense"
  | "specialAttack"
  | "specialDefense"
  | "speed";

interface AbilityStats {
  attack: number;
  defense: number;
  specialAttack: number;
  specialDefense: number;
  speed: number;
}

interface CharacterAbilityProps {
  name: string;
  icon: any;
  type: StatType;
  stats: AbilityStats;
  description: string;
  onPress?: () => void;
}

export const CharacterAbility = ({
  name = "Judge's Wisdom",
  icon,
  type = "defense",
  stats,
  description,
  onPress,
}: CharacterAbilityProps) => {
  const [showDetails, setShowDetails] = useState(false);
  const flipAnim = useRef(new Animated.Value(0)).current;
  const [isFlipped, setIsFlipped] = useState(false);

  const getStatColor = (type: StatType) => {
    switch (type) {
      case "attack":
        return "#FF6B6B";
      case "defense":
        return "#4ECDC4";
      case "specialAttack":
        return "#FF9F1C";
      case "specialDefense":
        return "#2EC4B6";
      case "speed":
        return "#FFD166";
      default:
        return "#4ECDC4";
    }
  };

  const getIconStyle = (type: StatType) => {
    switch (type) {
      case "attack":
        return styles.attackIcon;
      case "defense":
        return styles.defenseIcon;
      case "specialAttack":
        return styles.specialAttackIcon;
      case "specialDefense":
        return styles.specialDefenseIcon;
      case "speed":
        return styles.speedIcon;
      default:
        return styles.defenseIcon;
    }
  };

  const getStatPillStyle = (type: StatType) => {
    switch (type) {
      case "attack":
        return styles.attackPill;
      case "defense":
        return styles.defensePill;
      case "specialAttack":
        return styles.specialAttackPill;
      case "specialDefense":
        return styles.specialDefensePill;
      case "speed":
        return styles.speedPill;
      default:
        return styles.defensePill;
    }
  };

  const getStatLabel = (type: StatType) => {
    switch (type) {
      case "attack":
        return "ATK";
      case "defense":
        return "DEF";
      case "specialAttack":
        return "SP.ATK";
      case "specialDefense":
        return "SP.DEF";
      case "speed":
        return "SPD";
      default:
        return "DEF";
    }
  };

  const getCardStyle = (type: StatType) => {
    switch (type) {
      case "attack":
        return styles.attackCard;
      case "defense":
        return styles.defenseCard;
      case "specialAttack":
        return styles.specialAttackCard;
      case "specialDefense":
        return styles.specialDefenseCard;
      case "speed":
        return styles.speedCard;
      default:
        return styles.defenseCard;
    }
  };

  const handleLongPress = () => {
    setShowDetails(true);
  };

  const handlePress = () => {
    if (onPress) {
      onPress();
    }
  };

  const flipCard = () => {
    setIsFlipped(!isFlipped);
    Animated.spring(flipAnim, {
      toValue: isFlipped ? 0 : 1,
      friction: 8,
      tension: 10,
      useNativeDriver: true,
    }).start();
  };

  const frontInterpolate = flipAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "180deg"],
  });

  const backInterpolate = flipAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["180deg", "360deg"],
  });

  const frontAnimatedStyle = {
    transform: [{ rotateY: frontInterpolate }],
  };

  const backAnimatedStyle = {
    transform: [{ rotateY: backInterpolate }],
  };

  return (
    <>
      <TouchableOpacity
        onPress={handlePress}
        onLongPress={handleLongPress}
        activeOpacity={0.8}
      >
        <Animated.View
          style={[styles.card, getCardStyle(type), frontAnimatedStyle]}
        >
          <View style={styles.cardContent}>
            <View style={[styles.iconContainer, getIconStyle(type)]}>
              {type === "specialAttack" ? (
                <View style={styles.specialAttackIconInner}>
                  <Image
                    source={icon}
                    style={styles.icon}
                    resizeMode="contain"
                  />
                </View>
              ) : (
                <Image source={icon} style={styles.icon} resizeMode="contain" />
              )}
            </View>
            <Text style={styles.title}>{name}</Text>
            <View style={styles.statsContainer}>
              {Object.entries(stats).map(([statType, value]) => {
                if (value === 0) return null;
                return (
                  <View
                    key={statType}
                    style={[
                      styles.statPill,
                      getStatPillStyle(statType as StatType),
                    ]}
                  >
                    <Text
                      style={[
                        styles.statValue,
                        { color: getStatColor(statType as StatType) },
                      ]}
                    >
                      +{value}
                    </Text>
                    <Text
                      style={[
                        styles.statLabel,
                        { color: getStatColor(statType as StatType) },
                      ]}
                    >
                      {getStatLabel(statType as StatType)}
                    </Text>
                  </View>
                );
              })}
            </View>
          </View>
        </Animated.View>
      </TouchableOpacity>

      <Modal
        visible={showDetails}
        transparent
        animationType="fade"
        onRequestClose={() => setShowDetails(false)}
      >
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setShowDetails(false)}
        >
          <View style={styles.modalContent}>
            <View
              style={[
                styles.modalHeader,
                { backgroundColor: getStatColor(type) },
              ]}
            >
              <Image
                source={icon}
                style={styles.modalIcon}
                resizeMode="contain"
              />
              <Text style={styles.modalTitle}>{name}</Text>
            </View>
            <View style={styles.modalBody}>
              <Text style={styles.modalDescription}>{description}</Text>
              <View style={styles.modalStats}>
                {Object.entries(stats).map(([statType, value]) => {
                  if (value === 0) return null;
                  return (
                    <View
                      key={statType}
                      style={[
                        styles.modalStatItem,
                        { borderColor: getStatColor(statType as StatType) },
                      ]}
                    >
                      <Text style={styles.modalStatLabel}>
                        {getStatLabel(statType as StatType)}
                      </Text>
                      <Text
                        style={[
                          styles.modalStatValue,
                          { color: getStatColor(statType as StatType) },
                        ]}
                      >
                        +{value}
                      </Text>
                    </View>
                  );
                })}
              </View>
            </View>
          </View>
        </Pressable>
      </Modal>
    </>
  );
};
