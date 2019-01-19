import styled from 'styled-components'

const Button = styled.button`
  padding: 10px;
  border-radius: 5px;
  font-weight: bold;
  background-color: ${props => props.theme.buttonColor};

  &:hover {
    cursor: pointer;
  }
`

export default Button
