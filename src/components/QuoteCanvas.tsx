"use client";

import {
  useState,
  useRef,
  useEffect,
  useCallback,
  useMemo,
  Fragment,
  forwardRef,
  memo,
  type ReactNode,
  type CSSProperties,
} from "react";
import type { ChangeEvent } from "react";
import {
  AlignLeft,
  AlignCenter,
  AlignRight,
  Sun,
  SunDim,
  Layers,
  User,
  ChevronDown,
  ChevronRight,
  Download,
} from "lucide-react";
import TemplateSelector from "./TemplateSelector";
import {
  TEMPLATES,
  DEFAULT_TEMPLATE_ID,
  SOCIAL_TEMPLATE_IDS,
  DEFAULT_SOCIAL_DATA,
} from "./templates/index";
import type { TemplateId, SocialData } from "./templates/index";
import SceneLayer, { SCENE_OPTIONS } from "./SceneLayer";
import type { SceneType } from "./SceneLayer";
import {
  getContrastColor,
  isGoodContrast,
  extractHexFromBackground,
} from "@/lib/colorUtils";
import { formatQuote, detectEmphasisWords } from "@/lib/autoFormat";
import type { FormatResult } from "@/lib/autoFormat";

// â”€â”€â”€ Types â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

type TextAlign = "left" | "center" | "right";
type AspectRatio = "1:1" | "4:5" | "16:9" | "9:16";
type EmphasisType = "highlight" | "color" | "underline" | "pill" | "none";

interface EmphasisConfig {
  type: EmphasisType;
  color: string;
  /** Index into auto-detected words list; -1 = all detected words */
  wordIndex: number;
}

interface ShadowConfig {
  enabled: boolean;
  offsetX: number;
  offsetY: number;
  blur: number;
  opacity: number;
}

interface CanvasState {
  quote: string;
  author: string;
  fontFamily: string;
  fontSize: number;
  fontWeight: number;
  lineHeight: number;
  letterSpacing: number;
  textTransform: string;
  showQuoteMark: boolean;
  textAlign: TextAlign;
  padding: number;
  borderRadius: number;
  shadowEnabled: boolean;
  textColor: string;
  backgroundColor: string;
  backgroundGradient: string;
  backgroundImage: string | null;
  aspectRatio: AspectRatio;
}

// â”€â”€â”€ Constants â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

const FONT_CATEGORIES = [
  {
    label: "Sans-serif",
    fonts: [
      "Inter",
      "Poppins",
      "DM Sans",
      "Space Grotesk",
      "Manrope",
      "Plus Jakarta Sans",
      "Outfit",
    ],
  },
  {
    label: "Serif",
    fonts: ["Playfair Display", "Cormorant", "Libre Baskerville", "Lora"],
  },
  {
    label: "Display",
    fonts: ["Bebas Neue", "Abril Fatface", "Syne"],
  },
  {
    label: "Mono",
    fonts: ["JetBrains Mono", "Fira Code"],
  },
] as const;

const FONT_WEIGHTS = [
  { value: 300, label: "Light" },
  { value: 400, label: "Regular" },
  { value: 500, label: "Medium" },
  { value: 600, label: "Semi Bold" },
  { value: 700, label: "Bold" },
  { value: 800, label: "Extra Bold" },
];

const GRADIENT_PRESETS = [
  { label: "Violet Dream", value: "linear-gradient(135deg, #252C25, #AB6D48)" },
  { label: "Sunset Blaze", value: "linear-gradient(135deg, #f97316, #ec4899)" },
  { label: "Ocean Drift", value: "linear-gradient(135deg, #0ea5e9, #6366f1)" },
  { label: "Midnight", value: "linear-gradient(135deg, #0f0c29, #302b63)" },
  { label: "Forest Deep", value: "linear-gradient(135deg, #064e3b, #10b981)" },
  { label: "Blush Rose", value: "linear-gradient(135deg, #fb7185, #fbbf24)" },
  { label: "Pearl Soft", value: "linear-gradient(135deg, #f0e6ff, #bfdbfe)" },
  { label: "Peach Haze", value: "linear-gradient(135deg, #fed7aa, #fda4af)" },
  { label: "Noir Cinema", value: "linear-gradient(160deg, #1a1a2e, #16213e)" },
  { label: "Sage Mist", value: "linear-gradient(135deg, #d4e6c3, #c8d5b9)" },
];

const PRESET_COLORS = [
  // Light
  { label: "White", value: "#FFFFFF" },
  { label: "Soft White", value: "#F8F8F8" },
  { label: "Beige", value: "#F5F5DC" },
  { label: "Cream", value: "#FAF3E0" },
  { label: "Light Grey", value: "#EDEDED" },
  // Dark
  { label: "Black", value: "#000000" },
  { label: "Rich Black", value: "#111111" },
  { label: "macOS Dark", value: "#1C1C1E" },
  { label: "Soft Charcoal", value: "#2B2B2B" },
  // Neutral Aesthetic
  { label: "Warm Neutral", value: "#D8CFC4" },
  { label: "Sand", value: "#E6E1D9" },
  { label: "Muted Sage", value: "#B7B7A4" },
  { label: "Green Beige", value: "#CCD5AE" },
];

const RECENT_COLORS_KEY = "frameos-recent-colors";
const MAX_RECENT = 6;

const EXPORT_QUALITY_OPTIONS = [
  { id: "auto", label: "Auto (Standard)" },
  { id: "2x", label: "2× Retina" },
  { id: "1080", label: "1080 × 1080 (Instagram)" },
  { id: "1350", label: "1080 × 1350 (4:5 Portrait)" },
  { id: "fhd", label: "1920 × 1080 (Full HD)" },
  { id: "4k", label: "2160 × 2160 (4K Ultra)" },
] as const;

type ExportQuality = (typeof EXPORT_QUALITY_OPTIONS)[number]["id"];

// Noise SVG data-URI (feTurbulence) — safe for html-to-image
const NOISE_SVG_URI =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n' x='0' y='0'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E";
const GRAIN_SVG_URI =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='g' x='0' y='0'%3E%3CfeTurbulence type='turbulence' baseFrequency='0.95' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23g)' opacity='1'/%3E%3C/svg%3E";

type FontPairingKey =
  | "modern"
  | "elegant"
  | "minimal"
  | "creative"
  | "developer";
interface FontPairing {
  label: string;
  fontFamily: string;
  fontWeight: number;
  letterSpacing: number;
  lineHeight: number;
}
const FONT_PAIRINGS: Record<FontPairingKey, FontPairing> = {
  modern: {
    label: "Modern",
    fontFamily: "Inter",
    fontWeight: 600,
    letterSpacing: -0.01,
    lineHeight: 1.5,
  },
  elegant: {
    label: "Elegant",
    fontFamily: "Playfair Display",
    fontWeight: 500,
    letterSpacing: 0.01,
    lineHeight: 1.75,
  },
  minimal: {
    label: "Minimal",
    fontFamily: "Manrope",
    fontWeight: 400,
    letterSpacing: -0.02,
    lineHeight: 1.6,
  },
  creative: {
    label: "Creative",
    fontFamily: "Syne",
    fontWeight: 700,
    letterSpacing: 0,
    lineHeight: 1.7,
  },
  developer: {
    label: "Developer",
    fontFamily: "JetBrains Mono",
    fontWeight: 500,
    letterSpacing: 0.02,
    lineHeight: 1.8,
  },
};

const ALIGN_OPTIONS: {
  value: TextAlign;
  icon: ReactNode;
  label: string;
}[] = [
  {
    value: "left",
    icon: <AlignLeft className="w-4 h-4" />,
    label: "Align left",
  },
  {
    value: "center",
    icon: <AlignCenter className="w-4 h-4" />,
    label: "Align center",
  },
  {
    value: "right",
    icon: <AlignRight className="w-4 h-4" />,
    label: "Align right",
  },
];

const RATIO_MAP: Record<AspectRatio, { w: number; h: number }> = {
  "1:1": { w: 1, h: 1 },
  "4:5": { w: 4, h: 5 },
  "16:9": { w: 16, h: 9 },
  "9:16": { w: 9, h: 16 },
};

const DEFAULT_STATE: CanvasState = {
  quote: "The best design is the one you don't notice.",
  author: "â€” Anonymous",
  fontFamily: "Inter",
  fontSize: 28,
  fontWeight: 600,
  lineHeight: 1.65,
  letterSpacing: -0.01,
  textTransform: "none",
  showQuoteMark: true,
  textAlign: "center",
  padding: 48,
  borderRadius: 24,
  shadowEnabled: true,
  textColor: "#ffffff",
  backgroundColor: "#252C25",
  backgroundGradient: "linear-gradient(135deg, #252C25, #AB6D48)",
  backgroundImage: null,
  aspectRatio: "1:1",
};

// â”€â”€â”€ Sub-components â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

interface SliderRowProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  unit?: string;
  onChange: (v: number) => void;
}

function SliderRow({
  label,
  value,
  min,
  max,
  step = 1,
  unit = "",
  onChange,
}: SliderRowProps) {
  return (
    <div className="space-y-1">
      <div className="flex justify-between items-center">
        <label className="text-xs font-semibold text-[#1C1F1C]">{label}</label>
        <span className="text-xs font-mono text-[#5A635A] tabular-nums">
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
        aria-label={label}
        className="w-full accent-[#252C25] cursor-pointer"
      />
    </div>
  );
}

interface ControlGroupProps {
  label: string;
  children: ReactNode;
  /** When provided, section becomes collapsible */
  sectionId?: string;
  collapsed?: boolean;
  onToggle?: () => void;
}

function ControlGroup({
  label,
  children,
  sectionId,
  collapsed,
  onToggle,
}: ControlGroupProps) {
  const isCollapsible = sectionId !== undefined && onToggle !== undefined;
  return (
    <div className="space-y-0">
      <button
        type="button"
        onClick={isCollapsible ? onToggle : undefined}
        className={[
          "w-full flex items-center justify-between py-3 focus:outline-none",
          isCollapsible ? "cursor-pointer select-none" : "cursor-default",
        ].join(" ")}
        style={{ minHeight: isCollapsible ? 44 : undefined }}
        tabIndex={isCollapsible ? 0 : -1}
        aria-expanded={isCollapsible ? !collapsed : undefined}
      >
        <span className="text-[11px] font-extrabold text-[#5A635A] uppercase tracking-widest">
          {label}
        </span>
        {isCollapsible &&
          (collapsed ? (
            <ChevronRight className="w-3.5 h-3.5 text-[#5A635A] flex-shrink-0" />
          ) : (
            <ChevronDown className="w-3.5 h-3.5 text-[#5A635A] flex-shrink-0" />
          ))}
      </button>
      {(!isCollapsible || !collapsed) && (
        <div className="space-y-3 pb-3">{children}</div>
      )}
    </div>
  );
}

// Mini thumbnail previews for each scene type
function SceneMiniPreview({ id, active }: { id: SceneType; active: boolean }) {
  const base =
    "w-full h-8 rounded-lg overflow-hidden relative flex items-center justify-center";
  const dot = "w-4 h-3 rounded-sm opacity-90";

  if (id === "minimal-gradient") {
    return (
      <div
        className={base}
        style={{ background: "linear-gradient(135deg,#ede9fe,#c4b5fd)" }}
      >
        <div className={dot} style={{ background: "rgba(255,255,255,0.7)" }} />
      </div>
    );
  }
  if (id === "macos-desktop") {
    return (
      <div
        className={base}
        style={{ background: "linear-gradient(160deg,#1a1040,#3b1f80)" }}
      >
        <div
          className={dot}
          style={{
            background: "rgba(255,255,255,0.25)",
            boxShadow: "0 2px 6px rgba(0,0,0,0.5)",
          }}
        />
      </div>
    );
  }
  if (id === "soft-studio") {
    return (
      <div className={base} style={{ background: "#f0eff5" }}>
        <div
          className={dot}
          style={{
            background: active
              ? "rgba(124,58,237,0.5)"
              : "rgba(124,58,237,0.2)",
            boxShadow: "0 4px 12px rgba(0,0,0,0.12)",
          }}
        />
      </div>
    );
  }
  // dark-spotlight
  return (
    <div className={base} style={{ background: "#0c0c0f" }}>
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse 70% 70% at 50% 50%,rgba(139,92,246,0.35),transparent)",
        }}
      />
      <div
        className={dot}
        style={{
          background: "rgba(255,255,255,0.15)",
          position: "relative",
          zIndex: 1,
        }}
      />
    </div>
  );
}

// Noise texture overlay (fractalNoise, mix-blend: overlay)
const NoiseOverlay = memo(function NoiseOverlay({
  opacity = 0.07,
}: {
  opacity?: number;
}) {
  return (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        backgroundImage: `url("${NOISE_SVG_URI}")`,
        backgroundRepeat: "repeat",
        backgroundSize: "200px 200px",
        opacity,
        mixBlendMode: "overlay",
        pointerEvents: "none",
      }}
    />
  );
});

// Grain overlay (higher-frequency turbulence, mix-blend: soft-light)
const GrainOverlay = memo(function GrainOverlay({
  opacity = 0,
}: {
  opacity?: number;
}) {
  if (opacity <= 0) return null;
  return (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        backgroundImage: `url("${GRAIN_SVG_URI}")`,
        backgroundRepeat: "repeat",
        backgroundSize: "300px 300px",
        opacity,
        mixBlendMode: "soft-light",
        pointerEvents: "none",
      }}
    />
  );
});

// â”€â”€â”€ Main component â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

interface QuoteCanvasProps {
  onExport?: () => void;
  isExporting?: boolean;
  onExportQualityChange?: (quality: string) => void;
}

/**
 * QuoteCanvas â€” self-contained quote design component.
 *
 * Manages all state internally. forwardRef attaches to #export-container
 * so a parent can call html-to-image on it for PNG export.
 */
const QuoteCanvas = forwardRef<HTMLDivElement, QuoteCanvasProps>(
  ({ onExport, isExporting = false, onExportQualityChange }, canvasRef) => {
    const [s, setS] = useState<CanvasState>(DEFAULT_STATE);
    const [selectedTemplate, setSelectedTemplate] =
      useState<TemplateId>(DEFAULT_TEMPLATE_ID);

    // â”€â”€ Scene state â”€â”€
    const [sceneEnabled, setSceneEnabled] = useState(false);
    const [sceneType, setSceneType] = useState<SceneType>("minimal-gradient");
    const [sceneScale, setSceneScale] = useState(1.0);
    const [sceneShadow, setSceneShadow] = useState(60);

    // -- Visual effects --
    const [bgBlur, setBgBlur] = useState(0);
    const [noiseEnabled, setNoiseEnabled] = useState(false);
    const [grainIntensity, setGrainIntensity] = useState(0);
    const [autoContrast, setAutoContrast] = useState(true);
    const [fontPairing, setFontPairing] = useState<FontPairingKey | "">("");

    // -- Background hex colour input state --
    const [hexInput, setHexInput] = useState("");
    const [hexError, setHexError] = useState(false);

    // -- Smart Format --
    const [autoFormatEnabled, setAutoFormatEnabled] = useState(true);
    const [emphasisConfig, setEmphasisConfig] = useState<EmphasisConfig>({
      type: "color",
      color: "#fbbf24",
      wordIndex: -1,
    });

    // -- Text position (drag) --
    const [dragPos, setDragPos] = useState({ x: 0, y: 0 });
    const dragRef = useRef<{
      active: boolean;
      startX: number;
      startY: number;
      posX: number;
      posY: number;
    }>({ active: false, startX: 0, startY: 0, posX: 0, posY: 0 });
    const contentDivRef = useRef<HTMLDivElement>(null);

    // -- Advanced shadow --
    const [shadowConfig, setShadowConfig] = useState<ShadowConfig>({
      enabled: true,
      offsetX: 0,
      offsetY: 8,
      blur: 24,
      opacity: 0.3,
    });
    const setShadow = (patch: Partial<ShadowConfig>) =>
      setShadowConfig((prev) => ({ ...prev, ...patch }));

    // -- Watermark --
    const [watermarkEnabled, setWatermarkEnabled] = useState(true);

    // -- Pro plan -- fetched from /api/subscription-status on mount
    const [isPro, setIsPro] = useState(false);
    useEffect(() => {
      fetch("/api/subscription-status")
        .then((r) => r.json())
        .then((d: { isPro?: boolean }) => {
          if (d.isPro) setIsPro(true);
        })
        .catch(() => {
          // Network error → stay on free tier silently
        });
    }, []);
    // Free users always get watermark; Pro users can toggle it
    const effectiveWatermark = !isPro || watermarkEnabled;

    // â”€â”€ Social template state â”€â”€
    const [socialData, setSocialData] =
      useState<SocialData>(DEFAULT_SOCIAL_DATA);
    const setSocial = (patch: Partial<SocialData>) =>
      setSocialData((prev) => ({ ...prev, ...patch }));
    const isSocial = (SOCIAL_TEMPLATE_IDS as string[]).includes(
      selectedTemplate,
    );
    const profileImgRef = useRef<HTMLInputElement>(null);

    const handleProfileImage = (e: ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) setSocial({ profileImageUrl: URL.createObjectURL(file) });
    };

    // â”€â”€ Canvas responsive scaling â”€â”€
    // canvasAreaRef measures the available preview width on screen.
    // previewScale shrinks the export-container to fit without overflow.
    // Canvas dimensions (declared early so getNativeExportWidth can depend on canvasWidth)
    const BASE_SIZE = 420;
    const { w, h } = RATIO_MAP[s.aspectRatio];
    const canvasWidth =
      s.aspectRatio === "16:9"
        ? BASE_SIZE
        : s.aspectRatio === "9:16"
          ? Math.round(BASE_SIZE * (w / h))
          : BASE_SIZE;
    const canvasHeight = Math.round(canvasWidth * (h / w));

    const canvasAreaRef = useRef<HTMLDivElement>(null);
    const [previewScale, setPreviewScale] = useState(1);

    // Estimate the raw (native) pixel width of the export-container.
    const getNativeExportWidth = useCallback(() => {
      if (sceneEnabled) return Math.round(canvasWidth * sceneScale + 300);
      const socialWidths: Record<string, number> = {
        "twitter-post": 480,
        "linkedin-post": 500,
        "instagram-post": 420,
        "threads-post": 480,
        "notion-page": 520,
        "code-snippet": 540,
      };
      if (isSocial && socialWidths[selectedTemplate])
        return socialWidths[selectedTemplate];
      return canvasWidth;
    }, [sceneEnabled, sceneScale, isSocial, selectedTemplate, canvasWidth]);

    useEffect(() => {
      const el = canvasAreaRef.current;
      if (!el) return;
      const measure = () => {
        const available = el.clientWidth - 16; // 8px padding each side
        const native = getNativeExportWidth();
        setPreviewScale(
          available > 0 && available < native ? available / native : 1,
        );
      };
      measure();
      const ro = new ResizeObserver(measure);
      ro.observe(el);
      return () => ro.disconnect();
    }, [getNativeExportWidth]);

    // â”€â”€ Collapsible control sections â”€â”€
    const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});
    const toggleSection = (id: string) =>
      setCollapsed((prev) => ({ ...prev, [id]: !prev[id] }));

    // -- Export quality --
    const [exportQuality, setExportQuality] = useState<ExportQuality>("auto");
    const handleExportQuality = (q: ExportQuality) => {
      setExportQuality(q);
      onExportQualityChange?.(q);
    };

    // -- Background: recent colors --
    // Always start with [] to avoid SSR/client hydration mismatch,
    // then load from localStorage on the client after mount.
    const [recentColors, setRecentColors] = useState<string[]>([]);
    useEffect(() => {
      try {
        const stored = JSON.parse(
          localStorage.getItem(RECENT_COLORS_KEY) ?? "[]",
        );
        if (Array.isArray(stored) && stored.length > 0) {
          setRecentColors(stored);
        }
      } catch {
        // ignore
      }
    }, []);
    const addRecentColor = useCallback((color: string) => {
      setRecentColors((prev) => {
        const next = [color, ...prev.filter((c) => c !== color)].slice(
          0,
          MAX_RECENT,
        );
        try {
          localStorage.setItem(RECENT_COLORS_KEY, JSON.stringify(next));
        } catch {
          // ignore
        }
        return next;
      });
    }, []);

    // -- Helpers --
    /** Partial-update shorthand for CanvasState */
    const set = (patch: Partial<CanvasState>) =>
      setS((prev) => ({ ...prev, ...patch }));

    /** Apply a gradient or solid-colour string to backgroundGradient */
    const setBackground = (value: string) => {
      set({ backgroundGradient: value });
      addRecentColor(value);
    };

    // -- Hex colour input handlers (state declared at top of component below) --
    const handleHexInput = (raw: string) => {
      setHexInput(raw);
      const hex = raw.trim().replace(/^#+/, "");
      if (/^[0-9a-fA-F]{6}$/.test(hex)) {
        setHexError(false);
        setBackground("#" + hex);
      } else {
        setHexError(raw.length > 0);
      }
    };

    // -- TemplateFrame: picks the right template component for selectedTemplate --
    function TemplateFrame({
      children,
      socialData: sd,
    }: {
      children: ReactNode;
      socialData: SocialData;
    }) {
      const tmpl = TEMPLATES.find((t) => t.id === selectedTemplate);
      if (!tmpl) return <>{children}</>;
      const Comp = tmpl.component;
      return <Comp socialData={sd}>{children}</Comp>;
    }

    // ─── Drag-to-reposition ───────────────────────────────────────────────────

    const clampDrag = (x: number, y: number) => {
      const maxX = canvasWidth * 0.33;
      const maxY = canvasHeight * 0.33;
      return {
        x: Math.max(-maxX, Math.min(maxX, x)),
        y: Math.max(-maxY, Math.min(maxY, y)),
      };
    };

    const handleDragStart = (clientX: number, clientY: number) => {
      dragRef.current = {
        active: true,
        startX: clientX,
        startY: clientY,
        posX: dragPos.x,
        posY: dragPos.y,
      };
    };

    const handleDragMove = (clientX: number, clientY: number) => {
      if (!dragRef.current.active) return;
      const scale = previewScale || 1;
      const rawX =
        dragRef.current.posX + (clientX - dragRef.current.startX) / scale;
      const rawY =
        dragRef.current.posY + (clientY - dragRef.current.startY) / scale;
      setDragPos(clampDrag(rawX, rawY));
    };

    const handleDragEnd = () => {
      dragRef.current.active = false;
    };

    const snapTo = (preset: "top" | "center" | "bottom" | "left" | "right") => {
      const maxX = canvasWidth * 0.28;
      const maxY = canvasHeight * 0.28;
      setDragPos((prev) => {
        switch (preset) {
          case "top":
            return { x: prev.x, y: -maxY };
          case "bottom":
            return { x: prev.x, y: maxY };
          case "center":
            return { x: 0, y: 0 };
          case "left":
            return { x: -maxX, y: prev.y };
          case "right":
            return { x: maxX, y: prev.y };
        }
      });
    };

    // ─── Format result (memoised so it only recomputes when quote changes) ────

    const formatResult: FormatResult = useMemo(
      () => formatQuote(s.quote, { maxCharsPerLine: 30 }),
      [s.quote],
    );

    const effectiveFontSize = autoFormatEnabled
      ? Math.round(s.fontSize * formatResult.fontSizeMultiplier)
      : s.fontSize;
    const effectiveLineHeight = autoFormatEnabled
      ? formatResult.lineHeight
      : s.lineHeight;

    /** Renders text with optional emphasis spans for export-safe output */
    function renderQuoteText(raw: string): ReactNode {
      const displayText =
        autoFormatEnabled && raw
          ? formatResult.formattedText || raw
          : raw || "Start typing your quote\u2026";

      if (emphasisConfig.type === "none") {
        return displayText.split("\n").map((line, i, arr) => (
          <Fragment key={i}>
            {line}
            {i < arr.length - 1 && <br />}
          </Fragment>
        ));
      }

      // Words to emphasise
      const autoWords = formatResult.emphasizedWords;
      const targetWords: string[] =
        emphasisConfig.wordIndex === -1
          ? autoWords
          : [displayText.split(/\s+/)[emphasisConfig.wordIndex] ?? ""].filter(
              Boolean,
            );

      const emphStyle = (): CSSProperties => {
        switch (emphasisConfig.type) {
          case "highlight":
            return {
              backgroundColor: emphasisConfig.color,
              padding: "0 3px",
              borderRadius: 3,
            };
          case "color":
            return { color: emphasisConfig.color };
          case "underline":
            return {
              textDecoration: "underline",
              textDecorationThickness: "0.1em",
            };
          case "pill":
            return {
              backgroundColor: emphasisConfig.color,
              color: "#fff",
              padding: "2px 10px",
              borderRadius: 999,
              display: "inline-block",
              lineHeight: "inherit",
            };
          default:
            return {};
        }
      };

      const lines = displayText.split("\n");
      return lines.map((line, li, allLines) => {
        const tokens = line.split(/(\s+)/);
        return (
          <Fragment key={li}>
            {tokens.map((tok, ti) => {
              const clean = tok.replace(/[^\w'-]/g, "").toLowerCase();
              const isEm =
                clean.length > 0 &&
                targetWords.some((w) => w.toLowerCase() === clean);
              return isEm ? (
                <span key={ti} style={emphStyle()}>
                  {tok}
                </span>
              ) : (
                <Fragment key={ti}>{tok}</Fragment>
              );
            })}
            {li < allLines.length - 1 && <br />}
          </Fragment>
        );
      });
    }

    // -- Compute effective text color (auto-contrast or manual) --
    const bgRepColor = s.backgroundImage
      ? "#888888" // image background: can't measure; manual color used unless autoContrast
      : extractHexFromBackground(s.backgroundGradient);
    const effectiveTextColor = autoContrast
      ? getContrastColor(bgRepColor)
      : s.textColor;
    const poorContrast =
      !autoContrast && !isGoodContrast(s.textColor, bgRepColor);

    const textShadow = shadowConfig.enabled
      ? `${shadowConfig.offsetX}px ${shadowConfig.offsetY}px ${shadowConfig.blur}px rgba(0,0,0,${shadowConfig.opacity})`
      : undefined;
    const boxShadow = shadowConfig.enabled
      ? "0 24px 56px rgba(37,44,37,0.18)"
      : undefined;

    // -- Quote canvas JSX (reused in both scene and bare modes) --
    const quoteCanvasJsx = (
      <div
        id="quote-canvas"
        onMouseMove={(e) => handleDragMove(e.clientX, e.clientY)}
        onMouseUp={handleDragEnd}
        onMouseLeave={handleDragEnd}
        onTouchMove={(e) => {
          const t = e.touches[0];
          handleDragMove(t.clientX, t.clientY);
        }}
        onTouchEnd={handleDragEnd}
        style={{
          width: canvasWidth,
          height: canvasHeight,
          borderRadius: s.borderRadius,
          boxShadow,
          position: "relative",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          // Gradient applied directly; image rendered as absolute layer below
          background: s.backgroundImage ? undefined : s.backgroundGradient,
        }}
      >
        {/* Background image layer: blur applies here only, never to content */}
        {s.backgroundImage && (
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage: `url(${s.backgroundImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              filter: bgBlur > 0 ? `blur(${bgBlur}px)` : undefined,
              // Scale up slightly so blurred edges don't expose canvas boundary
              transform: bgBlur > 0 ? "scale(1.06)" : undefined,
            }}
          />
        )}

        {/* Noise overlay */}
        {noiseEnabled && <NoiseOverlay opacity={0.09} />}

        {/* Grain overlay */}
        <GrainOverlay opacity={(grainIntensity / 100) * 0.22} />

        {/* Content — draggable; receives pointer-down; canvas captures move/up */}
        <div
          ref={contentDivRef}
          onMouseDown={(e) => {
            e.preventDefault();
            handleDragStart(e.clientX, e.clientY);
          }}
          onTouchStart={(e) => {
            const t = e.touches[0];
            handleDragStart(t.clientX, t.clientY);
          }}
          style={{
            position: "relative",
            zIndex: 1,
            padding: s.padding,
            width: "100%",
            textAlign: s.textAlign,
            fontFamily: `"${s.fontFamily}", sans-serif`,
            transform: `translate(${dragPos.x}px, ${dragPos.y}px)`,
            cursor: dragRef.current.active ? "grabbing" : "grab",
            touchAction: "none",
            userSelect: "none",
          }}
        >
          {/* Decorative open-quote */}
          {s.showQuoteMark && (
            <p
              aria-hidden="true"
              style={{
                fontSize: effectiveFontSize * 3,
                color: effectiveTextColor,
                opacity: 0.18,
                lineHeight: 0.5,
                marginBottom: 10,
                fontFamily: "Georgia, serif",
                userSelect: "none",
              }}
            >
              &ldquo;
            </p>
          )}

          {/* Quote body */}
          <p
            style={{
              fontSize: effectiveFontSize,
              color: effectiveTextColor,
              lineHeight: effectiveLineHeight,
              fontWeight: s.fontWeight,
              letterSpacing: `${s.letterSpacing}em`,
              textTransform: s.textTransform as CSSProperties["textTransform"],
              textShadow,
              wordBreak: "break-word",
              whiteSpace: "pre-wrap",
            }}
          >
            {renderQuoteText(s.quote)}
          </p>

          {/* Author */}
          {s.author && (
            <p
              style={{
                fontSize: Math.max(12, s.fontSize * 0.48),
                color: effectiveTextColor,
                opacity: 0.72,
                marginTop: s.fontSize * 0.8,
                fontWeight: 400,
                letterSpacing: "0.025em",
                textShadow,
              }}
            >
              {s.author}
            </p>
          )}
        </div>

        {/* Watermark */}
        {effectiveWatermark && (
          <span
            aria-hidden="true"
            style={{
              position: "absolute",
              bottom: 10,
              right: 14,
              fontSize: 9,
              color: effectiveTextColor,
              opacity: 0.28,
              fontFamily: '"Inter", sans-serif',
              letterSpacing: "0.1em",
              fontWeight: 700,
              userSelect: "none",
              pointerEvents: "none",
            }}
          >
            FRAMEOS
          </span>
        )}
      </div>
    );

    return (
      /* â”€â”€ Root: two-panel on lg+, single column on mobile â”€â”€â”€â”€â”€â”€ */
      <div className="flex flex-col lg:flex-row lg:items-start gap-4 sm:gap-6 w-full min-w-0">
        {/* â•â• LEFT PANE: Canvas preview â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
        <div
          ref={canvasAreaRef}
          className="w-full lg:flex-1 lg:sticky lg:top-20 flex justify-center items-start overflow-hidden"
        >
          <div
            className="relative flex items-start justify-center rounded-2xl sm:rounded-3xl p-4 sm:p-8 w-full"
            style={{
              background:
                "radial-gradient(ellipse at 50% 30%, rgba(171,109,72,0.10) 0%, rgba(236,231,226,0.05) 70%)",
            }}
          >
            {/* Scale wrapper: shrinks for display only; export captures native size */}
            <div
              style={{
                transformOrigin: "top center",
                transform: `scale(${previewScale})`,
                display: "inline-block",
                // collapse the extra vertical space when scaled down
                marginBottom:
                  previewScale < 1 ? `${(previewScale - 1) * 100}%` : undefined,
              }}
            >
              <div id="export-container" ref={canvasRef}>
                {sceneEnabled ? (
                  <SceneLayer
                    type={sceneType}
                    scale={sceneScale}
                    shadowIntensity={sceneShadow}
                  >
                    <TemplateFrame socialData={socialData}>
                      {quoteCanvasJsx}
                    </TemplateFrame>
                  </SceneLayer>
                ) : (
                  <TemplateFrame socialData={socialData}>
                    {quoteCanvasJsx}
                  </TemplateFrame>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* â•â• RIGHT PANE: Controls panel â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
        <div className="w-full lg:w-[380px] xl:w-[420px] flex-shrink-0 min-w-0">
          <div
            className="bg-[#F4F1ED]/95 backdrop-blur-xl rounded-2xl sm:rounded-3xl border border-[#D9D3CC] shadow-xl overflow-hidden"
            style={{ WebkitBackdropFilter: "blur(24px)" }}
          >
            <div className="divide-y divide-[#D9D3CC]/60">
              {/* Pro Plan Banner */}
              <div className="px-4 sm:px-5 py-3">
                {isPro ? (
                  <div className="flex items-center gap-2 bg-[#252C25] rounded-2xl px-4 py-2.5">
                    <svg
                      className="w-3.5 h-3.5 text-white/70 flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-xs font-bold text-white">
                      Pro Plan Active
                    </span>
                    <span className="text-[10px] text-white/60 ml-1">
                      All features unlocked
                    </span>
                  </div>
                ) : (
                  <div className="flex items-center justify-between bg-amber-50 border border-amber-200 rounded-2xl px-4 py-2.5">
                    <div>
                      <span className="text-xs font-bold text-amber-800">
                        Free Plan
                      </span>
                      <span className="text-[10px] text-amber-600 ml-2">
                        Watermark on export
                      </span>
                    </div>
                    <a
                      href="/upgrade"
                      className="text-[10px] font-bold text-[#252C25] bg-[#F4F1ED] hover:bg-[#ECE7E2] px-2.5 py-1.5 rounded-xl transition-colors whitespace-nowrap"
                    >
                      Upgrade $5/mo
                    </a>
                  </div>
                )}
              </div>
              {/* â”€â”€ Content â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
              <div className="px-4 sm:px-5">
                <ControlGroup
                  label="Content"
                  sectionId="content"
                  collapsed={collapsed["content"]}
                  onToggle={() => toggleSection("content")}
                >
                  <textarea
                    rows={3}
                    value={s.quote}
                    onChange={(e) => set({ quote: e.target.value })}
                    placeholder="Enter your quoteâ€¦"
                    aria-label="Quote text"
                    className="w-full rounded-2xl border border-[#D9D3CC] bg-[#ECE7E2]/90 px-3 py-2.5 text-sm text-[#1C1F1C] placeholder-[#5A635A]/50 resize-none focus:outline-none focus:ring-2 focus:ring-[#252C25] transition leading-relaxed"
                    style={{ wordBreak: "break-word" }}
                  />
                  <input
                    type="text"
                    value={s.author}
                    onChange={(e) => set({ author: e.target.value })}
                    placeholder="â€” Author name"
                    aria-label="Author"
                    className="w-full rounded-2xl border border-[#D9D3CC] bg-[#ECE7E2]/90 px-3 py-2.5 text-sm text-[#1C1F1C] placeholder-[#5A635A]/50 focus:outline-none focus:ring-2 focus:ring-[#252C25] transition"
                  />
                </ControlGroup>
              </div>

              {/* â”€â”€ Typography â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
              <div className="px-4 sm:px-5">
                <ControlGroup
                  label="Typography"
                  sectionId="typography"
                  collapsed={collapsed["typography"]}
                  onToggle={() => toggleSection("typography")}
                >
                  {/* Font pairing presets */}
                  <select
                    value={fontPairing}
                    onChange={(e) => {
                      const key = e.target.value as FontPairingKey | "";
                      setFontPairing(key);
                      if (key && FONT_PAIRINGS[key as FontPairingKey]) {
                        const p = FONT_PAIRINGS[key as FontPairingKey];
                        set({
                          fontFamily: p.fontFamily,
                          fontWeight: p.fontWeight,
                          letterSpacing: p.letterSpacing,
                          lineHeight: p.lineHeight,
                        });
                      }
                    }}
                    aria-label="Font style preset"
                    className="w-full rounded-2xl border border-[#D9D3CC] bg-[#ECE7E2]/90 px-3 py-2.5 text-sm text-[#1C1F1C] focus:outline-none focus:ring-2 focus:ring-[#252C25] transition"
                  >
                    <option value="">— Custom font —</option>
                    {(
                      Object.entries(FONT_PAIRINGS) as [
                        FontPairingKey,
                        FontPairing,
                      ][]
                    ).map(([k, v]) => (
                      <option key={k} value={k}>
                        {v.label}
                      </option>
                    ))}
                  </select>

                  {/* Font family – categorised */}
                  <select
                    value={s.fontFamily}
                    onChange={(e) => set({ fontFamily: e.target.value })}
                    aria-label="Font family"
                    className="w-full rounded-2xl border border-[#D9D3CC] bg-[#ECE7E2]/90 px-3 py-2.5 text-sm text-[#1C1F1C] focus:outline-none focus:ring-2 focus:ring-[#252C25] transition"
                  >
                    {FONT_CATEGORIES.map((cat) => (
                      <optgroup key={cat.label} label={cat.label}>
                        {cat.fonts.map((f) => (
                          <option key={f} value={f}>
                            {f}
                          </option>
                        ))}
                      </optgroup>
                    ))}
                  </select>

                  {/* Font weight */}
                  <div className="flex gap-1.5 flex-wrap">
                    {FONT_WEIGHTS.map((fw) => (
                      <button
                        key={fw.value}
                        type="button"
                        aria-label={fw.label}
                        aria-pressed={s.fontWeight === fw.value}
                        onClick={() => set({ fontWeight: fw.value })}
                        style={{ minHeight: 36, fontWeight: fw.value }}
                        className={[
                          "flex-1 min-w-[3rem] px-2 py-1 rounded-xl border text-xs transition-all duration-150",
                          s.fontWeight === fw.value
                            ? "bg-[#252C25] border-[#252C25] text-white shadow-sm"
                            : "bg-[#F4F1ED] border-[#D9D3CC] text-[#5A635A] hover:bg-[#ECE7E2] hover:border-[#D9D3CC]",
                        ].join(" ")}
                      >
                        {fw.value}
                      </button>
                    ))}
                  </div>

                  <SliderRow
                    label="Font size"
                    value={s.fontSize}
                    min={14}
                    max={72}
                    unit="px"
                    onChange={(v) => set({ fontSize: v })}
                  />
                  <SliderRow
                    label="Line height"
                    value={Math.round(s.lineHeight * 100)}
                    min={100}
                    max={250}
                    unit="%"
                    onChange={(v) => set({ lineHeight: v / 100 })}
                  />
                  <SliderRow
                    label="Letter spacing"
                    value={Math.round(s.letterSpacing * 100)}
                    min={-10}
                    max={30}
                    step={1}
                    unit=""
                    onChange={(v) => set({ letterSpacing: v / 100 })}
                  />

                  {/* Alignment */}
                  <div className="flex gap-2">
                    {ALIGN_OPTIONS.map(({ value, icon, label }) => (
                      <button
                        key={value}
                        type="button"
                        aria-label={label}
                        onClick={() => set({ textAlign: value })}
                        style={{ minHeight: 44 }}
                        className={[
                          "flex-1 flex items-center justify-center rounded-2xl border transition-all duration-150",
                          s.textAlign === value
                            ? "bg-[#252C25] border-[#252C25] text-white shadow-md shadow-[#D9D3CC]"
                            : "bg-[#F4F1ED] border-[#D9D3CC] text-[#5A635A] hover:bg-[#ECE7E2] hover:border-[#D9D3CC]",
                        ].join(" ")}
                      >
                        {icon}
                      </button>
                    ))}
                  </div>

                  {/* Text transform */}
                  <div className="flex gap-2">
                    {(
                      ["none", "uppercase", "lowercase", "capitalize"] as const
                    ).map((t) => (
                      <button
                        key={t}
                        type="button"
                        aria-label={`Transform: ${t}`}
                        aria-pressed={s.textTransform === t}
                        onClick={() => set({ textTransform: t })}
                        style={{ minHeight: 36 }}
                        className={[
                          "flex-1 px-1 py-1 rounded-xl border text-[10px] font-bold transition-all duration-150 truncate",
                          s.textTransform === t
                            ? "bg-[#252C25] border-[#252C25] text-white"
                            : "bg-[#F4F1ED] border-[#D9D3CC] text-[#5A635A] hover:bg-[#ECE7E2] hover:border-[#D9D3CC]",
                        ].join(" ")}
                      >
                        {t === "none"
                          ? "Aa"
                          : t === "uppercase"
                            ? "AA"
                            : t === "lowercase"
                              ? "aa"
                              : "Aa+"}
                      </button>
                    ))}
                  </div>

                  {/* Quote mark + text color row */}
                  <div
                    className="flex items-center justify-between gap-3"
                    style={{ minHeight: 44 }}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-[#1C1F1C]">
                        &ldquo; Mark
                      </span>
                      <button
                        type="button"
                        role="switch"
                        aria-checked={s.showQuoteMark}
                        aria-label="Show quotation mark"
                        onClick={() => set({ showQuoteMark: !s.showQuoteMark })}
                        className={[
                          "relative inline-flex h-7 w-12 items-center rounded-full transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#252C25]",
                          s.showQuoteMark ? "bg-[#252C25]" : "bg-[#D9D3CC]",
                        ].join(" ")}
                      >
                        <span
                          className={[
                            "pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transition-transform duration-200",
                            s.showQuoteMark ? "translate-x-6" : "translate-x-1",
                          ].join(" ")}
                        />
                      </button>
                    </div>
                    <div className="flex items-center gap-2">
                      <label
                        className="text-xs font-semibold text-[#1C1F1C]"
                        htmlFor="qc-text-color"
                      >
                        Text color
                      </label>
                      <input
                        id="qc-text-color"
                        type="color"
                        value={s.textColor}
                        onChange={(e) => set({ textColor: e.target.value })}
                        aria-label="Text color"
                        className="w-10 h-9 rounded-xl border border-[#D9D3CC] cursor-pointer bg-transparent"
                      />
                    </div>
                  </div>
                </ControlGroup>
              </div>

              {/* -- Smart Format -------------------------------------------- */}
              <div className="px-4 sm:px-5">
                <ControlGroup
                  label="Smart Format"
                  sectionId="smartformat"
                  collapsed={collapsed["smartformat"]}
                  onToggle={() => toggleSection("smartformat")}
                >
                  {/* Auto-format toggle */}
                  <div
                    className="flex items-center justify-between"
                    style={{ minHeight: 44 }}
                  >
                    <div>
                      <span className="text-xs font-semibold text-[#1C1F1C] block">
                        Smart Format
                      </span>
                      <span className="text-[10px] text-[#5A635A]">
                        Auto line-break &amp; font scale
                      </span>
                    </div>
                    <button
                      type="button"
                      role="switch"
                      aria-checked={autoFormatEnabled}
                      aria-label="Smart Format"
                      onClick={() => setAutoFormatEnabled((v) => !v)}
                      className={[
                        "relative inline-flex h-7 w-12 items-center rounded-full transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#252C25]",
                        autoFormatEnabled ? "bg-[#252C25]" : "bg-[#D9D3CC]",
                      ].join(" ")}
                    >
                      <span
                        className={[
                          "pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transition-transform duration-200",
                          autoFormatEnabled ? "translate-x-6" : "translate-x-1",
                        ].join(" ")}
                      />
                    </button>
                  </div>

                  {/* Emphasis type */}
                  <div className="space-y-2">
                    <p className="text-[10px] font-bold text-[#5A635A] uppercase tracking-wider">
                      Word emphasis
                    </p>
                    <div className="grid grid-cols-5 gap-1.5">
                      {(
                        [
                          "none",
                          "color",
                          "highlight",
                          "underline",
                          "pill",
                        ] as const
                      ).map((t) => (
                        <button
                          key={t}
                          type="button"
                          aria-label={`Emphasis: ${t}`}
                          aria-pressed={emphasisConfig.type === t}
                          onClick={() =>
                            setEmphasisConfig((prev) => ({ ...prev, type: t }))
                          }
                          style={{ minHeight: 36 }}
                          className={[
                            "px-1 py-1.5 rounded-xl border text-[9px] font-bold uppercase tracking-wide transition-all duration-150 truncate",
                            emphasisConfig.type === t
                              ? "bg-[#252C25] border-[#252C25] text-white"
                              : "bg-[#F4F1ED] border-[#D9D3CC] text-[#5A635A] hover:bg-[#ECE7E2] hover:border-[#D9D3CC]",
                          ].join(" ")}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Emphasis colour (when type is not none or underline) */}
                  {emphasisConfig.type !== "none" &&
                    emphasisConfig.type !== "underline" && (
                      <div
                        className="flex items-center gap-3"
                        style={{ minHeight: 44 }}
                      >
                        <label className="text-xs font-semibold text-[#1C1F1C] shrink-0">
                          Emphasis color
                        </label>
                        <input
                          type="color"
                          value={emphasisConfig.color}
                          onChange={(e) =>
                            setEmphasisConfig((prev) => ({
                              ...prev,
                              color: e.target.value,
                            }))
                          }
                          aria-label="Emphasis colour"
                          className="w-10 h-9 rounded-xl border border-[#D9D3CC] cursor-pointer bg-transparent"
                        />
                        <span className="text-xs font-mono text-[#5A635A]">
                          {emphasisConfig.color}
                        </span>
                      </div>
                    )}

                  {/* Detected emphasis words preview */}
                  {autoFormatEnabled &&
                    formatResult.emphasizedWords.length > 0 && (
                      <div className="rounded-xl bg-[#ECE7E2] border border-[#D9D3CC] px-3 py-2">
                        <p className="text-[10px] font-bold text-[#5A635A] uppercase tracking-wider mb-1.5">
                          Auto-detected words
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                          {formatResult.emphasizedWords.map((w) => (
                            <span
                              key={w}
                              className="px-2 py-0.5 rounded-full bg-[#F4F1ED] text-[#1C1F1C] text-[11px] font-semibold"
                            >
                              {w}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                </ControlGroup>
              </div>

              {/* â”€â”€ Background â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
              <div className="px-4 sm:px-5">
                <ControlGroup
                  label="Background"
                  sectionId="background"
                  collapsed={collapsed["background"]}
                  onToggle={() => toggleSection("background")}
                >
                  {/* Gradient presets */}
                  <div>
                    <p className="text-[10px] font-bold text-[#5A635A] uppercase tracking-wider mb-2">
                      Gradients
                    </p>
                    <div className="grid grid-cols-5 gap-2">
                      {GRADIENT_PRESETS.map((g) => (
                        <button
                          key={g.value}
                          type="button"
                          title={g.label}
                          aria-label={`${g.label} gradient`}
                          onClick={() => {
                            set({
                              backgroundGradient: g.value,
                              backgroundImage: null,
                            });
                            setHexInput("");
                          }}
                          style={{ background: g.value, minHeight: 36 }}
                          className={[
                            "h-9 rounded-xl transition-all duration-150 hover:scale-105",
                            s.backgroundGradient === g.value &&
                            !s.backgroundImage
                              ? "ring-2 ring-[#252C25] ring-offset-2 scale-105"
                              : "",
                          ].join(" ")}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Preset solid colors */}
                  <div>
                    <p className="text-[10px] font-bold text-[#5A635A] uppercase tracking-wider mb-2">
                      Preset colors
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {PRESET_COLORS.map((c) => (
                        <button
                          key={c.value}
                          type="button"
                          title={c.label}
                          aria-label={c.label}
                          onClick={() => setBackground(c.value)}
                          style={{
                            background: c.value,
                            width: 28,
                            height: 28,
                            minHeight: 28,
                            border:
                              c.value === "#FFFFFF" || c.value === "#F8F8F8"
                                ? "1.5px solid #e5e7eb"
                                : undefined,
                          }}
                          className={[
                            "rounded-full transition-all duration-150 hover:scale-110 flex-shrink-0",
                            s.backgroundColor === c.value &&
                            !s.backgroundImage &&
                            !s.backgroundGradient.startsWith("linear")
                              ? "ring-2 ring-[#252C25] ring-offset-2 scale-110"
                              : s.backgroundGradient === c.value &&
                                  !s.backgroundImage
                                ? "ring-2 ring-[#252C25] ring-offset-2 scale-110"
                                : "",
                          ].join(" ")}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Recent colors */}
                  {recentColors.length > 0 && (
                    <div>
                      <p className="text-[10px] font-bold text-[#5A635A] uppercase tracking-wider mb-2">
                        Recent
                      </p>
                      <div className="flex gap-2 flex-wrap">
                        {recentColors.map((c) => (
                          <button
                            key={c}
                            type="button"
                            title={c}
                            aria-label={`Recent: ${c}`}
                            onClick={() => setBackground(c)}
                            style={{
                              background: c,
                              width: 28,
                              height: 28,
                              minHeight: 28,
                              border:
                                c === "#FFFFFF" || c === "#F8F8F8"
                                  ? "1.5px solid #e5e7eb"
                                  : undefined,
                            }}
                            className={[
                              "rounded-full transition-all duration-150 hover:scale-110 flex-shrink-0",
                              s.backgroundGradient === c && !s.backgroundImage
                                ? "ring-2 ring-[#252C25] ring-offset-2"
                                : "",
                            ].join(" ")}
                          />
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Color picker + hex input */}
                  <div
                    className="flex items-center gap-3"
                    style={{ minHeight: 44 }}
                  >
                    <label className="text-xs font-semibold text-[#1C1F1C] flex-shrink-0">
                      Custom
                    </label>
                    <input
                      type="color"
                      value={s.backgroundColor}
                      onChange={(e) => setBackground(e.target.value)}
                      aria-label="Custom background color"
                      className="w-10 h-9 rounded-xl border border-[#D9D3CC] cursor-pointer bg-transparent flex-shrink-0"
                    />
                    <input
                      type="text"
                      value={hexInput}
                      onChange={(e) => handleHexInput(e.target.value)}
                      placeholder="#FFFFFF"
                      maxLength={7}
                      aria-label="Hex color code"
                      spellCheck={false}
                      className={[
                        "flex-1 min-w-0 rounded-xl border px-2.5 py-2 text-xs font-mono text-[#1C1F1C] bg-[#ECE7E2]/90 focus:outline-none focus:ring-2 transition",
                        hexError
                          ? "border-red-400 focus:ring-red-300 bg-red-50"
                          : "border-[#D9D3CC] focus:ring-[#252C25]",
                      ].join(" ")}
                    />
                  </div>
                </ControlGroup>
              </div>

              {/* -- Visual Effects ---------------------------------------------- */}
              <div className="px-4 sm:px-5">
                <ControlGroup
                  label="Visual Effects"
                  sectionId="effects"
                  collapsed={collapsed["effects"]}
                  onToggle={() => toggleSection("effects")}
                >
                  {/* Auto contrast warning badge */}
                  {poorContrast && (
                    <div className="flex items-center gap-2 rounded-xl bg-amber-50 border border-amber-200 px-3 py-2 text-[11px] text-amber-700">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="w-4 h-4 shrink-0"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495ZM10 5a.75.75 0 0 1 .75.75v3.5a.75.75 0 0 1-1.5 0v-3.5A.75.75 0 0 1 10 5Zm0 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Low contrast &mdash; text may be hard to read
                    </div>
                  )}

                  {/* Auto contrast toggle */}
                  <div
                    className="flex items-center justify-between"
                    style={{ minHeight: 44 }}
                  >
                    <span className="text-xs font-semibold text-[#1C1F1C]">
                      Auto contrast
                    </span>
                    <button
                      type="button"
                      role="switch"
                      aria-checked={autoContrast}
                      aria-label="Auto contrast"
                      onClick={() => setAutoContrast((v) => !v)}
                      className={[
                        "relative inline-flex h-7 w-12 items-center rounded-full transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#252C25]",
                        autoContrast ? "bg-[#252C25]" : "bg-[#D9D3CC]",
                      ].join(" ")}
                    >
                      <span
                        className={[
                          "pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transition-transform duration-200",
                          autoContrast ? "translate-x-6" : "translate-x-1",
                        ].join(" ")}
                      />
                    </button>
                  </div>

                  {/* Background image blur — only shown when an image is uploaded */}
                  {s.backgroundImage && (
                    <SliderRow
                      label="Image blur"
                      value={bgBlur}
                      min={0}
                      max={30}
                      unit="px"
                      onChange={setBgBlur}
                    />
                  )}

                  {/* Noise texture toggle */}
                  <div
                    className="flex items-center justify-between"
                    style={{ minHeight: 44 }}
                  >
                    <span className="text-xs font-semibold text-[#1C1F1C]">
                      Noise texture
                    </span>
                    <button
                      type="button"
                      role="switch"
                      aria-checked={noiseEnabled}
                      aria-label="Noise texture"
                      onClick={() => setNoiseEnabled((v) => !v)}
                      className={[
                        "relative inline-flex h-7 w-12 items-center rounded-full transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#252C25]",
                        noiseEnabled ? "bg-[#252C25]" : "bg-[#D9D3CC]",
                      ].join(" ")}
                    >
                      <span
                        className={[
                          "pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transition-transform duration-200",
                          noiseEnabled ? "translate-x-6" : "translate-x-1",
                        ].join(" ")}
                      />
                    </button>
                  </div>

                  {/* Grain intensity */}
                  <SliderRow
                    label="Grain intensity"
                    value={grainIntensity}
                    min={0}
                    max={100}
                    unit="%"
                    onChange={setGrainIntensity}
                  />
                </ControlGroup>
              </div>
              {/* â”€â”€ Layout â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
              <div className="px-4 sm:px-5">
                <ControlGroup
                  label="Layout"
                  sectionId="layout"
                  collapsed={collapsed["layout"]}
                  onToggle={() => toggleSection("layout")}
                >
                  <SliderRow
                    label="Padding"
                    value={s.padding}
                    min={16}
                    max={120}
                    unit="px"
                    onChange={(v) => set({ padding: v })}
                  />
                  <SliderRow
                    label="Border radius"
                    value={s.borderRadius}
                    min={0}
                    max={64}
                    unit="px"
                    onChange={(v) => set({ borderRadius: v })}
                  />
                  {/* Text position snap buttons */}
                  <div className="space-y-2">
                    <p className="text-[10px] font-bold text-[#5A635A] uppercase tracking-wider">
                      Text position
                    </p>
                    <div className="grid grid-cols-5 gap-1.5">
                      {(
                        ["top", "left", "center", "right", "bottom"] as const
                      ).map((p) => (
                        <button
                          key={p}
                          type="button"
                          aria-label={`Snap ${p}`}
                          onClick={() => snapTo(p)}
                          style={{ minHeight: 36 }}
                          className="px-1 py-1.5 rounded-xl border border-[#D9D3CC] bg-[#F4F1ED] text-[#5A635A] text-[10px] font-bold uppercase hover:bg-[#ECE7E2] hover:border-[#D9D3CC] transition-all capitalize truncate"
                        >
                          {p}
                        </button>
                      ))}
                    </div>
                    {(dragPos.x !== 0 || dragPos.y !== 0) && (
                      <button
                        type="button"
                        onClick={() => setDragPos({ x: 0, y: 0 })}
                        className="w-full text-[10px] text-[#5A635A] hover:text-[#5A635A] underline underline-offset-2 transition-colors text-center"
                      >
                        Reset position
                      </button>
                    )}
                  </div>

                  {/* Advanced shadow */}
                  <div className="space-y-2">
                    <div
                      className="flex items-center justify-between"
                      style={{ minHeight: 44 }}
                    >
                      <label
                        className="text-xs font-semibold text-[#1C1F1C]"
                        htmlFor="qc-shadow-toggle"
                      >
                        Drop shadow
                      </label>
                      <button
                        id="qc-shadow-toggle"
                        type="button"
                        role="switch"
                        aria-checked={shadowConfig.enabled}
                        onClick={() =>
                          setShadow({ enabled: !shadowConfig.enabled })
                        }
                        className={[
                          "relative inline-flex h-7 w-12 items-center rounded-full transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#252C25]",
                          shadowConfig.enabled
                            ? "bg-[#252C25]"
                            : "bg-[#D9D3CC]",
                        ].join(" ")}
                      >
                        <span
                          className={[
                            "pointer-events-none inline-flex h-5 w-5 items-center justify-center rounded-full bg-white shadow transition-transform duration-200",
                            shadowConfig.enabled
                              ? "translate-x-6"
                              : "translate-x-1",
                          ].join(" ")}
                        >
                          {shadowConfig.enabled ? (
                            <Sun className="w-2.5 h-2.5 text-[#5A635A]" />
                          ) : (
                            <SunDim className="w-2.5 h-2.5 text-[#D9D3CC]" />
                          )}
                        </span>
                      </button>
                    </div>
                    {shadowConfig.enabled && (
                      <>
                        <SliderRow
                          label="X offset"
                          value={shadowConfig.offsetX}
                          min={-50}
                          max={50}
                          unit="px"
                          onChange={(v) => setShadow({ offsetX: v })}
                        />
                        <SliderRow
                          label="Y offset"
                          value={shadowConfig.offsetY}
                          min={-50}
                          max={50}
                          unit="px"
                          onChange={(v) => setShadow({ offsetY: v })}
                        />
                        <SliderRow
                          label="Blur"
                          value={shadowConfig.blur}
                          min={0}
                          max={100}
                          unit="px"
                          onChange={(v) => setShadow({ blur: v })}
                        />
                        <SliderRow
                          label="Opacity"
                          value={Math.round(shadowConfig.opacity * 100)}
                          min={0}
                          max={100}
                          unit="%"
                          onChange={(v) => setShadow({ opacity: v / 100 })}
                        />
                      </>
                    )}
                  </div>

                  {/* Watermark toggle */}
                  <div
                    className="flex items-center justify-between"
                    style={{ minHeight: 44 }}
                  >
                    <div>
                      <span className="text-xs font-semibold text-[#1C1F1C] block">
                        FrameOS watermark
                      </span>
                      <span className="text-[10px] text-[#5A635A]">
                        Shown on exported image
                      </span>
                    </div>
                    <button
                      type="button"
                      role="switch"
                      aria-checked={watermarkEnabled}
                      aria-label="Show watermark"
                      onClick={() => setWatermarkEnabled((v) => !v)}
                      className={[
                        "relative inline-flex h-7 w-12 items-center rounded-full transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#252C25]",
                        watermarkEnabled ? "bg-[#252C25]" : "bg-[#D9D3CC]",
                      ].join(" ")}
                    >
                      <span
                        className={[
                          "pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transition-transform duration-200",
                          watermarkEnabled ? "translate-x-6" : "translate-x-1",
                        ].join(" ")}
                      />
                    </button>
                  </div>
                </ControlGroup>
              </div>

              {/* â”€â”€ Template â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
              <div className="px-4 sm:px-5">
                <ControlGroup
                  label="Template"
                  sectionId="template"
                  collapsed={collapsed["template"]}
                  onToggle={() => toggleSection("template")}
                >
                  <TemplateSelector
                    selected={selectedTemplate}
                    onChange={setSelectedTemplate}
                    isPro={isPro}
                  />
                </ControlGroup>
              </div>

              {/* â”€â”€ Social Profile (only when social template) â”€â”€ */}
              {isSocial && (
                <div className="px-4 sm:px-5">
                  <ControlGroup
                    label="Social Profile"
                    sectionId="social"
                    collapsed={collapsed["social"]}
                    onToggle={() => toggleSection("social")}
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {(
                        [
                          ["Display name", "displayName", "FrameOS"],
                          ["Handle", "handle", "@frameos"],
                          [
                            "Designation",
                            "designation",
                            "Designer & developer",
                          ],
                          ["Timestamp", "timestamp", "2h ago"],
                          ["Like count", "likeCount", "1,204"],
                          ["Filename", "filename", "quote.ts"],
                        ] as [string, keyof SocialData, string][]
                      ).map(([lbl, key, ph]) => (
                        <div key={String(key)} className="space-y-1">
                          <label className="text-xs font-semibold text-[#1C1F1C]">
                            {lbl}
                          </label>
                          <input
                            type="text"
                            value={String(socialData[key] ?? "")}
                            onChange={(e) =>
                              setSocial({ [key]: e.target.value })
                            }
                            placeholder={ph}
                            aria-label={lbl}
                            className="w-full rounded-2xl border border-[#D9D3CC] bg-[#ECE7E2]/90 px-3 py-2.5 text-sm text-[#1C1F1C] placeholder-[#5A635A]/50 focus:outline-none focus:ring-2 focus:ring-[#252C25] transition"
                          />
                        </div>
                      ))}
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-[#1C1F1C]">
                        Caption
                      </label>
                      <textarea
                        rows={2}
                        value={socialData.caption}
                        onChange={(e) => setSocial({ caption: e.target.value })}
                        placeholder="Add a captionâ€¦"
                        aria-label="Caption"
                        className="w-full rounded-2xl border border-[#D9D3CC] bg-[#ECE7E2]/90 px-3 py-2 text-sm text-[#1C1F1C] placeholder-[#5A635A]/50 resize-none focus:outline-none focus:ring-2 focus:ring-[#252C25] transition"
                      />
                    </div>
                    <div
                      className="flex flex-wrap items-center justify-between gap-3"
                      style={{ minHeight: 44 }}
                    >
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs font-semibold text-[#1C1F1C]">
                          Profile photo
                        </span>
                        <button
                          type="button"
                          onClick={() => profileImgRef.current?.click()}
                          className="rounded-xl bg-[#F4F1ED] hover:bg-[#ECE7E2] border border-[#D9D3CC] px-3 py-2 text-xs font-semibold text-[#1C1F1C] transition"
                        >
                          {socialData.profileImageUrl ? "Change" : "Upload"}
                        </button>
                        {socialData.profileImageUrl && (
                          <button
                            type="button"
                            onClick={() => setSocial({ profileImageUrl: null })}
                            className="text-xs text-red-400 hover:text-red-600 transition py-2"
                          >
                            Remove
                          </button>
                        )}
                        <input
                          ref={profileImgRef}
                          type="file"
                          accept="image/*"
                          onChange={handleProfileImage}
                          className="hidden"
                          aria-label="Upload profile photo"
                        />
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold text-[#1C1F1C]">
                          Dark mode
                        </span>
                        <button
                          type="button"
                          role="switch"
                          aria-checked={socialData.darkMode}
                          aria-label="Dark mode"
                          onClick={() =>
                            setSocial({ darkMode: !socialData.darkMode })
                          }
                          className={[
                            "relative inline-flex h-7 w-12 items-center rounded-full transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#252C25]",
                            socialData.darkMode
                              ? "bg-[#252C25]"
                              : "bg-[#D9D3CC]",
                          ].join(" ")}
                        >
                          <span
                            className={[
                              "pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transition-transform duration-200",
                              socialData.darkMode
                                ? "translate-x-6"
                                : "translate-x-1",
                            ].join(" ")}
                          />
                        </button>
                      </div>
                    </div>
                  </ControlGroup>
                </div>
              )}

              {/* â”€â”€ Scene Mode â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
              <div className="px-4 sm:px-5 py-3">
                <div
                  className="flex items-center justify-between"
                  style={{ minHeight: 44 }}
                >
                  <div className="flex items-center gap-2">
                    <Layers className="w-3.5 h-3.5 text-[#5A635A] flex-shrink-0" />
                    <p className="text-[11px] font-extrabold text-[#5A635A] uppercase tracking-widest">
                      Scene Mode
                    </p>
                  </div>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={sceneEnabled}
                    aria-label="Enable scene background"
                    onClick={() => setSceneEnabled((v) => !v)}
                    className={[
                      "relative inline-flex h-7 w-12 items-center rounded-full transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#252C25]",
                      sceneEnabled ? "bg-[#252C25]" : "bg-[#D9D3CC]",
                    ].join(" ")}
                  >
                    <span
                      className={[
                        "pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transition-transform duration-200",
                        sceneEnabled ? "translate-x-6" : "translate-x-1",
                      ].join(" ")}
                    />
                  </button>
                </div>
                <div
                  style={{
                    display: "grid",
                    gridTemplateRows: sceneEnabled ? "1fr" : "0fr",
                    transition: "grid-template-rows 0.28s ease",
                  }}
                >
                  <div className="overflow-hidden">
                    <div className="space-y-4 pb-3 pt-2">
                      <div className="grid grid-cols-4 gap-2">
                        {SCENE_OPTIONS.map((sc) => {
                          const active = sceneType === sc.id;
                          return (
                            <button
                              key={sc.id}
                              type="button"
                              aria-label={sc.name}
                              aria-pressed={active}
                              onClick={() => setSceneType(sc.id)}
                              style={{ minHeight: 56 }}
                              className={[
                                "flex flex-col items-center gap-1.5 rounded-2xl border px-1.5 py-2 text-[10px] font-bold transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#252C25]",
                                active
                                  ? "bg-[#252C25] border-[#252C25] text-white shadow-md shadow-[#D9D3CC]"
                                  : "bg-[#F4F1ED] border-[#D9D3CC] text-[#5A635A] hover:bg-[#ECE7E2] hover:border-[#D9D3CC]",
                              ].join(" ")}
                            >
                              <SceneMiniPreview id={sc.id} active={active} />
                              <span className="text-center leading-tight">
                                {sc.name}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                      <SliderRow
                        label="Scale"
                        value={Math.round(sceneScale * 100)}
                        min={70}
                        max={130}
                        unit="%"
                        onChange={(v) => setSceneScale(v / 100)}
                      />
                      <SliderRow
                        label="Shadow intensity"
                        value={sceneShadow}
                        min={0}
                        max={100}
                        unit="%"
                        onChange={setSceneShadow}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* â”€â”€ Aspect Ratio â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
              {/* -- Export Quality -- */}
              <div className="px-4 sm:px-5">
                <ControlGroup
                  label="Export Quality"
                  sectionId="export"
                  collapsed={collapsed["export"]}
                  onToggle={() => toggleSection("export")}
                >
                  <select
                    value={exportQuality}
                    onChange={(e) =>
                      handleExportQuality(e.target.value as ExportQuality)
                    }
                    aria-label="Export quality"
                    className="w-full rounded-2xl border border-[#D9D3CC] bg-[#ECE7E2]/90 px-3 py-2.5 text-sm text-[#1C1F1C] focus:outline-none focus:ring-2 focus:ring-[#252C25] transition"
                  >
                    {EXPORT_QUALITY_OPTIONS.map((opt) => (
                      <option
                        key={opt.id}
                        value={opt.id}
                        disabled={
                          !isPro && (opt.id === "4k" || opt.id === "2x")
                        }
                      >
                        {opt.label}
                        {!isPro && (opt.id === "4k" || opt.id === "2x")
                          ? " 🔒 Pro"
                          : ""}
                      </option>
                    ))}
                  </select>
                  {!isPro && (
                    <p className="text-[10px] text-amber-600 font-semibold flex items-center gap-1">
                      <svg
                        className="w-3 h-3 flex-shrink-0"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      2× and 4K export require Pro —{" "}
                      <a href="#pricing" className="underline">
                        Upgrade for $5/mo
                      </a>
                    </p>
                  )}
                  <p className="text-[10px] text-[#5A635A] leading-relaxed">
                    Higher quality increases file size. For social media,{" "}
                    <span className="font-semibold">
                      1080&thinsp;&times;&thinsp;1080
                    </span>{" "}
                    is ideal.
                  </p>
                </ControlGroup>
              </div>

              <div className="px-4 sm:px-5">
                <ControlGroup
                  label="Aspect ratio"
                  sectionId="ratio"
                  collapsed={collapsed["ratio"]}
                  onToggle={() => toggleSection("ratio")}
                >
                  <div className="flex gap-2 flex-wrap">
                    {(Object.keys(RATIO_MAP) as AspectRatio[]).map((r) => {
                      const { w: rw, h: rh } = RATIO_MAP[r];
                      const boxW = rw >= rh ? 28 : Math.round(28 * (rw / rh));
                      const boxH = rh > rw ? 28 : Math.round(28 * (rh / rw));
                      const active = s.aspectRatio === r;
                      return (
                        <button
                          key={r}
                          type="button"
                          aria-label={`Aspect ratio ${r}`}
                          onClick={() => set({ aspectRatio: r })}
                          style={{ minHeight: 44 }}
                          className={[
                            "flex flex-col items-center gap-1.5 px-3 py-2 rounded-2xl border text-[11px] font-semibold transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#252C25]",
                            active
                              ? "bg-[#252C25] border-[#252C25] text-white shadow-md shadow-[#D9D3CC]"
                              : "bg-[#F4F1ED] border-[#D9D3CC] text-[#5A635A] hover:bg-[#ECE7E2] hover:border-[#D9D3CC]",
                          ].join(" ")}
                        >
                          <span
                            style={{ width: boxW, height: boxH }}
                            className={[
                              "block rounded border-2 transition-colors",
                              active
                                ? "border-[#D9D3CC] bg-white/20"
                                : "border-[#5A635A] bg-[#F4F1ED]",
                            ].join(" ")}
                          />
                          {r}
                        </button>
                      );
                    })}
                  </div>
                </ControlGroup>
              </div>
            </div>
            {/* end divide-y */}

            {/* â”€â”€ Sticky mobile export button â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
            {onExport && (
              <div
                className="lg:hidden sticky bottom-0 p-4 border-t border-[#D9D3CC]/60"
                style={{
                  background: "rgba(244,241,237,0.95)",
                  backdropFilter: "blur(16px)",
                  WebkitBackdropFilter: "blur(16px)",
                  paddingBottom: "max(1rem, env(safe-area-inset-bottom))",
                }}
              >
                <button
                  type="button"
                  onClick={onExport}
                  disabled={isExporting}
                  className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl text-sm font-semibold text-white bg-[#252C25] shadow-lg shadow-[#D9D3CC] hover:bg-[#1F261F] disabled:opacity-60 transition-all duration-150"
                >
                  <Download className="w-4 h-4" />
                  {isExporting ? "Exportingâ€¦" : "Download PNG"}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  },
);

QuoteCanvas.displayName = "QuoteCanvas";
export default QuoteCanvas;
