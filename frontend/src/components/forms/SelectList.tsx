import { ReactNode } from 'react'
import { Control, Controller, FieldValues, Path } from 'react-hook-form'
import { TextField, TextFieldProps } from '@mui/material'
import { ValidationRules } from '@/types'

type SelectListProps<T extends FieldValues> = {
  control: Control<T>
  name: Path<T>
  rules?: ValidationRules<T>
  children?: ReactNode
} & TextFieldProps

/**
 * SelectList
 */
export const SelectList = <T extends FieldValues>(props: SelectListProps<T>) => {
  const { control, name, rules, children, ...rest } = props

  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          {...rest}
          select
          size="small"
          error={error !== undefined}
          helperText={error?.message}
          slotProps={{ inputLabel: { shrink: true } }}
        >
          {children}
        </TextField>
      )}
    />
  )
}
