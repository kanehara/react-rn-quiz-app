import React, { Component } from 'react'
import { createGlobalStyle, ThemeProvider } from 'styled-components'
import { Router } from './routes'
import theme from 'shared/theme'
import { Flex } from "rayout"
import { store, persistor } from 'shared/redux'
import { PersistGate } from 'redux-persist/integration/react'
import {Provider} from 'react-redux'

const GlobalStyle = createGlobalStyle`
  body {
    font-family: ${props => props.theme.fontFamily};
    background-color: ${props => props.theme.backgroundColor};
    color: ${props => props.theme.fontColor};
    margin: 0;
  }

  #root {
    height: 100vh;
  }
`

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ThemeProvider theme={theme}>
            <Flex
              padding='50px'
              textAlign='center'
              alignItems='center' 
              flexDirection='column'
            >
              <GlobalStyle />
              <Router />
            </Flex>
          </ThemeProvider>
        </PersistGate>
      </Provider>
    );
  }
}

export default App;
