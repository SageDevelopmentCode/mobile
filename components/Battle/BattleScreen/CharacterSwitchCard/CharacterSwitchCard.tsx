import { ButtonText } from "@/components/Text/TextComponents";
import colors from "@/constants/colors";
import { Image, TouchableOpacity, View } from "react-native";
import Gabriel from "../../../../assets/images/characters/Gabriel.png";
import { styles } from "./CharacterSwitchCard.styles";

type CharacterSwitchCardProps = {
  characterImage: any;
  characterName: string;
  health: number;
};

export const CharacterSwitchCard = ({
  characterImage,
  characterName,
  health,
}: CharacterSwitchCardProps) => {
  return (
    <TouchableOpacity style={styles.characterSwitch}>
      <Image
        source={characterImage} // TODO: Dynamic
        style={styles.switchCharacter}
        resizeMode="contain"
      />
      <View style={styles.characterTextContainer}>
        <ButtonText color={colors.PrimaryWhite}>{characterName}l</ButtonText>
        <View
          style={[
            styles.progressContainer,
            {
              height: 11,
              backgroundColor: colors.PrimaryWhite,
              width: 80,
              marginTop: 2,
            },
          ]}
        >
          <View
            style={[
              styles.progress,
              {
                width: `${health}%`,
                backgroundColor: colors.HealthBarGreen,
              },
            ]}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};
