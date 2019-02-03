import React from 'react'
// import {ScrollView} from 'react-native'
import {ScreenView} from 'native/components/View'
import Button from 'native/components/Button'
import { connect } from 'react-redux'
import { getters, actions } from 'shared/redux/quiz'
import {H1, H2, H4} from 'native/components/Header'
import styled from 'styled-components'

const QuestionText = styled(H4)`
  color: ${({ correct, theme }) => correct ? theme.correctColor : theme.incorrectColor };
  padding: 0 50px 0 20px;
  text-align: left;
`

const ScrollView = styled.ScrollView`
  max-width: 100%;
`

const QuestionView = styled.View`
  flex-direction: row;
  max-width: 100%;
`
const Question = props => (
  <QuestionView>
    <H1>{props.correct ? '✅' : '❌'}</H1>
    <QuestionText correct={props.correct}>{props.children}</QuestionText>
  </QuestionView>
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
        <H1>You scored</H1>
        <H2>{this.props.score} / {this.props.questions.length}</H2>
        <ScrollView>
          {this.props.questions.map((q, i) => 
            <Question 
              key={i} 
              correct={q.correct_answer === this.props.answers[i]}
              question={q}
            >
              {q.question} - {q.correct_answer}
            </Question>
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
