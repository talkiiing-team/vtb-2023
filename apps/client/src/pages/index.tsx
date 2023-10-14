import { lazy } from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'

const HomePage = lazy(() => import('./home'))
const MapPage = lazy(() => import('./map'))
const BankListPage = lazy(() => import('./bank-list'))

export const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/map" element={<MapPage />} />
      <Route path="/bank-list" element={<BankListPage />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  )
}
