import { ReactNode } from 'react'
import Footer from '@/widgets/footer'
import { Header } from '@/widgets/header'

export const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <article className='flex flex-col min-h-screen pb-16'>
      <Header />
      <main className='grow flex flex-col'>{children}</main>
      <Footer />
    </article>
  )
}
