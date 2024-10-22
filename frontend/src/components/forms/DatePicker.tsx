import { TextFieldProps } from '@mui/material'
import { DatePicker as MuiDatePicker } from '@mui/x-date-pickers'
import { Control, Controller, FieldValues, Path } from 'react-hook-form'
import { ValidationRules } from '@/types'
import { LocalizationProvider } from './LocalizationProvider'

type DatePickerProps<T extends FieldValues> = {
  control: Control<T>
  name: Path<T>
  rules?: ValidationRules<T>
  required?: boolean
} & Pick<TextFieldProps, 'sx' | 'autoFocus'>

/**
 * DatePicker
 */
export const DatePicker = <T extends FieldValues>(props: DatePickerProps<T>) => {
  const { control, name, rules, required, sx, autoFocus } = props
  return (
    <LocalizationProvider>
      <Controller
        control={control}
        name={name}
        rules={rules}
        render={({ field, fieldState: { error } }) => (
          <MuiDatePicker
            dayOfWeekFormatter={(date: Date) =>
              ['日', '月', '火', '水', '木', '金', '土'][date.getDay()]
            }
            label="日付"
            value={field.value === undefined ? null : field.value}
            onChange={(value: Date | null) => {
              const converted = value === null ? undefined : value
              field.onChange(converted)
            }}
            slotProps={{
              textField: {
                required,
                sx,
                autoFocus,
                size: 'small',
                error: error !== undefined,
                helperText: error?.message,
                InputLabelProps: { shrink: true }
              },
              toolbar: {
                toolbarFormat: 'MMMM do'
              }
            }}
          />
        )}
      />
    </LocalizationProvider>
  )
}
