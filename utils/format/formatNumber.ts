export function formatNumber(num: number): string {
  // Add commas for thousands, millions, etc.
  return num.toLocaleString();
}
