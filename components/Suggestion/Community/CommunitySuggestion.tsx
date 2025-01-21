import { View } from "react-native";
import { SuggestionItem } from "../SuggestionItem";

export const CommunitySuggestions = () => {
  return (
    <View>
      <SuggestionItem
        title="Community Suggestion"
        onPress={() => console.log("Read a Verse")}
        emoji="📖"
      />
    </View>
  );
};
