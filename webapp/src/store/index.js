import { createStore } from 'redux'
import { quizReducer } from './quiz'

export default createStore(
  quizReducer, 
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)
