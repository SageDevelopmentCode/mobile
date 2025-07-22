import React, { useState, useMemo } from "react";
import { Image, ImageStyle, View, Animated, ViewStyle } from "react-native";
import { getBookImage } from "@/utils/data/bookImages";

interface DynamicBookImageProps {
  bookName: string;
  style?: ImageStyle | ImageStyle[];
  fallbackBookName?: string;
}

export const DynamicBookImage: React.FC<DynamicBookImageProps> = ({
  bookName,
  style,
  fallbackBookName = "Genesis",
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [fadeAnim] = useState(new Animated.Value(0));
  const [pulseAnim] = useState(new Animated.Value(0.7));

  // Get the appropriate image source using our local assets
  const imageSource = useMemo(() => {
    return getBookImage(bookName, fallbackBookName);
  }, [bookName, fallbackBookName]);

  const handleImageLoad = () => {
    setIsLoading(false);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  // Start pulsing animation when component mounts
  React.useEffect(() => {
    if (isLoading) {
      const pulseAnimation = Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 0.7,
            duration: 1000,
            useNativeDriver: true,
          }),
        ])
      );
      pulseAnimation.start();
      return () => pulseAnimation.stop();
    }
  }, [isLoading, pulseAnim]);

  // Get style dimensions for skeleton
  const styleArray = Array.isArray(style) ? style : [style];
  const flatStyle = styleArray.reduce((acc, curr) => ({ ...acc, ...curr }), {});
  const { width, height, borderRadius } = flatStyle as any;

  // Extract ViewStyle compatible properties for the container
  const containerStyle: ViewStyle = {
    width,
    height,
    borderRadius,
    position: "relative",
  };

  return (
    <View style={containerStyle}>
      {/* Skeleton Loading */}
      {isLoading && (
        <View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "#2A2A2A",
            borderRadius: borderRadius || 8,
          }}
        >
          <Animated.View
            style={{
              flex: 1,
              backgroundColor: "#3A3A3A",
              borderRadius: borderRadius || 8,
              opacity: pulseAnim,
            }}
          />
        </View>
      )}

      {/* Actual Image */}
      <Animated.Image
        source={imageSource}
        style={[
          style,
          {
            opacity: fadeAnim,
          },
        ]}
        onLoad={handleImageLoad}
        resizeMode="cover"
      />
    </View>
  );
};

export default DynamicBookImage;
