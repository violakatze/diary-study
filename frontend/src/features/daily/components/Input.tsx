import { UseFormReturn } from 'react-hook-form'
import { Button, MenuItem, Stack, Typography } from '@mui/material'
import { DatePicker, ErrorMessageLabel, SelectList, TextBox, WeatherLabel } from '@/components'
import { createUUID } from '@/lib/uuid'
import { weather } from '@/types'
import { Daily, Mode } from '../types'

type InputProps = {
  form: UseFormReturn<Daily>
  mode: Mode
  isGetError: boolean
  message: string | undefined
  add: (model: Daily) => Promise<void>
  update: (model: Daily) => Promise<void>
  remove: (model: Daily) => Promise<void>
  back: () => void
}

const weathers = [weather.Sunny, weather.Cloudy, weather.Rainy]

/**
 * 入力画面
 */
export const Input = (props: InputProps) => {
  const {
    form: { control, handleSubmit },
    mode,
    isGetError,
    message,
    add,
    update,
    remove,
    back
  } = props

  return (
    <>
      <Stack spacing={2}>
        <Typography variant="h6">{mode === 'create' ? '新規登録' : '編集'}</Typography>
        <DatePicker control={control} name="date" sx={{ width: { xs: '100%', sm: '30ch' } }} />
        <SelectList
          control={control}
          name="weather"
          label="天気"
          sx={{ width: { xs: '100%', sm: '30ch' } }}
        >
          {weathers.map(w => (
            <MenuItem value={w} key={createUUID()}>
              <WeatherLabel value={w} sx={{ height: 22, mb: -0.5 }} />
            </MenuItem>
          ))}
        </SelectList>
        <TextBox control={control} name="content" label="内容" sx={{ width: '100%' }} />
        {message && <ErrorMessageLabel message={message} />}
        <Stack spacing={2} direction="row">
          {mode === 'create' && (
            <Button variant="contained" color="primary" onClick={handleSubmit(add)}>
              登録
            </Button>
          )}
          {mode === 'edit' && (
            <>
              <Button
                variant="contained"
                color="primary"
                disabled={isGetError}
                onClick={handleSubmit(update)}
              >
                更新
              </Button>
              <Button
                variant="contained"
                color="error"
                disabled={isGetError}
                onClick={handleSubmit(remove)}
              >
                削除
              </Button>
            </>
          )}
          <Button variant="contained" color="cancel" onClick={back}>
            戻る
          </Button>
        </Stack>
      </Stack>
    </>
  )
}
