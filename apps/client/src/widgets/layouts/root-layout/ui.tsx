import { ReactNode } from 'react'
import Footer from '@/widgets/footer'

export const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <article className="flex flex-col min-h-screen">
      <header>aboba</header>
      <main className="grow flex-1">{children}</main>
      <Footer />
    </article>
  )
}
