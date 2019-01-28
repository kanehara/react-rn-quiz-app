import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import styled, {css} from 'styled-components'
import Button from '../components/Button'
import {reset} from 'shared/redux/actions'
import {Flex} from 'rayout'

const QuestionHeader = styled.h3`
  color: ${({ correct }) => correct ? 'green' : 'red'};
  margin-bottom: 5px;
  cursor: pointer;
`

const QuestionDetails = styled.div`
  height: 0;
  display: none;
  opacity: 0;
  transition: height 0.5s;
  transition: opacity 0.5s;

  ${({show}) => show && css`
    display: block;
    height: auto;
    opacity: 1;
  `}
`

class Question extends React.Component {
  state = {
    showDetails: false
  }

  render () {
    const {question} = this.props
    return (
      <Flex flexDirection='column'>
        <QuestionHeader 
          onClick={() => this.setState({ showDetails: !this.state.showDetails })}
          correct={question.answer === question.correct_answer}
        >
          {question.question}
        </QuestionHeader>
        <QuestionDetails show={this.state.showDetails}>
          <p>You answered: {question.answer}</p>
          <p>Correct answer: {question.correct_answer}</p>
        </QuestionDetails>
      </Flex>
    )
  }
}

class Results extends React.Component {
  get score () {
    return this.props.questions.reduce((prev, curr) => {
      return prev + (curr.answer === curr.correct_answer ? 1 : 0)
    }, 0)
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
          <h2>{this.score} / {this.props.questions.length}</h2>
          <Button onClick={this.restart}>Restart</Button>
          {this.props.questions.map((q, i) => (
            <Question question={q} key={i} />
          ))}
        </div>
      )
      : (
        <Redirect to='/' />
      )
  }
}

export default connect(
  ({ finished, questions }) => ({
    questions,
    finished
  }),
  dispatch => ({
    reset: () => dispatch(reset())
  })
)(Results)
