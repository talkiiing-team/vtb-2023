import { Router } from 'express'
import swaggerUi from 'swagger-ui-express'

import atms from './atms'
import banks from './banks'

import * as openapi from './openapi.json'

export default Router()
  .use('/docs', swaggerUi.serve, swaggerUi.setup(openapi))
  .use('/atms', atms)
  .use('/banks', banks)
