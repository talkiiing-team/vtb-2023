import { Link } from 'react-router-dom'

export const Footer = () => {
  return (
    <footer className="btm-nav bg-primary text-white rounded-t-lg">
      <Link to={'/banks'}>B</Link>
      <Link to={'/'} className="bg-secondary">
        H
      </Link>
      <Link to={'/map'}>M</Link>
    </footer>
  )
}
