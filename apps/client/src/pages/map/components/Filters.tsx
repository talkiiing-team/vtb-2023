import { FC, useEffect, useState } from 'react'
import LogoIcon from '@/shared/assets/icons/logo-icon.svg?react'
import { XMarkIcon } from '@heroicons/react/24/outline'

export type BankFilters = {
  distance?: number
}

export const Filters: FC<{ onChange: (filter: BankFilters) => void }> = ({
  onChange,
}) => {
  const [open, setOpen] = useState(false)
  const [filters, setFilters] = useState<BankFilters>({ distance: 0.03 })

  useEffect(() => {
    const timer = setTimeout(() => {
      onChange(filters)
    }, 400)
    return () => clearTimeout(timer)
  }, [filters])

  console.log(open)

  return (
    <>
      <div
        className='self-end w-min p-4 bg-white shadow-2xl rounded-full cursor-pointer'
        onClick={() => setOpen(o => !o)}
      >
        <LogoIcon className='w-6 h-6' />
      </div>
      {open && (
        <div className='absolute top-0 left-0 p-4 w-full h-full'>
          <div className='w-full h-full bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col space-y-3 p-3'>
            <div className='flex justify-between items-center space-x-2'>
              <span className='px-3 font-bold'>Фильтры</span>
              <XMarkIcon
                className='w-10 h-10 p-2 self-end stroke-[1.5px]'
                onClick={() => setOpen(false)}
              />
            </div>
            <div className='w-full h-full px-3 flex flex-col space-y-0.5'>
              <label htmlFor='filterDistance'>Расстояние от вас</label>
              <input
                id='filterDistance'
                type='range'
                min={0.005}
                max={0.1}
                step={0.005}
                defaultValue={filters.distance}
                onChange={e => {
                  const value = Number(e.target.value)
                  setFilters({
                    distance: value,
                  })
                }}
                className='z-[100000] bg-black'
              />
            </div>
          </div>
        </div>
      )}
    </>
  )
}
