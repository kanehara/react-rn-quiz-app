import React from 'react'
import { Ray } from "rayout"
import Button from '../components/Button'
import { connect } from 'react-redux'
import { startQuiz as _startQuiz } from 'shared/redux/actions'

class Home extends React.Component {
  state = {
    loading: false,
    error: null
  }

  startQuiz = async () => {
    try {
      this.setState({loading: true})
      await this.props.startQuiz()
      this.props.history.push('/quiz')
    } catch(e) {
      debugger // eslint-disable-line
      this.setState({ error: e })
    } finally {
      this.setState({ loading: false })
    }
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
              <Button onClick={this.startQuiz}>Try again?</Button>
            </React.Fragment>
          )
          : <Button onClick={this.startQuiz}>BEGIN</Button>
        }
      </Ray>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  startQuiz: () => dispatch(_startQuiz())
})

export default connect(null, mapDispatchToProps)(Home)
