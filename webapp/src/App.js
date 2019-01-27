import React, { Component } from 'react'
import { ThemeProvider, createGlobalStyle } from 'styled-components'
import theme from './theme'
import { Router } from './routes'
import store from './store'
import { Provider } from 'react-redux'
import { Flex } from "rayout"

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
      </Provider>
    );
  }
}

export default App;
