import { TextField, TextFieldProps } from '@mui/material'
import { Control, Controller, FieldValues, Path } from 'react-hook-form'

type TextBoxProps<T extends FieldValues> = {
  control: Control<T>
  name: Path<T>
} & TextFieldProps

/**
 * TextBox
 */
export const TextBox = <T extends FieldValues>(props: TextBoxProps<T>) => {
  const { control, name, ...rest } = props

  return (
    <Controller
      control={control}
      name={name}
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
