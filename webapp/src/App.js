import React, { Component } from 'react'
import { ThemeProvider, createGlobalStyle } from 'styled-components'
import theme from './theme'
import Router from './Router'

const GlobalStyle = createGlobalStyle`
  body {
    font-family: ${props => props.theme.fontFamily};
    background-color: ${props => props.theme.colors.first};
    color: ${props => props.theme.colors.second};
  }
`

class App extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <React.Fragment>
          <GlobalStyle />
          <Router />
        </React.Fragment>
      </ThemeProvider>
    );
  }
}

export default App;
