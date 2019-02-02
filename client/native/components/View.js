import styled from 'styled-components'

const View = styled.View`
  align-items: center;
  justify-content: center;
`

export const ScreenView = styled(View)`
  flex: 1;
  padding: 40px 20px;
  background-color: ${({theme}) => theme.backgroundColor};
`

export default View
