import styled from 'styled-components'
import {View} from 'react-native'
import Text from 'native/components/Text'
import React from 'react'

const TouchableHighlight = styled.TouchableHighlight`
  background-color: ${({ theme }) => theme.buttonColor};
  border-radius: ${({theme}) => theme.buttonBorderRadius};
  border: ${({theme}) => theme.buttonBorder};
  
  width: 100%;
  align-items: center;
  justify-content: center;
  padding: 5px 10px;
  margin: 10px;
`

const ButtonText = styled(Text)`
  font-weight: 700;
`

const Button = props => (
  <TouchableHighlight 
    style={props.style} 
    onPress={props.onPress}
    underlayColor='rgba(0, 0, 0, 0.15)'
  >
    <View>
      <ButtonText>{props.title}</ButtonText>
    </View>
  </TouchableHighlight>
)

export const FalseButton = styled(Button)`
  background-color: ${({theme}) => theme.falseButtonColor};
`

export const TrueButton = styled(Button)`
  background-color: ${({theme}) => theme.trueButtonColor};
`

export default Button
