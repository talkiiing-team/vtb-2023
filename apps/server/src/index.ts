import express from 'express'

import v1 from './api/v1'
import cors from 'cors'

export const createApp = async () => {
  return express().use(cors('*')).use('/v1', v1)
}
