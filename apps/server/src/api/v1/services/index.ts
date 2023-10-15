import { Router } from 'express'

import db from '../../../app/db'
import { services } from '../../../models'

const router = Router().get('/', async (req, res) => {
  const found = await db.select().from(services)

  return res.json(found)
})

export default router
