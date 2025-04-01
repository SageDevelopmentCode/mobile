import {
  ButtonText,
  Heading,
  SubHeading,
} from "@/components/Text/TextComponents";
import colors from "@/constants/colors";
import { Image, Modal, TouchableOpacity, View } from "react-native";
import { styles } from "./CategoryCard.styles";

type CategoryCardProps = {
  imageSrc: any;
  title: string;
  onPress?: () => void;
};

export const CategoryCard = ({
  imageSrc,
  title,
  onPress,
}: CategoryCardProps) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[{ alignItems: "center", width: 150 }]}>
        <View style={styles.categoryImageContainer}>
          <Image source={imageSrc} style={[styles.image]} />
        </View>
        <ButtonText color={colors.PrimaryWhite}>{title}</ButtonText>
      </View>
    </TouchableOpacity>
  );
};
