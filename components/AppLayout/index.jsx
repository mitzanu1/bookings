import React from "react"
import styles from "./index.module.scss"
import MainHeader from "./MainHeader"
import MainSidebar from "./MainSidebar"


function AppLayout({ children }) {
  return (
    <div className={styles.appLayout}>
      <MainHeader />
      <div className={styles.main}>
        <MainSidebar />
        {children}
      </div>

    </div>
  )
}

export default AppLayout
