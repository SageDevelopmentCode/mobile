const colors = {
  LightBrownBackground: "#F9F2E6",
  LightBrownDropShadow: "#E4D1BC",
  DarkBrownBackground: "#F3C68E",
  DarkBrownDropShadow: "#C9A373",
  PrimaryPurpleBackground: "#BF8EFF",
  PrimaryPurpleDropShadow: "#A57CDA",
  PrimaryGrayBackground: "#F3F4F6",
  PrimaryGrayDropShadow: "#D9D9D9",
  PrimaryWhite: "#FFFFFF",
  BrownPrimaryText: "#956E60",
  DarkPrimaryText: "#4B5563",
  GrayText: "#B5B5B5",
  Disabled: "#959595",
  DisabledBacking: "#7D7E79",
  DisabledText: "#C8C9C4",
  DarkPurpleBackground: "#1E1F33",
  DarkPurpleButton: "#2C2E4B",
  DarkPurpleButtonDropShadow: "#001123",
} as const;

export type Colors = typeof colors; // Extract the type for the colors object
export default colors;
