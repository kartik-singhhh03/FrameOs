import { toPng } from "html-to-image";

/**
 * Converts a DOM element to a high-resolution PNG and triggers a browser download.
 * @param element  - The HTML element to capture (the quote canvas wrapper)
 * @param filename - Output filename (default: "frameos-quote.png")
 * @param scale    - Pixel ratio multiplier for resolution (default: 3)
 */
export async function downloadAsPng(
  element: HTMLElement,
  filename = "frameos-quote.png",
  scale = 3,
): Promise<void> {
  const dataUrl = await toPng(element, {
    cacheBust: true,
    pixelRatio: scale,
    skipAutoScale: false,
  });

  const link = document.createElement("a");
  link.download = filename;
  link.href = dataUrl;
  link.click();
}
