import React from 'react'
import {H1, H3, H5} from 'native/components/Header'
import View, {ScreenView} from 'native/components/View'
import {TrueButton, FalseButton} from 'native/components/Button'
import { connect } from 'react-redux'
import { actions, getters } from 'shared/redux/quiz'
import styled from 'styled-components'

const Card = styled(View)`
  padding: 25px 15px;
  background-color: white;
  border-radius: 15px;
  border: 1px solid #e5e5e5;
  /* box-shadow: 0px 5px 18px 5px #e5e5e5; */
  align-items: center;
  justify-content: center;
  width: 95%;
`

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
        <Card>
          <H3>{this.question.category}</H3>
          <H1>{this.question.question}</H1>
          <H5>{this.props.questionIndex + 1} of {this.props.questions.length}</H5>
          <TrueButton onPress={() => this.handleAnswer('True')} title='True' />
          <FalseButton onPress={() => this.handleAnswer('False')} title='False' />
        </Card>
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
