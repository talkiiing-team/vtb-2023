import { ChangeEvent, InputHTMLAttributes } from 'react'

import { useDebounce } from '@/shared/api/useDebounce'
import SearchIcon from '@/shared/assets/icons/search-icon.svg?react'

interface SearchProps extends InputHTMLAttributes<HTMLInputElement> {
  onSearch: (value: string) => void
}

export const Search = (props: SearchProps) => {
  const { onSearch, ...lastProps } = props
  const debouncedSearch = useDebounce(onSearch, 500)

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    debouncedSearch(value)
  }

  return (
    <div className="border border-secondary pl-4 pr-2 rounded shadow flex gap-2 items-center text-primary">
      <span className="w-6 h-6">
        <SearchIcon />
      </span>
      <input
        type="text"
        placeholder="Поиск услуг, ближайшего банка"
        className="outline-none py-2 w-full"
        onChange={handleInput}
        {...lastProps}
      />
    </div>
  )
}
