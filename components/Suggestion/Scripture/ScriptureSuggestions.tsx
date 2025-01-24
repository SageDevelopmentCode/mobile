import { View } from "react-native";
import { SuggestionItem } from "../SuggestionItem";

interface ScriptureSuggestionsProps {
  onSelect: (item: { title: string; emoji: string }) => void;
}

export const ScriptureSuggestions = ({
  onSelect,
}: ScriptureSuggestionsProps) => {
  return (
    <View>
      <SuggestionItem
        title="Scripture Suggestion"
        onPress={() => onSelect({ title: "Scripture Suggestion", emoji: "📖" })}
        emoji="📖"
      />
    </View>
  );
};
