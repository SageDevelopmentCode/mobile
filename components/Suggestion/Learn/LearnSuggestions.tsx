import { View } from "react-native";
import { SuggestionItem } from "../SuggestionItem";

interface LearnSuggestionsProps {
  onSelect: (item: { title: string; emoji: string }) => void;
}

export const LearnSuggestions = ({ onSelect }: LearnSuggestionsProps) => {
  return (
    <View>
      <SuggestionItem
        title="Learn Suggestion"
        onPress={() => onSelect({ title: "Learn Suggestion", emoji: "📖" })}
        emoji="📖"
      />
    </View>
  );
};
