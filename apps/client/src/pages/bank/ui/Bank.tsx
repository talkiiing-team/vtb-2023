import { Bank } from '@/widgets/map/types'
import {
  ClockIcon,
  CloudArrowDownIcon,
  LockClosedIcon,
} from '@heroicons/react/24/outline'
import { useState } from 'react'
import { useParams } from 'react-router'

export const BankPage = () => {
  const [bank, setBank] = useState<Bank>({
    address: 'Кукуево д. 18',
    is_opened: true,
    uuid: 'kaif-kaif-kaif',
    sale_point_name: 'Название отделения',
    distance: 55,
    services: ['Погашение кредита', 'Обмен валют', 'Открытие ячейки'],
  })

  // const { uuid } = useParams()

  return (
    <article className='p-4'>
      {!bank && <p>Loading</p>}
      {bank && (
        <section className='flex flex-col gap-4'>
          <p className='text-lg'>{bank.sale_point_name}</p>
          <div className='px-4'>
            <img
              src=''
              alt='Map here...'
              className='h-60 bg-gray-400 w-full text-white text-center rounded-sm'
            />
          </div>
          <div className='flex justify-between'>
            <div className='flex gap-2'>
              <p>10:00-19:00</p>
              <ClockIcon width={24} height={24} />
            </div>
            <div>
              <p>{bank.distance}м</p>
            </div>
          </div>
          <div>
            <p>Перерыв: 12:15-13:00</p>
          </div>
          <div className='flex flex-col gap-2'>
            <p className='text-lg'>Услуги</p>
            <div className='px-4'>
              {bank.services.map((e, i) => (
                <p key={i} className='list-disc list-item '>
                  {e}
                </p>
              ))}
            </div>
          </div>
        </section>
      )}
    </article>
  )
}
