import React from 'react'
import { ThemeProvider } from 'styled-components'
import theme from 'shared/theme'
import { Provider } from 'react-redux' 
import { store } from 'shared/redux'
import renderer from 'react-test-renderer'

export const render = jsx => renderer.create(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      {jsx}
    </ThemeProvider>
  </Provider>
)

