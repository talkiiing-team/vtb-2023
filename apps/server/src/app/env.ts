import { z } from 'zod'

import logger from './logger'

const scheme = z.object({
  LISTEN: z.string().transform(Number),
})

const env = scheme.safeParse(process.env)

if (!env.success) {
  logger.fatal(`bad environment`, env.error)
  process.exit(-1)
}

export default env.data
