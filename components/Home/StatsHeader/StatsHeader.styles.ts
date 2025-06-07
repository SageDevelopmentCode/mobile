import colors from "@/constants/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  statsHeader: {
    width: "100%",
    paddingVertical: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center", // Align items vertically in the center
    marginBottom: 5,
    position: "absolute",
    top: 50,
    paddingHorizontal: "4%",
    zIndex: 10,
  },
  leftContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center", // Align items vertically in the center
    marginLeft: 15,
    gap: 10,
  },
  statBox: {
    backgroundColor: "#70CACA",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  statImage: {
    height: 25,
    width: 25,
    marginRight: 5,
  },
  goalImage: {
    height: 40,
    width: 40,
  },
  rightContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  characterAvatarContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 3,
    borderColor: colors.SolaraGreen,
    overflow: "hidden",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
  characterAvatar: {
    width: 40,
    height: 40,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
});
