import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { quizReducer } from './quiz'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ 
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) 
    : compose

const persistedReducer = persistReducer({
  key: 'root',
  storage
}, quizReducer)

const store = createStore(
  persistedReducer,
  composeEnhancers(
    applyMiddleware(thunk)
  )
)

const persistor = persistStore(store)

export {
  store,
  persistor
}
