import { Bank } from '@/widgets/map/types'
import { ArrowRightIcon, ClockIcon } from '@heroicons/react/24/outline'
import classNames from 'classnames'
import { Link } from 'react-router-dom'

export const BankButton = (props: { bank: Bank }) => {
  const { bank } = props

  return (
    <Link
      to={`/bank-list/${bank.uuid}`}
      className={classNames(
        'border rounded p-4 shadow transition-all flex justify-between',
        'hover:shadow-inner',
        {
          ['border-secondary']: bank.is_opened,
        },
      )}
    >
      <div className='flex flex-col gap-4'>
        <p>{bank.sale_point_name}</p>
        <div className='flex gap-2 text-primary'>
          <p>10:00-19:00</p>
          <ClockIcon width={24} height={24} />
        </div>
        <p className='text-sm opacity-50'>
          {bank.address}, {bank.distance}м
        </p>
      </div>
      <div className='flex gap-2 text-primary'>
        <div className='flex items-center justify-center'>
          <ArrowRightIcon width={24} height={24} />
        </div>
      </div>
    </Link>
  )
}
