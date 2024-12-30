import colors from "@/constants/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    backgroundColor: colors.PrimaryWhite,
    width: "100%",
  },
  hero: {
    flex: 0.15,
    width: "100%",
    backgroundColor: colors.LightBrownBackground,
    padding: 30,
    paddingTop: 70,
  },
  version: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  dropdownButton: {
    backgroundColor: colors.PrimaryWhite,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    borderWidth: 1,
    borderColor: "#F0F0F0",
    color: colors.BrownPrimaryText,
    fontSize: 16,
  },
  dropdown: {
    marginTop: 10,
    backgroundColor: "#FFF",
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 5,
    width: "40%",
    maxHeight: 150, // Limits dropdown height
    position: "absolute",
    bottom: "-350%",
    right: 0,
  },
  dropdownItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#DDD",
  },
  dropdownItemText: {
    fontSize: 16,
  },
  searchBar: {
    flex: 1,
    height: 40,
    paddingHorizontal: 10,
    backgroundColor: "transparent",
    fontWeight: 600,
  },
});
