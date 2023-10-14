import { Search } from '@/features/Search'
import { HomePlaceholder } from './HomePlaceholder'
import { useState } from 'react'

export const Home = () => {
  const [search, setSearch] = useState('')

  const onSearch = (line: string) => setSearch(line)

  return (
    <article className="grow flex flex-col p-4 gap-2">
      <Search onSearch={onSearch} />
      {search.length > 1 ? (
        <main className="grow flex-1">content</main>
      ) : (
        <HomePlaceholder />
      )}
    </article>
  )
}
