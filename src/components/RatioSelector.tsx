import { RATIO_OPTIONS } from "@/lib/types";
import type { AspectRatio } from "@/lib/types";

interface RatioSelectorProps {
  value: AspectRatio;
  onChange: (ratio: AspectRatio) => void;
}

/**
 * Visual aspect ratio selector showing miniature ratio icons.
 */
export default function RatioSelector({ value, onChange }: RatioSelectorProps) {
  return (
    <div className="flex gap-2 flex-wrap">
      {RATIO_OPTIONS.map((opt) => {
        const active = value === opt.value;
        // Render a tiny representative box
        const boxW = opt.w >= opt.h ? 28 : Math.round(28 * (opt.w / opt.h));
        const boxH = opt.h > opt.w ? 28 : Math.round(28 * (opt.h / opt.w));

        return (
          <button
            key={opt.value}
            type="button"
            aria-label={`Aspect ratio ${opt.label}`}
            onClick={() => onChange(opt.value)}
            className={`flex flex-col items-center gap-1.5 px-3 py-2 rounded-2xl border transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 ${
              active
                ? "bg-violet-600 border-violet-600 text-white shadow-md shadow-violet-300/40"
                : "bg-white/60 border-white/60 text-violet-600 hover:bg-violet-50 hover:border-violet-200"
            }`}
          >
            <span
              className={`rounded border-2 transition-colors ${
                active
                  ? "border-white/70 bg-white/20"
                  : "border-violet-400 bg-violet-100"
              }`}
              style={{ width: boxW, height: boxH, display: "block" }}
            />
            <span className="text-[11px] font-semibold leading-none">
              {opt.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
