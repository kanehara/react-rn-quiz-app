import React from 'react'
import { Ray } from "rayout"
import { connect } from 'react-redux'
import { setAnswer } from '../store/quiz'
import {Redirect} from 'react-router-dom'
import Button from '../components/Button'

class Quiz extends React.Component {
  get question () {
    return this.props.questions[this.props.questionIndex]
  }

  render () {
    return this.props.finished
      ? <Redirect to='/results' />
      : this.question
        ? (
          <Ray>
            <h3>{this.question.category}</h3>
            <h1>{this.question.question}</h1>
            <h5>{this.props.questionIndex + 1} of {this.props.questions.length}</h5>
            <Button onClick={() => this.props.setAnswer('True')}>True</Button>
            <Button onClick={() => this.props.setAnswer('False')}>False</Button>
          </Ray>
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
