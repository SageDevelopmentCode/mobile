const colors = {
  LightBrownBackground: "#FBF7EF",
  PrimaryWhite: "#FFFFFF",
  BrownPrimaryText: "#956E60",
  DarkPrimaryText: "#4B5563",
  GrayText: "#B5B5B5",
} as const;

export type Colors = typeof colors; // Extract the type for the colors object
export default colors;
