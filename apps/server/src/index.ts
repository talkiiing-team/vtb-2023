import express from 'express'

import v1 from './api/v1'

export const createApp = async () => {
  return express().use('/v1', v1)
}
