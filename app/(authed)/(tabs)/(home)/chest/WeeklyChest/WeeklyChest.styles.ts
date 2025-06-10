import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: "#BFCAE0",
    flex: 1,
    paddingTop: "20%",
  },
  topContainer: {
    paddingHorizontal: "5%",
    flex: 0.75,
  },
  contentContainer: {
    width: "100%",
    marginTop: "30%",
    alignItems: "center",
  },
  imageBackground: {
    flex: 0.25,
    alignItems: "center",
    justifyContent: "center",
  },
  rewardsContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  rewardCard: {
    alignItems: "center",
    justifyContent: "center",
    minWidth: 300,
    minHeight: 350,
  },
  rewardImage: {
    width: 160,
    height: 160,
  },
  rewardTextContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  progressContainer: {
    flexDirection: "row",
    marginTop: 30,
    gap: 10,
  },
  progressDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  tapInstruction: {
    marginTop: 20,
    padding: 10,
  },
  tapText: {
    fontSize: 16,
    color: "#4B5563",
    textAlign: "center",
    fontWeight: "500",
  },
  completionContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
});
