import { View } from "react-native";
import { SuggestionItem } from "../SuggestionItem";

export const ClassroomSuggestions = () => {
  return (
    <View>
      <SuggestionItem
        title="Classroom Suggestion"
        onPress={() => console.log("Read a Verse")}
        emoji="📖"
      />
    </View>
  );
};
