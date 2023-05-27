import FullCalendar from "@fullcalendar/react"
import dayGridPlugin from "@fullcalendar/daygrid"
import interactionPlugin from "@fullcalendar/interaction"
import timeGridPlugin from '@fullcalendar/timegrid'
import Head from 'next/head'
import { Inter } from 'next/font/google'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useState } from "react"
import moment from "moment"
import { useRouter } from "next/router";
import List from "components/components/List/List"

export default function Home({bookings}) {

  const [selectedDate, setSelectedDate] = useState(Date.now())
  const [endDate, setEndDate] = useState()
  const [error, setError] = useState()
  const [message, setMessage] = useState()
  const [serviciu, setServiciu] = useState('Alege serviciu')
  const [duration, setDuration] = useState(0)

  const router = useRouter()

  const handleSubmit = async(e) => {
    e.preventDefault()

    const booking = {
      startAt:selectedDate,
      endAt:endDate,
    }

    const response = await fetch('/api/bookings', {
      method:'POST',
      body:JSON.stringify(booking)
    })

    let data = await response.json();

        if (data.success) {        
            setMessage('Booking created succesfuly')
            setSelectedDate(Date.now())
            setEndDate(Date.now())
            router.replace(router.asPath)
        } else {
            setError(data.message);
        } 
  }

  const _bookings = bookings.map((booking)=>{
    const {_id, startAt, endAt, serviciu } = booking
    return {
      id:_id,
      start: startAt,
      end:endAt,
    }
  })

  const listAction = (duration , serviceName) => {
    setDuration(duration)
    setServiciu(serviceName)
    setEndDate(moment(selectedDate).add(duration,'minute').format())
  }

  const isAvailable = (endD,startD) => {
   const nextBooking = _bookings
    .filter(booking=>moment(startD).isBefore(booking.start, 'minutes'))
    .sort((a,b)=> new Date(a.start) - new Date(b.start))
   if(nextBooking.length !== 0){
     if(moment(endD).isAfter(nextBooking[0].start, 'minutes')) return false  
   }
   return true
  } 
  console.log(duration)
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {
        error && <div>{error}</div>
      }
      {
        message && <div>{message}</div>
      }
      <button className="btn btn-primary"
        disabled={ serviciu === 'Alege serviciu' ? true : false} 
        onClick={(e)=>handleSubmit(e)}
      >Confirm Booking
      </button>   
      <div className="content">
        <div className="lista">
          <h1>Nos services</h1>
          <List 
            title={'Soin Du Corps'}
            items={[
              {
                name:'Gommage corps + massage',
                price:'70.00 €',
                duration:45,
                onClick: (duration,name)=>listAction(duration,name)             
              },
              {
                name:'La cryolipolyse',
                price:'160.00 €',
                duration:60,
                onClick: (duration,name)=>listAction(duration,name)             
              },
              {
                name:'Gommage corps + enveloppement massage',
                price:'90.00 €',
                duration:110,
                onClick: (duration,name)=>listAction(duration,name)             
              },
              {
                name:'Traitement jambes lourdes',
                price:'50.00 €',
                duration:30,
                onClick: (duration,name)=>listAction(duration,name)
              },
            ]} 
          />       
          <List 
            title={'Beauté Du Regard'}
            items={[
              {
                name:'Gommage corps + massage',
                price:'70.00 €',
                duration:45,
                onClick: (duration,name)=>listAction(duration,name)             
              },
              {
                name:'La cryolipolyse',
                price:'160.00 €',
                duration:60,
                onClick: (duration,name)=>listAction(duration,name)             
              },
              {
                name:'Gommage corps + enveloppement massage',
                price:'90.00 €',
                duration:110,
                onClick: (duration,name)=>listAction(duration,name)             
              },
              {
                name:'Traitement jambes lourdes',
                price:'50.00 €',
                duration:30,
                onClick: (duration,name)=>listAction(duration,name)
              },
            ]} 
          />       
          <List 
            title={'Soin Du Visage'}
            items={[
              {
                name:'Gommage corps + massage',
                price:'70.00 €',
                duration:45,
                onClick: (duration,name)=>listAction(duration,name)             
              },
              {
                name:'La cryolipolyse',
                price:'160.00 €',
                duration:60,
                onClick: (duration,name)=>listAction(duration,name)             
              },
              {
                name:'Gommage corps + enveloppement massage',
                price:'90.00 €',
                duration:110,
                onClick: (duration,name)=>listAction(duration,name)             
              },
              {
                name:'Traitement jambes lourdes',
                price:'50.00 €',
                duration:30,
                onClick: (duration,name)=>listAction(duration,name)
              },
            ]} 
          />       
                 
        </div>
        <div className="test">
        <FullCalendar
          height='80%'
          contentHeight='100%'
          plugins={[dayGridPlugin, interactionPlugin,timeGridPlugin]}
          initialView='timeGridWeek'
          initialDate={Date.now()}
          slotDuration= '00:05'
          events={[..._bookings, {
            id:'a',
            start: selectedDate,
            end:endDate,
            color: serviciu === 'Alege serviciu' ? 'red' : '#0d6efd',
            overlap:false
          }]  
          }
          themeSystem="bootstrap5"
          businessHours={[
            {            
              daysOfWeek: [ 1, 2, 3, 4, 5 ],
              startTime: '9:00', 
              endTime: '18:00',
            }
          ]}
          nowIndicator={true}
          dayHeaderFormat={{weekday:'short'}}
          slotMinTime={'11:00:00'}
          slotMaxTime={'17:00:00'}
          allDaySlot={false}
          scrollTime={'09:00:00'}
          dateClick={ (info)=> {
            const startD = moment(info.dateStr).format()
            const _endDate = moment(info.dateStr).add(duration,'minute').format()
            if(isAvailable(_endDate, startD)){
              setEndDate(_endDate)
              setSelectedDate(moment(info.dateStr).format())
            }
          }}
          eventOverlap={false}
          customButtons= {
            {
              myCustomButton: {
                text: 'Confirm ?',
                click: function() {
                  alert('clicked');
                }
              }
            }
          }
          headerToolbar= {
            { 
              left: 'prev,next today myCustomButton',
              center: 'title',
              right: 'timeGridWeek,timeGridDay'
            }
          }
          />
        </div> 
      </div>
       
    </>
  )
}

export async function getStaticProps () {

  let response = await fetch('http://localhost:3000/api/bookings');
  let data = await response.json();

  return {
      props: {
          bookings: data['message'],
      },
  };
}