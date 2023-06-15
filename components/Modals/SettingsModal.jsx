import { Button, Select, Title } from '@mantine/core'
import React from 'react'
import MainModal from './MainModal'
import { hideModal } from '.'
import styles from './index.module.scss'
import { useFormik } from 'formik'
import { useRouter } from "next/router"

function SettingsModal(settings) {

  const router = useRouter()

  const formik = useFormik({
    initialValues: {
      height: settings.height,
      slotDuration:settings.slotDuration,
      businessHoursStartTime:settings.businessHoursStartTime, 
      businessHoursEndTime:settings.businessHoursEndTime,
      dayHeaderFormatWeekday:settings.dayHeaderFormatWeekday,
      slotMinTime:settings.slotMinTime,
      slotMaxTime:settings.slotMaxTime,
      scrollTime:settings.scrollTime,
      locale:settings.locale,
    },
    onSubmit: async( values , formik) => {
      try {
        formik.setSubmitting(true)
        await fetch('/api/settings', {
            method:'PUT',
            body:JSON.stringify(values)
        })
      } finally {
        hideModal()
        formik.setSubmitting(false)
        router.reload()
      }
    }
  })

  const { values } = formik
  const {
    height,
    slotDuration,
    dayHeaderFormatWeekday,
    slotMinTime,
    slotMaxTime,
    scrollTime,
    businessHoursStartTime,
    businessHoursEndTime,
    locale,
  } = values

  return (
    <MainModal
      size="sm"
      onClose={hideModal}
      className={styles.workspaceModal}
      header={<Title order={4}>{'Settings'}</Title>}
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
      <Select
        className={styles.select}
        label={'Height'}
        value={height}
        onChange={(value) => {
            formik.setFieldValue("height", value)
        }}
        data={[ 
          {value: '100%', label: '100%'},
          {value: '90%', label: '90%'},
          {value: '80%', label: '80%'},
          {value: '70%', label: '70%'},
          {value: '60%', label: '60%'},
          {value: '50%', label: '50%'},
        ]}
      />
      <Select
        className={styles.select}
        label={'Business hours start time'}
        value={businessHoursStartTime}
        onChange={(value) => {
            formik.setFieldValue("businessHoursStartTime", value)
        }}
        data={[ 
          {value: '6:00', label: '6:00'},
          {value: '7:00', label: '7:00'},
          {value: '8:00', label: '8:00'},
          {value: '9:00', label: '9:00'},
          {value: '10:00', label: '10:00'},
          {value: '11:00', label: '11:00'},
          {value: '12:00', label: '12:00'},
        ]}
      />
      <Select
        className={styles.select}
        label={'Business hours end time'}
        value={businessHoursEndTime}
        onChange={(value) => {
            formik.setFieldValue("businessHoursEndTime", value)
        }}
        data={[ 
          {value: '14:00', label: '14:00'},
          {value: '15:00', label: '15:00'},
          {value: '16:00', label: '16:00'},
          {value: '17:00', label: '17:00'},
          {value: '18:00', label: '18:00'},
          {value: '19:00', label: '19:00'},       
          {value: '20:00', label: '20:00'},       
        ]}
      />
      <Select
        className={styles.select}
        label={'Slot duration'}
        value={slotDuration}
        onChange={(value) => {
            formik.setFieldValue("slotDuration", value)
        }}
        data={[ 
          {value: '00:05', label: '00:05'},
          {value: '00:10', label: '00:10'},
          {value: '00:15', label: '00:15'},
          {value: '00:30', label: '00:30'},
          {value: '01:00', label: '01:00'},          
        ]}
      />
      <Select
        className={styles.select}
        label={'Minimum time displayed'}
        value={slotMinTime}
        onChange={(value) => {
          formik.setFieldValue("slotMinTime", value)
        }}
        data={[ 
          {value: '00:00:00', label: '00:00:00'},
          {value: '06:00:00', label: '06:00:00'},
          {value: '09:00:00', label: '09:00:00'},
          {value: '12:00:00', label: '12:00:00'},  
        ]}
      />
      <Select
        className={styles.select}
        label={'Maximum time displayed'}
        value={slotMaxTime}
        onChange={(value) => {
          formik.setFieldValue("slotMaxTime", value)
        }}
        data={[ 
          {value: '12:00:00', label: '12:00:00'},
          {value: '18:00:00', label: '18:00:00'},
          {value: '21:00:00', label: '21:00:00'},
          {value: '24:00:00', label: '24:00:00'},         
        ]}
      />
      <Select
        className={styles.select}
        label={'Initial scroll time'}
        value={scrollTime}
        onChange={(value) => {
          formik.setFieldValue("scrollTime", value)
        }}
        data={[ 
          {value: '00:00:00', label: '00:00:00'},
          {value: '06:00:00', label: '06:00:00'},
          {value: '09:00:00', label: '09:00:00'},
          {value: '12:00:00', label: '12:00:00'},        
          {value: '18:00:00', label: '18:00:00'},        
        ]}
      />
      <Select
        className={styles.select}
        label={'Day header format'}
        value={dayHeaderFormatWeekday}
        onChange={(value) => {
            formik.setFieldValue("dayHeaderFormatWeekday", value)
        }}
        data={[ 
          {value: 'short', label: 'short'},
          {value: 'long', label: 'long'},
        ]}
      />
      <Select
        className={styles.select}
        label={'Language'}
        value={locale}
        onChange={(value) => {
            formik.setFieldValue("locale", value)
        }}
        data={[ 
          {value: 'en', label: 'english'},
          {value: 'fr', label: 'french'},
          {value: 'es', label: 'spanish'},
          {value: 'ru', label: 'rusian'},   
        ]}
      />
    </div>
  </MainModal>
  )
}

export default SettingsModal