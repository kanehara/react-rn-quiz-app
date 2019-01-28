import React from 'react'
import {Text} from 'react-native'
import ScreenView from './ScreenView'
import { connect } from 'react-redux'

class QuizScreen extends React.Component {
  render() {
    return (
      <ScreenView>
        <Text>{this.props.questions.length}</Text>
      </ScreenView>
    );
  }
}

export default connect(state => ({
  questions: state.questions
}))(QuizScreen)
