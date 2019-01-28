import { createStore, applyMiddleware, compose } from 'redux'
import React from 'react'
import {Provider} from 'react-redux'
import thunk from 'redux-thunk'
import { quizReducer } from './quiz'

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ 
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) 
    : compose


const store = createStore(
  quizReducer,
  composeEnhancers(
    applyMiddleware(thunk)
  )
)

const ReduxProvider = props => <Provider store={store}>{props.children}</Provider>

export {
  ReduxProvider
}
