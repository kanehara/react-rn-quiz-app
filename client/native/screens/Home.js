import React from 'react'
import {Text, Button} from 'react-native'
import ScreenView from './ScreenView'
import { connect } from 'react-redux'

class App extends React.Component {
  render() {
    return (
      <ScreenView>
        <Text>Welcome to the Trivia Challenge!</Text>
        <Text>You will be presented with 10 True or False questions.</Text>
        <Text>Can you score 100%?</Text>
        <Button onPress={() => this.props.navigation.navigate('Quiz')} title='BEGIN' />
      </ScreenView>
    );
  }
}

export default App
