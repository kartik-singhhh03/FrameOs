/**
 * autoFormat.ts — Rule-based quote formatting utilities for FrameOS
 *
 * Produces balanced line breaks, detects emphasis-worthy words, and
 * suggests font-size / line-height adjustments based on quote length.
 */

// ─── Types ────────────────────────────────────────────────────────────────────

export interface FormatResult {
  /** Text with soft newlines inserted for balanced rendering */
  formattedText: string;
  /** Words the system flags as emphasis-worthy */
  emphasizedWords: string[];
  /** Suggested font-size multiplier (e.g. 1.15 or 0.88) */
  fontSizeMultiplier: number;
  /** Suggested line-height value */
  lineHeight: number;
}

export interface FormatOptions {
  /** Target characters per line (default 30) */
  maxCharsPerLine?: number;
  /** Base font size — used for size suggestion (default 28) */
  baseFontSize?: number;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

/**
 * Split text into word-boundary-safe lines with a target char width.
 * Produces 2-4 balanced lines wherever possible.
 */
function breakIntoLines(text: string, maxChars: number): string[] {
  const words = text.split(/\s+/).filter(Boolean);
  if (words.length === 0) return [];

  const lines: string[] = [];
  let current = "";

  for (const word of words) {
    const candidate = current ? `${current} ${word}` : word;
    if (candidate.length <= maxChars || !current) {
      current = candidate;
    } else {
      lines.push(current);
      current = word;
    }
  }
  if (current) lines.push(current);

  // If we produced too many lines, merge shortest adjacent pair once
  if (lines.length > 4) {
    let minLen = Infinity;
    let mergeIdx = 0;
    for (let i = 0; i < lines.length - 1; i++) {
      const merged = lines[i].length + lines[i + 1].length + 1;
      if (merged < minLen) {
        minLen = merged;
        mergeIdx = i;
      }
    }
    lines.splice(mergeIdx, 2, `${lines[mergeIdx]} ${lines[mergeIdx + 1]}`);
  }

  return lines;
}

/**
 * Balance lines so they're roughly even in length.
 * Moves words from a line that is much longer than the next one.
 */
function balanceLines(lines: string[]): string[] {
  const result = [...lines];
  let changed = true;
  let passes = 0;

  while (changed && passes < 8) {
    changed = false;
    passes++;
    for (let i = 0; i < result.length - 1; i++) {
      const curr = result[i];
      const next = result[i + 1];
      if (curr.length - next.length > 6) {
        const words = curr.split(" ");
        if (words.length > 1) {
          const moved = words.pop()!;
          result[i] = words.join(" ");
          result[i + 1] = `${moved} ${next}`;
          changed = true;
        }
      }
    }
  }

  return result;
}

// ─── Emphasis detection ───────────────────────────────────────────────────────

/**
 * Returns a list of words that should be emphasised, in priority order:
 *
 * 1. All-caps words (e.g. "FREEDOM", "NOW")
 * 2. Words immediately after a colon
 * 3. Last word of the quote
 * 4. Longest content word (fallback)
 *
 * De-duplicated, stripped of punctuation, max 3 words.
 */
export function detectEmphasisWords(text: string): string[] {
  if (!text.trim()) return [];

  const cleanWord = (w: string) => w.replace(/[^\w'-]/g, "");
  const words = text.split(/\s+/).filter(Boolean);
  const candidates: string[] = [];

  // Rule 1: all-caps words (≥2 chars, not just an abbreviation at start)
  for (const w of words) {
    const clean = cleanWord(w);
    if (
      clean.length >= 2 &&
      clean === clean.toUpperCase() &&
      /[A-Z]/.test(clean)
    ) {
      candidates.push(clean);
    }
  }

  // Rule 2: word(s) immediately after a colon
  const colonMatch = text.match(/:\s*([^\s,!?.]+)/);
  if (colonMatch) {
    const after = cleanWord(colonMatch[1]);
    if (after && !candidates.includes(after)) candidates.push(after);
  }

  // Rule 3: last word
  const lastWord = cleanWord(words[words.length - 1]);
  if (lastWord && !candidates.includes(lastWord)) candidates.push(lastWord);

  // Rule 4: fallback — longest word (skip stop-words ≤ 3 chars)
  if (candidates.length === 0) {
    const stopWords = new Set([
      "the",
      "and",
      "but",
      "for",
      "are",
      "not",
      "you",
      "all",
    ]);
    let longest = "";
    for (const w of words) {
      const clean = cleanWord(w).toLowerCase();
      if (clean.length > longest.length && !stopWords.has(clean)) {
        longest = cleanWord(w);
      }
    }
    if (longest) candidates.push(longest);
  }

  // Return deduplicated, max 3
  return [...new Set(candidates)].slice(0, 3);
}

// ─── Font-size suggestion ─────────────────────────────────────────────────────

function suggestFontSize(charCount: number): number {
  // Short quotes get a larger multiplier; long quotes shrink
  if (charCount <= 40) return 1.2;
  if (charCount <= 70) return 1.0;
  if (charCount <= 110) return 0.9;
  if (charCount <= 160) return 0.8;
  return 0.72;
}

function suggestLineHeight(lineCount: number): number {
  if (lineCount <= 1) return 1.2;
  if (lineCount <= 2) return 1.35;
  if (lineCount === 3) return 1.45;
  return 1.55;
}

// ─── Main export ──────────────────────────────────────────────────────────────

/**
 * formatQuote — primary entry point.
 *
 * @param text        Raw quote text
 * @param options     Formatting options
 * @returns           FormatResult with formattedText, emphasizedWords, size hints
 */
export function formatQuote(
  text: string,
  options: FormatOptions = {},
): FormatResult {
  const maxChars = options.maxCharsPerLine ?? 30;
  const raw = text.trim();

  if (!raw) {
    return {
      formattedText: "",
      emphasizedWords: [],
      fontSizeMultiplier: 1,
      lineHeight: 1.4,
    };
  }

  const rawLines = breakIntoLines(raw, maxChars);
  const balanced = balanceLines(rawLines);
  const formattedText = balanced.join("\n");

  const emphasizedWords = detectEmphasisWords(raw);
  const fontSizeMultiplier = suggestFontSize(raw.length);
  const lineHeight = suggestLineHeight(balanced.length);

  return { formattedText, emphasizedWords, fontSizeMultiplier, lineHeight };
}
