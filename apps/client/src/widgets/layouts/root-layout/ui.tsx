import { ReactNode } from 'react'
import Footer from '@/widgets/footer'

export const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <article className="flex flex-col min-h-screen pb-16">
      <header>aboba</header>
      <main className="grow flex flex-col">{children}</main>
      <Footer />
    </article>
  )
}
