const colors = {
  SkyBluePrimary: "#AFE3EF",
} as const;

export type Colors = typeof colors; // Extract the type for the colors object
export default colors;
