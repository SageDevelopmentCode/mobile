import { View } from "react-native";
import { SuggestionItem } from "../SuggestionItem";

export const LearnSuggestions = () => {
  return (
    <View>
      <SuggestionItem
        title="Learn Suggestion"
        onPress={() => console.log("Read a Verse")}
        emoji="📖"
      />
    </View>
  );
};
