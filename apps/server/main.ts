import { createApp } from './src'

import env from './src/app/env'
import logger from './src/app/logger'
// import { migrate } from './src/app/db'

// migrate()
Promise.resolve()
  .then(() => createApp())
  .then(app =>
    app.listen(env.LISTEN, () => {
      logger.info(`listening at http://localhost:${env.LISTEN}`)
    }),
  )
