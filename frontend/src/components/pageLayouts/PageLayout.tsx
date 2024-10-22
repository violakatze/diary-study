import { Outlet } from 'react-router-dom'
import { Container } from '@mui/material'
import { Snackbar } from '@/components'
import { useSnackbarContext } from '@/providers/SnackbarProvider'
import { Header } from './Header'
import { Loading } from './Loading'

/**
 * 画面レイアウト
 */
export const PageLayout = () => {
  const { snackbarMessage, setSnackbarMessage } = useSnackbarContext()

  return (
    <>
      <Header />
      <Container fixed maxWidth="lg" sx={styles.container}>
        <Outlet />
        {snackbarMessage && setSnackbarMessage && (
          <Snackbar message={snackbarMessage} handleClose={() => setSnackbarMessage(undefined)} />
        )}
      </Container>
      <Loading />
    </>
  )
}

const styles = {
  container: {
    position: 'relative',
    p: 0,
    mt: 3,
    '@media (min-width: 600px)': {
      p: 0
    }
  }
}
