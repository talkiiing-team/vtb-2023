import { Handler } from 'express'

export type Controller = Record<string, Handler>
