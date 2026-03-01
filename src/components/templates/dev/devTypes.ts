// ─── Dev Mode Data ──────────────────────────────────────────────────────────
// Passed as an optional prop to all templates; dev templates consume it,
// frame / social templates safely ignore it.

export interface DevData {
  // ── Code Snippet mode ───────────────────────────────────────────────────
  code: string;
  language: string;
  filename: string;
  showLineNumbers: boolean;
  showMacHeader: boolean;

  // ── Terminal Screenshot mode ─────────────────────────────────────────────
  terminalLines: string; // raw multiline string; each line is a terminal output row
  prompt: string;
  showTerminalHeader: boolean;
  terminalAccentColor: string;

  // ── Metrics Announcement mode ────────────────────────────────────────────
  metricValue: string;
  metricLabel: string;
  metricSubtext: string;
  metricBadge: string;

  // ── Thread Builder mode ──────────────────────────────────────────────────
  threadText: string; // full raw text to split
  threadSlide: number; // current slide index (0-based)
  showSlideIndicator: boolean;

  // ── Build-in-Public Badge (overlay on any canvas) ────────────────────────
  badgeEnabled: boolean;
  badgeText: string;
  badgeOpacity: number; // 0–100
}

export const DEFAULT_DEV_DATA: DevData = {
  // Code
  code: `import { useState } from "react"\n\nexport function Counter() {\n  const [count, setCount] = useState(0)\n\n  return (\n    <button onClick={() => setCount(c => c + 1)}>\n      Count: {count}\n    </button>\n  )\n}`,
  language: "tsx",
  filename: "Counter.tsx",
  showLineNumbers: true,
  showMacHeader: true,

  // Terminal
  terminalLines: `npm install frameos\nnpm run build\n✓ Compiled in 1.4s\n✓ Ready on http://localhost:3000`,
  prompt: "$",
  showTerminalHeader: true,
  terminalAccentColor: "#22c55e",

  // Metrics
  metricValue: "100",
  metricLabel: "Users",
  metricSubtext: "in 14 days since launch",
  metricBadge: "🚀 Build in public",

  // Thread
  threadText:
    "Shipped in public for 30 days straight.\n\nHere's what I learned:\n\n1/ Start before you're ready. The first version will embarrass you. Ship it anyway.\n\n2/ Talk to users daily. Not weekly. Daily. They will tell you exactly what to build.\n\n3/ Distribution > product. Nobody discovers you by accident.",
  threadSlide: 0,
  showSlideIndicator: true,

  // Badge
  badgeEnabled: false,
  badgeText: "Day 24 of building",
  badgeOpacity: 80,
};

// ─── Helpers ─────────────────────────────────────────────────────────────────

/**
 * Splits raw text into slide strings.
 * Strategy: first split by double-newline; if a paragraph > maxChars,
 * further split at sentence boundaries.
 */
export function splitIntoSlides(text: string, maxChars = 280): string[] {
  const paragraphs = text
    .split(/\n\n+/)
    .map((p) => p.trim())
    .filter(Boolean);

  const slides: string[] = [];

  for (const para of paragraphs) {
    if (para.length <= maxChars) {
      slides.push(para);
      continue;
    }
    // Split long paragraph at sentence/clause boundaries
    const sentenceRe = /(?<=[.!?])\s+/;
    const sentences = para.split(sentenceRe);
    let current = "";
    for (const sentence of sentences) {
      if (current && current.length + sentence.length + 1 > maxChars) {
        slides.push(current.trim());
        current = sentence;
      } else {
        current = current ? `${current} ${sentence}` : sentence;
      }
    }
    if (current.trim()) slides.push(current.trim());
  }

  return slides.length > 0 ? slides : [""];
}
