import React from 'react'
import {Button} from 'react-native'
import Text from 'native/components/Text'
import ScreenView from './ScreenView'
import { connect } from 'react-redux'
import { actions, getters } from 'shared/redux/quiz'

class QuizScreen extends React.Component {
  get question () {
    return this.props.questions[this.props.questionIndex] || {}
  }

  componentDidUpdate() {
    if (this.props.finished) {
      this.props.navigation.navigate('results')
    } else if (!this.question) {
      this.props.navigation.navigate('home')
    }
  }

  handleAnswer = answer => {
    this.props.setAnswer(answer)
    this.props.navigation.navigate({
      routeName: 'quiz',
      params: { index: this.props.questionIndex + 1 }
    })
  }

  render() {
    return (
      <ScreenView>
        <Text>{this.question.category}</Text>
        <Text>{this.question.question}</Text>
        <Text>{this.props.questionIndex + 1} of {this.props.questions.length}</Text>
        <Button onPress={() => this.handleAnswer('True')} title='True' />
        <Button onPress={() => this.handleAnswer('False')} title='False' />
      </ScreenView>
    );
  }
}

export default connect(
  state => ({
    finished: getters.finished(state),
    questions: state.questions,
    questionIndex: state.questionIndex
  }),
  dispatch => ({
    setAnswer: answer => dispatch(actions.setAnswer(answer))
  })
)(QuizScreen)
