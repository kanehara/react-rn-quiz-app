import React from 'react'
import {Text, Button} from 'react-native'
import ScreenView from './ScreenView'
import { connect } from 'react-redux'
import { startQuiz as _startQuiz } from 'shared/redux/actions'

class Home extends React.Component {
  state = {
    error: null
  }

  handleStartPress = async () => {
    try {
      await this.props.startQuiz()
      this.props.navigation.navigate('Quiz')
    } catch (e) {
      this.setState({error: e})
    }
  }

  render() {
    return (
      <ScreenView>
        <Text>Welcome to the Trivia Challenge!</Text>
        <Text>You will be presented with 10 True or False questions.</Text>
        <Text>Can you score 100%?</Text>
        <Button onPress={this.handleStartPress} title='BEGIN' />
        {this.state.error && <Text>Something went wrong while fetching questions.</Text>}
      </ScreenView>
    );
  }
}

export default connect(
  null,
  dispatch => ({
    startQuiz: () => dispatch(_startQuiz())
  })
)(Home)
