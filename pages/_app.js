import ModalDispatcher from 'components/components/Modals/ModalDispatcher'
import store from 'components/util/store'
import { Provider } from 'universal-reducer'
import 'components/styles/globals.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import { MantineProvider } from '@mantine/core'
import { Notifications } from '@mantine/notifications'
import AppLayout from 'components/components/AppLayout'


export default function App({ Component, pageProps }) {
  return <>
    <Provider store={store}>
      <MantineProvider
        withCSSVariables
        withNormalizeCSS
        withGlobalStyles
        theme={{
          primaryColor:'blue'
        }}
      >
        <AppLayout>
          <Component {...pageProps} />
          <ModalDispatcher />
        </AppLayout>
        <Notifications position="top-center"/>
      </MantineProvider>
    </Provider>
  </>
}
