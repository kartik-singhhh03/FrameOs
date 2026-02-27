/**
 * Returns "#ffffff" or "#000000" based on the perceived luminance of a hex colour.
 * Follows the ITU-R BT.601 luma formula: L = 0.299R + 0.587G + 0.114B
 */
export function getContrastColor(hex: string): "#ffffff" | "#000000" {
  const clean = hex.replace("#", "").padEnd(6, "0");
  const r = parseInt(clean.slice(0, 2), 16);
  const g = parseInt(clean.slice(2, 4), 16);
  const b = parseInt(clean.slice(4, 6), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance < 0.5 ? "#ffffff" : "#000000";
}

/** Rough WCAG contrast ratio between two hex colours (simplified, good enough for warnings). */
export function contrastRatio(fg: string, bg: string): number {
  const lum = (hex: string) => {
    const c = hex.replace("#", "").padEnd(6, "0");
    return [0, 2, 4].reduce((acc, i, idx) => {
      const v = parseInt(c.slice(i, i + 2), 16) / 255;
      const lin = v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
      return acc + lin * [0.2126, 0.7152, 0.0722][idx];
    }, 0);
  };
  const l1 = Math.max(lum(fg), lum(bg));
  const l2 = Math.min(lum(fg), lum(bg));
  return (l1 + 0.05) / (l2 + 0.05);
}

/** Returns true when contrast is WCAG AA compliant (≥ 4.5 for normal text). */
export function isGoodContrast(fg: string, bg: string): boolean {
  return contrastRatio(fg, bg) >= 4.5;
}

/**
 * Extracts a single representative hex color from a CSS gradient/solid value.
 * Picks the first #rrggbb token found, falls back to #888888.
 */
export function extractHexFromBackground(bg: string): string {
  const match = bg.match(/#[0-9A-Fa-f]{6}/);
  return match ? match[0] : "#888888";
}
