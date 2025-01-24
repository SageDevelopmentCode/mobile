import { View } from "react-native";
import { SuggestionItem } from "../SuggestionItem";

interface ClassroomSuggestionsProps {
  onSelect: (item: { title: string; emoji: string }) => void;
}

export const ClassroomSuggestions = ({
  onSelect,
}: ClassroomSuggestionsProps) => {
  return (
    <View>
      <SuggestionItem
        title="Classroom Suggestion"
        onPress={() => onSelect({ title: "Classroom Suggestion", emoji: "📖" })}
        emoji="📖"
      />
    </View>
  );
};
