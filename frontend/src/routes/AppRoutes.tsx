import { Routes, Route } from 'react-router-dom'
import { DailyRoutes } from '@/features/daily'
import { TopRoutes } from '@/features/top'

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="daily/*" element={<DailyRoutes />} />
      <Route path="*" element={<TopRoutes />} />
    </Routes>
  )
}
