import { drizzle } from 'drizzle-orm/postgres-js'
import { migrate as drizzleMigrate } from 'drizzle-orm/postgres-js/migrator'
import postgres from 'postgres'

import env from './env'
import logger from './logger'

const migrationClient = drizzle(postgres(env.DB_URI, { max: 1 }))

export const migrate = () =>
  drizzleMigrate(migrationClient, { migrationsFolder: 'migrations' })
    .then(() => logger.info('applied migrations'))
    .catch((error) => {
      logger.fatal('fail to apply migrations', error)
      process.exit(-1)
    })

const db = drizzle(postgres(env.DB_URI))

export default db
