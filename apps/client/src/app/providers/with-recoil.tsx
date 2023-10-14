import { ReactNode } from 'react'
import { RecoilRoot } from 'recoil'

export const withRecoil = (component: () => ReactNode) => () => (
  <RecoilRoot>{component()}</RecoilRoot>
)
