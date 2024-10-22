import { useNavigate } from 'react-router-dom'
import { Button, Stack } from '@mui/material'
import { GridColDef } from '@mui/x-data-grid'
import { createGridActions, DataGrid, ErrorMessageLabel, WeatherLabel } from '@/components'
import { useList } from '../hooks'
import { Daily } from '../types'

/**
 * 一覧画面コンポーネント
 */
export const List = () => {
  const { list, message, back } = useList()
  const navigate = useNavigate()

  const listColDef: GridColDef<Daily>[] = [
    {
      field: 'action',
      headerName: '編集',
      width: 40,
      type: 'actions',
      align: 'center',
      hideable: false,
      sortable: false,
      hideSortIcons: false,
      resizable: false,
      getActions: createGridActions(params => navigate(`edit/${params.id}`))
    },
    {
      field: 'date',
      headerName: '日付',
      width: 200,
      type: 'date',
      headerAlign: 'center',
      hideable: false,
      disableColumnMenu: true
    },
    {
      field: 'weather',
      headerName: '天気',
      width: 100,
      headerAlign: 'center',
      hideable: false,
      disableColumnMenu: true,
      align: 'center',
      renderCell: params => <WeatherLabel value={params.row.weather} sx={{ mt: 0.5 }} />
    },
    {
      field: 'content',
      headerName: '内容',
      width: 840,
      type: 'string',
      headerAlign: 'center',
      hideable: false,
      disableColumnMenu: true
    }
  ]

  return (
    <Stack spacing={2}>
      {list && <DataGrid columns={listColDef} rows={list} height="70vh" />}
      {message && <ErrorMessageLabel message={message} />}
      <Stack spacing={2} direction="row">
        <Button variant="contained" color="cancel" size="small" onClick={back}>
          戻る
        </Button>
      </Stack>
    </Stack>
  )
}
