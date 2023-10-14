import {
  boolean,
  integer,
  jsonb,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
} from 'drizzle-orm/pg-core'
import { point } from './point'
import { relations } from 'drizzle-orm'

export const salePointFormat = pgEnum('sale_point_format', [
  'Мини_расш',
  'Универсальный',
  'Микро 2(3)',
  'Филиал',
  'Микро (РБ)',
  'Стандарт',
  'Прайм (РБ)',
  'Стандарт+бизнес отдел',
  'Брокер',
  'Розничный (РБ)',
  'Корпоративный',
  'Привилегия (РБ)',
])

export const banks = pgTable('banks', {
  id: uuid('id').primaryKey().notNull(),

  salePointName: text('sale_point_name').notNull(),
  salePointCode: text('sale_point_code').notNull(),

  address: text('address').notNull(),
  metroStation: text('metro_station').notNull(),

  is_opened: boolean('is_opened').default(true).notNull(),
  rko: boolean('rko').default(false).notNull(),
  kep: boolean('kep').default(false).notNull(),
  hasRamp: boolean('has_ramp').default(false).notNull(),
  myBranch: boolean('my_branch').default(false).notNull(),
  suoAvailability: boolean('suo_availability').default(false).notNull(),

  openHours: jsonb('open_hours').notNull(),
  openHoursIndividual: jsonb('open_hours_individual').notNull(),

  officeType: text('office_type').notNull(),
  salePointFormat: salePointFormat('sale_point_format').notNull(),

  point: point('point').notNull(),
})

export const services = pgTable('services', {
  id: uuid('id').primaryKey().notNull(),
  name: text('name').notNull(),
  description: text('description').notNull(),
  searchTerms: text('search_terms').array().notNull(),
})

export const circumstances = pgTable('circumstances', {
  id: uuid('id').primaryKey().notNull(),
  name: text('name').notNull(),
  description: text('description').notNull(),
  searchTerms: text('search_terms').array().notNull(),
})

export const windows = pgTable('windows', {
  id: uuid('id').primaryKey().notNull(),
  serviceId: uuid('service_id').notNull(),
  num: integer('num').notNull(),
})

export const tickets = pgTable('tickets', {
  id: uuid('id').primaryKey().notNull(),
  windowId: uuid('window_id').notNull(),
  startTime: timestamp('start_time').notNull(),
  endTime: timestamp('end_time').notNull(),
})

export const atms = pgTable('atms', {
  id: uuid('id').primaryKey().notNull(),
  address: text('address').notNull(),
  allDay: boolean('all_day').notNull(),
  point: point('point').notNull(),
})

export const windowsRelations = relations(windows, ({ one, many }) => ({
  service: one(services, {
    fields: [windows.serviceId],
    references: [services.id],
  }),
  tickets: many(tickets),
}))

export const ticketsRelations = relations(tickets, ({ one }) => ({
  window: one(windows, {
    fields: [tickets.windowId],
    references: [windows.id],
  }),
}))

export const servicesRelations = relations(services, ({ many }) => ({
  windows: many(windows),
}))
