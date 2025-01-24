import { View } from "react-native";
import { SuggestionItem } from "../SuggestionItem";

interface CommunitySuggestionsProps {
  onSelect: (item: { title: string; emoji: string }) => void;
}

export const CommunitySuggestions = ({
  onSelect,
}: CommunitySuggestionsProps) => {
  return (
    <View>
      <SuggestionItem
        title="Community Suggestion"
        onPress={() => onSelect({ title: "Community Suggestion", emoji: "📖" })}
        emoji="📖"
      />
    </View>
  );
};
