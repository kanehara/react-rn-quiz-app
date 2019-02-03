import React from 'react'
import { Ray } from "rayout"
import Button from '../components/Button'
import { connect } from 'react-redux'
import { actions, getters } from 'shared/redux/quiz'

export class Home extends React.Component {
  state = {
    loading: false,
    error: null
  }

  componentDidMount () {
    if (this.props.inProgress) {
      this.props.history.replace('/quiz')
    } else if (this.props.finished) {
      this.props.history.replace('/results')
    }
  }

  startQuiz = async () => {
    try {
      this.setState({loading: true})
      await this.props.startQuiz()
      this.props.history.push('/quiz')
    } catch(e) {
      this.setState({ error: e, loading: false })
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

const mapStateToProps = state => ({
  finished: getters.finished(state),
  inProgress: getters.inProgress(state)
})

const mapDispatchToProps = (dispatch) => ({
  startQuiz: () => dispatch(actions.startQuiz())
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)
