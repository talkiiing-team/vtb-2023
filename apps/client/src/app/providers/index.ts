import compose from 'compose-function'
import { withRouter } from './with-router'
import { withRecoil } from './with-recoil'

export const withProviders = compose(withRouter, withRecoil)
