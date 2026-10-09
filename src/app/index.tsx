import '@mantine/core/styles.layer.css'

import { MantineProvider } from '@mantine/core'
import { HomePage } from '@/pages/home'
import './index.module.scss'

export function App() {
  return (
    <MantineProvider forceColorScheme="light">
      <HomePage />
    </MantineProvider>
  )
}
