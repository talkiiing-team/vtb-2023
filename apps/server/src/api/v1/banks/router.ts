import { Router } from 'express'

import controller from './controller'

const router = Router()
  .get('/:uuid', controller.getById)
  .get('/:uuid/load', controller.getLoadById)
  .get('/nearest', controller.getNearest)
export default router
