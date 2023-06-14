import { Button, Select, Title } from '@mantine/core'
import React from 'react'
import MainModal from './MainModal'
import { useRouter } from 'next/router'
import { hideModal } from '.'
import styles from './index.module.scss'

function DeleteCategoryModal({services}) {

  const [deleteId, setDeleteId] = React.useState('')
  const router = useRouter()

  const handleDeleteCategory = async() => {
    try {
      await fetch('/api/services',
      {
        method:'PATCH',
        body:JSON.stringify(deleteId)
      })
    }finally {
      router.replace(router.asPath)
      hideModal()
    }
  }
  return (
    <MainModal
      size="sm"
      onClose={hideModal}
      className={styles.deleteCategory}
      header={<Title order={4}>{'Select category to delete'}</Title>}
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
            onClick={handleDeleteCategory}
          >
            {'Save'}
          </Button>
        </>
      }
   >
    <div className={styles.content}>
     <Select
      placeholder='Select category to delete'
      onChange={(value)=>setDeleteId(value)}
      data={services.map((service)=>{
        const {_id, category} = service
        return { value:_id, label:category}
      })}
     />
    </div>
   </MainModal>
  )
}

export default DeleteCategoryModal