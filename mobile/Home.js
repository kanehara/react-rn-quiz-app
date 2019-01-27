import React from 'react'
import styled from 'styled-components'
import {Text} from 'react-native'

const RootView = styled.View`
  flex: 1;
  background-color: #fff;
  align-items: center;
  justify-content: center;
`

export default class App extends React.Component {
  render() {
    return (
      <RootView>
        <Text>Open up App.js to start working on your app!</Text>
      </RootView>
    );
  }
}
