import { ButtonText } from "@/components/Text/TextComponents";
import colors from "@/constants/colors";
import { Image, TouchableOpacity, View } from "react-native";
import { styles } from "./Character.styles";

type CharacterProps = {
  characterName: string;
  level: number;
  health: number;
  maxHealth: number;
  typeImage: any;
  characterImage: any;
  onPress?: () => void;
};

export const Character = ({
  characterName,
  level,
  health,
  maxHealth,
  typeImage,
  characterImage,
  onPress,
}: CharacterProps) => {
  const healthPercentage = (health / maxHealth) * 100;

  return (
    <View>
      <View style={styles.healthBarContainer}>
        <View style={styles.rowSpaceBetween}>
          <View style={styles.rowCenter}>
            <Image
              source={typeImage}
              style={styles.typeImage}
              resizeMode="contain"
            />
            <ButtonText color={colors.PrimaryWhite}>Lv {level}</ButtonText>
          </View>
          <ButtonText color={colors.PrimaryWhite}>
            {health}/{maxHealth}
          </ButtonText>
        </View>
        <View style={styles.progressContainer}>
          <View
            style={[
              styles.progress,
              {
                width: `${healthPercentage}%`,
                backgroundColor: colors.HealthBarGreen,
              },
            ]}
          />
        </View>
      </View>
      <TouchableOpacity style={styles.characterImage} onPress={onPress}>
        <Image
          source={characterImage}
          style={styles.character}
          resizeMode="contain"
        />
      </TouchableOpacity>
      <View style={styles.characterName}>
        <ButtonText color={colors.PrimaryWhite}>{characterName}</ButtonText>
      </View>
    </View>
  );
};
