import moment from 'moment'
import 'moment/locale/es'

moment.locale('es')

export const momentDate = (date: string) => {
  const formattedDate = moment(date).format('YYYY-MM-DDTHH:mm:ss.SSS[Z]')

  return moment(formattedDate).fromNow()
}
