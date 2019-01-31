import styled from 'styled-components'

const ScreenView = styled.View`
  padding: 20px;
  flex: 1;
  background-color: ${({theme}) => theme.backgroundColor};
  align-items: center;
  justify-content: center;
`

export default ScreenView
