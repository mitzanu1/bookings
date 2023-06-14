import { ActionIcon, Card } from "@mantine/core"
import React from "react"
import styles from "./index.module.scss"
import join from "clsx"
import AppTitle from "components/AppTitle"
import { useRouter } from 'next/router';

function AppPage({
  closable,
  className,
  name,
  description,
  footer,
  children,
  toolbar,
  tabs,
  actions,
  icon,
  extra,
  ...props
}) {

  const router = useRouter()
  
  return (

    <div 
      className={join(styles.appPage, className)}
    >
      <Card
        className={styles.card}
        {...props}
      >
        <div className={styles.header}>
          <AppTitle
            name={name}
            description={description}
            icon={icon &&
              <ActionIcon onClick={() => router.back()}>
                {icon}
              </ActionIcon>
            }
          />
          {actions && <div className={styles.actions}> {actions}</div>}
        </div>
        {toolbar && <div className={styles.toolbar}>{toolbar}</div>}
        {tabs && <div className={styles.tabs}>{tabs}</div>}
        <div className={styles.content}>{children}</div>
        {footer && <div className={styles.footer}>{footer}</div>}
      </Card>
    </div>

  )
}


export default AppPage
