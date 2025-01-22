import { View } from "react-native";
import { SuggestionItem } from "../SuggestionItem";

export const KindnessSuggestions = () => {
  return (
    <View>
      <SuggestionItem
        title="Kindness Suggestion"
        onPress={() => console.log("Read a Verse")}
        emoji="📖"
      />
    </View>
  );
};
