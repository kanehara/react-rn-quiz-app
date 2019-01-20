import React from 'react'
import { Ray } from "rayout"
import { connect } from 'react-redux'
import { setAnswer } from '../store/quiz'

class Quiz extends React.Component {
  render () {
    return (
      <Ray>
        {this.props.questions.map(q => (
          <h5>{q.question}</h5>
        ))}
      </Ray>
    )
  }
}

export default connect(
  state => ({
    questions: state.questions,
    questionNum: state.questionNum
  }),
  dispatch => ({
    setAnswer: answer => dispatch(setAnswer(answer))
  })
)(Quiz)
