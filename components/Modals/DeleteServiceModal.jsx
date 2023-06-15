import React from 'react'
import MainModal from './MainModal'
import { Button, Select, Title } from '@mantine/core'
import { hideModal } from '.'
import { useRouter } from 'next/router'
import styles from './index.module.scss'

function DeleteServiceModal({id, items}) {

  const [name, setName] = React.useState('')
  const router = useRouter()

  const handleDeleteService = async() => {
    const _items = _.filter(items, service => service.name !== name)
    const service = {
      _id:id,
      service:_items
    }

    try {
      await fetch('/api/services',
      {
        method:'PUT',
        body:JSON.stringify(service)
      })
    }finally {
      hideModal()
      router.reload()
    }
  }
  return (
    <MainModal
      size="sm"
      onClose={hideModal}
      className={styles.deleteCategory}
      header={<Title order={4}>{'Select service to delete'}</Title>}
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
            onClick={handleDeleteService}
          >
            {'Save'}
          </Button>
        </>
      }
    >
    <div className={styles.content}>
     <Select
      placeholder='Select service to delete'
      onChange={(value)=>setName(value)}
      data={items.map((item)=>{
        const { name } = item
        return { value:name, label:name}
      })}
     />
    </div>
   </MainModal>
  )
}

export default DeleteServiceModal