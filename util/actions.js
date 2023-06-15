import { actions } from "./store"
import useSWR from 'swr'

export const removeClientData = () => {
  actions.unset('controls.selectedDate')
  actions.unset('controls.endDate')
  actions.unset('controls.name')
  actions.unset('controls.duration')
  actions.unset('controls.description')
}

const fetcher = (...args) => fetch(...args).then(res => res.json())

const useFetcher = (url) => {
  const { data = {}, error, isLoading } = useSWR(`/api/${url}`, fetcher)
  const { message } = data
  return message
}

export const useServicesFetcher = () => useFetcher('services')
export const useSettingsFetcher = () => useFetcher('settings')
export const useBookingsFetcher = () => useFetcher('bookings')