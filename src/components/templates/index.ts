import MacWindowTemplate from "./MacWindowTemplate";
import MinimalGlassTemplate from "./MinimalGlassTemplate";
import BrowserWindowTemplate from "./BrowserWindowTemplate";
import PolaroidTemplate from "./PolaroidTemplate";
import CleanCardTemplate from "./CleanCardTemplate";

import TwitterPostTemplate from "./social/TwitterPostTemplate";
import LinkedInPostTemplate from "./social/LinkedInPostTemplate";
import InstagramPostTemplate from "./social/InstagramPostTemplate";
import ThreadsPostTemplate from "./social/ThreadsPostTemplate";
import NotionPageTemplate from "./social/NotionPageTemplate";
import CodeSnippetTemplate from "./social/CodeSnippetTemplate";

export type {
  TemplateId,
  TemplateDefinition,
  TemplateProps,
  TemplateCategory,
  SocialData,
} from "./types";
export { DEFAULT_SOCIAL_DATA } from "./types";

export {
  MacWindowTemplate,
  MinimalGlassTemplate,
  BrowserWindowTemplate,
  PolaroidTemplate,
  CleanCardTemplate,
  TwitterPostTemplate,
  LinkedInPostTemplate,
  InstagramPostTemplate,
  ThreadsPostTemplate,
  NotionPageTemplate,
  CodeSnippetTemplate,
};

// ─── Registry ─────────────────────────────────────────────────────────────────

import type { TemplateDefinition, TemplateId } from "./types";

export const TEMPLATES: TemplateDefinition[] = [
  // ── Frames ──────────────────────────────────────────────────────────────
  {
    id: "mac-window",
    name: "Mac Window",
    description: "macOS-style frosted glass window chrome",
    previewIcon: "🖥",
    component: MacWindowTemplate,
    category: "frames",
  },
  {
    id: "minimal-glass",
    name: "Minimal Glass",
    description: "Soft frosted glass card, no distractions",
    previewIcon: "✦",
    component: MinimalGlassTemplate,
    category: "frames",
  },
  {
    id: "browser-window",
    name: "Browser",
    description: "Realistic browser window with address bar",
    previewIcon: "🌐",
    component: BrowserWindowTemplate,
    category: "frames",
  },
  {
    id: "polaroid",
    name: "Polaroid",
    description: "Instant-photo frame with caption area",
    previewIcon: "📷",
    component: PolaroidTemplate,
    category: "frames",
  },
  {
    id: "clean-card",
    name: "Clean Card",
    description: "Minimal white card with accent strip",
    previewIcon: "🃏",
    component: CleanCardTemplate,
    category: "frames",
  },

  // ── Social ───────────────────────────────────────────────────────────────
  {
    id: "twitter-post",
    name: "Twitter",
    description: "Twitter/X-style post card with engagement row",
    previewIcon: "𝕏",
    component: TwitterPostTemplate,
    category: "social",
  },
  {
    id: "linkedin-post",
    name: "LinkedIn",
    description: "LinkedIn professional post with reactions",
    previewIcon: "in",
    component: LinkedInPostTemplate,
    category: "social",
  },
  {
    id: "instagram-post",
    name: "Instagram",
    description: "Instagram post with gradient-ring avatar",
    previewIcon: "◎",
    component: InstagramPostTemplate,
    category: "social",
  },
  {
    id: "threads-post",
    name: "Threads",
    description: "Short-form threaded post layout",
    previewIcon: "ꝏ",
    component: ThreadsPostTemplate,
    category: "social",
  },
  {
    id: "notion-page",
    name: "Notion",
    description: "Notion page callout block embed",
    previewIcon: "N",
    component: NotionPageTemplate,
    category: "social",
  },
  {
    id: "code-snippet",
    name: "Code",
    description: "VS Code–inspired code editor window",
    previewIcon: "</>",
    component: CodeSnippetTemplate,
    category: "social",
  },
];

export const DEFAULT_TEMPLATE_ID = "mac-window";

export const SOCIAL_TEMPLATE_IDS: TemplateId[] = [
  "twitter-post",
  "linkedin-post",
  "instagram-post",
  "threads-post",
  "notion-page",
  "code-snippet",
];
