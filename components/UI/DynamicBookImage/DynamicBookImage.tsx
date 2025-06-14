import React, { useState } from "react";
import { Image, ImageStyle, View, Animated, ViewStyle } from "react-native";

interface DynamicBookImageProps {
  bookName: string;
  style?: ImageStyle | ImageStyle[];
  fallbackBookName?: string;
}

const SUPABASE_IMAGE_BASE_URL =
  "https://analjigcedgbgrvhoobi.supabase.co/storage/v1/object/public/book-images";

export const DynamicBookImage: React.FC<DynamicBookImageProps> = ({
  bookName,
  style,
  fallbackBookName = "Genesis",
}) => {
  const [imageSource, setImageSource] = useState<string>(
    `${SUPABASE_IMAGE_BASE_URL}/${bookName}.png`
  );
  const [hasErrored, setHasErrored] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [fadeAnim] = useState(new Animated.Value(0));
  const [pulseAnim] = useState(new Animated.Value(0.7));

  const handleImageError = () => {
    if (!hasErrored && bookName !== fallbackBookName) {
      setHasErrored(true);
      setImageSource(`${SUPABASE_IMAGE_BASE_URL}/${fallbackBookName}.png`);
      setIsLoading(true);
      fadeAnim.setValue(0);
    }
  };

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
        source={{ uri: imageSource }}
        style={[
          style,
          {
            opacity: fadeAnim,
          },
        ]}
        onError={handleImageError}
        onLoad={handleImageLoad}
        resizeMode="cover"
      />
    </View>
  );
};

export default DynamicBookImage;
