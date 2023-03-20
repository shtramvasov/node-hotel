import dayjs from 'dayjs'

export const dateToString = date => {
  return dayjs(date).format('YYYY-M-D')
}
