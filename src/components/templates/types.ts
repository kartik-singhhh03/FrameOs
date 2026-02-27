import type { ReactNode, ComponentType } from "react";

// ─── Social Data ───────────────────────────────────────────────────────────────

export interface SocialData {
  /** @mention handle */
  handle: string;
  /** Display / full name */
  displayName: string;
  /** Job title / designation shown on LinkedIn-style templates */
  designation: string;
  /** Post caption shown below the image (Instagram-style) */
  caption: string;
  /** Formatted like count e.g. "1,204" */
  likeCount: string;
  /** Relative timestamp e.g. "2h" */
  timestamp: string;
  /** object URL from URL.createObjectURL, or null for initials avatar */
  profileImageUrl: string | null;
  /** Per-template light/dark toggle */
  darkMode: boolean;
  /** Filename shown in Code Snippet template */
  filename: string;
}

export const DEFAULT_SOCIAL_DATA: SocialData = {
  handle: "@frameos",
  displayName: "FrameOS Studio",
  designation: "Design Tools · Creator",
  caption: "Design smarter, share everything ✨ #FrameOS",
  likeCount: "1,204",
  timestamp: "2h",
  profileImageUrl: null,
  darkMode: false,
  filename: "quote.md",
};

// ─── Template Props ────────────────────────────────────────────────────────────

export interface TemplateProps {
  children: ReactNode;
  /** Passed to social templates; frame templates ignore it */
  socialData?: SocialData;
}

// ─── Template Registry ─────────────────────────────────────────────────────────

export type TemplateCategory = "frames" | "social";

export type TemplateId =
  | "mac-window"
  | "minimal-glass"
  | "browser-window"
  | "polaroid"
  | "clean-card"
  | "crumpled-paper"
  | "torn-notebook"
  | "gallery-frame"
  | "typewriter"
  | "newspaper"
  | "shadow-desk"
  | "twitter-post"
  | "linkedin-post"
  | "instagram-post"
  | "threads-post"
  | "notion-page"
  | "code-snippet";

export interface TemplateDefinition {
  id: TemplateId;
  name: string;
  description: string;
  /** Emoji / symbol used in mini-preview cards */
  previewIcon: string;
  category: TemplateCategory;
  component: ComponentType<TemplateProps>;
}
