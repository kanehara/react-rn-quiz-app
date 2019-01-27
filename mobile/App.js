import React from 'react'
import Navigator from './Navigator'
import {ThemeProvider} from 'styled-components'
import theme from './theme.js'

const App = () => (
  <ThemeProvider theme={theme}>
    <Navigator />
  </ThemeProvider>
)

export default App
