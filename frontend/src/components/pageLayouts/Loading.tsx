import { Backdrop, CircularProgress, Unstable_TrapFocus as FocusTrap } from '@mui/material'
import { useIsFetching, useIsMutating } from '@tanstack/react-query'

/**
 * ローディング表示
 */
export const Loading = () => {
  const fetching = useIsFetching({ predicate: query => query.state.status === 'pending' })
  const mutating = useIsMutating()
  const open = fetching > 0 || mutating > 0

  return (
    <FocusTrap open={open}>
      <Backdrop
        open={open}
        tabIndex={-1}
        sx={theme => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </FocusTrap>
  )
}
