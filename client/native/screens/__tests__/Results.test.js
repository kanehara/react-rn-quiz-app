import {Results} from '../Results'
import React from 'react'
import { render } from 'shared/_testutils'
import {TouchableHighlight} from 'react-native'

describe('Results', () => {
  const getMockNavigation = () => ({
    navigate: jest.fn()
  })

  it('renders', () => {
    expect(render(
      <Results 
        questions={[
          {correct_answer: 'true', question: 'question0'},
          {correct_answer: 'true', question: 'question1'},
          {correct_answer: 'false', question: 'question2'}
        ]} 
        answers={['true', 'false', 'true']} 
      />
    )).toMatchSnapshot()
  })
  
  it('navigates to quiz if in progress', () => {
    const mockNav = getMockNavigation()
    render(<Results navigation={mockNav} inProgress />)
    expect(mockNav.navigate).toHaveBeenCalledWith('quiz')
  })
  
  it('resets quiz on button press', async () => {
    const mockNav = getMockNavigation()
    const resetMock = jest.fn()
    const instance = render(<Results navigation={mockNav} reset={resetMock} />)
    const button = instance.root.findByType(TouchableHighlight)
    button.props.onPress()
    expect(resetMock).toHaveBeenCalled()
    expect(mockNav.navigate).toHaveBeenCalledWith('home')
  })
})
