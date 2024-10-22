import { Box, Paper } from '@mui/material'
import { DataGrid as MuiDataGrid, DataGridProps as MuiDataGridProps } from '@mui/x-data-grid'

export type DataGridProps<T> = {
  height?: string
  rows: T[] | undefined
} & Omit<MuiDataGridProps, 'rows'>

/**
 * DataGrid
 */
export const DataGrid = <T,>(props: DataGridProps<T>) => {
  const { height = '70vh', rows = [], ...rest } = props

  return (
    <Paper>
      <Box sx={{ width: '100%', height: { height } }}>
        <MuiDataGrid
          {...rest}
          rows={rows}
          density="compact"
          showColumnVerticalBorder
          showCellVerticalBorder
          hideFooter
          localeText={{ noRowsLabel: 'データがありません' }}
          sx={styles.datagrid}
        />
      </Box>
    </Paper>
  )
}

const styles = {
  datagrid: {
    '.MuiDataGrid-row .MuiDataGrid-cell:not(:last-child) ': {
      borderRight: 'solid 1px rgba(224, 224, 224, 1) !important'
    },
    '.MuiDataGrid-columnHeadersInner': {
      borderRight: 'solid 1px rgba(224, 224, 224, 1) !important'
    },
    '.MuiDataGrid-columnHeader': {
      backgroundColor: '#666',
      color: '#fff'
    },
    '.MuiDataGrid-columnHeader:focus-within': {
      outlineOffset: -3
    }
  }
}
