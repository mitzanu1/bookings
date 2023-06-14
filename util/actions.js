import { actions } from "./store"



export const removeClientData = () => {
  actions.unset('controls.selectedDate')
  actions.unset('controls.endDate')
  actions.unset('controls.name')
  actions.unset('controls.duration')
  actions.unset('controls.description')
}