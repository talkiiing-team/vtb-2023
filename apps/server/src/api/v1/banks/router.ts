import { Router } from 'express'

import controller from './controller'

const router = Router()
  .get('/nearest', controller.getNearest)
  .get('/:uuid/load', controller.getLoadById)
  .get('/:uuid', controller.getById)
export default router
