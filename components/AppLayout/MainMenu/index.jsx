import { Avatar, Badge, Button, CloseButton, Menu, Text, Title } from "@mantine/core"
import React from "react"
import { Power } from "tabler-icons-react"
import styles from "./index.module.scss"


function MainMenu() {
  const [opened, setOpened] = React.useState()
  
  const initials = getInitials('Mihai Mataoanu')
  const name = 'Mitzanu'
  const email = 'mitzanu@hotmail.com'
  const accountName = 'My account'
  return (
    <Menu
      shadow="md"
      width="15rem"
      withArrow
      withinPortal
      opened={opened}
      onChange={setOpened}
      arrowOffset=".85rem"
      position="bottom-end"
    >
      <Menu.Target>
        <Avatar
          radius="50%"
          variant="filled"
          className={styles.avatar}
          color="white"
        >
          {initials}
        </Avatar>
      </Menu.Target>
      <Menu.Dropdown>
        <div className={styles.mainMenu}>
          <Avatar
            radius="50%"
            size="xl"
            variant="outline"
            className={styles.avatar}
          >
            {initials}
          </Avatar>
          <div className={styles.center}>
            <Title order={3}>{name}</Title>
            <Text>{email}</Text>
            {accountName &&
              <Badge
                size="lg"
                variant="outline"
                rightSection={
                  <CloseButton onClick={() => setAccountId(undefined)} />
                }
                className={styles.accountName}
              >
                {accountName}
              </Badge>
            }
          </div>
          <Button
            leftIcon={<Power />}
            onClick={() => logout()}
            variant="filled"
            radius="lg"
          >
            {"logout"}
          </Button>
        </div>
      </Menu.Dropdown>
    </Menu>


  )
}

const getInitials = (string = "") => {
  return string.split(/\s|\.|,/)
    .map((string) => string.slice(0, 1))
    .join("")
    .concat(string.slice(1))
    .slice(0, 2)
    .toUpperCase()
}

export default MainMenu
