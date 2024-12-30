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
    flex: 0.1,
    width: "100%",
    backgroundColor: colors.LightBrownBackground,
    padding: 20,
    paddingTop: 70,
  },
  version: {
    // flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    // position: "relative",
  },
  dropdownButton: {
    backgroundColor: "#007BFF",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    // width: "100%",
  },
  buttonText: {
    color: "#FFF",
    fontSize: 16,
  },
  dropdown: {
    marginTop: 10,
    backgroundColor: "#FFF",
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 5,
    width: "80%",
    maxHeight: 150, // Limits dropdown height
    position: "absolute",
    bottom: "-300%",
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
});
