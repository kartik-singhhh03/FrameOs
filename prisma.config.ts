import "dotenv/config";
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  datasource: {
    // Use pooled URL for db push — Neon direct endpoint may not be reachable
    // from all networks; pooler works for one-off CLI commands too.
    url: process.env.DATABASE_URL!,
  },
});
