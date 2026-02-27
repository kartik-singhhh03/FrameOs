"use client";

import { useEffect } from "react";

/**
 * Initializes Paddle.js once on mount.
 * Paddle.js must be loaded via the <Script> tag in layout.tsx first.
 */
export default function PaddleProvider() {
  useEffect(() => {
    const token = process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN;
    if (!token) return;

    // Wait for Paddle.js to be available on window
    const init = () => {
      if (
        typeof window !== "undefined" &&
        (
          window as Window & {
            Paddle?: { Initialize: (opts: { token: string }) => void };
          }
        ).Paddle
      ) {
        (
          window as Window & {
            Paddle?: { Initialize: (opts: { token: string }) => void };
          }
        ).Paddle!.Initialize({ token });
      }
    };

    // Paddle.js may not be ready immediately after mount
    if ((window as Window & { Paddle?: unknown }).Paddle) {
      init();
    } else {
      window.addEventListener("paddle-loaded", init, { once: true });
      // Fallback poll
      const t = setTimeout(init, 500);
      return () => clearTimeout(t);
    }
  }, []);

  return null;
}
