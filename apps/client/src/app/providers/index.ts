import compose from 'compose-function'
import { withRouter } from './with-router'
import { withRecoil } from './with-recoil'
import { withLayout } from './with-layout'

export const withProviders = compose(withRouter, withRecoil, withLayout)
