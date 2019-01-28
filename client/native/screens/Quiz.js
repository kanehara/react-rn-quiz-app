import React from 'react'
import {Text} from 'react-native'
import ScreenView from './ScreenView'
import { connect } from 'react-redux'

class QuizScreen extends React.Component {
  get question () {
    return this.props.questions[this.props.questionIndex]
  }

  render() {
    return (
      <ScreenView>
        <Text>{this.question.category}</Text>
        <Text>{this.question.question}</Text>
        <Text>{this.props.questionIndex + 1} of {this.props.questions.length}</Text>
      </ScreenView>
    );
  }
}

export default connect(state => ({
  finished: state.finished,
  questions: state.questions,
  questionIndex: state.questionIndex
}))(QuizScreen)
