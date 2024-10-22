import { MouseEvent } from 'react'
import { MdOutlineEditNote as Edit } from 'react-icons/md'
import { Icon } from '@mui/material'
import { GridActionsCellItem, GridRowParams } from '@mui/x-data-grid'

/**
 * DataGridのクリックアクション作成
 */
export const createGridActions = <T extends {}>(onClick: (event: T) => void) => {
  const handler = (params: GridRowParams<T>) => (event: MouseEvent<Element> | undefined) => {
    event?.stopPropagation()
    onClick(params.row)
  }
  return (params: GridRowParams<T>) => [
    <GridActionsCellItem
      label=""
      icon={<Icon component={Edit} sx={{ color: '#666' }} />}
      onClick={handler(params)}
      key={params.id}
    />
  ]
}
