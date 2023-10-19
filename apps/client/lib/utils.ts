import { clsx, type ClassValue } from 'clsx'
import dayjs from 'dayjs'
import tz from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'
import { twMerge } from 'tailwind-merge'

dayjs.extend(utc)
dayjs.extend(tz)

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function absoluteUrl(path: string) {
  return `${process.env['NEXTAUTH_URL']}${path}`
}

export function formatNumber(value: string | number) {
  return Number(value).toLocaleString()
}

export function formatPrice(value: string | number) {
  return `${new Intl.NumberFormat('ja-JP', {
    // style: 'currency',
    // currency: 'JPY',
  }).format(Number(value))}円`
}

export function formatTimeJP(time: string) {
  if (!time || !dayjs(time).isValid()) return ''
  return dayjs.tz(time, 'UTC').tz('Asia/Tokyo').format('YYYY年MM月DD日 HH:mm')
}
