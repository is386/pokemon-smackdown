export function clamp(num: number, x: number, y: number): number {
  return Math.max(x, Math.min(y, num));
}
