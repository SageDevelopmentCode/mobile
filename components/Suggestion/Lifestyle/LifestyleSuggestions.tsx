import { View } from "react-native";
import { SuggestionItem } from "../SuggestionItem";

interface LifestyleSuggestionsProps {
  onSelect: (item: { title: string; emoji: string }) => void;
}

export const LifestyleSuggestions = ({
  onSelect,
}: LifestyleSuggestionsProps) => {
  return (
    <View>
      <SuggestionItem
        title="Lifestyle Suggestion"
        onPress={() => onSelect({ title: "Lifestyle Suggestion", emoji: "📖" })}
        emoji="📖"
      />
    </View>
  );
};
