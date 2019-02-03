import {Home} from '../Home'
import React from 'react'
import { render } from 'shared/_testutils'
import {TouchableHighlight} from 'react-native'

describe('Home', () => {
  const getMockNavigation = () => ({
    navigate: jest.fn()
  })

  it('renders', () => {
    expect(render(<Home />)).toMatchSnapshot()
  })
  
  it('navigates to quiz if in progress', () => {
    const mockNav = getMockNavigation()
    render(<Home navigation={mockNav} inProgress />)
    expect(mockNav.navigate).toHaveBeenCalledWith('quiz')
  })
  
  it('navigates to results if finished', () => {
    const mockNav = getMockNavigation()
    render(<Home navigation={mockNav} finished />)
    expect(mockNav.navigate).toHaveBeenCalledWith('results')
  })
  
  it('navigates to quiz on start', async () => {
    const mockNav = getMockNavigation()
    const startQuizMockPromise = Promise.resolve()
    const startQuizMock = jest.fn(() => startQuizMockPromise)
    const instance = render(<Home navigation={mockNav} startQuiz={startQuizMock} />)
    const button = instance.root.findByType(TouchableHighlight)
    button.props.onPress()

    await startQuizMockPromise
    expect(startQuizMock).toHaveBeenCalled()
    expect(mockNav.navigate).toHaveBeenCalledWith('quiz')
  })
})
