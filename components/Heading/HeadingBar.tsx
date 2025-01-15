import React from "react";
import { Image, View } from "react-native";
import { styles } from "./HeadingBar.styles";
import { Heading } from "../Text/TextComponents";
import colors from "@/constants/colors";

interface HeadingBarProps {
  headingText: string;
}

function HeadingBar(props: HeadingBarProps) {
  const { headingText } = props;

  return (
    <View style={styles.headingContainer}>
      <Heading color={colors.PrimaryWhite}>{headingText}</Heading>
    </View>
  );
}

export default HeadingBar;
