import React from "react"
import { BrowserRouter, Route, Switch } from "react-router-dom"
import Quiz from './Quiz'
import Home from './Home'
import Results from './Results'

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
