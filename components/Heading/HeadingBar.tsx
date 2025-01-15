import React from "react";
import { View } from "react-native";
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
      <View style={styles.line} />
      <Heading style={styles.headingText} color={colors.PrimaryWhite}>
        {headingText}
      </Heading>
      <View style={styles.line} />
    </View>
  );
}

export default HeadingBar;
