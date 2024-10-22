import { Navigate, Routes, Route } from 'react-router-dom'
import { PageLayout } from '@/components'
import { Input, List } from './components'

/**
 * 日次画面router
 */
export const DailyRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<PageLayout />}>
        <Route index element={<List />} />
        <Route path="edit/:id" element={<Input />} />
        <Route path="create" element={<Input />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Route>
    </Routes>
  )
}
