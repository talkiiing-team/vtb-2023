import { Router } from 'express'

import db from '../../../app/db'
import { circumstances } from '../../../models'

const router = Router().get('/', async (req, res) => {
  const found = await db.select().from(circumstances)

  return res.json(found)
})

export default router
