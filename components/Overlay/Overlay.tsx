import { TouchableOpacity } from "react-native";
import { styles } from "./Overlay.styles";

interface OverlayProps {
  onPress?: () => void;
}

function Overlay({ onPress }: OverlayProps) {
  return <TouchableOpacity style={styles.overlay} onPress={onPress} />;
}

export default Overlay;
