import { Icon, SxProps, Theme } from '@mui/material'
import { IoIosUmbrella as Rainy } from 'react-icons/io'
import { MdSunny as Sunny, MdWbCloudy as Cloudy } from 'react-icons/md'
import { Weather, weather } from '@/types'

export type WeatherLabelProps = {
  value: Weather | undefined
  sx?: SxProps<Theme>
}

/**
 * 天気アイコンコンポーネント
 */
export const WeatherLabel = (props: WeatherLabelProps) => {
  const { value, sx } = props

  switch (value) {
    case weather.Sunny:
      return <Icon sx={{ ...styles.base, ...styles.fine, ...sx }} component={Sunny} />
    case weather.Cloudy:
      return <Icon sx={{ ...styles.base, ...styles.cloudy, ...sx }} component={Cloudy} />
    case weather.Rainy:
      return <Icon sx={{ ...styles.base, ...styles.rainy, ...sx }} component={Rainy} />
    default:
      return <></>
  }
}

const styles = {
  base: {
    width: 30,
    minWidth: 30,
    height: 24,
    fontSize: 'smaller'
  },
  fine: {
    color: '#ff0000'
  },
  cloudy: {
    color: '#666'
  },
  rainy: {
    color: '#0000ff'
  }
}
