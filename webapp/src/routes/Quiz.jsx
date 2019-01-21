import React from 'react'
import { Ray, Flex } from "rayout"
import { connect } from 'react-redux'
import { setAnswer } from '../store/quiz'
import {Redirect} from 'react-router-dom'
import Button from '../components/Button'
import styled from 'styled-components'

const TrueButton = styled(Button)`
  margin-bottom: 35px;
`

const FalseButton = styled(Button)`
  background-color: #fa523f;
`

const Card = styled.div`
  padding: 25px;
  background-color: white;
  border-radius: 10px;
  width: 95%;

  @media (min-width: 600px) {
    width: 80%;
  }
  
  @media (min-width: 1000px) {
    width: 50%;
  }
`

class Quiz extends React.Component {
  get question () {
    return this.props.questions[this.props.questionIndex]
  }

  render () {
    return this.props.finished
      ? <Redirect to='/results' />
      : this.question
        ? (
          <Card>
            <h3>{this.question.category}</h3>
            <Ray minHeight='175px' marginBottom='20px'>
              <h1>{this.question.question}</h1>
              <h5>{this.props.questionIndex + 1} of {this.props.questions.length}</h5>
            </Ray>
            <Flex flexDirection='column'>
              <TrueButton onClick={() => this.props.setAnswer('True')}>True</TrueButton>
              <FalseButton onClick={() => this.props.setAnswer('False')}>False</FalseButton>
            </Flex>
          </Card>
        )
        : (
          <Redirect to='/' />
        )
  }
}

export default connect(
  state => ({
    finished: state.finished,
    questions: state.questions,
    questionIndex: state.questionIndex
  }),
  dispatch => ({
    setAnswer: answer => dispatch(setAnswer(answer))
  })
)(Quiz)
