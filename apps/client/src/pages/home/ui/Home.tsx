import { Search } from '@/features/Search'
import { HomePlaceholder } from './HomePlaceholder'
import { useState } from 'react'
import { FaceFrownIcon } from '@heroicons/react/24/outline'

export const Home = () => {
  const [search, setSearch] = useState('')

  const onSearch = (line: string) => setSearch(line)

  return (
    <article className='grow flex flex-col p-4 gap-2'>
      <Search onSearch={onSearch} />
      {search.length > 1 ? (
        <main className='grow flex-1 text-center flex flex-col justify-center items-center gap-4'>
          <FaceFrownIcon width={48} height={48} />
          <p>Ууупс. Кажется здесь должна быть обработка запроса...?</p>
        </main>
      ) : (
        <HomePlaceholder />
      )}
    </article>
  )
}
