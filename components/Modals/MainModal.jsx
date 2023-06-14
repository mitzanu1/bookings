import React from 'react'
import { ActionIcon, Modal } from "@mantine/core"
import join from "clsx"
import { X } from "tabler-icons-react"
import styles from "./index.module.scss"
import { hideModal } from '.'

const MainModal = ({
    className,
    header,
    footer,
    children,
    actions,
    toolbar,
    onClose = hideModal,
    ...props
   }) => {


  return (
    <Modal
      opened
      centered
      withinPortal
      withCloseButton={false}
      closeOnClickOutside={false}
      size="lg"
      onClose={onClose}
      padding={0}
      classNames={{
        body: join(styles.mainModal, className)
      }}
      {...props}
    >
      <div className={styles.top}>
        <div className={styles.left}>
          {header}
        </div>
        {actions &&
          <div className={styles.center}>
            {actions}
          </div>
        }
        <ActionIcon onClick={onClose} size="md" className={styles.close}>
          <X />
        </ActionIcon>
      </div>
      {toolbar &&
        <div className={styles.toolbar}>
          {toolbar}
        </div>
      }
      <div className={styles.content}>
        {children}
      </div>
      {footer &&
        <div className={styles.footer}>
          {footer}
        </div>
      }
    </Modal>
  )
}

export default MainModal