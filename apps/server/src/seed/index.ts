import {
  atms,
  banks,
  circumstances,
  services,
  tickets,
  windows,
} from '../models'
import offices from './offices.json'
import { default as atmsData } from './atms.json'
import db from '../app/db'
import { randomUUID } from 'crypto'

const circumstancesData = [
  {
    id: randomUUID(),
    name: 'Нужен пандус',
    description: 'Нужен пандус',
    searchTerms: ['нужен пандус', 'инвалидная коляска', 'коляска', 'инвалид'],
  },
]

const servicesData = [
  {
    id: randomUUID(),
    name: 'Оформить кредит',
    description: 'Оформить кредит',
    searchTerms: ['оформление кредита', 'оформить кредит'],
  },
  {
    id: randomUUID(),
    name: 'Оформить дебетовую карту',
    description: 'Оформить дебетовую карту',
    searchTerms: ['оформление дебетовой карты', 'оформить дебетовую карту'],
  },
  {
    id: randomUUID(),
    name: 'Оформить кредитную карту',
    description: 'Оформить кредитную карту',
    searchTerms: ['оформление кредитной карты', 'оформить кредитную карту'],
  },
  {
    id: randomUUID(),
    name: 'Оформить ипотеку',
    description: 'Оформить ипотеку',
    searchTerms: ['оформление ипотеки', 'оформить ипотеку'],
  },
  {
    id: randomUUID(),
    name: 'Оформить страховку',
    description: 'Оформить страховку',
    searchTerms: ['оформление страховки', 'оформить страховку'],
  },
  {
    id: randomUUID(),
    name: 'Оформить депозит',
    description: 'Оформить депозит',
    searchTerms: ['оформление депозита', 'оформить депозит'],
  },
  {
    id: randomUUID(),
    name: 'Оформить вклад',
    description: 'Оформить вклад',
    searchTerms: ['оформление вклада', 'оформить вклад'],
  },
  {
    id: randomUUID(),
    name: 'Оформить сейфовую ячейку',
    description: 'Оформить сейфовую ячейку',
    searchTerms: ['оформление сейфовой ячейки', 'оформить сейфовую ячейку'],
  },
  {
    id: randomUUID(),
    name: 'Оформить кредит наличными',
    description: 'Оформить кредит наличными',
    searchTerms: ['оформление кредита наличными', 'оформить кредит наличными'],
  },
]

const windowsData = (() => {
  const result = []

  for (const bank of offices) {
    for (let i = 0; i < servicesData.length; i++) {
      result.push({
        id: randomUUID(),
        num: i,
        bankId: bank.uuid,
        serviceId: servicesData[0].id,
      })
    }
  }

  for (let i = 0; i < result.length; i += 3) {
    result.splice(i, 1)
  }

  return result
})()

const ticketsData = (() => {
  const result = []

  for (const bank of offices) {
    for (let i = 0; i < servicesData.length; i++) {
      for (let j = 0; j < 10; j++) {
        result.push({
          id: randomUUID(),
        })
      }
    }
  }

  for (let i = 0; i < result.length; i += 3) {
    result.splice(i, 1)
  }

  return result
})()

;(async () => {
  await db.insert(services).values(servicesData).onConflictDoNothing().execute()

  await db
    .insert(banks)
    .values(
      offices.map(office => ({
        id: office.uuid,
        salePointName: office.sale_point_name,
        salePointCode: office.sale_point_code,
        address: office.address,
        metroStation: office.metro_station,
        is_opened: office.is_opened,
        rko: office.rko,
        kep: office.kep,
        hasRamp: office.has_ramp === 'true',
        myBranch: office.my_branch,
        suoAvailability: office.suo_available === 'true',
        openHours: office.open_hours,
        openHoursIndividual: office.open_hours_individual,
        officeType: office.office_type,
        salePointFormat: office.sale_point_format as any,
        point: {
          lat: office.latitude,
          lng: office.longitude,
        },
      })),
    )
    .onConflictDoNothing()
    .execute()

  await db
    .insert(atms)
    .values(
      atmsData.map(atm => ({
        id: atm.uuid,
        address: atm.address,
        allDay: atm.all_day,
        point: {
          lat: atm.latitude,
          lng: atm.longitude,
        },
      })),
    )
    .onConflictDoNothing()
    .execute()

  await db
    .insert(circumstances)
    .values(circumstancesData)
    .onConflictDoNothing()
    .execute()

  await db.insert(windows).values(windowsData).onConflictDoNothing().execute()

  //   await db.insert(tickets).values(ticketsData)

  console.log('Done')
})()
