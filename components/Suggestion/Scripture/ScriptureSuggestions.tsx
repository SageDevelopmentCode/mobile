import { ScrollView } from "react-native";
import { SuggestionItem } from "../SuggestionItem";

interface ScriptureSuggestionsProps {
  onSelect: (item: { title: string; emoji: string; verse?: string }) => void;
}

export const ScriptureSuggestions = ({
  onSelect,
}: ScriptureSuggestionsProps) => {
  return (
    <ScrollView
      showsVerticalScrollIndicator={true}
      contentContainerStyle={{ paddingBottom: 20 }}
    >
      <SuggestionItem
        title="Read John 3"
        onPress={() =>
          onSelect({ title: "Read John 3", emoji: "📖", verse: "John 3:1-36" })
        }
        emoji="📖"
        verse="John 3:1-36"
      />
      <SuggestionItem
        title="Read Psalm 23"
        onPress={() =>
          onSelect({
            title: "Read Psalm 23",
            emoji: "🙏",
            verse: "Psalm 23:1-6",
          })
        }
        emoji="🙏"
        verse="Psalm 23:1-6"
      />
      <SuggestionItem
        title="Read Matthew 5 (Beatitudes)"
        onPress={() =>
          onSelect({
            title: "Read Matthew 5 (Beatitudes)",
            emoji: "✝️",
            verse: "Matthew 5:1-12",
          })
        }
        emoji="✝️"
        verse="Matthew 5:1-12"
      />
      <SuggestionItem
        title="Read Romans 8"
        onPress={() =>
          onSelect({
            title: "Read Romans 8",
            emoji: "📚",
            verse: "Romans 8:1-39",
          })
        }
        emoji="📚"
        verse="Romans 8:1-39"
      />
      <SuggestionItem
        title="Read 1 Corinthians 13"
        onPress={() =>
          onSelect({
            title: "Read 1 Corinthians 13",
            emoji: "❤️",
            verse: "1 Corinthians 13:1-13",
          })
        }
        emoji="❤️"
        verse="1 Corinthians 13:1-13"
      />
      <SuggestionItem
        title="Read Proverbs 31"
        onPress={() =>
          onSelect({
            title: "Read Proverbs 31",
            emoji: "👑",
            verse: "Proverbs 31:10-31",
          })
        }
        emoji="👑"
        verse="Proverbs 31:10-31"
      />
      <SuggestionItem
        title="Read Genesis 1"
        onPress={() =>
          onSelect({
            title: "Read Genesis 1",
            emoji: "🌎",
            verse: "Genesis 1:1-31",
          })
        }
        emoji="🌎"
        verse="Genesis 1:1-31"
      />
      <SuggestionItem
        title="Read Exodus 20"
        onPress={() =>
          onSelect({
            title: "Read Exodus 20",
            emoji: "🗿",
            verse: "Exodus 20:1-17",
          })
        }
        emoji="🗿"
        verse="Exodus 20:1-17"
      />
      <SuggestionItem
        title="Study the Lord's Prayer"
        onPress={() =>
          onSelect({
            title: "Study the Lord's Prayer",
            emoji: "🧎",
            verse: "Matthew 6:9-13",
          })
        }
        emoji="🧎"
        verse="Matthew 6:9-13"
      />
      <SuggestionItem
        title="Read James 1"
        onPress={() =>
          onSelect({
            title: "Read James 1",
            emoji: "🔍",
            verse: "James 1:1-27",
          })
        }
        emoji="🔍"
        verse="James 1:1-27"
      />
    </ScrollView>
  );
};
