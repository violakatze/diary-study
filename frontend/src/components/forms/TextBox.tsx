import { TextField, TextFieldProps } from '@mui/material'
import { Control, Controller, FieldValues, Path } from 'react-hook-form'
import { ValidationRules } from '@/types'

type TextBoxProps<T extends FieldValues> = {
  control: Control<T>
  name: Path<T>
  rules?: ValidationRules<T>
} & TextFieldProps

/**
 * TextBox
 */
export const TextBox = <T extends FieldValues>(props: TextBoxProps<T>) => {
  const { control, name, rules, ...rest } = props

  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          {...rest}
          size="small"
          autoComplete="off"
          error={error !== undefined}
          helperText={error?.message}
          slotProps={{ inputLabel: { shrink: true } }}
        />
      )}
    />
  )
}
