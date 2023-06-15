import { Button, Text, TextInput } from '@mantine/core'
import React from 'react'
import styles from './index.module.scss'
import { useFormik } from 'formik'
import _ from 'lodash'
import { actions } from 'components/util/store'
import { useRouter } from "next/router"
import { removeClientData } from 'components/util/actions'
import { notifications } from '@mantine/notifications'
import { useSelector } from 'universal-reducer'
import moment from 'moment'

function CustomerDetails() {

  const router = useRouter()
  const bookingDetails = useSelector(()=>actions.get('controls')) || {}
  const { selectedDate, endDate, name } = bookingDetails

  const formik = useFormik({
    initialValues: {
      clientName:'',
      clientPhone:'',
    },
    validate: ({ clientName, clientPhone }) => {
      const errors = {}
      if (!clientName) errors.clientName = "Required field"
      if (!clientPhone) errors.clientPhone = "Required field"
      return errors
    },
    onSubmit: async({ clientName, clientPhone }, formik)=>{
      formik.setSubmitting(true)
      
      const booking = {
        startAt:selectedDate,
        endAt:endDate,
        service:name,
        clientName,
        clientPhone
      }
      
      try {
        const response = await fetch('/api/bookings', {
          method:'POST',
          body:JSON.stringify(booking)
        })
        
        let data = await response.json();
        
        if (data.success) {        
          notifications.show({
            message:'Booking created succesfuly',
            autoClose: 4000,
            color:'green'
          })
        } else {
          notifications.show({
            message:'Booking creation failed',
            autoClose: 4000,
            color:'red'
          })
        } 
      } finally {
        actions.set('controls.view', 'services')
        removeClientData()
        formik.setSubmitting(false)
        router.reload()
      }
    }
  }) 

  const { touched, errors, values } = formik
  const { clientName, clientPhone } = values

  return (
    <div className={styles.customerForm}>
      <Text fw={500}>Service</Text>
      <Text>{name}</Text>
      <Text fw={500}>Starts at</Text>
      <Text>{moment(selectedDate).format("MM-DD-YYYY HH:mm")}</Text>
      <Text fw={500}>Ends at </Text>
      <Text>{moment(endDate).format("MM-DD-YYYY HH:mm")}</Text>
      <TextInput 
        placeholder="Your name"
        label='Name'
        value={clientName}
        onChange={(e)=>formik.setFieldValue('clientName',e.target.value)}
        error={touched.clientName && errors.clientName}
      />
      <TextInput 
        placeholder="Your phone number"
        label='Phone number'
        value={clientPhone}
        onChange={(e)=>formik.setFieldValue('clientPhone',e.target.value)}
        error={touched.clientPhone && errors.clientPhone}
      />
      <Button 
        className={styles.btn}
        loading={formik.isSubmitting}
        type='submit'  
        onClick={formik.handleSubmit}
      >
        Confirm booking
      </Button>
    </div>
  )
}

export default CustomerDetails