import { RootLayout } from '@/widgets/layouts'
import { ReactNode } from 'react'

export const withLayout = (component: () => ReactNode) => () => (
  <RootLayout>{component()}</RootLayout>
)
