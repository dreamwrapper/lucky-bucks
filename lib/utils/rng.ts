export function rng(minRange: number, maxRange: number): number {
  return Math.floor(Math.random() * (maxRange - minRange + 1) + minRange);
}
