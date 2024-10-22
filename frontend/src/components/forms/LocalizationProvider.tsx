import {
  LocalizationProvider as MuiLocalizationProvider,
  LocalizationProviderProps as MuiLocalizationProviderProps
} from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { jaJP } from '@mui/x-date-pickers/locales'
import ja from 'date-fns/locale/ja'

/**
 * 日本語化
 */
export const LocalizationProvider = <TDate extends Date, TLocale>(
  props: MuiLocalizationProviderProps<TDate, TLocale>
) => {
  return (
    <MuiLocalizationProvider
      {...props}
      adapterLocale={ja}
      dateAdapter={AdapterDateFns}
      dateFormats={{ fullDate: 'yyyy年MM月', monthShort: 'MM月' }}
      localeText={jaJP.components.MuiLocalizationProvider.defaultProps.localeText}
    />
  )
}
