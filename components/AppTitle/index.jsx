import { Input, Title } from "@mantine/core"
import React from "react"
import styles from "./index.module.scss"


function AppTitle({ icon, name, description, indicator }) {

  return (
    <div className={styles.mainTitle}>
      {icon}
      <div className={styles.content}>
        <div className={styles.title}>
          <Title order={4}>
            {name}
          </Title>
          {indicator}
        </div>

        {description && <Input.Wrapper description={description} /> }
      </div>

    </div>

  )
}

export default AppTitle
