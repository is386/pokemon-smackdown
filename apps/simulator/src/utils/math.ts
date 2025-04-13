export function clamp(num: number, lo: number, hi: number): number {
  return Math.max(lo, Math.min(hi, num));
}
