"use client";

import { useState, useEffect } from "react";
import {
  TEMPLATES,
  SOCIAL_TEMPLATE_IDS,
  DEV_TEMPLATE_IDS,
} from "./templates/index";
import type { TemplateId, TemplateCategory } from "./templates/index";

interface TemplateSelectorProps {
  selected: TemplateId;
  onChange: (id: TemplateId) => void;
  isPro?: boolean;
}

const TAB_LABELS: { value: TemplateCategory; label: string }[] = [
  { value: "frames", label: "Frames" },
  { value: "social", label: "Social" },
  { value: "dev", label: "Dev" },
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
    (DEV_TEMPLATE_IDS as string[]).includes(selected)
      ? "dev"
      : (SOCIAL_TEMPLATE_IDS as string[]).includes(selected)
        ? "social"
        : "frames",
  );

  // Keep tab in sync if external selection changes category
  useEffect(() => {
    const isDev = (DEV_TEMPLATE_IDS as string[]).includes(selected);
    const isSocial = (SOCIAL_TEMPLATE_IDS as string[]).includes(selected);
    setActiveTab(isDev ? "dev" : isSocial ? "social" : "frames");
  }, [selected]);

  const visibleTemplates = TEMPLATES.filter((t) => t.category === activeTab);

  return (
    <div className="space-y-3">
      <p className="text-[11px] font-extrabold text-[#5A635A] uppercase tracking-widest">
        Template
      </p>

      {/* Category tabs */}
      <div className="flex gap-1 p-1 rounded-xl bg-[#F4F1ED]/60 border border-[#D9D3CC]">
        {TAB_LABELS.map((tab) => (
          <button
            key={tab.value}
            type="button"
            onClick={() => setActiveTab(tab.value)}
            className={[
              "flex-1 text-[11px] font-bold rounded-lg py-1.5 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#252C25]",
              activeTab === tab.value
                ? "bg-[#252C25] text-white shadow"
                : "text-[#5A635A] hover:text-[#1C1F1C] hover:bg-[#ECE7E2]",
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
          activeTab === "frames"
            ? "grid-cols-5"
            : activeTab === "dev"
              ? "grid-cols-4"
              : "grid-cols-3",
        ].join(" ")}
      >
        {visibleTemplates.map((t) => {
          const isActive = selected === t.id;
          const isSocialTemplate = (SOCIAL_TEMPLATE_IDS as string[]).includes(
            t.id,
          );
          const isDevTemplate = (DEV_TEMPLATE_IDS as string[]).includes(t.id);
          const isLocked = (isSocialTemplate || isDevTemplate) && !isPro;
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
                "group flex flex-col items-center gap-2 rounded-2xl border p-2.5 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#252C25] relative",
                isLocked
                  ? "bg-[#F4F1ED]/60 border-[#D9D3CC] text-[#D9D3CC] cursor-not-allowed opacity-70"
                  : isActive
                    ? "bg-[#252C25] border-[#252C25] text-white shadow-lg shadow-[#D9D3CC]/40 scale-105"
                    : "bg-[#F4F1ED] border-[#D9D3CC] text-[#5A635A] hover:bg-[#ECE7E2] hover:border-[#D9D3CC] hover:scale-105",
              ].join(" ")}
            >
              <TemplateMiniPreview id={t.id} active={isActive} />
              <span
                className={[
                  "text-[9px] font-bold tracking-wide text-center leading-tight w-full truncate",
                  isActive ? "text-white" : "text-[#5A635A]",
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
    ? "bg-white/20 border-[#D9D3CC]"
    : "bg-[#ECE7E2] border-[#D9D3CC]";
  const dotColors = active
    ? ["bg-red-400", "bg-yellow-400", "bg-green-400"]
    : ["bg-red-400/70", "bg-yellow-400/70", "bg-green-400/70"];
  const barBg = active ? "bg-white/30" : "bg-[#F4F1ED]";
  const barText = active ? "bg-white/50" : "bg-[#D9D3CC]";
  const contentBg = active ? "bg-white/10" : "bg-[#F4F1ED]/60";
  const stripBg = active ? "bg-[#F4F1ED]/60" : "bg-[#D9D3CC]/60";

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
          className={`w-8 h-4 rounded ${active ? "bg-white/30" : "bg-[#D9D3CC]/80"}`}
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
          className={`w-10 h-9 rounded-sm border-2 ${active ? "border-[#D9D3CC] bg-white/20" : "border-zinc-300 bg-white"} flex flex-col`}
        >
          <div
            className={`flex-1 m-1 rounded-sm ${active ? "bg-white/30" : "bg-[#F4F1ED]"}`}
          />
          <div className={`h-2 ${active ? "bg-white/20" : "bg-white"}`} />
        </div>
      </div>
    );
  }

  if (id === "clean-card") {
    return (
      <div
        className={`w-12 h-9 rounded border overflow-hidden flex flex-col ${active ? "border-[#D9D3CC] bg-white/20" : "border-zinc-200 bg-white"}`}
      >
        <div
          className={`h-0.5 w-full ${active ? "bg-[#F4F1ED]" : "bg-gradient-to-r from-violet-400 to-indigo-400"}`}
        />
        <div className="flex-1 m-1 flex flex-col gap-0.5 justify-center">
          <div className={`h-1 rounded ${stripBg}`} />
          <div className={`h-1 rounded w-3/4 ${stripBg} opacity-60`} />
        </div>
      </div>
    );
  }

  // ── Social ───────────────────────────────────────────────────────────
  const bg = active ? "rgba(37,44,37,0.12)" : "#F4F1ED";
  const accent = active ? "rgba(255,255,255,0.8)" : "#252C25";
  const muted = active ? "rgba(255,255,255,0.45)" : "#D9D3CC";

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

  // ── Dev templates ──────────────────────────────────────────────────────────

  if (id === "dev-code") {
    return (
      <div
        style={{
          width: 44,
          height: 36,
          background: "#1e1e2e",
          borderRadius: 5,
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            background: "#13131f",
            padding: "2px 4px",
            display: "flex",
            gap: 2,
          }}
        >
          {["#ff5f57", "#febc2e", "#28c840"].map((c, i) => (
            <div
              key={i}
              style={{
                width: 3,
                height: 3,
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
              width: "60%",
              borderRadius: 1,
              background: "#C792EA",
            }}
          />
          <div
            style={{
              height: 2,
              width: "80%",
              borderRadius: 1,
              background: "#C3E88D",
            }}
          />
          <div
            style={{
              height: 2,
              width: "50%",
              borderRadius: 1,
              background: "#82AAFF",
            }}
          />
        </div>
        <div style={{ height: 3, background: "#6c6ef2" }} />
      </div>
    );
  }

  if (id === "dev-terminal") {
    return (
      <div
        style={{
          width: 44,
          height: 36,
          background: "#0d0d0d",
          borderRadius: 5,
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            background: "#1a1a1a",
            padding: "2px 4px",
            display: "flex",
            gap: 2,
          }}
        >
          {["#ff5f57", "#febc2e", "#28c840"].map((c, i) => (
            <div
              key={i}
              style={{
                width: 3,
                height: 3,
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
            gap: 2,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 2 }}>
            <div
              style={{
                width: 4,
                height: 4,
                borderRadius: "50%",
                background: "#22c55e",
              }}
            />
            <div
              style={{
                height: 1.5,
                flex: 1,
                borderRadius: 1,
                background: "#d4d4d4",
              }}
            />
          </div>
          <div
            style={{
              height: 1.5,
              width: "70%",
              borderRadius: 1,
              background: "#888",
            }}
          />
          <div
            style={{
              height: 1.5,
              width: "55%",
              borderRadius: 1,
              background: "#22c55e",
            }}
          />
        </div>
      </div>
    );
  }

  if (id === "dev-metrics") {
    const metricBg = active ? "rgba(37,44,37,0.3)" : "#1C1F1C";
    return (
      <div
        style={{
          width: 44,
          height: 36,
          background: metricBg,
          borderRadius: 5,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 2,
        }}
      >
        <div
          style={{
            fontSize: 13,
            fontWeight: 900,
            color: "#fff",
            lineHeight: 1,
          }}
        >
          100
        </div>
        <div
          style={{
            height: 1.5,
            width: "65%",
            borderRadius: 1,
            background: "rgba(255,255,255,0.4)",
          }}
        />
        <div
          style={{
            height: 1.5,
            width: "45%",
            borderRadius: 1,
            background: "rgba(255,255,255,0.2)",
          }}
        />
      </div>
    );
  }

  if (id === "dev-thread") {
    const threadBg = active ? "rgba(37,44,37,0.12)" : "#F4F1ED";
    const threadBorder = active ? "rgba(255,255,255,0.3)" : "#D9D3CC";
    return (
      <div
        style={{
          width: 44,
          height: 36,
          background: threadBg,
          borderRadius: 5,
          border: `1px solid ${threadBorder}`,
          display: "flex",
          flexDirection: "column",
          padding: "4px 5px",
          gap: 1.5,
        }}
      >
        <div
          style={{
            height: 2,
            width: "80%",
            borderRadius: 1,
            background: active ? "rgba(255,255,255,0.7)" : "#252C25",
          }}
        />
        <div
          style={{
            height: 1.5,
            width: "60%",
            borderRadius: 1,
            background: active ? "rgba(255,255,255,0.5)" : "#5A635A",
          }}
        />
        <div
          style={{
            height: 1.5,
            width: "70%",
            borderRadius: 1,
            background: active ? "rgba(255,255,255,0.5)" : "#5A635A",
          }}
        />
        <div style={{ display: "flex", gap: 1.5, marginTop: "auto" }}>
          {[0, 1, 2].map((d) => (
            <div
              key={d}
              style={{
                width: 4,
                height: 2,
                borderRadius: 1,
                background:
                  d === 0
                    ? active
                      ? "#fff"
                      : "#252C25"
                    : active
                      ? "rgba(255,255,255,0.35)"
                      : "#D9D3CC",
              }}
            />
          ))}
        </div>
      </div>
    );
  }

  return null;
}
