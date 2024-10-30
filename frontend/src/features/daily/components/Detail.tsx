import { useInput } from '../hooks'
import { Input } from './Input'

/**
 * 入力画面コンテナ
 */
export const Detail = () => {
  const { form, mode, isGetError, add, update, remove, message, back } = useInput()
  return (
    <Input
      form={form}
      mode={mode}
      isGetError={isGetError}
      add={add}
      update={update}
      remove={remove}
      message={message}
      back={back}
    />
  )
}
