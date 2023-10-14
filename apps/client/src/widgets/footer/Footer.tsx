import classNames from 'classnames'
import { Link, useLocation } from 'react-router-dom'
import { ReactNode } from 'react'
import { HomeIcon, MapIcon, QueueListIcon } from '@heroicons/react/24/outline'

const linksNav: { icon: ReactNode; path: string }[] = [
  {
    icon: <QueueListIcon className='w-5 h-5' />,
    path: '/bank-list',
  },
  {
    icon: <HomeIcon className='w-5 h-5' />,
    path: '/',
  },
  {
    icon: <MapIcon className='w-5 h-5' />,
    path: '/map',
  },
]

export const Footer = () => {
  const { pathname } = useLocation()

  return (
    <footer className='btm-nav bg-primary text-white rounded-t-lg'>
      {linksNav.map((e, i) => (
        <Link
          key={i}
          to={e.path}
          className={classNames('transition-all rounded-t-lg', {
            ['bg-secondary']: e.path === pathname,
          })}
        >
          {e.icon}
        </Link>
      ))}
    </footer>
  )
}
