/**
 * editor-theme.js
 * Migrates all editor-related files from violet/purple to the green-earth palette.
 *
 * Earth palette:
 *   #252C25 — brand / button primary        (was violet-600 / purple-500)
 *   #1F261F — hover                          (was violet-700)
 *   #1C1F1C — primary text
 *   #5A635A — secondary / muted text        (was violet-400/500)
 *   #ECE7E2 — page background
 *   #F4F1ED — surface / card
 *   #D9D3CC — border / divider
 *   #AB6D48 — warm accent                   (was purple accent end)
 *   #7EA0AE — cool accent
 */

const fs = require("fs");
const path = require("path");

const SRC = path.join(__dirname, "../src");

// ─── Tailwind utility-class map ──────────────────────────────────────────────
// Applied in order — MORE specific entries must come first.
const TW_MAP = [
  // ── text ──
  ["text-violet-900", "text-[#1C1F1C]"],
  ["text-violet-700", "text-[#1C1F1C]"],
  ["text-violet-600", "text-[#5A635A]"],
  ["text-violet-500", "text-[#5A635A]"],
  ["text-violet-400", "text-[#5A635A]"],
  ["text-violet-300", "text-[#D9D3CC]"],
  ["text-violet-200", "text-[#D9D3CC]"],
  ["text-purple-400", "text-[#AB6D48]"],

  // ── bg ──
  ["bg-violet-600", "bg-[#252C25]"],
  ["bg-violet-200", "bg-[#D9D3CC]"],
  ["bg-violet-100", "bg-[#F4F1ED]"],
  ["bg-violet-50", "bg-[#ECE7E2]"],
  ["bg-purple-600", "bg-[#252C25]"],

  // ── border ──
  ["border-violet-600", "border-[#252C25]"],
  ["border-violet-400", "border-[#5A635A]"],
  ["border-violet-200", "border-[#D9D3CC]"],
  ["border-violet-100", "border-[#D9D3CC]"],

  // ── ring ──
  ["ring-violet-600", "ring-[#252C25]"],
  ["ring-violet-500", "ring-[#252C25]"],
  ["ring-violet-400", "ring-[#252C25]"],
  ["ring-violet-300", "ring-[#D9D3CC]"],

  // ── shadow ──
  ["shadow-violet-300/40", "shadow-[#D9D3CC]/40"],
  ["shadow-violet-200", "shadow-[#D9D3CC]"],

  // ── hover ──
  ["hover:bg-violet-200", "hover:bg-[#ECE7E2]"],
  ["hover:bg-violet-50", "hover:bg-[#ECE7E2]"],
  ["hover:border-violet-200", "hover:border-[#252C25]"],
  ["hover:text-violet-900", "hover:text-[#1C1F1C]"],
  ["hover:text-violet-700", "hover:text-[#1C1F1C]"],
  ["hover:text-violet-600", "hover:text-[#1C1F1C]"],

  // ── focus ──
  ["focus:ring-violet-400", "focus:ring-[#252C25]"],
  ["focus:ring-violet-300", "focus:ring-[#D9D3CC]"],
  ["focus-visible:ring-violet-500", "focus-visible:ring-[#252C25]"],
  ["focus-visible:ring-violet-400", "focus-visible:ring-[#252C25]"],

  // ── placeholder ──
  ["placeholder-violet-300", "placeholder-[#5A635A]/50"],

  // ── gradient from/to ──
  ["from-violet-700", "from-[#1F261F]"],
  ["from-violet-600", "from-[#252C25]"],
  ["to-purple-600", "to-[#252C25]"],
  ["to-purple-500", "to-[#AB6D48]"],
  ["to-purple-400", "to-[#AB6D48]"],

  // ── accent ──
  ["accent-violet-600", "accent-[#252C25]"],

  // ── divide ──
  ["divide-violet-100/60", "divide-[#D9D3CC]/60"],
  ["divide-violet-100", "divide-[#D9D3CC]"],

  // ── white utility overrides (glass-style → earth surface) ──
  ["bg-white/55", "bg-[#F4F1ED]/95"],
  ["bg-white/70", "bg-[#ECE7E2]/90"],
  ["bg-white/60", "bg-[#F4F1ED]"],
  ["bg-white/40", "bg-[#F4F1ED]/60"],
  ["border-white/70", "border-[#D9D3CC]"],
  ["border-white/60", "border-[#D9D3CC]"],
  ["border-white/50", "border-[#D9D3CC]"],
];

function applyTwMap(content) {
  for (const [from, to] of TW_MAP) {
    content = content.split(from).join(to);
  }
  return content;
}

// ─── 1. src/app/editor/page.tsx ──────────────────────────────────────────────
{
  const file = path.join(SRC, "app/editor/page.tsx");
  let c = fs.readFileSync(file, "utf8");

  // Page background
  c = c
    .split(
      "linear-gradient(135deg, #ede9fe 0%, #ddd6fe 20%, #c4b5fd 45%, #ede9fe 70%, #f5f3ff 100%)",
    )
    .join("#ECE7E2");

  // Header background
  c = c.split("rgba(255,255,255,0.55)").join("rgba(244,241,237,0.95)");

  // Logo icon: replace any remaining gradient with earth solid
  c = c
    .split("bg-gradient-to-br from-violet-600 to-purple-400")
    .join("bg-[#252C25]");

  // Download button gradient → solid
  c = c
    .split(
      "bg-gradient-to-r from-violet-600 to-purple-500 shadow-violet-200 hover:from-violet-700 hover:to-purple-600",
    )
    .join("bg-[#252C25] shadow-[#D9D3CC] hover:bg-[#1F261F]");

  c = applyTwMap(c);
  fs.writeFileSync(file, c);
  console.log("✓ app/editor/page.tsx");
}

// ─── 2. src/components/QuoteCanvas.tsx ───────────────────────────────────────
{
  const file = path.join(SRC, "components/QuoteCanvas.tsx");
  let c = fs.readFileSync(file, "utf8");

  // DEFAULT_STATE default canvas background
  c = c
    .split('"#7c3aed"')
    .join('"#252C25"')
    .split("'#7c3aed'")
    .join("'#252C25'");

  // DEFAULT_STATE backgroundGradient
  c = c
    .split("linear-gradient(135deg, #7c3aed, #4f46e5)")
    .join("linear-gradient(135deg, #252C25, #AB6D48)");

  // Left canvas area hover-glow background
  c = c
    .split(
      "radial-gradient(ellipse at 50% 30%, rgba(196,181,253,0.24) 0%, rgba(245,243,255,0.10) 70%)",
    )
    .join(
      "radial-gradient(ellipse at 50% 30%, rgba(171,109,72,0.10) 0%, rgba(236,231,226,0.05) 70%)",
    );

  // Canvas box-shadow
  c = c
    .split("0 24px 56px rgba(109,40,217,0.28)")
    .join("0 24px 56px rgba(37,44,37,0.18)");

  // Pro plan banner gradient → solid earth
  c = c
    .split("bg-gradient-to-r from-violet-600 to-purple-600")
    .join("bg-[#252C25]");
  c = c
    .split("text-violet-200 flex-shrink-0")
    .join("text-white/70 flex-shrink-0");
  c = c.split("text-violet-200 ml-1").join("text-white/60 ml-1");

  // Free plan upgrade link
  c = c
    .split(
      "text-[10px] font-bold text-violet-700 bg-violet-100 hover:bg-violet-200 px-2.5 py-1.5 rounded-xl transition-colors whitespace-nowrap",
    )
    .join(
      "text-[10px] font-bold text-[#252C25] bg-[#F4F1ED] hover:bg-[#ECE7E2] px-2.5 py-1.5 rounded-xl transition-colors whitespace-nowrap",
    );

  // Mobile bottom export bar
  c = c.split("border-violet-100/60").join("border-[#D9D3CC]/60");
  c = c.split("rgba(255,255,255,0.85)").join("rgba(244,241,237,0.95)");

  // Mobile export button gradient → solid
  c = c
    .split(
      "bg-gradient-to-r from-violet-600 to-purple-500 shadow-lg shadow-violet-200 hover:from-violet-700 hover:to-purple-600",
    )
    .join("bg-[#252C25] shadow-lg shadow-[#D9D3CC] hover:bg-[#1F261F]");

  // Profile photo upload button
  c = c
    .split(
      "rounded-xl bg-violet-100 hover:bg-violet-200 border border-violet-200 px-3 py-2 text-xs font-semibold text-violet-700 transition",
    )
    .join(
      "rounded-xl bg-[#F4F1ED] hover:bg-[#ECE7E2] border border-[#D9D3CC] px-3 py-2 text-xs font-semibold text-[#1C1F1C] transition",
    );

  c = applyTwMap(c);
  fs.writeFileSync(file, c);
  console.log("✓ components/QuoteCanvas.tsx");
}

// ─── 3. src/components/TemplateSelector.tsx ──────────────────────────────────
{
  const file = path.join(SRC, "components/TemplateSelector.tsx");
  let c = fs.readFileSync(file, "utf8");

  // TemplateMiniPreview inline style colors (social mini previews)
  c = c
    .split('"rgba(124,58,237,0.25)"')
    .join('"rgba(37,44,37,0.12)"')
    .split('"#f5f3ff"')
    .join('"#F4F1ED"')
    .split('"rgba(255,255,255,0.6)"')
    .join('"rgba(255,255,255,0.8)"')
    .split('"rgba(255,255,255,0.3)"')
    .join('"rgba(255,255,255,0.45)"')
    .split('"#7c3aed"')
    .join('"#252C25"')
    .split('"#c4b5fd"')
    .join('"#D9D3CC"');

  // TemplateMiniPreview class-based inactive card state
  c = c
    .split('"bg-violet-50 border-violet-200"')
    .join('"bg-[#ECE7E2] border-[#D9D3CC]"');
  c = c.split("bg-violet-200/80").join("bg-[#D9D3CC]/80");
  c = c.split("bg-violet-300/60").join("bg-[#D9D3CC]/60");

  c = applyTwMap(c);
  fs.writeFileSync(file, c);
  console.log("✓ components/TemplateSelector.tsx");
}

// ─── 4. src/components/SceneLayer.tsx ────────────────────────────────────────
{
  const file = path.join(SRC, "components/SceneLayer.tsx");
  let c = fs.readFileSync(file, "utf8");

  // minimal-gradient background: violet → warm earth
  c = c
    .split(
      '"linear-gradient(135deg, #ede9fe 0%, #ddd6fe 30%, #c4b5fd 55%, #ede9fe 80%, #f5f3ff 100%)"',
    )
    .join(
      '"linear-gradient(135deg, #ECE7E2 0%, #F4F1ED 30%, #D9D3CC 55%, #ECE7E2 80%, #F4F1ED 100%)"',
    );

  // minimal-gradient drop-shadow: violet → earth
  c = c.split("rgba(109,40,217,").join("rgba(37,44,37,");

  // macos-desktop background: deep purple → deep forest night
  c = c
    .split(
      '"linear-gradient(160deg, #1a1040 0%, #2a1060 25%, #3b1f80 50%, #1a1040 100%)"',
    )
    .join(
      '"linear-gradient(160deg, #0f1a0f 0%, #1C1F1C 25%, #252C25 50%, #0f1a0f 100%)"',
    );

  // macos-desktop overlay glow: violet → cool accent
  c = c.split("rgba(139,92,246,0.18)").join("rgba(125,160,174,0.18)");

  // dark-spotlight drop-shadow: violet → warm accent
  c = c.split("rgba(139,92,246,").join("rgba(171,109,72,");

  // dark-spotlight overlay: indigo tint → neutral earth
  c = c.split("rgba(79,70,229,0.08)").join("rgba(37,44,37,0.08)");

  // soft-studio background: near-violet grey → earth surface
  c = c.split('"#f0eff5"').join('"#F4F1ED"');

  fs.writeFileSync(file, c);
  console.log("✓ components/SceneLayer.tsx");
}

console.log("\nAll editor theme files updated ✓");
