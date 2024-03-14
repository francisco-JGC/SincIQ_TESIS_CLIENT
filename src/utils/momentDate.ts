import moment from 'moment'
import 'moment/locale/es'

moment.locale('es')

export const momentDate = (date: string) => {
  const formattedDate = moment(date, 'YYYYMMDD').fromNow(true)
  return `hace ${formattedDate}`
}
