import { Navigate, Routes, Route } from 'react-router-dom'
import { PageLayout } from '@/components'
import { Detail, List } from './components'

/**
 * 日次画面router
 */
export const DailyRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<PageLayout />}>
        <Route index element={<List />} />
        <Route path="edit/:id" element={<Detail />} />
        <Route path="create" element={<Detail />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Route>
    </Routes>
  )
}
