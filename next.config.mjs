/** @type {import('next').NextConfig} */
const nextConfig = {
  // ── Image optimization ────────────────────────────────────────────────────
  images: {
    remotePatterns: [
      // Google OAuth avatar images
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        pathname: "/**",
      },
      // Also allow Gravatar, GitHub etc for future providers
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
        pathname: "/**",
      },
    ],
  },

  // ── Response headers (security + caching) ────────────────────────────────
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "X-XSS-Protection", value: "1; mode=block" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        ],
      },
      {
        // Cache static assets aggressively
        source: "/_next/static/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },

  // ── Redirects ─────────────────────────────────────────────────────────────
  async redirects() {
    return [
      // Old hash-based templates link → dedicated page
      {
        source: "/",
        has: [{ type: "query", key: "section", value: "templates" }],
        destination: "/templates",
        permanent: false,
      },
    ];
  },

  // ── Experimental: server component external packages (Prisma / Neon) ─────
  experimental: {
    serverComponentsExternalPackages: [
      "@prisma/client",
      "@neondatabase/serverless",
    ],
    optimizeCss: false,
  },
};

export default nextConfig;
