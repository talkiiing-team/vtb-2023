import { BankButton } from '@/features/BankButton'
import { Bank } from '@/widgets/map/types'
import axios from 'axios'
import { useEffect, useState } from 'react'

export const BankListPage = () => {
  const [banks, setBanks] = useState<Bank[]>()

  useEffect(() => {
    axios
      .get<Bank[]>('http://192.168.0.120:3000/v1/banks/nearest', {
        params: {
          lat: 55.751244,
          lng: 37.618423,
          dist: 0.03,
        },
      })
      .then(res => {
        setBanks(res.data.slice(0, res.data.length < 10 ? res.data.length : 10))
      })
  }, [])

  return (
    <article className='flex flex-col gap-4 px-4 py-2'>
      {banks && banks.map(e => <BankButton key={e.uuid} bank={e} />)}
    </article>
  )
}
