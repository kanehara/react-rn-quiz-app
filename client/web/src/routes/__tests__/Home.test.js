import {Home} from '../Home'
import React from 'react'
import { render } from 'shared/_testutils'
import Button from 'web/src/components/Button'

describe('Home', () => {
  const getMockHistory  = () => ({
    replace: jest.fn(),
    push: jest.fn()
  })

  it('renders', () => {
    expect(render(<Home />)).toMatchSnapshot()
  })
  
  it('replaces to quiz if in progress', () => {
    const mockHistory = getMockHistory()
    render(<Home history={mockHistory} inProgress />)
    expect(mockHistory.replace).toHaveBeenCalledWith('/quiz')
  })
  
  it('replaces to results if finished', () => {
    const mockHistory = getMockHistory()
    render(<Home history={mockHistory} finished />)
    expect(mockHistory.replace).toHaveBeenCalledWith('/results')
  })
  
  it('navigates to quiz on start', async () => {
    const mockHistory = getMockHistory()
    const startQuizMockPromise = Promise.resolve()
    const startQuizMock = jest.fn(() => startQuizMockPromise)
    const instance = render(<Home history={mockHistory} startQuiz={startQuizMock} />)
    const button = instance.root.findByType(Button)
    button.props.onClick()

    await startQuizMockPromise
    expect(startQuizMock).toHaveBeenCalled()
    expect(mockHistory.push).toHaveBeenCalledWith('/quiz')
  })
})
