import { View } from "react-native";
import { SuggestionItem } from "../SuggestionItem";

export const ScriptureSuggestions = () => {
  return (
    <View>
      <SuggestionItem
        title="Scripture Suggestion"
        onPress={() => console.log("Read a Verse")}
        emoji="📖"
      />
    </View>
  );
};
