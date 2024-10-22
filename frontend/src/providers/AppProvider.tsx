import { ReactNode, Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { BrowserRouter } from 'react-router-dom'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { appTheme } from '@/styles/appTheme'
import { ErrorFallback } from './ErrorFallback'
import { QueryClientProvider } from './QueryProvider'
import { SnackbarProvider } from './SnackbarProvider'

const theme = createTheme(appTheme)

export const AppProvider = ({ children }: { children: ReactNode }) => {
  return (
    <Suspense fallback={<div>loading</div>}>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <QueryClientProvider>
          <BrowserRouter>
            <ThemeProvider theme={theme}>
              <SnackbarProvider>
                <CssBaseline />
                {children}
              </SnackbarProvider>
            </ThemeProvider>
          </BrowserRouter>
        </QueryClientProvider>
      </ErrorBoundary>
    </Suspense>
  )
}
