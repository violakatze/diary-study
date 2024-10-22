import { Fragment } from 'react'
import { Alert, IconButton, Slide, Snackbar as MuiSnackbar } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'

export type SnackbarProps = {
  message: string
  handleClose: () => void
}

/**
 * Snackbar
 */
export const Snackbar = (props: SnackbarProps) => {
  const { message, handleClose } = props

  const action = (
    <Fragment>
      <IconButton size="small" color="inherit" onClick={handleClose}>
        <CloseIcon fontSize="small" />
      </IconButton>
    </Fragment>
  )

  return (
    <MuiSnackbar
      open
      onClose={handleClose}
      TransitionComponent={Slide}
      autoHideDuration={3000}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      action={action}
    >
      <Alert security="success" variant="filled" sx={{ width: '100%' }} onClose={handleClose}>
        {message}
      </Alert>
    </MuiSnackbar>
  )
}
