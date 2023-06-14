import { composeWithDevTools } from "redux-devtools-extension"
import _ from "lodash"
import * as idb from "idb-keyval"
import { createActions, createStore, reducer } from "universal-reducer"


const STATE_KEY = "bookings_state"
const PERSISTENT_PATHS = ["settings"]

const store = createStore(reducer)

export const actions = createActions(store)
export const initStore = async () => {
  const state = await idb.get(STATE_KEY)
    .catch(() => ({}))
  actions.set(state)
  store.subscribe(() => {
    saveState()
  })
}


const saveState = _.throttle(async () => {
  try {
    const state = store.getState()
    idb.set(STATE_KEY, _.pick(state, PERSISTENT_PATHS))
  } catch (error) {
    console.error(error)
  }
}, 250, { trailing: true })


export default store