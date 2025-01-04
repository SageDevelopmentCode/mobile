import { useFonts } from "expo-font";
import {
  Nunito_800ExtraBold,
  Nunito_700Bold,
  Nunito_900Black,
} from "@expo-google-fonts/nunito";

import {
  NunitoSans_600SemiBold,
  NunitoSans_700Bold,
} from "@expo-google-fonts/nunito-sans";

export const useCustomFonts = () => {
  const [fontsLoaded] = useFonts({
    Nunito_800ExtraBold,
    Nunito_700Bold,
    Nunito_900Black,
    NunitoSans_600SemiBold,
    NunitoSans_700Bold,
  });

  return fontsLoaded;
};
