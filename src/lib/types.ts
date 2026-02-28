export type AspectRatio =
  | "1:1"
  | "4:5"
  | "16:9"
  | "9:16"
  | "3:4"
  | "21:9"
  | "2:3"
  | "3:2"
  | "5:4"
  | "4:3";
export type TextAlign = "left" | "center" | "right";

export interface QuoteConfig {
  // Content
  quote: string;
  author: string;

  // Typography
  fontFamily: string;
  fontSize: number;
  textAlign: TextAlign;
  textColor: string;

  // Layout
  padding: number;
  borderRadius: number;
  enableShadow: boolean;

  // Background
  bgType: "solid" | "gradient";
  bgColor: string;
  bgGradient: string;
  bgImageUrl: string | null;
  bgOpacity: number;

  // Ratio
  aspectRatio: AspectRatio;
}

export const DEFAULT_CONFIG: QuoteConfig = {
  quote: "The best design is the one you don't notice.",
  author: "— Anonymous",
  fontFamily: "Inter",
  fontSize: 28,
  textAlign: "center",
  textColor: "#ffffff",
  padding: 48,
  borderRadius: 24,
  enableShadow: true,
  bgType: "gradient",
  bgColor: "#7c3aed",
  bgGradient: "linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%)",
  bgImageUrl: null,
  bgOpacity: 100,
  aspectRatio: "1:1",
};

export const GRADIENT_PRESETS = [
  {
    label: "Violet Dream",
    value: "linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%)",
  },
  {
    label: "Sunset",
    value: "linear-gradient(135deg, #f97316 0%, #ec4899 100%)",
  },
  {
    label: "Midnight",
    value: "linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)",
  },
  {
    label: "Ocean",
    value: "linear-gradient(135deg, #0ea5e9 0%, #6366f1 100%)",
  },
  {
    label: "Forest",
    value: "linear-gradient(135deg, #064e3b 0%, #10b981 100%)",
  },
  {
    label: "Rose Gold",
    value: "linear-gradient(135deg, #fb7185 0%, #fbbf24 100%)",
  },
  {
    label: "Carbon",
    value: "linear-gradient(135deg, #1f2937 0%, #374151 100%)",
  },
  {
    label: "Aurora",
    value: "linear-gradient(135deg, #a855f7 0%, #06b6d4 100%)",
  },
];

export const FONT_OPTIONS = [
  "Inter",
  "Playfair Display",
  "Poppins",
  "DM Sans",
  "Space Grotesk",
];

export const RATIO_OPTIONS: {
  label: string;
  value: AspectRatio;
  w: number;
  h: number;
}[] = [
  { label: "1:1", value: "1:1", w: 1, h: 1 },
  { label: "4:5", value: "4:5", w: 4, h: 5 },
  { label: "16:9", value: "16:9", w: 16, h: 9 },
  { label: "9:16", value: "9:16", w: 9, h: 16 },
  { label: "3:4", value: "3:4", w: 3, h: 4 },
  { label: "21:9", value: "21:9", w: 21, h: 9 },
  { label: "2:3", value: "2:3", w: 2, h: 3 },
  { label: "3:2", value: "3:2", w: 3, h: 2 },
  { label: "5:4", value: "5:4", w: 5, h: 4 },
  { label: "4:3", value: "4:3", w: 4, h: 3 },
];
