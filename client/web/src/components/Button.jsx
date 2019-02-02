import styled from 'styled-components'

const Button = styled.button`
  padding: 10px;
  width: 100%;
  font-size: 18px;
  border-radius: ${({theme}) => theme.buttonBorderRadius};
  border: ${({theme}) => theme.buttonBorder};
  font-weight: bold;
  background-color: ${props => props.theme.buttonColor};

  &:hover {
    cursor: pointer;
  }
`

export const TrueButton = styled(Button)`
  background-color: ${({theme}) => theme.trueButtonColor};
`

export const FalseButton = styled(Button)`
  background-color: ${({theme}) => theme.falseButtonColor};
`

export default Button
