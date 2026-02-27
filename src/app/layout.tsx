import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import SessionProvider from "@/components/SessionProvider";
import PaddleProvider from "@/components/PaddleProvider";

export const metadata: Metadata = {
  title: "FrameOS — Create Viral-Ready Posts in Seconds",
  description:
    "FrameOS is a premium, Apple-inspired creative studio. Design Mac-style frames, social post templates, and aesthetic screenshots — all in one powerful editor. Pro plan from $5/month.",
  keywords:
    "frame generator, quote design, social media templates, screenshot beautifier, twitter post maker, linkedin post design, SaaS design tool",
  authors: [
    {
      name: "Kartik Singh",
      url: "https://www.linkedin.com/in/kartik-singh-879b6b288/",
    },
  ],
  creator: "Kartik Singh",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://frameos.design",
    title: "FrameOS — Create Viral-Ready Posts in Seconds",
    description:
      "Design Mac-style frames, social post templates, and aesthetic screenshots — all in one powerful editor. Pro from $5/month.",
    siteName: "FrameOS",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "FrameOS — Premium Design Studio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "FrameOS — Create Viral-Ready Posts in Seconds",
    description:
      "Design Mac-style frames, social post templates, and aesthetic screenshots — all in one powerful editor.",
    creator: "@kartik_singhhh",
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=Poppins:wght@300;400;500;600;700&family=DM+Sans:wght@300;400;500;600;700&family=Space+Grotesk:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        <SessionProvider>
          <PaddleProvider />
          {children}
        </SessionProvider>
        <Script
          src="https://cdn.paddle.com/paddle/v2/paddle.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
