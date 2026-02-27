"use client";

import { useState, useEffect } from "react";
import { TEMPLATES, SOCIAL_TEMPLATE_IDS } from "./templates/index";
import type { TemplateId, TemplateCategory } from "./templates/index";

interface TemplateSelectorProps {
  selected: TemplateId;
  onChange: (id: TemplateId) => void;
  isPro?: boolean;
}

const TAB_LABELS: { value: TemplateCategory; label: string }[] = [
  { value: "frames", label: "Frames" },
  { value: "social", label: "Social" },
];

/**
 * TemplateSelector
 * Category-tabbed grid for choosing a frame or social template.
 */
export default function TemplateSelector({
  selected,
  onChange,
  isPro = false,
}: TemplateSelectorProps) {
  // Derive initial tab from the selected template
  const [activeTab, setActiveTab] = useState<TemplateCategory>(
    (SOCIAL_TEMPLATE_IDS as string[]).includes(selected) ? "social" : "frames",
  );

  // Keep tab in sync if external selection changes category
  useEffect(() => {
    const isSocial = (SOCIAL_TEMPLATE_IDS as string[]).includes(selected);
    setActiveTab(isSocial ? "social" : "frames");
  }, [selected]);

  const visibleTemplates = TEMPLATES.filter((t) => t.category === activeTab);

  return (
    <div className="space-y-3">
      <p className="text-[11px] font-extrabold text-violet-400 uppercase tracking-widest">
        Template
      </p>

      {/* Category tabs */}
      <div className="flex gap-1 p-1 rounded-xl bg-white/40 border border-white/60">
        {TAB_LABELS.map((tab) => (
          <button
            key={tab.value}
            type="button"
            onClick={() => setActiveTab(tab.value)}
            className={[
              "flex-1 text-[11px] font-bold rounded-lg py-1.5 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500",
              activeTab === tab.value
                ? "bg-violet-600 text-white shadow"
                : "text-violet-500 hover:text-violet-700 hover:bg-violet-50",
            ].join(" ")}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Template grid */}
      <div
        className={[
          "grid gap-2",
          activeTab === "frames" ? "grid-cols-5" : "grid-cols-3",
        ].join(" ")}
      >
        {visibleTemplates.map((t) => {
          const isActive = selected === t.id;
          const isSocialTemplate = (SOCIAL_TEMPLATE_IDS as string[]).includes(
            t.id,
          );
          const isLocked = isSocialTemplate && !isPro;
          return (
            <button
              key={t.id}
              type="button"
              title={isLocked ? `${t.name} — Pro only` : t.description}
              aria-label={
                isLocked
                  ? `${t.name} template (Pro only)`
                  : `${t.name} template`
              }
              aria-pressed={isActive}
              onClick={() => (isLocked ? undefined : onChange(t.id))}
              className={[
                "group flex flex-col items-center gap-2 rounded-2xl border p-2.5 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 relative",
                isLocked
                  ? "bg-white/40 border-white/50 text-violet-300 cursor-not-allowed opacity-70"
                  : isActive
                    ? "bg-violet-600 border-violet-600 text-white shadow-lg shadow-violet-300/40 scale-105"
                    : "bg-white/60 border-white/70 text-violet-600 hover:bg-violet-50 hover:border-violet-200 hover:scale-105",
              ].join(" ")}
            >
              <TemplateMiniPreview id={t.id} active={isActive} />
              <span
                className={[
                  "text-[9px] font-bold tracking-wide text-center leading-tight w-full truncate",
                  isActive ? "text-white" : "text-violet-600",
                ].join(" ")}
              >
                {t.name}
              </span>
              {isLocked && (
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-amber-400 flex items-center justify-center shadow">
                  <svg
                    className="w-2.5 h-2.5 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ─── Mini Previews ────────────────────────────────────────────────────────────

interface MiniPreviewProps {
  id: TemplateId;
  active: boolean;
}

function TemplateMiniPreview({ id, active }: MiniPreviewProps) {
  const cardBg = active
    ? "bg-white/20 border-white/50"
    : "bg-violet-50 border-violet-200";
  const dotColors = active
    ? ["bg-red-400", "bg-yellow-400", "bg-green-400"]
    : ["bg-red-400/70", "bg-yellow-400/70", "bg-green-400/70"];
  const barBg = active ? "bg-white/30" : "bg-violet-100";
  const barText = active ? "bg-white/50" : "bg-violet-200";
  const contentBg = active ? "bg-white/10" : "bg-violet-100/60";
  const stripBg = active ? "bg-white/40" : "bg-violet-300/60";

  // ── Frames ──────────────────────────────────────────────────────────
  if (id === "mac-window") {
    return (
      <div
        className={`w-12 h-9 rounded border overflow-hidden flex flex-col ${cardBg}`}
      >
        <div className={`flex items-center gap-0.5 px-1 py-0.5 ${barBg}`}>
          {dotColors.map((c, i) => (
            <span key={i} className={`w-1 h-1 rounded-full ${c}`} />
          ))}
        </div>
        <div className={`flex-1 m-1 rounded ${contentBg}`} />
      </div>
    );
  }

  if (id === "minimal-glass") {
    return (
      <div
        className={`w-12 h-9 rounded border overflow-hidden flex items-center justify-center ${cardBg}`}
        style={{ backdropFilter: "blur(4px)" }}
      >
        <div
          className={`w-8 h-4 rounded ${active ? "bg-white/30" : "bg-violet-200/80"}`}
        />
      </div>
    );
  }

  if (id === "browser-window") {
    return (
      <div
        className={`w-12 h-9 rounded border overflow-hidden flex flex-col ${cardBg}`}
      >
        <div className={`flex items-center gap-0.5 px-1 py-0.5 ${barBg}`}>
          {dotColors.map((c, i) => (
            <span key={i} className={`w-1 h-1 rounded-full ${c}`} />
          ))}
          <div className={`flex-1 h-1 rounded mx-0.5 ${barText}`} />
        </div>
        <div className={`flex-1 m-1 rounded ${contentBg}`} />
      </div>
    );
  }

  if (id === "polaroid") {
    return (
      <div
        className="w-12 h-10 flex items-center justify-center"
        style={{ transform: "rotate(-2deg)" }}
      >
        <div
          className={`w-10 h-9 rounded-sm border-2 ${active ? "border-white/70 bg-white/20" : "border-zinc-300 bg-white"} flex flex-col`}
        >
          <div
            className={`flex-1 m-1 rounded-sm ${active ? "bg-white/30" : "bg-violet-100"}`}
          />
          <div className={`h-2 ${active ? "bg-white/20" : "bg-white"}`} />
        </div>
      </div>
    );
  }

  if (id === "clean-card") {
    return (
      <div
        className={`w-12 h-9 rounded border overflow-hidden flex flex-col ${active ? "border-white/50 bg-white/20" : "border-zinc-200 bg-white"}`}
      >
        <div
          className={`h-0.5 w-full ${active ? "bg-white/60" : "bg-gradient-to-r from-violet-400 to-indigo-400"}`}
        />
        <div className="flex-1 m-1 flex flex-col gap-0.5 justify-center">
          <div className={`h-1 rounded ${stripBg}`} />
          <div className={`h-1 rounded w-3/4 ${stripBg} opacity-60`} />
        </div>
      </div>
    );
  }

  // ── Social ───────────────────────────────────────────────────────────
  const bg = active ? "rgba(124,58,237,0.25)" : "#f5f3ff";
  const accent = active ? "rgba(255,255,255,0.6)" : "#7c3aed";
  const muted = active ? "rgba(255,255,255,0.3)" : "#c4b5fd";

  if (id === "twitter-post") {
    return (
      <div
        style={{
          width: 48,
          height: 38,
          background: bg,
          borderRadius: 6,
          border: `1px solid ${muted}`,
          display: "flex",
          flexDirection: "column",
          padding: "4px 5px",
          gap: 3,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 3 }}>
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: accent,
            }}
          />
          <div
            style={{ flex: 1, height: 2, borderRadius: 2, background: muted }}
          />
        </div>
        <div
          style={{ flex: 1, borderRadius: 3, background: muted, opacity: 0.7 }}
        />
        <div
          style={{
            height: 2,
            width: "60%",
            borderRadius: 2,
            background: muted,
          }}
        />
      </div>
    );
  }

  if (id === "linkedin-post") {
    return (
      <div
        style={{
          width: 48,
          height: 38,
          background: bg,
          borderRadius: 6,
          border: `1px solid ${muted}`,
          display: "flex",
          flexDirection: "column",
          padding: "4px 5px",
          gap: 3,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 3 }}>
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: "#0077b5",
              opacity: active ? 0.8 : 1,
            }}
          />
          <div style={{ flex: 1 }}>
            <div
              style={{
                height: 2,
                borderRadius: 2,
                background: muted,
                marginBottom: 1.5,
              }}
            />
            <div
              style={{
                height: 1.5,
                borderRadius: 2,
                background: muted,
                width: "70%",
              }}
            />
          </div>
        </div>
        <div
          style={{ flex: 1, borderRadius: 3, background: muted, opacity: 0.7 }}
        />
      </div>
    );
  }

  if (id === "instagram-post") {
    return (
      <div
        style={{
          width: 48,
          height: 38,
          background: bg,
          borderRadius: 6,
          border: `1px solid ${muted}`,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            padding: "3px 5px",
            display: "flex",
            alignItems: "center",
            gap: 2,
          }}
        >
          <div
            style={{
              width: 7,
              height: 7,
              borderRadius: "50%",
              background:
                "linear-gradient(135deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)",
            }}
          />
          <div
            style={{ flex: 1, height: 2, borderRadius: 2, background: muted }}
          />
        </div>
        <div style={{ flex: 1, background: muted, opacity: 0.8 }} />
        <div style={{ padding: "2px 5px", height: 8, background: bg }} />
      </div>
    );
  }

  if (id === "threads-post") {
    return (
      <div
        style={{
          width: 48,
          height: 38,
          background: bg,
          borderRadius: 6,
          border: `1px solid ${muted}`,
          padding: "4px 5px",
          display: "flex",
          gap: 3,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 1,
          }}
        >
          <div
            style={{
              width: 7,
              height: 7,
              borderRadius: "50%",
              background: accent,
            }}
          />
          <div
            style={{ width: 1.5, flex: 1, borderRadius: 1, background: muted }}
          />
        </div>
        <div
          style={{ flex: 1, display: "flex", flexDirection: "column", gap: 2 }}
        >
          <div
            style={{
              height: 2,
              width: "80%",
              borderRadius: 2,
              background: muted,
            }}
          />
          <div
            style={{
              flex: 1,
              borderRadius: 3,
              background: muted,
              opacity: 0.7,
            }}
          />
        </div>
      </div>
    );
  }

  if (id === "notion-page") {
    return (
      <div
        style={{
          width: 48,
          height: 38,
          background: active ? bg : "#fff",
          borderRadius: 6,
          border: `1px solid ${muted}`,
          padding: "4px 5px",
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 2 }}>
          <span style={{ fontSize: 8 }}>📄</span>
          <div
            style={{ flex: 1, height: 2, borderRadius: 2, background: muted }}
          />
        </div>
        <div style={{ height: 1, background: muted }} />
        <div
          style={{
            flex: 1,
            borderRadius: 3,
            background: "#fff8e6",
            border: `1px solid #f3e5b5`,
            borderLeft: "2px solid #f0c040",
          }}
        />
      </div>
    );
  }

  if (id === "code-snippet") {
    return (
      <div
        style={{
          width: 48,
          height: 38,
          background: "#1e1e2e",
          borderRadius: 6,
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            background: "#13131f",
            padding: "3px 5px",
            display: "flex",
            gap: 2,
          }}
        >
          {["#ff5f57", "#febc2e", "#28c840"].map((c, i) => (
            <div
              key={i}
              style={{
                width: 4,
                height: 4,
                borderRadius: "50%",
                background: c,
              }}
            />
          ))}
        </div>
        <div
          style={{
            flex: 1,
            padding: "3px 4px",
            display: "flex",
            flexDirection: "column",
            gap: 1.5,
          }}
        >
          <div
            style={{
              height: 2,
              width: "70%",
              borderRadius: 1,
              background: "#c792ea",
            }}
          />
          <div style={{ flex: 1, borderRadius: 2, background: "#313244" }} />
          <div
            style={{
              height: 2,
              width: "40%",
              borderRadius: 1,
              background: "#546e7a",
            }}
          />
        </div>
        <div style={{ height: 4, background: "#6c6ef2" }} />
      </div>
    );
  }

  return null;
}
