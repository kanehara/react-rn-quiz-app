import React from 'react'
import {Button, ScrollView} from 'react-native'
import Text from 'native/components/Text'
import ScreenView from './ScreenView'
import { connect } from 'react-redux'
import { getters, actions } from 'shared/redux/quiz'
import styled from 'styled-components'
import {H1, H2} from 'native/components/Header'

const Question = ({question, answer}) => (
  <React.Fragment>
    <Text>
      {question.correct_answer === answer ? 'O ' : 'X '} 
      {question.question} 
      - {question.correct_answer}
    </Text>
  </React.Fragment>
)

class Results extends React.Component {
  componentDidMount () {
    if (this.props.inProgress) {
      this.props.navigation.navigate('quiz')
    }
  }

  reset = () => {
    this.props.reset()
    this.props.navigation.navigate('home')
  }

  render() {
    return (
      <ScreenView>
        <ScrollView>
          <H1>Results</H1>
          <H2>{this.props.score} / {this.props.questions.length}</H2>
          {this.props.questions.map((q, i) => 
            <Question key={i} question={q} answer={this.props.answers[i]} />
          )}
        </ScrollView>
        <Button onPress={this.reset} title='Restart' />
      </ScreenView>
    );
  }
}

export default connect(
  state => ({
    score: getters.score(state),
    finished: getters.finished(state),
    inProgress: getters.inProgress(state),
    answers: state.answers,
    questions: state.questions
  }),
  dispatch => ({
    reset: () => dispatch(actions.reset())
  })
)(Results)
