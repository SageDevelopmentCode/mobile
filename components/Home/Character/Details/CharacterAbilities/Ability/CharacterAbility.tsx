import {
  Text,
  View,
  StyleSheet,
  Image,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { styles } from "./CharacterAbility.styles";
import colors from "@/constants/colors";

type StatType =
  | "attack"
  | "defense"
  | "specialAttack"
  | "specialDefense"
  | "speed";

interface CharacterAbilityProps {
  name: string;
  icon: any;
  statType: StatType;
  statValue: number;
  cardBackground: any;
  onPress?: () => void;
}

export const CharacterAbility = ({
  name = "Judge's Wisdom",
  icon,
  cardBackground,
  statType = "defense",
  statValue = 15,
  onPress,
}: CharacterAbilityProps) => {
  const getStatColor = (type: StatType) => {
    switch (type) {
      case "attack":
        return colors.ZoneOneBattleButtonBackground;
      case "defense":
        return colors.PrimaryBlue;
      case "specialAttack":
        return colors.PrimaryPurpleBackground;
      case "specialDefense":
        return colors.PrimaryGreenBackground;
      case "speed":
        return colors.EnergyColor;
      default:
        return colors.PrimaryBlue;
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

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
      <ImageBackground
        source={cardBackground}
        style={styles.card}
        resizeMode="cover"
      >
        <View style={styles.overlay} />
        <View style={styles.content}>
          <Image source={icon} style={styles.icon} resizeMode="contain" />
          <Text style={styles.title}>{name}</Text>
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text
                style={[styles.statValue, { color: getStatColor(statType) }]}
              >
                +{statValue}
              </Text>
              <Text style={styles.statLabel}>{getStatLabel(statType)}</Text>
            </View>
          </View>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
};
