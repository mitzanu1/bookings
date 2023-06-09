import Head from 'next/head'
import Calendar from 'components/components/Calendar'
import CategoryList from 'components/components/Lists/CategoryList'
import AppPage from 'components/components/AppPage'
import { ActionIcon } from '@mantine/core'
import { ArrowBack, Plus, Settings, Trash } from 'tabler-icons-react'
import { showModal } from 'components/components/Modals'
import CategoryModal from 'components/components/Modals/CategoryModal'
import DeleteCategoryModal from 'components/components/Modals/DeleteCategoryModal'
import SettingsModal from 'components/components/Modals/SettingsModal'
import { useSelector } from 'universal-reducer'
import { actions } from 'components/util/store'
import CustomerDetails from 'components/components/Customer'
import { removeClientData, useBookingsFetcher, useServicesFetcher, useSettingsFetcher } from 'components/util/actions'
import { isBrowser, isMobile } from 'react-device-detect'
import NoSSRWrapper from 'components/components/NoSSRWrapper'



export default function Home() {

  const bookings = useBookingsFetcher() || []
  const services = useServicesFetcher() || []
  const settings = useSettingsFetcher() 

  const controls = useSelector(()=>actions.get('controls'))
  const { view = 'services', description = '' } = controls || {}
 
 
  return (
    <>
      <Head>
        <title>Booking App</title>
        <meta name="description" content="Booking App" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <NoSSRWrapper>
      {view === 'services' && 
      <AppPage
        className='services'
        name={"services"}
        actions={<>
          <ActionIcon
            style={{margin:'0 3px'}}
            size="lg"
            variant="filled"
            color="primary"
            onClick={() => showModal(CategoryModal)}
        >
            <Plus />
          </ActionIcon>
          <ActionIcon
            size="lg"
            variant="filled"
            color="primary"
            onClick={()=>showModal(DeleteCategoryModal, {services})}
        >
            <Trash />
          </ActionIcon>
        </>
        }
       >
          <CategoryList 
            services={services}/>                  
        </AppPage>
      }
      {view === 'customer' && 
      <AppPage 
        className='customer'
        name='customer details'
        actions={<>
          <ActionIcon 
            size='lg'
            variant='default'
            onClick= {()=>{
              if(isBrowser) {
                actions.set('controls.view', 'services')
                removeClientData()
              }
              if(isMobile) actions.set('controls.view', 'calendar')
            }}
          >
            <ArrowBack/>
          </ActionIcon>
        </>
        }
        >
          <CustomerDetails/>
      </AppPage>
      }
      {(isBrowser || view === 'calendar') && <AppPage
        className='calendar'
        name={'calendar'}
        description={description}
        actions={<>
         {isMobile && <ActionIcon 
            size='lg'
            variant='default'
            onClick= {()=>{
              actions.set('controls.view', 'services')
            }}
          >
            <ArrowBack/>
          </ActionIcon>}
          <ActionIcon 
            size='lg'
            variant='default'
            onClick= {() => showModal(SettingsModal, settings)}
          >
            <Settings/>
          </ActionIcon>
        </>
        }
      >
        <Calendar 
          bookings={bookings} 
          settings={settings}/>
      </AppPage>}
    </NoSSRWrapper>
    </>
  )
}
