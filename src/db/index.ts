// import { env } from '@/env'
// import * as schema from './schema'
// import { PostgresJsDatabase, drizzle } from 'drizzle-orm/postgres-js'
// import postgres from 'postgres'

// let database: PostgresJsDatabase<typeof schema>
// let pg: ReturnType<typeof postgres>

// if (env.NODE_ENV === 'production') {
// 	pg = postgres(env.DATABASE_URL)
// 	database = drizzle(pg, { schema })
// } else {
// 	if (!(global as any).database!) {
// 		pg = postgres(env.DATABASE_URL)
// 		;(global as any).database = drizzle(pg, { schema })
// 	}
// 	database = (global as any).database
// }

// export { database, pg }
import { sql } from '@vercel/postgres'
import { drizzle } from 'drizzle-orm/vercel-postgres'
import { config } from 'dotenv'
import * as schema from './schema'

config({ path: '.env' }) // or .env

export const db = drizzle(sql, { schema })
