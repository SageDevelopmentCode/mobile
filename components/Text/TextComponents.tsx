import React from "react";
import { Text, TextStyle, TextProps } from "react-native";
import { styles } from "./TextComponents.styles";
import {
  Nunito_800ExtraBold,
  Nunito_700Bold,
  Nunito_900Black,
} from "@expo-google-fonts/nunito";
import {
  NunitoSans_600SemiBold,
  NunitoSans_700Bold,
  NunitoSans_400Regular,
} from "@expo-google-fonts/nunito-sans";
import { useFonts } from "expo-font";

interface BaseTextProps extends TextProps {
  style?: TextStyle; // Allow additional styling if needed
  children: React.ReactNode;
  color?: string; // New color prop
}

// Heading component
const Title = ({ style, children, color, ...props }: BaseTextProps) => {
  const [fontsLoaded] = useFonts({
    Nunito_900Black,
    Nunito_800ExtraBold,
    Nunito_700Bold,
  });

  if (!fontsLoaded) {
    return <Text>Loading...</Text>;
  }

  return (
    <Text
      style={[
        styles.title,
        color ? { color } : {},
        style,
        { fontFamily: "Nunito_800ExtraBold" },
      ]}
      {...props}
    >
      {children}
    </Text>
  );
};

// Heading component
const Heading = ({ style, children, color, ...props }: BaseTextProps) => {
  const [fontsLoaded] = useFonts({
    Nunito_900Black,
    Nunito_800ExtraBold,
    Nunito_700Bold,
    NunitoSans_600SemiBold,
  });

  if (!fontsLoaded) {
    return <Text>Loading...</Text>;
  }

  return (
    <Text
      style={[
        styles.heading,
        color ? { color } : {},
        style,
        { fontFamily: "Nunito_800ExtraBold" },
      ]}
      {...props}
    >
      {children}
    </Text>
  );
};

// SubHeading component
const SubHeading = ({ style, children, color, ...props }: BaseTextProps) => {
  const [fontsLoaded] = useFonts({
    Nunito_800ExtraBold,
    Nunito_700Bold,
    NunitoSans_600SemiBold,
  });

  if (!fontsLoaded) {
    return <Text>Loading...</Text>;
  }

  return (
    <Text
      style={[
        styles.subheading,
        color ? { color } : {}, // Apply color if provided
        { fontFamily: "Nunito_700Bold" },
        style,
      ]}
      {...props}
    >
      {children}
    </Text>
  );
};

const ButtonText = ({ style, children, color, ...props }: BaseTextProps) => {
  const [fontsLoaded] = useFonts({
    Nunito_800ExtraBold,
    Nunito_700Bold,
    NunitoSans_600SemiBold,
  });

  if (!fontsLoaded) {
    return <Text>Loading...</Text>;
  }

  return (
    <Text
      style={[
        styles.buttonText,
        color ? { color } : {}, // Apply color if provided
        style,
        { fontFamily: "Nunito_700Bold" },
      ]}
      {...props}
    >
      {children}
    </Text>
  );
};

const StatText = ({ style, children, color, ...props }: BaseTextProps) => {
  const [fontsLoaded] = useFonts({
    Nunito_800ExtraBold,
    Nunito_700Bold,
    NunitoSans_600SemiBold,
    NunitoSans_400Regular,
  });

  if (!fontsLoaded) {
    return <Text>Loading...</Text>;
  }

  return (
    <Text
      style={[
        styles.statText,
        color ? { color } : {}, // Apply color if provided
        style,
        { fontFamily: "Nunito_700Bold" },
      ]}
      {...props}
    >
      {children}
    </Text>
  );
};

// Paragraph component
const Paragraph = ({ style, children, color, ...props }: BaseTextProps) => {
  const [fontsLoaded] = useFonts({
    Nunito_800ExtraBold,
    Nunito_700Bold,
    NunitoSans_700Bold,
    NunitoSans_600SemiBold,
  });

  if (!fontsLoaded) {
    return <Text>Loading...</Text>;
  }

  return (
    <Text
      style={[
        styles.paragraph,
        color ? { color } : {}, // Apply color if provided
        style,
        { fontFamily: "NunitoSans_700Bold" },
      ]}
      {...props}
    >
      {children}
    </Text>
  );
};

export { Heading, SubHeading, Paragraph, ButtonText, Title, StatText };
