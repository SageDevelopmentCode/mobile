import { View } from "react-native";
import { SuggestionItem } from "../SuggestionItem";

interface WorkplaceSuggestionsProps {
  onSelect: (item: { title: string; emoji: string }) => void;
}

export const WorkplaceSuggestions = ({
  onSelect,
}: WorkplaceSuggestionsProps) => {
  return (
    <View>
      <SuggestionItem
        title="Workplace Suggestion"
        onPress={() => onSelect({ title: "Workplace Suggestion", emoji: "📖" })}
        emoji="📖"
      />
    </View>
  );
};
