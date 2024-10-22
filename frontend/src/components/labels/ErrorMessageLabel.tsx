import { Alert, Box } from '@mui/material'

type ErrorMessageLabelProps = {
  message: string
}

/**
 * エラーメッセージラベル
 */
export const ErrorMessageLabel = (props: ErrorMessageLabelProps) => {
  const { message } = props

  return (
    <Alert variant="filled" severity="error" color="error">
      <Box sx={styles.box}>{message}</Box>
    </Alert>
  )
}

const styles = {
  box: {
    whiteSpace: 'pre-line'
  }
}
