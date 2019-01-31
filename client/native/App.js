import React from 'react'
import Navigator from './Navigator'
import { store, persistor } from 'shared/redux'
import { Provider } from 'react-redux' 
import { ThemeProvider } from 'styled-components'
import { PersistGate } from 'redux-persist/integration/react'
import theme from 'shared/theme'
import { ActivityIndicator } from 'react-native'

const App = () => (
  <Provider store={store}>
    <PersistGate loading={<ActivityIndicator />} persistor={persistor}>
      <ThemeProvider theme={theme}>
        <Navigator />
      </ThemeProvider>
    </PersistGate>
  </Provider>
)

export default App
