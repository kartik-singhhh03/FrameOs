"use client";

import {
  useEffect,
  useRef,
  useState,
  useCallback,
  type RefObject,
} from "react";
import { toPng } from "html-to-image";
import {
  X,
  Download,
  Copy,
  Check,
  Share2,
  ExternalLink,
  Loader2,
} from "lucide-react";

/* ────────────────────────────────────────────────────────────
   Icons for social platforms (inline SVG — no extra deps)
──────────────────────────────────────────────────────────── */
function XIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.911-5.622Zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.137 1.446-2.137 2.94v5.666H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
    </svg>
  );
}

/* ────────────────────────────────────────────────────────────
   Types
──────────────────────────────────────────────────────────── */
interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  canvasRef: RefObject<HTMLDivElement>;
  exportQualityRef?: RefObject<string>;
}

type ToastType = "success" | "error" | "info";

interface Toast {
  id: number;
  message: string;
  type: ToastType;
}

/* ────────────────────────────────────────────────────────────
   Helpers
──────────────────────────────────────────────────────────── */
async function generateDataUrl(
  element: HTMLElement,
  pixelRatio = 3,
): Promise<string> {
  return toPng(element, { cacheBust: true, pixelRatio, skipAutoScale: false });
}

function dataUrlToBlob(dataUrl: string): Blob {
  const [header, base64] = dataUrl.split(",");
  const mime = header.match(/:(.*?);/)?.[1] ?? "image/png";
  const bytes = atob(base64);
  const arr = new Uint8Array(bytes.length);
  for (let i = 0; i < bytes.length; i++) arr[i] = bytes.charCodeAt(i);
  return new Blob([arr], { type: mime });
}

function triggerDownload(dataUrl: string, filename = "frameos-design.png") {
  const a = document.createElement("a");
  a.href = dataUrl;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    // Fallback for older browsers / non-secure contexts
    try {
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      return true;
    } catch {
      return false;
    }
  }
}

/* ────────────────────────────────────────────────────────────
   ShareModal Component
──────────────────────────────────────────────────────────── */
export default function ShareModal({
  isOpen,
  onClose,
  canvasRef,
  exportQualityRef,
}: ShareModalProps) {
  const [dataUrl, setDataUrl] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [caption, setCaption] = useState("Made this with FrameOS ✨");
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [copied, setCopied] = useState(false);
  const toastIdRef = useRef(0);
  const prevOpenRef = useRef(false);

  /* ── Toast helpers ── */
  const addToast = useCallback(
    (message: string, type: ToastType = "success") => {
      const id = ++toastIdRef.current;
      setToasts((prev) => [...prev, { id, message, type }]);
      setTimeout(
        () => setToasts((prev) => prev.filter((t) => t.id !== id)),
        4000,
      );
    },
    [],
  );

  /* ── Generate image when modal opens ── */
  useEffect(() => {
    if (isOpen && !prevOpenRef.current) {
      // Modal just opened — generate the image
      if (!canvasRef.current) return;
      setDataUrl(null);
      setIsGenerating(true);

      const q = exportQualityRef?.current ?? "auto";
      const el = canvasRef.current;
      const w = el.offsetWidth || 420;
      let pixelRatio = 3;
      if (q === "2x") pixelRatio = 2;
      else if (q === "1080") pixelRatio = Math.max(2, Math.ceil(1080 / w));
      else if (q === "1350") pixelRatio = Math.max(2, Math.ceil(1080 / w));
      else if (q === "fhd") pixelRatio = Math.max(3, Math.ceil(1920 / w));
      else if (q === "4k") pixelRatio = Math.max(4, Math.ceil(2160 / w));

      generateDataUrl(el, pixelRatio)
        .then((url) => setDataUrl(url))
        .catch(() => addToast("Failed to generate image", "error"))
        .finally(() => setIsGenerating(false));
    }
    prevOpenRef.current = isOpen;
  }, [isOpen, canvasRef, exportQualityRef, addToast]);

  /* ── Close on Escape ── */
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen, onClose]);

  /* ── Lock body scroll ── */
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  /* ── Download only ── */
  const handleDownloadOnly = () => {
    if (!dataUrl) return;
    triggerDownload(dataUrl);
    addToast("Image downloaded!", "success");
  };

  /* ── Copy caption ── */
  const handleCopyCaption = async () => {
    const ok = await copyToClipboard(caption);
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      addToast("Caption copied to clipboard!", "success");
    } else {
      addToast("Could not copy — please copy manually", "error");
    }
  };

  /* ── Share to X ── */
  const handleShareX = async () => {
    if (!dataUrl) return;
    // 1. Download image
    triggerDownload(dataUrl);
    // 2. Copy caption
    await copyToClipboard(caption);
    // 3. Open X compose
    const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(caption)}`;
    setTimeout(
      () => window.open(tweetUrl, "_blank", "noopener,noreferrer"),
      300,
    );
    addToast(
      "Image downloaded & caption copied. Paste it in the post!",
      "success",
    );
  };

  /* ── Share to LinkedIn ── */
  const handleShareLinkedIn = async () => {
    if (!dataUrl) return;
    triggerDownload(dataUrl);
    await copyToClipboard(caption);
    const liUrl = `https://www.linkedin.com/feed/`;
    setTimeout(() => window.open(liUrl, "_blank", "noopener,noreferrer"), 300);
    addToast(
      "Image downloaded & caption copied. Start a post and paste!",
      "success",
    );
  };

  /* ── Share to Instagram ── */
  const handleShareInstagram = async () => {
    if (!dataUrl) return;
    triggerDownload(dataUrl);
    await copyToClipboard(caption);
    setTimeout(
      () =>
        window.open(
          "https://www.instagram.com/",
          "_blank",
          "noopener,noreferrer",
        ),
      300,
    );
    addToast(
      "Image downloaded & caption copied. Open Instagram and create a post!",
      "success",
    );
  };

  /* ── Native Share (Web Share API) ── */
  const handleNativeShare = async () => {
    if (!dataUrl) return;
    const blob = dataUrlToBlob(dataUrl);
    const file = new File([blob], "frameos-design.png", { type: "image/png" });
    const shareData: ShareData = {
      title: "My FrameOS Design",
      text: caption,
      files: [file],
    };

    if (navigator.canShare && navigator.canShare(shareData)) {
      try {
        await navigator.share(shareData);
        addToast("Shared successfully!", "success");
        return;
      } catch (err) {
        if ((err as DOMException).name !== "AbortError") {
          // Fall through to URL-only share
        } else {
          return; // User cancelled
        }
      }
    }

    // Fallback: share URL only
    if (navigator.share) {
      try {
        await navigator.share({
          title: "My FrameOS Design",
          text: caption,
          url: "https://frameos.app",
        });
        return;
      } catch {
        /* noop */
      }
    }

    // Final fallback: download
    triggerDownload(dataUrl);
    addToast("Sharing not available — image downloaded instead.", "info");
  };

  const canNativeShare = typeof navigator !== "undefined" && !!navigator.share;

  return (
    <>
      {/* ── Backdrop ── */}
      <div
        className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
        aria-modal="true"
        role="dialog"
        aria-label="Share your design"
      >
        {/* Scrim */}
        <div
          className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          onClick={onClose}
        />

        {/* Modal panel */}
        <div
          className="relative z-10 w-full sm:max-w-md rounded-t-3xl sm:rounded-3xl border border-[#D9D3CC] shadow-2xl overflow-hidden"
          style={{ background: "#F4F1ED" }}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-5 pt-5 pb-4 border-b border-[#D9D3CC]">
            <div className="flex items-center gap-2">
              <Share2 className="w-5 h-5 text-[#252C25]" />
              <h2 className="text-base font-extrabold text-[#1C1F1C] tracking-tight">
                Share Your Design
              </h2>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#E5E0DA] text-[#5A635A] transition"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="px-5 py-4 space-y-4 max-h-[80vh] overflow-y-auto">
            {/* Image preview */}
            <div
              className="w-full aspect-square rounded-2xl border border-[#D9D3CC] bg-[#E8E3DE] flex items-center justify-center overflow-hidden"
              style={{ maxHeight: 200 }}
            >
              {isGenerating ? (
                <div className="flex flex-col items-center gap-2 text-[#5A635A]">
                  <Loader2 className="w-7 h-7 animate-spin" />
                  <span className="text-xs font-medium">Generating…</span>
                </div>
              ) : dataUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={dataUrl}
                  alt="Canvas preview"
                  className="w-full h-full object-contain"
                />
              ) : (
                <span className="text-xs text-[#5A635A]">
                  Preview unavailable
                </span>
              )}
            </div>

            {/* Caption editor */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="share-caption"
                  className="text-xs font-semibold text-[#1C1F1C]"
                >
                  Caption
                </label>
                <button
                  type="button"
                  onClick={handleCopyCaption}
                  className="flex items-center gap-1 text-xs font-semibold text-[#5A635A] hover:text-[#252C25] transition"
                >
                  {copied ? (
                    <Check className="w-3.5 h-3.5 text-green-600" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                  {copied ? "Copied!" : "Copy"}
                </button>
              </div>
              <textarea
                id="share-caption"
                rows={3}
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                className="w-full rounded-2xl border border-[#D9D3CC] bg-[#ECE7E2]/90 px-3 py-2.5 text-sm text-[#1C1F1C] placeholder-[#5A635A]/50 resize-none focus:outline-none focus:ring-2 focus:ring-[#252C25] transition"
              />
              <p className="text-[10px] text-[#5A635A]">
                Each platform will download the image + copy this caption. Just
                paste!
              </p>
            </div>

            {/* Platform buttons */}
            <div className="space-y-2.5">
              <p className="text-xs font-semibold uppercase tracking-widest text-[#5A635A]">
                Share to
              </p>

              <div className="grid grid-cols-2 gap-2.5">
                {/* Share to X */}
                <PlatformButton
                  onClick={handleShareX}
                  disabled={!dataUrl || isGenerating}
                  icon={<XIcon className="w-4 h-4" />}
                  label="X (Twitter)"
                  color="#000"
                />

                {/* Share to LinkedIn */}
                <PlatformButton
                  onClick={handleShareLinkedIn}
                  disabled={!dataUrl || isGenerating}
                  icon={<LinkedInIcon className="w-4 h-4" />}
                  label="LinkedIn"
                  color="#0077B5"
                />

                {/* Share to Instagram */}
                <PlatformButton
                  onClick={handleShareInstagram}
                  disabled={!dataUrl || isGenerating}
                  icon={<InstagramIcon className="w-4 h-4" />}
                  label="Instagram"
                  color="#E1306C"
                />

                {/* Native Share / Download fallback */}
                {canNativeShare ? (
                  <PlatformButton
                    onClick={handleNativeShare}
                    disabled={!dataUrl || isGenerating}
                    icon={<Share2 className="w-4 h-4" />}
                    label="More…"
                    color="#252C25"
                  />
                ) : (
                  <PlatformButton
                    onClick={handleDownloadOnly}
                    disabled={!dataUrl || isGenerating}
                    icon={<Download className="w-4 h-4" />}
                    label="Download"
                    color="#252C25"
                  />
                )}
              </div>

              {/* Download row — always available */}
              <button
                type="button"
                onClick={handleDownloadOnly}
                disabled={!dataUrl || isGenerating}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl border border-[#D9D3CC] bg-[#ECE7E2]/80 hover:bg-[#E5E0DA] text-sm font-semibold text-[#1C1F1C] disabled:opacity-40 transition-all"
              >
                <Download className="w-4 h-4" />
                Download PNG only
              </button>
            </div>

            {/* Helper note */}
            <p className="text-[10px] text-[#5A635A] text-center pb-1">
              Tip: Direct image upload isn&apos;t possible via browser — the
              image downloads automatically, then you paste it.
            </p>
          </div>
        </div>
      </div>

      {/* ── Toasts ── */}
      <div
        className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[60] flex flex-col gap-2 items-center"
        aria-live="polite"
      >
        {toasts.map((t) => (
          <div
            key={t.id}
            className={[
              "flex items-center gap-2 px-4 py-2.5 rounded-2xl text-sm font-semibold shadow-xl border backdrop-blur-sm",
              "animate-in fade-in slide-in-from-bottom-2 duration-200",
              t.type === "success"
                ? "bg-[#252C25] text-white border-[#252C25]"
                : t.type === "error"
                  ? "bg-red-600 text-white border-red-600"
                  : "bg-[#5A635A] text-white border-[#5A635A]",
            ].join(" ")}
          >
            {t.type === "success" ? (
              <Check className="w-4 h-4 flex-shrink-0" />
            ) : (
              <ExternalLink className="w-4 h-4 flex-shrink-0" />
            )}
            {t.message}
          </div>
        ))}
      </div>
    </>
  );
}

/* ────────────────────────────────────────────────────────────
   PlatformButton sub-component
──────────────────────────────────────────────────────────── */
function PlatformButton({
  onClick,
  disabled,
  icon,
  label,
  color,
}: {
  onClick: () => void;
  disabled: boolean;
  icon: React.ReactNode;
  label: string;
  color: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="flex items-center justify-center gap-2 py-3 rounded-2xl border border-[#D9D3CC] text-sm font-semibold text-white disabled:opacity-40 transition-all hover:opacity-90 active:scale-95"
      style={{ background: color }}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}
