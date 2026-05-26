import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import * as schema from '@/../drizzle/schema'

const connectionString = process.env.DATABASE_URL!

if (!connectionString) {
  throw new Error('DATABASE_URL 환경 변수가 설정되지 않았습니다.')
}

// Transaction 풀 모드에서는 prepare: false 필수
const client = postgres(connectionString, { prepare: false })

export const db = drizzle(client, { schema })
