import {Text as _Text} from 'react-native'
import styled from 'styled-components'

const Text = styled(_Text)`
  font-size: 16px;
  margin: 4px 0 4px;
  color: ${({ theme }) => theme.fontColor};
`

export default Text
