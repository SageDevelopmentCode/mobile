import { Text, View, StyleSheet, Image, ImageBackground } from "react-native";
import { styles } from "./CharacterAbility.styles";
import colors from "@/constants/colors";

interface CharacterAbilityProps {
  name: string;
  icon: any; // For the image source
  defense: number;
  accuracy: number;
  cardBackground: any;
}

export const CharacterAbility = ({
  name = "Judge's Wisdom",
  icon,
  cardBackground,
  defense = 15,
  accuracy = 15,
}: CharacterAbilityProps) => {
  return (
    <ImageBackground
      source={cardBackground}
      style={styles.card}
      resizeMode="cover"
    >
      {/* Black overlay */}
      <View style={styles.overlay} />

      {/* Content */}
      <View style={styles.content}>
        <Image source={icon} style={styles.icon} resizeMode="contain" />
        <Text style={styles.title}>{name}</Text>
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>+{defense}</Text>
            <Text style={styles.statLabel}>Def</Text>
          </View>
          <View style={styles.statItem}>
            <Text
              style={[
                styles.statValue,
                { color: colors.PrimaryPurpleBackground },
              ]}
            >
              +{accuracy}
            </Text>
            <Text style={styles.statLabel}>Acc</Text>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};
