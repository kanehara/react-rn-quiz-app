import React from 'react'
import Navigator from './Navigator'
import { ReduxProvider } from 'shared/redux'
import { ThemeProvider } from 'styled-components'
import theme from 'shared/theme'

const App = () => (
  <ThemeProvider theme={theme}>
    <ReduxProvider>
      <Navigator />
    </ReduxProvider>
  </ThemeProvider>
)

export default App
