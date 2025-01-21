import { View } from "react-native";
import { SuggestionItem } from "../SuggestionItem";

export const LifestyleSuggestions = () => {
  return (
    <View>
      <SuggestionItem
        title="Lifestyle Suggestion"
        onPress={() => console.log("Read a Verse")}
        emoji="📖"
      />
    </View>
  );
};
