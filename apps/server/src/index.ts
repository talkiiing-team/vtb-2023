import express from 'express'
import cors from 'cors'

import v1 from './api/v1'
import logger from './app/logger'

export const createApp = async () => {
  return express()
    .use(cors('*'))
    .use((req, res, next) => {
      logger.info(`${req.method} ${req.originalUrl}`)
      next()
    })
    .use('/v1', v1)
}
