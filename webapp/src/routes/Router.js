import React from "react"
import { BrowserRouter, Route, Switch } from "react-router-dom"
import { Flex } from "rayout"
import Quiz from './Quiz'
import Home from './Home'

const Results = () => <h2>Results</h2>

const Router = () => (
  <Flex
    textAlign='center'
    position='relative'
    top='50%'
    transform='translateY(-50%)'
    alignItems='center' 
    flexDirection='column'
  >
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/quiz" component={Quiz} />
        <Route path="/results" component={Results} />
      </Switch>
    </BrowserRouter>
  </Flex>
)

export default Router
