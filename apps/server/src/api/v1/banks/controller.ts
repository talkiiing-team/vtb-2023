import { eq, sql } from 'drizzle-orm'

import { Controller } from '../../../types/controller'
import { banks, services, circumstances, windows } from '../../../models'
import db from '../../../app/db'

const controller: Controller = {
  getNearest: async (req, res) => {
    const { lat, lng, dist } = req.query

    if (!lat || !lng || !dist) {
      return res.status(400).json({
        message: 'Invalid coordinates',
      })
    }

    const found = await db
      .select()
      .from(banks)
      .where(
        sql.raw(
          `st_distancesphere(point, st_geomfromewkt('SRID=4326;POINT(${lat} ${lng})')) <= ${dist}`,
        ),
      )
      .orderBy(
        sql.raw(
          `st_distance(point, st_geomfromewkt('SRID=4326;POINT(${lat} ${lng})'))`,
        ),
      )
      .limit(10)
      .execute()

    return res.json(found)
  },
  getById: async (req, res) => {
    const { uuid } = req.params

    const [bank] = await db
      .selectDistinct()
      .from(windows)
      .leftJoin(banks, eq(banks.id, windows.bankId))
      .leftJoin(services, eq(windows.serviceId, services.id))
      .where(eq(banks.id, uuid))

    return res.json(bank)
  },
}

export default controller
