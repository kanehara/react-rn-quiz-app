import { createStore } from 'redux'
import { quizReducer } from './quiz'

export default createStore(quizReducer)
