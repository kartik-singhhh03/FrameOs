"use client";

import { useState, useRef } from "react";
import {
  ChevronDown,
  Type,
  Palette,
  Image,
  LayoutGrid,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Download,
  RefreshCw,
} from "lucide-react";
import type { QuoteConfig, TextAlign } from "@/lib/types";
import { DEFAULT_CONFIG, FONT_OPTIONS, GRADIENT_PRESETS } from "@/lib/types";
import RatioSelector from "@/components/RatioSelector";

// ── helpers ──────────────────────────────────────────────────────────────────

interface SliderProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  unit?: string;
  onChange: (v: number) => void;
}

function Slider({
  label,
  value,
  min,
  max,
  step = 1,
  unit = "",
  onChange,
}: SliderProps) {
  return (
    <div className="space-y-1.5">
      <div className="flex justify-between">
        <label className="text-xs font-semibold text-violet-700">{label}</label>
        <span className="text-xs text-violet-400 font-mono tabular-nums">
          {value}
          {unit}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-violet-600 cursor-pointer"
        aria-label={label}
      />
    </div>
  );
}

interface SectionProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

function Section({ title, icon, children, defaultOpen = true }: SectionProps) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-violet-100/60 last:border-0">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-2 px-4 py-3 hover:bg-violet-50/50 transition-colors rounded-2xl"
        aria-expanded={open}
      >
        <span className="text-violet-500">{icon}</span>
        <span className="text-sm font-bold text-violet-800 flex-1 text-left">
          {title}
        </span>
        <ChevronDown
          className={`w-4 h-4 text-violet-400 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && <div className="px-4 pb-4 space-y-4">{children}</div>}
    </div>
  );
}

// ── main component ────────────────────────────────────────────────────────────

interface ControlsPanelProps {
  config: QuoteConfig;
  onChange: (patch: Partial<QuoteConfig>) => void;
  onDownload: () => void;
  onReset: () => void;
  isExporting: boolean;
}

export default function ControlsPanel({
  config,
  onChange,
  onDownload,
  onReset,
  isExporting,
}: ControlsPanelProps) {
  const imgInputRef = useRef<HTMLInputElement>(null);

  function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    onChange({ bgImageUrl: url, bgType: "solid" });
  }

  return (
    <aside className="w-full flex flex-col h-full bg-white/50 backdrop-blur-xl rounded-3xl shadow-xl border border-white/60 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-violet-100/60 flex-shrink-0">
        <h2 className="text-sm font-extrabold text-violet-900 tracking-tight">
          Customize
        </h2>
        <button
          type="button"
          onClick={onReset}
          title="Reset to defaults"
          className="flex items-center gap-1.5 text-xs text-violet-500 hover:text-violet-700 transition-colors"
          aria-label="Reset to defaults"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          Reset
        </button>
      </div>

      {/* Scrollable sections */}
      <div className="flex-1 overflow-y-auto">
        {/* ── Quote ────────────────────────────────── */}
        <Section title="Quote" icon={<Type className="w-4 h-4" />}>
          <div className="space-y-1.5">
            <label
              className="text-xs font-semibold text-violet-700"
              htmlFor="quote-input"
            >
              Quote text
            </label>
            <textarea
              id="quote-input"
              rows={4}
              value={config.quote}
              onChange={(e) => onChange({ quote: e.target.value })}
              placeholder="Enter your quote…"
              className="w-full rounded-2xl border border-violet-200 bg-white/70 px-3 py-2.5 text-sm text-violet-900 placeholder-violet-300 resize-none focus:outline-none focus:ring-2 focus:ring-violet-400 transition leading-relaxed"
            />
          </div>
          <div className="space-y-1.5">
            <label
              className="text-xs font-semibold text-violet-700"
              htmlFor="author-input"
            >
              Author
            </label>
            <input
              id="author-input"
              type="text"
              value={config.author}
              onChange={(e) => onChange({ author: e.target.value })}
              placeholder="— Author name"
              className="w-full rounded-2xl border border-violet-200 bg-white/70 px-3 py-2.5 text-sm text-violet-900 placeholder-violet-300 focus:outline-none focus:ring-2 focus:ring-violet-400 transition"
            />
          </div>
        </Section>

        {/* ── Typography ────────────────────────────── */}
        <Section
          title="Typography"
          icon={<Type className="w-4 h-4" />}
          defaultOpen={false}
        >
          {/* Font family */}
          <div className="space-y-1.5">
            <label
              className="text-xs font-semibold text-violet-700"
              htmlFor="font-select"
            >
              Font
            </label>
            <select
              id="font-select"
              value={config.fontFamily}
              onChange={(e) => onChange({ fontFamily: e.target.value })}
              className="w-full rounded-2xl border border-violet-200 bg-white/70 px-3 py-2.5 text-sm text-violet-900 focus:outline-none focus:ring-2 focus:ring-violet-400 transition"
            >
              {FONT_OPTIONS.map((f) => (
                <option key={f} value={f} style={{ fontFamily: f }}>
                  {f}
                </option>
              ))}
            </select>
          </div>

          {/* Font size */}
          <Slider
            label="Font size"
            value={config.fontSize}
            min={14}
            max={72}
            unit="px"
            onChange={(v) => onChange({ fontSize: v })}
          />

          {/* Text align */}
          <div className="space-y-1.5">
            <span className="text-xs font-semibold text-violet-700">
              Alignment
            </span>
            <div className="flex gap-2">
              {(["left", "center", "right"] as TextAlign[]).map((align) => {
                const icons = {
                  left: <AlignLeft className="w-4 h-4" />,
                  center: <AlignCenter className="w-4 h-4" />,
                  right: <AlignRight className="w-4 h-4" />,
                };
                return (
                  <button
                    key={align}
                    type="button"
                    aria-label={`Align ${align}`}
                    onClick={() => onChange({ textAlign: align })}
                    className={`flex-1 flex items-center justify-center py-2 rounded-2xl border transition-all ${
                      config.textAlign === align
                        ? "bg-violet-600 border-violet-600 text-white shadow-md"
                        : "bg-white/60 border-white/60 text-violet-500 hover:bg-violet-50"
                    }`}
                  >
                    {icons[align]}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Text color */}
          <div className="flex items-center justify-between">
            <label
              className="text-xs font-semibold text-violet-700"
              htmlFor="text-color"
            >
              Text color
            </label>
            <input
              id="text-color"
              type="color"
              value={config.textColor}
              onChange={(e) => onChange({ textColor: e.target.value })}
              className="w-10 h-8 rounded-xl border border-violet-200 cursor-pointer bg-transparent"
              aria-label="Text color"
            />
          </div>
        </Section>

        {/* ── Background ───────────────────────────── */}
        <Section
          title="Background"
          icon={<Palette className="w-4 h-4" />}
          defaultOpen={false}
        >
          {/* Bg type toggle */}
          <div className="flex gap-2">
            {(["gradient", "solid"] as const).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => onChange({ bgType: t })}
                className={`flex-1 py-2 rounded-2xl text-xs font-semibold border transition-all ${
                  config.bgType === t
                    ? "bg-violet-600 border-violet-600 text-white shadow-md"
                    : "bg-white/60 border-white/60 text-violet-500 hover:bg-violet-50"
                }`}
              >
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </button>
            ))}
          </div>

          {config.bgType === "gradient" ? (
            <div className="grid grid-cols-4 gap-2">
              {GRADIENT_PRESETS.map((g) => (
                <button
                  key={g.value}
                  type="button"
                  title={g.label}
                  aria-label={g.label}
                  onClick={() => onChange({ bgGradient: g.value })}
                  className={`h-10 rounded-2xl transition-all hover:scale-105 ${
                    config.bgGradient === g.value
                      ? "ring-2 ring-violet-600 ring-offset-2 scale-105"
                      : ""
                  }`}
                  style={{ background: g.value }}
                />
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-between">
              <label
                className="text-xs font-semibold text-violet-700"
                htmlFor="bg-color"
              >
                Solid color
              </label>
              <input
                id="bg-color"
                type="color"
                value={config.bgColor}
                onChange={(e) => onChange({ bgColor: e.target.value })}
                className="w-10 h-8 rounded-xl border border-violet-200 cursor-pointer bg-transparent"
                aria-label="Background color"
              />
            </div>
          )}

          {/* Opacity */}
          <Slider
            label="Opacity"
            value={config.bgOpacity}
            min={20}
            max={100}
            unit="%"
            onChange={(v) => onChange({ bgOpacity: v })}
          />

          {/* Image upload */}
          <div className="space-y-2">
            <span className="text-xs font-semibold text-violet-700">
              Background image
            </span>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => imgInputRef.current?.click()}
                className="flex items-center gap-2 flex-1 justify-center py-2.5 rounded-2xl border border-dashed border-violet-300 text-xs font-semibold text-violet-600 hover:bg-violet-50 transition"
              >
                <Image className="w-4 h-4" />
                Upload image
              </button>
              {config.bgImageUrl && (
                <button
                  type="button"
                  onClick={() => onChange({ bgImageUrl: null })}
                  className="py-2.5 px-3.5 rounded-2xl border border-red-200 text-xs font-semibold text-red-500 hover:bg-red-50 transition"
                  aria-label="Remove background image"
                >
                  Remove
                </button>
              )}
            </div>
            <input
              ref={imgInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
              aria-label="Upload background image"
            />
          </div>
        </Section>

        {/* ── Layout ──────────────────────────────── */}
        <Section
          title="Layout"
          icon={<LayoutGrid className="w-4 h-4" />}
          defaultOpen={false}
        >
          <Slider
            label="Padding"
            value={config.padding}
            min={16}
            max={120}
            unit="px"
            onChange={(v) => onChange({ padding: v })}
          />
          <Slider
            label="Border radius"
            value={config.borderRadius}
            min={0}
            max={64}
            unit="px"
            onChange={(v) => onChange({ borderRadius: v })}
          />
          {/* Shadow toggle */}
          <div className="flex items-center justify-between">
            <label
              className="text-xs font-semibold text-violet-700"
              htmlFor="shadow-toggle"
            >
              Drop shadow
            </label>
            <button
              id="shadow-toggle"
              type="button"
              role="switch"
              aria-checked={config.enableShadow}
              onClick={() => onChange({ enableShadow: !config.enableShadow })}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 ${
                config.enableShadow ? "bg-violet-600" : "bg-violet-200"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${
                  config.enableShadow ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>
        </Section>

        {/* ── Ratio ───────────────────────────────── */}
        <Section
          title="Canvas ratio"
          icon={<LayoutGrid className="w-4 h-4" />}
          defaultOpen={false}
        >
          <RatioSelector
            value={config.aspectRatio}
            onChange={(r) => onChange({ aspectRatio: r })}
          />
        </Section>
      </div>

      {/* Export button — sticky bottom */}
      <div className="flex-shrink-0 px-4 py-4 border-t border-violet-100/60">
        <button
          type="button"
          onClick={onDownload}
          disabled={isExporting}
          className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold py-3.5 rounded-2xl shadow-lg shadow-violet-300/40 hover:shadow-violet-400/50 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100 text-sm"
          aria-label="Download quote as PNG"
        >
          {isExporting ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin" />
              Exporting…
            </>
          ) : (
            <>
              <Download className="w-4 h-4" />
              Download PNG
            </>
          )}
        </button>
      </div>
    </aside>
  );
}
