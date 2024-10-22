import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useMemo,
  useState
} from 'react'

type ContextType =
  | {
      message: string | undefined
      setMessage: Dispatch<SetStateAction<string | undefined>>
    }
  | undefined

const SnackbarContext = createContext<ContextType>({} as ContextType)

/**
 * Snackbar状態フック
 */
export const useSnackbarContext = () => {
  const context = useContext<ContextType>(SnackbarContext)
  return {
    snackbarMessage: context?.message,
    setSnackbarMessage: context?.setMessage
  }
}

/**
 * Snackbar状態プロバイダ
 */
export const SnackbarProvider = ({ children }: { children: ReactNode }) => {
  const [message, setMessage] = useState<string | undefined>(undefined)

  const value: ContextType = useMemo(
    () => ({
      message,
      setMessage
    }),
    [message]
  )

  return <SnackbarContext.Provider value={value}>{children}</SnackbarContext.Provider>
}
