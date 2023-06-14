import { actions } from "components/util/store"

const EMPTY_OBJECT = {}

export const selectModal = () => actions.get("modal", EMPTY_OBJECT)

export const showModal = (Component, props) => actions.set("modal", { Component, props })

export const hideModal = () => actions.unset("modal")

export const modalPromise = (Modal, props) => new Promise((resolve, reject) => {
  showModal(Modal, {
    ...props,
    onSubmit: (values) => {
      hideModal()
      resolve(values)
    },
    onDismiss: () => {
      hideModal()
      const confirmError = new Error("action_was_canceled")
      confirmError.confirm = true
      reject(confirmError)
    }
  })
})

