import {
  boolean,
  jsonb,
  pgEnum,
  pgTable,
  text,
  uuid,
} from 'drizzle-orm/pg-core'

export const bankStatus = pgEnum('bank_status', ['active', 'inactive'])

export const banks = pgTable('banks', {
  id: uuid('id').primaryKey(),

  // fields from VTB bank:
  salePointName: text('sale_point_name').notNull(),

  address: text('address').notNull(),
  metroStation: text('metro_station'),

  status: bankStatus('status').notNull().default('active'),
  rko: boolean('rko').default(false),
  hasRamp: boolean('has_ramp').default(false),
  myBranch: boolean('my_branch').default(false),
  suoAvailability: boolean('suo_availability').default(false),

  // TODO: think about how to store these
  openHours: jsonb('open_hours').default({
    mon: '09:00-20:00',
    tue: '09:00-20:00',
    wed: '09:00-20:00',
    thu: '09:00-20:00',
    fri: '09:00-20:00',
    break: '13:00-14:00',
  }),
  openHoursIndividual: jsonb('open_hours_individual').default({
    mon: '09:00-20:00',
    tue: '09:00-20:00',
    wed: '09:00-20:00',
    thu: '09:00-20:00',
    fri: '09:00-20:00',
    break: '13:00-14:00',
  }),

  // TODO: store lat long with PostGIS
  // TODO: investigate what office types are
})

// TODO: services
// TODO: обстоятельства (circumstances)
// TODO: windows
// TODO: tickets
// TODO: atms
