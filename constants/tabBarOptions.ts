import colors from "@/constants/colors";

type TabBarStyle = {
  position: "absolute";
  backgroundColor: string;
  borderTopWidth: number;
  elevation: number;
  borderRadius: number;
  height: number;
  marginHorizontal: number;
  bottom: number;
  paddingVertical: number;
  alignItems: "center";
  justifyContent: "center";
};

type TabBarLabelStyle = {
  fontSize: number;
  fontWeight: "400" | "500" | "600" | "700";
};

type TabBarIconStyle = {
  marginBottom: number;
  marginTop: number;
};

export const tabBarOptions = {
  tabBarStyle: <TabBarStyle>{
    position: "absolute", // Makes the tab bar float
    backgroundColor: "rgba(30, 31, 51, 0.98)", // Semi-transparent background
    borderTopWidth: 0, // Removes the default border
    elevation: 0, // Removes shadow on Android
    borderRadius: 15,
    height: 70, // Adjust height to give space
    marginHorizontal: 20, // Adds padding on the sides
    bottom: 30, // Floats the tab bar higher from the bottom
    paddingVertical: 10, // Adds vertical padding to center content
    alignItems: "center",
    justifyContent: "center", // Ensures content is centered vertically
  },
  tabBarLabelStyle: <TabBarLabelStyle>{
    fontSize: 12,
    fontWeight: "600",
  },
  tabBarIconStyle: <TabBarIconStyle>{
    marginBottom: 3, // Ensures icons are vertically aligned
    marginTop: 7,
  },
  tabBarActiveTintColor: colors.PrimaryPurpleBackground,
  tabBarInactiveTintColor: "#6c757d",
};
