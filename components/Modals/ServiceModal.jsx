import { Button, TextInput, Title } from '@mantine/core'
import React from 'react'
import MainModal from './MainModal'
import { hideModal } from '.'
import styles from './index.module.scss'
import { useFormik } from 'formik'
import { useRouter } from 'next/router'

function ServiceModal({id, items }) {

  const router = useRouter()

  const formik = useFormik({
    initialValues: {
      name:'',
      price:'',
      duration:''
    },
    onSubmit: async({ name, price, duration }, formik)=>{

      const service = {
        _id:id,
        service:[...items, {
          name,
          price,
          duration
        }]
      }
      try {
        formik.setSubmitting(true)
        await fetch('/api/services',
        {
          method:'PUT',
          body:JSON.stringify(service)
        })
      }finally {
        hideModal()
        router.replace(router.asPath)
        formik.setSubmitting(false)
      }
    }
  })

  return (
    <MainModal
      size="sm"
      onClose={hideModal}
      className={styles.workspaceModal}
      header={<Title order={4}>{'Add service'}</Title>}
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
            onClick={formik.handleSubmit}
          >
            {'Save'}
          </Button>
        </>
      }
   >
    <div className={styles.content}>
      <TextInput
        label='Service name'
        placeholder={'Type service name'}
        onChange={(e)=>formik.setFieldValue('name', e.target.value)}
      />
      <TextInput
        label='Service price'
        placeholder={'Type service price'}
        onChange={(e)=>formik.setFieldValue('price', e.target.value)}
      />
      <TextInput
        label='Service duration'
        placeholder={'Type service duration'}
        onChange={(e)=>formik.setFieldValue('duration', e.target.value)}
      />
    </div>
   </MainModal>
  )
}

export default ServiceModal