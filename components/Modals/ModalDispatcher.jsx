
import React from "react"
import { useSelector } from "universal-reducer"
import { hideModal, selectModal } from "."


function ModalDispatcher() {
  const { Component, props } = useSelector(() => selectModal())
  const { onClose = hideModal } = props || {}


  if (!Component) return null
  return <Component {...props} onClose={onClose} />
}

export default ModalDispatcher