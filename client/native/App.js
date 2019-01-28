import React from 'react'
import Navigator from './Navigator'
import { ReduxProvider } from 'shared/redux'
import { ThemeProvider } from 'shared/theme'

const App = () => (
  <ThemeProvider>
    <ReduxProvider>
      <Navigator />
    </ReduxProvider>
  </ThemeProvider>
)

export default App
