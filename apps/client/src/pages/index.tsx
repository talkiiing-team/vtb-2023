// Or use @loadable/component, as part of the tutorial - uncritically
import { lazy } from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'

const HomePage = lazy(() => import('./home'))

export const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  )
}
