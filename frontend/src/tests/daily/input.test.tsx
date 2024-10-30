import { ReactNode } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render, renderHook, screen, waitFor } from '@testing-library/react'
import { Input } from '@/features/daily/components/Input'
import { useInput } from '@/features/daily/hooks'
import * as types from '@/features/daily/types'

const queryClient = new QueryClient()
const wrapper = ({ children }: { children: ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
)

// @ts-ignore
const useNavigateMock = useNavigate as jest.Mock
// @ts-ignore
const useParamsMock = useParams as jest.Mock
vi.mock('react-router-dom', () => ({
  ...vi.importActual('react-router-dom'),
  useNavigate: vi.fn(),
  useParams: vi.fn()
}))

describe('daily tests', () => {
  beforeEach(() => {
    useNavigateMock.mockImplementation(vi.fn())
  })

  test('新規登録画面', async () => {
    const defaultValues: types.Daily = {
      id: 0,
      date: new Date(2000, 0, 1),
      content: '',
      weather: 0
    }
    vi.spyOn(types, 'getDefaultValues').mockReturnValueOnce(defaultValues)
    useParamsMock.mockImplementation(vi.fn().mockReturnValue({ id: undefined }))

    const { result } = renderHook(() => useInput(), { wrapper })
    render(<Input {...result.current} />)

    // mode
    expect(result.current.mode).toBe('create')

    // 画面
    const datePicker = screen.getByLabelText('日付')
    await waitFor(() => expect(datePicker).toBeValid())
    await waitFor(() => expect(datePicker).toHaveValue('2000/01/01'))

    const selectList = screen.getByLabelText('天気')
    await waitFor(() => expect(selectList).toBeValid())
    // expect(selectList).toHaveValue(0)

    const textBox = screen.getByLabelText('内容')
    await waitFor(() => expect(textBox).toBeValid())
    await waitFor(() => expect(textBox).toHaveValue(''))

    const createButton = screen.queryByText('登録')
    expect(createButton).toBeEnabled()
    expect(createButton).toHaveRole('button')

    const addButton = screen.queryByText('更新')
    expect(addButton).not.toBeInTheDocument()

    const removeButton = screen.queryByText('削除')
    expect(removeButton).not.toBeInTheDocument()

    const backButton = screen.queryByText('戻る')
    expect(backButton).toBeEnabled()
    expect(backButton).toHaveRole('button')

    // form
    const { getValues } = result.current.form
    const date = getValues('date')
    expect(date).toMatchObject(new Date(2000, 0, 1))

    const content = getValues('content')
    expect(content).toBe('')

    const weather = getValues('weather')
    expect(weather).toBe(0)
  })

  test('編集画面', async () => {
    useParamsMock.mockImplementation(vi.fn().mockReturnValue({ id: 1 }))
    vi.mock('@/features/daily/api', () => ({
      dailyApi: vi.fn().mockImplementation(() => ({
        get: vi
          .fn()
          .mockReturnValue({ id: 1, date: new Date(2000, 0, 2), content: 'ABCDE', weather: 1 })
      }))
    }))

    const { result } = renderHook(() => useInput(), { wrapper })
    render(<Input {...result.current} />)

    // mode
    expect(result.current.mode).toBe('edit')

    // 画面
    const datePicker = screen.getByLabelText('日付')
    await waitFor(() => expect(datePicker).toBeValid())
    await waitFor(() => expect(datePicker).toHaveValue('2000/01/02'))

    const selectList = screen.getByLabelText('天気')
    await waitFor(() => expect(selectList).toBeValid())

    const textBox = screen.getByLabelText('内容')
    await waitFor(() => expect(textBox).toBeValid())
    await waitFor(() => expect(textBox).toHaveValue('ABCDE'))

    const createButton = screen.queryByText('登録')
    expect(createButton).not.toBeInTheDocument()

    const addButton = screen.queryByText('更新')
    expect(addButton).toBeEnabled()
    expect(addButton).toHaveRole('button')

    const removeButton = screen.queryByText('削除')
    expect(removeButton).toBeEnabled()
    expect(removeButton).toHaveRole('button')

    const backButton = screen.queryByText('戻る')
    expect(backButton).toBeEnabled()
    expect(backButton).toHaveRole('button')

    // form
    const { getValues } = result.current.form
    const date = getValues('date')
    expect(date).toMatchObject(new Date(2000, 0, 2))

    const content = getValues('content')
    expect(content).toBe('ABCDE')

    const weather = getValues('weather')
    expect(weather).toBe(1)
  })
})
