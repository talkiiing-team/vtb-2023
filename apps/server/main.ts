import { createApp } from './src'

import env from './src/app/env'
import logger from './src/app/logger'

createApp().then((app) =>
  app.listen(env.LISTEN, () => {
    logger.info(`listening at http://localhost:${env.LISTEN}`)
  }),
)
