import { Router } from 'express'

import controller from './controller'

const router = Router().get('/nearest', controller.getNearest)

export default router
