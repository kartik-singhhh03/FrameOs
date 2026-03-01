/**
 * ThreadTemplate.tsx
 * Renders a single slide of a multi-slide thread.
 * The slide text and slide index are resolved by QuoteCanvas and passed in via devData.
 * This component wraps `children` (the standard quote canvas content) so all
 * typography / background / emphasis controls continue to work unchanged.
 *
 * Slide navigation lives OUTSIDE the canvas (in QuoteCanvas controls panel).
 */
import { memo } from "react";
import type { TemplateProps } from "../types";

/**
 * ThreadTemplate just renders its children — the standard quoteCanvasJsx —
 * unchanged. Navigation UI is provided by QuoteCanvas in the controls panel.
 * Export therefore captures exactly the current slide.
 */
function ThreadTemplate({ children }: TemplateProps) {
  return <>{children}</>;
}

export default memo(ThreadTemplate);
