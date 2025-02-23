import colors from "../colors";

export type characterTheme = {
  Background: string;
  ProgressBarBackground: string;
  ProgressEnergyBarColor: string;
  ProgressLevelBarColor: string;
  DialogOverlay: string;
  DialogImageContainer: string;
  CharacterTypeBackground: string;
  CharacterTypeShadow: string;
  CharacterTypeImageBackground: string;
  CharacterTypeTextBackground: string;
};

export const DeborahTheme: characterTheme = {
  Background: colors.DarkPurpleBackground,
  ProgressBarBackground: colors.PrimaryWhite,
  ProgressEnergyBarColor: colors.SolaraGreen,
  ProgressLevelBarColor: colors.PrimaryPurpleBackground,
  DialogOverlay: colors.DarkPurpleButton,
  DialogImageContainer: colors.DarkPurpleButtonDropShadow,
  CharacterTypeBackground: colors.DarkPurpleButtonDropShadow,
  CharacterTypeShadow: colors.DarkPurpleButtonDropShadow,
  CharacterTypeImageBackground: colors.DarkPurpleButtonDropShadow,
  CharacterTypeTextBackground: colors.DarkPurpleButton,
};

// export const GabrielTheme: characterTheme = {
//   Background: "#1E1E2C",
// };
