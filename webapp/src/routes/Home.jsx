import React from 'react'
import { Ray } from "rayout"
import Button from '../components/Button'
import gql from 'graphql-tag'
import apolloClient from '../apolloClient'
import { connect } from 'react-redux'
import { setQuestions } from '../store/quiz'

class Home extends React.Component {
  state = {
    loading: false,
    error: null
  }

  beginQuiz = async () => {
    this.setState({loading: true})
    try {
      await this.fetchQuestions()
    } catch (e) {
      console.warn('Failed first fetch for questions', e)
      try {
        await this.fetchQuestions()
      } catch (e) {
        console.error('Failed second fetch for questions', e)
        this.setState({error: e})
      }
    } finally {
      this.setState({ loading: false })
    }
  }

  async fetchQuestions () {
    debugger // eslint-disable-line
    const response = await apolloClient.query({
      query: gql`{
        questions {
          category
          question
          correct_answer
        }
      }`
    })
    this.props.setQuestions(response.data.questions)
    this.props.history.push('/quiz')
  }

  render () {
    return (
      <Ray>
        <h1>Welcome to the Trivia Challenge!</h1>
        <h3>You will be presented with 10 True or False questions.</h3>
        <h3>Can you score 100%?</h3>
        {this.state.error 
          ? (
            <React.Fragment>
              <h4>Something went wrong while fetching your quiz questions.</h4>
              <Button onClick={this.beginQuiz}>Try again?</Button>
            </React.Fragment>
          )
          : <Button onClick={this.beginQuiz}>BEGIN</Button>
        }
      </Ray>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  setQuestions: questions => dispatch(setQuestions(questions))
})

export default connect(null, mapDispatchToProps)(Home)
