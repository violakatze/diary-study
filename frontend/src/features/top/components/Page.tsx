import { useNavigate } from 'react-router-dom'
import { Button, Stack } from '@mui/material'

/**
 * トップページコンポーネント
 */
export const Page = () => {
  const navigate = useNavigate()

  return (
    <Stack spacing={2} direction="row">
      <Button variant="contained" color="primary" size="small" onClick={() => navigate('/daily')}>
        一覧
      </Button>
      <Button
        variant="contained"
        color="primary"
        size="small"
        onClick={() => navigate('/daily/create')}
      >
        新規登録
      </Button>
    </Stack>
  )
}
