import theme from './theme'
import { ThemeProvider as T } from 'styled-components'
import React from 'react'

const ThemeProvider = ({children}) => <T theme={theme}>{children}</T>

export {
  ThemeProvider
}
