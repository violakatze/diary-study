import { FieldValues, Path, RegisterOptions, Validate, ValidationRule } from 'react-hook-form'
import { isValidDate } from '@/lib/dateUtil'

export type ValidationRules<T extends FieldValues> = Omit<
  RegisterOptions<T, Path<T>>,
  'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'
>

/**
 * 日付バリデーション
 */
export const dateRequired: Pick<ValidationRules<FieldValues>, 'required' | 'validate'> = {
  required: '日付を入力してください',
  validate: data => {
    if (!isValidDate(data)) {
      return '日付形式で入力してください'
    }
    return true
  }
}

export const maxLength = (value: number): ValidationRule<number> => ({
  value,
  message: `${value}文字以内で入力してください`
})

/**
 * 入力制限100文字
 */
export const text100: Pick<ValidationRules<FieldValues>, 'maxLength'> = {
  maxLength: maxLength(100)
}
