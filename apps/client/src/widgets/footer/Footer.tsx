import classNames from 'classnames'
import { Link, useLocation } from 'react-router-dom'

const linksNav = [
  {
    icon: 'B',
    path: '/bank-list',
  },
  {
    icon: 'H',
    path: '/',
  },
  {
    icon: 'M',
    path: '/map',
  },
]

export const Footer = () => {
  const { pathname } = useLocation()

  return (
    <footer className="btm-nav bg-primary text-white rounded-t-lg">
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
