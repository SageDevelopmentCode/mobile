import { StatText, SubHeading } from "@/components/Text/TextComponents";
import colors from "@/constants/colors";
import React, { useEffect, useRef } from "react";
import { Image, TouchableOpacity, View, Animated } from "react-native";
import { capitalizeFirstLetter } from "@/utils/format/capitalizeFirstLetter";
import CommonChest from "../../../../assets/images/chests/CommonChest.png";
import RareChest from "../../../../assets/images/chests/RareChest.png";
import { getStyles } from "./Chest.styles";
import Svg, { Rect } from "react-native-svg";

type ChestProps = {
  onPress: () => void;
  type: "Daily" | "Weekly" | "Monthly";
  timeRemaining: string;
  activeCharacter: string;
  disabled?: boolean;
  progress?: number; // Progress percentage (0-100)
};

export const Chest = ({
  onPress,
  type,
  timeRemaining,
  activeCharacter,
  disabled = false,
  progress = 100,
}: ChestProps) => {
  const styles = getStyles(activeCharacter);

  // Animation ref for jumping effect
  const jumpAnim = useRef(new Animated.Value(0)).current;

  // Calculate progress for rounded rectangle indicator
  const chestWidth = 55;
  const chestHeight = 55;
  const strokeWidth = 3;
  const cornerRadius = 6;

  const progressColor =
    activeCharacter === "Deborah"
      ? colors.PrimaryPurpleBackground
      : colors.SolaraGreen;

  // Calculate perimeter for progress
  const rectPerimeter =
    2 * (chestWidth - strokeWidth * 2) + 2 * (chestHeight - strokeWidth * 2);
  const progressLength = (progress / 100) * rectPerimeter;

  // When progress is 100%, show full border without dashes
  const isFullyAvailable = progress >= 100;

  // Check if this chest should have jumping animation
  const shouldJump =
    type === "Daily" && timeRemaining === "Available" && !disabled;

  // Set up jumping animation
  useEffect(() => {
    if (shouldJump) {
      // Create a subtle jumping animation
      const createJumpAnimation = () => {
        return Animated.sequence([
          Animated.timing(jumpAnim, {
            toValue: -8, // Jump up by 8 pixels
            duration: 400,
            useNativeDriver: true,
          }),
          Animated.timing(jumpAnim, {
            toValue: 0, // Return to original position
            duration: 400,
            useNativeDriver: true,
          }),
          Animated.delay(1500), // Wait 1.5 seconds before next jump
        ]);
      };

      // Start the looping animation
      const loopAnimation = Animated.loop(createJumpAnimation());
      loopAnimation.start();

      // Cleanup function to stop animation
      return () => {
        loopAnimation.stop();
        jumpAnim.setValue(0);
      };
    } else {
      // Reset animation if conditions not met
      jumpAnim.setValue(0);
    }
  }, [shouldJump, jumpAnim]);

  return (
    <TouchableOpacity
      onPress={disabled ? undefined : onPress}
      style={[styles.chestContainer]}
      disabled={disabled}
      activeOpacity={disabled ? 1 : 0.7}
    >
      <View
        style={[
          styles.chest,
          { borderWidth: 0 }, // Remove existing border
        ]}
      >
        {/* Rounded Rectangle Progress Border */}
        <Svg
          width={chestWidth + strokeWidth * 2}
          height={chestHeight + strokeWidth * 2}
          style={{
            position: "absolute",
            zIndex: 1,
            alignSelf: "center",
          }}
        >
          {/* Background Border */}
          <Rect
            x={strokeWidth}
            y={strokeWidth}
            width={chestWidth}
            height={chestHeight}
            rx={cornerRadius}
            ry={cornerRadius}
            stroke={colors.PrimaryGrayDropShadow}
            strokeWidth={strokeWidth}
            fill="none"
            opacity={0.4}
          />
          {/* Progress Border */}
          <Rect
            x={strokeWidth}
            y={strokeWidth}
            width={chestWidth}
            height={chestHeight}
            rx={cornerRadius}
            ry={cornerRadius}
            stroke={progressColor}
            strokeWidth={strokeWidth}
            fill="none"
            strokeDasharray={isFullyAvailable ? "none" : rectPerimeter}
            strokeDashoffset={
              isFullyAvailable ? 0 : rectPerimeter - progressLength
            }
            strokeLinecap="round"
            opacity={isFullyAvailable ? 1 : 0.8}
          />
        </Svg>

        <Animated.Image
          source={type === "Weekly" ? RareChest : CommonChest}
          style={[
            styles.chestImage,
            disabled ? { opacity: 0.4 } : { opacity: 1 },
            { zIndex: 2 },
            {
              transform: [{ translateY: jumpAnim }],
            },
          ]}
          resizeMode="contain"
        />
      </View>
      <View style={disabled ? { opacity: 0.6 } : { opacity: 1 }}>
        <SubHeading color={colors.PrimaryWhite}>
          {capitalizeFirstLetter(type)} Chest
        </SubHeading>
        <StatText color={colors.PrimaryGrayDropShadow}>
          {timeRemaining}
        </StatText>
      </View>
    </TouchableOpacity>
  );
};
