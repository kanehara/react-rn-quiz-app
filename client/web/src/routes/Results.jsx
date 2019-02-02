import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import styled from 'styled-components'
import Button from '../components/Button'
import {actions, getters} from 'shared/redux/quiz'
import {Flex} from 'rayout'

const QuestionsContainer = styled.div`
  margin-bottom: 40px;
`

const QuestionHeader = styled.h3`
  color: ${({ correct, theme }) => correct 
    ? theme.correctColor
    : theme.incorrectColor
  };
  margin-bottom: 5px;
`

class Question extends React.Component {
  render () {
    const {question, answer} = this.props
    return (
      <Flex flexDirection='column'>
        <QuestionHeader correct={answer === question.correct_answer}>
          {question.question} - {question.correct_answer}
        </QuestionHeader>
      </Flex>
    )
  }
}

class Results extends React.Component {
  componentDidMount () {
    if (this.props.inProgress) {
      this.props.history.replace('/quiz')
    }
  }

  restart = () => {
    this.props.reset()
    this.props.history.replace('/')
  }

  render () {
    return this.props.finished
      ? (
        <div>
          <h2>You scored</h2>
          <h2>{this.props.score} / {this.props.questions.length}</h2>
          <QuestionsContainer>
            {this.props.questions.map((q, i) => (
              <Question answer={this.props.answers[i]} question={q} key={i} />
            ))}
          </QuestionsContainer>
          <Button onClick={this.restart}>Restart</Button>
        </div>
      )
      : (
        <Redirect to='/' />
      )
  }
}

export default connect(
  state => ({
    score: getters.score(state),
    inProgress: getters.inProgress(state),
    finished: getters.finished(state),
    answers: state.answers,
    questions: state.questions
  }),
  dispatch => ({
    reset: () => dispatch(actions.reset())
  })
)(Results)
