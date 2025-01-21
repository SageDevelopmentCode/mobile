import { View } from "react-native";
import { SuggestionItem } from "../SuggestionItem";

export const WorkplaceSuggestions = () => {
  return (
    <View>
      <SuggestionItem
        title="Workplace Suggestion"
        onPress={() => console.log("Read a Verse")}
        emoji="📖"
      />
    </View>
  );
};
