import { defineConfig } from "prisma/config";
import * as dotenv from "dotenv";

// Load .env.local first, fall back to .env
dotenv.config({ path: ".env.local" });
dotenv.config({ path: ".env" });

export default defineConfig({
  datasource: {
    url: process.env.DATABASE_URL!,
  },
});