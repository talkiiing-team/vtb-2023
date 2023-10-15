import { eq, gt, and, sql } from 'drizzle-orm'

import { Controller } from '../../../types/controller'
import {
  banks,
  services,
  circumstances,
  windows,
  tickets,
} from '../../../models'
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
  getLoadById: async (req, res) => {
    const { uuid } = req.params

    // SELECT count(tickets) FROM tickets
    //     LEFT JOIN windows w on w.id = tickets.window_id
    //     LEFT JOIN banks b on w.bank_id = b.id
    //     WHERE tickets.end_time >
    //           current_timestamp
    //         AND b.id = '2ce2ecf8-8798-4209-9ad2-cba58c406db7'

    const now = new Date()
    now.setDate(new Date().getDate() - 3)

    const [{ ticketsCount }] = await db
      .select({ ticketsCount: sql<number>`count(windows)` })
      .from(tickets)
      .leftJoin(windows, eq(windows.id, tickets.windowId))
      .leftJoin(banks, eq(windows.bankId, banks.id))
      .where(and(gt(tickets.endTime, now), eq(banks.id, uuid)))

    // SELECT count(w)
    // FROM banks
    //         LEFT JOIN windows w ON w.bank_id = banks.id
    // WHERE banks.id = '2ce2ecf8-8798-4209-9ad2-cba58c406db7'

    const [{ windowsCount }] = await db
      .select({ windowsCount: sql<number>`count(windows)` })
      .from(banks)
      .leftJoin(windows, eq(windows.bankId, banks.id))
      .where(eq(banks.id, uuid))

    const load = Math.max(
      Math.min(ticketsCount / windowsCount - 10 / 10, 10),
      0,
    )

    return res.json(load)
  },
}

export default controller
