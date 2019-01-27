import React from 'react'
import {Text} from 'react-native'
import ScreenView from './ScreenView'
import { connect } from 'react-redux'

export default class App extends React.Component {
  render() {
    return (
      <ScreenView>
        <Text>Quiz</Text>
      </ScreenView>
    );
  }
}
