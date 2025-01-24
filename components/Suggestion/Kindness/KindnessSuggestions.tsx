import { View } from "react-native";
import { SuggestionItem } from "../SuggestionItem";

interface KindnessSuggestionsProps {
  onSelect: (item: { title: string; emoji: string }) => void;
}

export const KindnessSuggestions = ({ onSelect }: KindnessSuggestionsProps) => {
  return (
    <View>
      <SuggestionItem
        title="Kindness Suggestion"
        onPress={() => onSelect({ title: "Kindness Suggestion", emoji: "📖" })}
        emoji="📖"
      />
    </View>
  );
};
