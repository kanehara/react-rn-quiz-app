import React from "react"
import { BrowserRouter, Route, Switch } from "react-router-dom"
import { Flex } from "rayout"
import Button from './components/Button'

const Home = () => (
  <Flex 
    position='relative'
    top='50%'
    transform='translateY(-50%)'
    alignItems='center' 
    flexDirection='column'
  >
    <h1>Welcome to the Trivia Challenge!</h1>
    <h3>You will be presented with 10 True or False questions.</h3>
    <h3>Can you score 100%?</h3>

    <Button>BEGIN</Button>
  </Flex>
)
const Quiz = () => <h2>Quiz</h2>
const Results = () => <h2>Results</h2>

const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/quiz" component={Quiz} />
      <Route path="/results" component={Results} />
    </Switch>
  </BrowserRouter>
)

export default Router
