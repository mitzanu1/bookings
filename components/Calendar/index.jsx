import FullCalendar from '@fullcalendar/react'
import React, { useState } from 'react'
import dayGridPlugin from "@fullcalendar/daygrid"
import interactionPlugin from "@fullcalendar/interaction"
import timeGridPlugin from '@fullcalendar/timegrid'
import moment from "moment"
import allLocales from '@fullcalendar/core/locales-all'
import { useSelector } from 'universal-reducer'
import { actions } from 'components/util/store'
import styles from './index.module.scss'
import { notifications } from '@mantine/notifications'
import { isBrowser, isMobile } from 'react-device-detect'

const defaultSettings = {
  height:'90%',
  slotDuration:"00:15",
  businessHoursStartTime:"6:00", 
  businessHoursEndTime:"20:00",
  dayHeaderFormatWeekday:"short",
  slotMinTime:"06:00:00",
  slotMaxTime:"18:00:00",
  scrollTime:"09:00:00",
  locale:'en',
}

function Calendar({bookings, settings=defaultSettings}) {
  
  const controls = useSelector(()=>actions.get('controls'))
  const { duration = 15, endDate, name, selectedDate } = controls || ''


  const isAvailable = (endD,startD) => {
    const nextBooking = _bookings
     .filter(booking=>moment(startD).isBefore(booking.start, 'minutes'))
     .sort((a,b)=> new Date(a.start) - new Date(b.start))
    if(nextBooking.length !== 0){
      if(moment(endD).isAfter(nextBooking[0].start, 'minutes')) {
        notifications.show({
          message:'Selected date is unavailable',
          autoClose: 4000,
          color:'red'
        })
        return false  
      }
    }
    return true
  }
  
  const isSelected = (name)=> {
    if(!name) {
      notifications.show({
        message:'Please select a service',
        autoClose: 4000,
        color:'red'
      })
      return false
    }
    return true
  }

  const _bookings = bookings.map((booking)=>{
    const {_id, startAt, endAt, service} = booking
    return {
      id:_id,
      start: startAt,
      end:endAt,
      title: service,
      classNames:['booking']
    }
  })

  const {
    height,
    slotDuration,
    businessHoursStartTime, 
    businessHoursEndTime,
    dayHeaderFormatWeekday,
    slotMinTime,
    slotMaxTime,
    scrollTime,
    locale,
  } = settings

  return (
    <div className={styles.calendar}>
    <FullCalendar
      height={height}
      plugins={[dayGridPlugin, interactionPlugin,timeGridPlugin]}
      views={{
        timeGridFourDay: {
          type: 'timeGrid',
          duration: { days: 4 }
        }
      }}
      initialView={isMobile ? 'timeGridFourDay' :'timeGridWeek'}
      initialDate={Date.now()}
      slotDuration={slotDuration}
      events={[..._bookings, {
        id:'a',
        start: selectedDate,
        end:endDate,
        title:name,
        classNames:['booking']
      }]}
      eventClick={(info)=>{
        console.log(info.event)
        const { id } = info.event
        alert(`Name: ${id}`)
      }}
      themeSystem="bootstrap5"
      businessHours={[
        {            
          daysOfWeek: [ 0, 1, 2, 3, 4, 5, 6 ],
          startTime: businessHoursStartTime, 
          endTime: businessHoursEndTime,
        }
      ]}
      nowIndicator={true}
      dayHeaderFormat={{weekday:dayHeaderFormatWeekday}}
      slotMinTime={slotMinTime}
      slotMaxTime={slotMaxTime}
      allDaySlot={false}
      scrollTime={scrollTime}
      dateClick={ (info)=> {
        const startD = moment(info.dateStr).format()
        const _endDate = moment(info.dateStr).add(duration,'minute').format()
        if(isAvailable(_endDate, startD) && isSelected(name)){
          actions.set('controls.endDate', _endDate)
          actions.set('controls.selectedDate', moment(info.dateStr).format())
          actions.set('controls.view', 'customer')
        }
      }}
      eventOverlap={false}
      locales= {allLocales}
      locale = {locale}
      headerToolbar= {
        { 
          left: 'prev,next today',
          center: isMobile ? '' : 'title',
          right: 'timeGridWeek,timeGridDay'
        }
      }
     />
    </div>
  )
}


export default Calendar