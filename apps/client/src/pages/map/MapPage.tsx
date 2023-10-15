import Map from '@/widgets/map'
import { BankFilters, Filters } from '@/pages/map/components/Filters.tsx'
import { useState } from 'react'

export const MapPage = () => {
  const [filters, setFilters] = useState<BankFilters>({ distance: 0.03 })

  return (
    <div className='grow flex flex-col relative'>
      <div className='flex grow [&>*]:grow flex-col'>
        <Map filter={filters} />
      </div>
      <div className='absolute w-full h-full flex flex-col pointer-events-none z-[1000] p-4 [&>*]:pointer-events-auto'>
        <Filters onChange={filter => setFilters(filter)} />
      </div>
    </div>
  )
}
