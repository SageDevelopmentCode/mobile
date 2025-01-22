import "expo-router";

declare module "expo-router" {
  export interface SearchParams {
    goal?: string;
    emoji?: string;
    [key: string]: string | undefined; // Allow additional parameters dynamically
  }
}
