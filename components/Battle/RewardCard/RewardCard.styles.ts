import colors from "@/constants/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  card: {
    width: 100,
    borderRadius: 10,
    backgroundColor: colors.ZoneOneBattleCardBackground,
    overflow: "hidden",
    marginRight: 20,
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: 15,
  },
  chestImage: {
    height: "45%",
    marginBottom: 15,
  },
  textContainer: {
    paddingVertical: 5,
    paddingHorizontal: 15,
    backgroundColor: colors.PrimaryWhite,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
  },
});
