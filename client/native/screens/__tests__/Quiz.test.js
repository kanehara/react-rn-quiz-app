import {Quiz} from '../Quiz'
import React from 'react'
import { render } from 'shared/_testutils'
import {TouchableHighlight} from 'react-native'

describe('Quiz', () => {
  const getMockNavigation = () => ({
    navigate: jest.fn()
  })

  it('renders', () => {
    expect(render(<Quiz />)).toMatchSnapshot()
  })
  
  it('sets answer and navigates on to next question on answer', () => {
    const mockNav = getMockNavigation()
    const setAnswerMock = jest.fn()
    const instance = render(
      <Quiz navigation={mockNav} questionIndex={0} setAnswer={setAnswerMock} />
    )
    const buttons = instance.root.findAllByType(TouchableHighlight)
    buttons[0].props.onPress()
    expect(setAnswerMock).toHaveBeenCalledWith('True')
    expect(mockNav.navigate).toHaveBeenCalledWith({
      routeName: 'quiz',
      params: { index: 1 }
    })
    
    buttons[1].props.onPress()
    expect(setAnswerMock).toHaveBeenCalledWith('False')
    expect(mockNav.navigate).toHaveBeenCalledWith({
      routeName: 'quiz',
      params: { index: 1 }
    })
  })
})
