import React from 'react'
import {ActivityIndicator} from 'react-native'
import Text from 'native/components/Text'
import Button from 'native/components/Button'
import { H1, H2 } from 'native/components/Header'
import { ScreenView } from 'native/components/View'
import { connect } from 'react-redux'
import { actions, getters } from 'shared/redux/quiz'

export class Home extends React.Component {
  state = {
    loadingQuiz: false,
    error: null
  }

  componentDidMount () {
    if (this.props.inProgress) {
      this.props.navigation.navigate('quiz')
    } else if (this.props.finished) {
      this.props.navigation.navigate('results')
    }
  }

  handleStartPress = async () => {
    try {
      this.setState({ loadingQuiz: true })
      await this.props.startQuiz()
      this.props.navigation.navigate('quiz')
    } catch (e) {
      this.setState({ error: e, loadingQuiz: false })
    }
  }

  render() {
    return (
      <ScreenView>
        {this.state.loadingQuiz 
          ? <ActivityIndicator />
          : (
            <React.Fragment>
              <H1>Welcome to the Trivia Challenge!</H1>
              <H2>You will be presented with 10 True or False questions.</H2>
              <H2>Can you score 100%?</H2>
              <Button onPress={this.handleStartPress} title='BEGIN' />
              {this.state.error && <Text>Something went wrong while fetching questions.</Text>}
            </React.Fragment>
          )
        }
      </ScreenView>
    );
  }
}

export default connect(
  state => ({
    finished: getters.finished(state),
    inProgress: getters.inProgress(state)
  }),
  dispatch => ({
    startQuiz: () => dispatch(actions.startQuiz())
  })
)(Home)
