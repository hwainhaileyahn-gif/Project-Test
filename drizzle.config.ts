import type { Config } from 'drizzle-kit'
import { config } from 'dotenv'

// .env.local 우선 로드 (Next.js 규칙)
config({ path: '.env.local' })

export default {
  schema: './drizzle/schema.ts',
  out: './drizzle/migrations',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
} satisfies Config
