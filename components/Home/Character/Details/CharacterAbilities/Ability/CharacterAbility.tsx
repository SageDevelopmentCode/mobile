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
import { useState, useRef, useEffect } from "react";
import React from "react";
import { StatBar } from "../../CharacterStats/StatBar";
import { BuffStatBar } from "../../CharacterStats/BuffStatBar";

type StatType =
  | "attack"
  | "defense"
  | "specialAttack"
  | "specialDefense"
  | "speed";

interface AbilityEffect {
  type: "damage" | "buff";
  value: number;
  stat?: StatType;
}

interface CharacterAbilityProps {
  name: string;
  icon: any;
  type: StatType;
  effects: AbilityEffect[];
  description: string;
  uses: number;
  onPress?: () => void;
}

// Base stats for visualization
const BASE_STATS = {
  attack: 150,
  defense: 150,
  specialAttack: 100,
  specialDefense: 150,
  speed: 150,
};

const MAX_STAT = 1000;

const getStatColor = (statType: StatType) => {
  switch (statType) {
    case "attack":
      return "#BF8EFF"; // Purple
    case "defense":
      return "#7DD1F8"; // Blue
    case "specialAttack":
      return "#80F9B7"; // Green
    case "specialDefense":
      return "#FF9D9D"; // Red
    case "speed":
      return "#FFEB99"; // Yellow
    default:
      return "#7DD1F8";
  }
};

export const CharacterAbility = ({
  name = "Judge's Wisdom",
  icon,
  type = "defense",
  effects,
  description,
  uses = 3,
  onPress,
}: CharacterAbilityProps) => {
  const [showDetails, setShowDetails] = useState(false);
  const flipAnim = useRef(new Animated.Value(0)).current;
  const [isFlipped, setIsFlipped] = useState(false);

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

  // Get primary effect (damage for attacks, highest buff for others)
  const getPrimaryEffect = () => {
    if (type === "attack" || type === "specialAttack") {
      return effects.find((effect) => effect.type === "damage");
    }
    return effects.reduce(
      (prev, curr) =>
        curr.type === "buff" &&
        Math.abs(curr.value) > Math.abs(prev?.value || 0)
          ? curr
          : prev,
      effects[0]
    );
  };

  const primaryEffect = getPrimaryEffect();
  const additionalEffects = effects.filter(
    (effect) => effect !== primaryEffect
  );

  const renderStatBars = (effect: AbilityEffect) => {
    if (effect.type !== "buff" || !effect.stat) return null;

    const baseStat = BASE_STATS[effect.stat];
    const buffedStat = baseStat + effect.value;
    const statName =
      effect.stat.charAt(0).toUpperCase() +
      effect.stat.slice(1).replace(/([A-Z])/g, "\n$1");

    return (
      <View style={styles.statBarContainer}>
        <BuffStatBar
          name={statName}
          baseValue={baseStat}
          buffedValue={buffedStat}
          color={getStatColor(effect.stat)}
          maxValue={MAX_STAT}
        />
      </View>
    );
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
            <View style={styles.usesContainer}>
              <Text style={styles.usesText}>Uses: {uses}</Text>
            </View>
            <View style={styles.statsContainer}>
              <View style={[styles.statPill, getStatPillStyle(type)]}>
                <Text style={[styles.statValue, { color: getStatColor(type) }]}>
                  {primaryEffect?.type === "damage" ? (
                    `${primaryEffect.value} DMG`
                  ) : (
                    <>
                      {primaryEffect && primaryEffect.value > 0 ? "+" : ""}
                      {primaryEffect?.value}{" "}
                      {primaryEffect?.stat && getStatLabel(primaryEffect.stat)}
                    </>
                  )}
                </Text>
              </View>
              {additionalEffects.length > 0 && (
                <View style={styles.additionalStatsIndicator}>
                  <Text style={styles.additionalStatsText}>
                    +{additionalEffects.length}
                  </Text>
                </View>
              )}
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
              <View
                style={[
                  styles.modalIconWrapper,
                  { borderColor: getStatColor(type) },
                  { backgroundColor: "rgba(0, 0, 0, 0.3)" },
                ]}
              >
                <Image
                  source={icon}
                  style={styles.modalIcon}
                  resizeMode="contain"
                />
              </View>
              <View style={styles.modalHeaderContent}>
                <Text style={styles.modalTitle}>{name}</Text>
                <Text style={styles.modalType}>
                  {type.charAt(0).toUpperCase() +
                    type.slice(1).replace(/([A-Z])/g, " $1")}{" "}
                  Type
                </Text>
              </View>
            </View>
            <View style={styles.modalBody}>
              <Text style={styles.modalDescription}>{description}</Text>
              <Text style={styles.modalStatsTitle}>
                {type === "attack" || type === "specialAttack"
                  ? "Damage & Effects"
                  : "Effects"}
              </Text>
              <View style={styles.modalStats}>
                {effects.map((effect, index) => (
                  <React.Fragment key={index}>
                    <View
                      style={[
                        styles.modalStatItem,
                        {
                          borderColor:
                            effect.type === "damage"
                              ? getStatColor(type)
                              : getStatColor(effect.stat as StatType),
                          width: effect.type === "buff" ? "100%" : "48%",
                        },
                      ]}
                    >
                      <View style={styles.modalStatHeader}>
                        <Text style={styles.modalStatLabel}>
                          {effect.type === "damage"
                            ? "Damage"
                            : getStatLabel(effect.stat as StatType)}
                        </Text>
                        <Text
                          style={[
                            styles.modalStatValue,
                            {
                              color:
                                effect.type === "damage"
                                  ? getStatColor(type)
                                  : getStatColor(effect.stat as StatType),
                            },
                          ]}
                        >
                          {effect.type === "damage"
                            ? `${effect.value}`
                            : `${effect.value > 0 ? "+" : ""}${effect.value}`}
                        </Text>
                      </View>
                      {effect.type === "buff" && renderStatBars(effect)}
                    </View>
                  </React.Fragment>
                ))}
              </View>
              <View style={styles.modalUsesContainer}>
                <Text style={styles.modalUsesText}>Uses per Battle:</Text>
                <Text style={styles.modalUsesCount}>{uses}</Text>
              </View>
            </View>
          </View>
        </Pressable>
      </Modal>
    </>
  );
};
