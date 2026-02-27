import MacWindowTemplate from "./MacWindowTemplate";
import MinimalGlassTemplate from "./MinimalGlassTemplate";
import BrowserWindowTemplate from "./BrowserWindowTemplate";
import PolaroidTemplate from "./PolaroidTemplate";
import CleanCardTemplate from "./CleanCardTemplate";
import CrumpledPaperTemplate from "./CrumpledPaperTemplate";
import TornNotebookTemplate from "./TornNotebookTemplate";
import GalleryFrameTemplate from "./GalleryFrameTemplate";
import TypewriterTemplate from "./TypewriterTemplate";
import NewspaperTemplate from "./NewspaperTemplate";
import ShadowDeskTemplate from "./ShadowDeskTemplate";

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
  CrumpledPaperTemplate,
  TornNotebookTemplate,
  GalleryFrameTemplate,
  TypewriterTemplate,
  NewspaperTemplate,
  ShadowDeskTemplate,
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
  {
    id: "crumpled-paper",
    name: "Crumpled Paper",
    description: "Tactile paper canvas with crease lines and grain",
    previewIcon: "📄",
    component: CrumpledPaperTemplate,
    category: "frames",
  },
  {
    id: "torn-notebook",
    name: "Torn Notebook",
    description: "Ruled notepad page with torn edges and spiral binding",
    previewIcon: "📓",
    component: TornNotebookTemplate,
    category: "frames",
  },
  {
    id: "gallery-frame",
    name: "Gallery Frame",
    description: "Ornate gold picture frame with linen mat board",
    previewIcon: "🖼",
    component: GalleryFrameTemplate,
    category: "frames",
  },
  {
    id: "typewriter",
    name: "Typewriter",
    description: "Aged typewriter paper with ruled header and mono aesthetic",
    previewIcon: "⌨",
    component: TypewriterTemplate,
    category: "frames",
  },
  {
    id: "newspaper",
    name: "Newspaper",
    description: "Editorial newsprint layout with serif masthead",
    previewIcon: "📰",
    component: NewspaperTemplate,
    category: "frames",
  },
  {
    id: "shadow-desk",
    name: "Shadow Desk",
    description: "Paper card on a textured desk surface with depth",
    previewIcon: "🗂",
    component: ShadowDeskTemplate,
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
