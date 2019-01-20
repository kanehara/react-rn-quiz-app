import React, { Component } from 'react'
import { ThemeProvider, createGlobalStyle } from 'styled-components'
import theme from './theme'
import { Router } from './routes'
import apolloClient from './apolloClient'
import gql from 'graphql-tag'
import store from './store'
import { Provider } from 'react-redux'

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
  async componentDidMount () {
    try {
      this.fetchQuestions()
    } catch(e) {
      console.warn('Fetching questions failed on first try, retrying...', e)
      try {
        this.fetchQuestions()
      } catch (e) {
        console.error('Fetching questions failed on second try', e)
      }
    }
  }

  fetchQuestions = async () => {
    const response = await apolloClient.query({
      query: gql`{
        questions {
          question
          correct_answer
        }
      }`
    })
    this.setState({
      questions: response.data.questions
    })
  }

  render() {
    return (
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <React.Fragment>
            <GlobalStyle />
            <Router />
          </React.Fragment>
        </ThemeProvider>
      </Provider>
    );
  }
}

export default App;
