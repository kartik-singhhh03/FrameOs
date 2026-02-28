"use client";

import { useRef, useState, useCallback, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Download } from "lucide-react";
import QuoteCanvas from "@/components/QuoteCanvas";
import { downloadAsPng } from "@/lib/download";
import type { TemplateId } from "@/components/templates";

export default function EditorPage() {
  return (
    <Suspense fallback={null}>
      <EditorContent />
    </Suspense>
  );
}

function EditorContent() {
  const searchParams = useSearchParams();
  const templateParam = searchParams.get("template") as TemplateId | null;
  const canvasRef = useRef<HTMLDivElement>(null);
  const [isExporting, setIsExporting] = useState(false);
  const exportQualityRef = useRef<string>("auto");

  const handleExportQualityChange = useCallback((quality: string) => {
    exportQualityRef.current = quality;
  }, []);

  const handleDownload = useCallback(async () => {
    if (!canvasRef.current) return;
    setIsExporting(true);
    try {
      const el = canvasRef.current;
      const w = el.offsetWidth || 420;
      const h = el.offsetHeight || 420;
      const q = exportQualityRef.current;
      let pixelRatio = 3; // default auto
      if (q === "2x") pixelRatio = 2;
      else if (q === "1080") pixelRatio = Math.max(2, Math.ceil(1080 / w));
      else if (q === "1350") pixelRatio = Math.max(2, Math.ceil(1080 / w));
      else if (q === "fhd") pixelRatio = Math.max(3, Math.ceil(1920 / w));
      else if (q === "4k") pixelRatio = Math.max(4, Math.ceil(2160 / w));
      await downloadAsPng(el, "frameos-quote.png", pixelRatio);
    } catch (err) {
      console.error("[FrameOS] Export failed:", err);
    } finally {
      setIsExporting(false);
    }
  }, []);

  return (
    <div
      className="min-h-screen overflow-x-hidden"
      style={{
        background: "#ECE7E2",
        backgroundAttachment: "fixed",
      }}
    >
      {/* ── Sticky top bar ──────────────────────────────────── */}
      <header className="sticky top-0 z-40 px-3 sm:px-4 pt-3 sm:pt-4 pb-2">
        <div
          className="max-w-screen-xl mx-auto flex items-center justify-between px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl border border-[#D9D3CC] shadow-lg shadow-violet-100/40"
          style={{
            background: "rgba(244,241,237,0.95)",
            backdropFilter: "blur(20px)",
          }}
        >
          {/* Back */}
          <Link
            href="/"
            className="flex items-center gap-1.5 sm:gap-2 text-sm font-semibold text-[#1C1F1C] hover:text-[#1C1F1C] transition-colors min-h-[44px] px-1"
            aria-label="Back to landing page"
          >
            <ArrowLeft className="w-4 h-4 flex-shrink-0" />
            <span className="hidden xs:inline">Back</span>
          </Link>

          {/* Logo */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            <span className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg sm:rounded-xl bg-[#252C25] flex items-center justify-center shadow-md flex-shrink-0">
              <svg
                width="14"
                height="14"
                viewBox="0 0 18 18"
                fill="none"
                aria-hidden="true"
              >
                <rect x="2" y="2" width="6" height="6" rx="1.5" fill="white" />
                <rect
                  x="10"
                  y="2"
                  width="6"
                  height="6"
                  rx="1.5"
                  fill="white"
                  fillOpacity="0.7"
                />
                <rect
                  x="2"
                  y="10"
                  width="6"
                  height="6"
                  rx="1.5"
                  fill="white"
                  fillOpacity="0.7"
                />
                <rect
                  x="10"
                  y="10"
                  width="6"
                  height="6"
                  rx="1.5"
                  fill="white"
                  fillOpacity="0.5"
                />
              </svg>
            </span>
            <span className="font-extrabold text-[#1C1F1C] tracking-tight text-sm sm:text-base">
              FrameOS
            </span>
            <span className="hidden sm:block text-xs bg-[#F4F1ED] text-[#5A635A] font-bold px-2 py-0.5 rounded-full">
              Studio
            </span>
          </div>

          {/* Download — hidden on mobile (sticky bar below handles it) */}
          <button
            type="button"
            onClick={handleDownload}
            disabled={isExporting}
            className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-[#252C25] to-[#AB6D48] shadow-md shadow-[#D9D3CC] hover:from-[#1F261F] hover:to-[#252C25] disabled:opacity-60 transition-all duration-150 min-h-[44px]"
          >
            <Download className="w-4 h-4" />
            {isExporting ? "Exporting…" : "Download PNG"}
          </button>

          {/* Mobile: icon-only download in topbar */}
          <button
            type="button"
            onClick={handleDownload}
            disabled={isExporting}
            aria-label="Download PNG"
            className="sm:hidden flex items-center justify-center w-10 h-10 rounded-xl text-white bg-gradient-to-r from-[#252C25] to-[#AB6D48] shadow-md disabled:opacity-60 transition-all"
          >
            <Download className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* ── Main content ─────────────────────────────────────── */}
      <main className="px-3 sm:px-4 md:px-6 py-4 sm:py-6 pb-safe max-w-screen-2xl mx-auto">
        <QuoteCanvas
          ref={canvasRef}
          onExport={handleDownload}
          isExporting={isExporting}
          onExportQualityChange={handleExportQualityChange}
          initialTemplateId={templateParam}
        />
      </main>
    </div>
  );
}
