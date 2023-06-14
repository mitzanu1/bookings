import React from "react"
import styles from "./index.module.scss"
import _ from "lodash"
import { Avatar, Card, Title } from "@mantine/core"
import MainMenu from "../MainMenu"

function MainHeader() {
  return (
    <Card className={styles.mainHeader}>
      <div className={styles.left}>
        <Avatar
          style={{ padding: 0 }}
          to="/"
          radius="xl"
          color="white"
        >
          BA
        </Avatar>
        <Title
          order={4}
          to="/"
          className={styles.text}
          color="white"
        >
          Booking App
        </Title>
      </div>
      <div className={styles.right}>
        {<MainMenu />}
      </div>
    </Card>

  )
}

export default MainHeader
