import { Text, StyleSheet } from "react-native";

export const parseHTML = (html: string): JSX.Element[] => {
  // Regex to find <span class="highlight"> and its content
  const spanRegex = /<span class="highlight">(.*?)<\/span>/g;

  // Replace the <span> with a custom <highlight> tag for further processing
  const parsedText = html.replace(spanRegex, (match, p1) => {
    return `<highlight>${p1}</highlight>`;
  });

  // Split the text at the <highlight> tags
  const segments = parsedText.split(/(<highlight>.*?<\/highlight>)/g);

  // Render the parsed text
  return segments.map((segment, index) => {
    // If it's the highlighted section, render with special styling
    if (segment.startsWith("<highlight>")) {
      const highlightedText = segment.replace(/<\/?highlight>/g, ""); // Remove the <highlight> tags
      return (
        <Text key={index} style={styles.highlightedText}>
          {highlightedText}
        </Text>
      );
    }
    // Regular text (non-highlighted)
    return <Text key={index}>{segment}</Text>;
  });
};

const styles = StyleSheet.create({
  highlightedText: {
    backgroundColor: "yellow", // Highlight color
    color: "black",
  },
});
