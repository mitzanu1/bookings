import React from 'react'
import MainModal from './MainModal'
import { Button, Input, Title } from '@mantine/core'
import { hideModal } from '.'
import styles from './index.module.scss'
import { useRouter } from 'next/router'

function CategoryModal() {

  const [category, setCategory] = React.useState('')
  const router = useRouter()

  const handleAddCategory = async() => {
    const service = {
      category:category,
      service:[]
    }
    try {
      await fetch('/api/services',
      {
        method:'POST',
        body:JSON.stringify(service)
      })
    }finally {
      hideModal()
      router.replace(router.asPath)
    }
  }
  return (
    <MainModal
      size="sm"
      onClose={hideModal}
      className={styles.workspaceModal}
      header={<Title order={4}>{'Add service category'}</Title>}
      footer={
        <>
          <Button
            variant="light"
            onClick={hideModal}
          >
            {"Cancel"}
          </Button>
          <Button
            type="submit"
            onClick={handleAddCategory}
          >
            {'Save'}
          </Button>
        </>
      }
   >
    <div className={styles.content}>
      <Input
        placeholder={'Type a service category name'}
        onChange={(e)=>setCategory(e.target.value)}
      />
    </div>
   </MainModal>
  )
}

export default CategoryModal