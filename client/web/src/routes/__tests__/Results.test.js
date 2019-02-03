import {Results} from '../Results'
import React from 'react'
import { render } from 'shared/_testutils'
import {MemoryRouter} from 'react-router-dom'
import Button from 'web/src/components/Button'

describe('Results', () => {
  const getMockHistory = () => ({
    replace: jest.fn()
  })

  it('redirects to / if not finished', () => {
    expect(render(
      <MemoryRouter>
        <Results finished={false} />
      </MemoryRouter>
    )).toMatchSnapshot()
  })
  
  it('redirects to /quiz if inProgress', () => {
    expect(render(
      <MemoryRouter>
        <Results inProgress />
      </MemoryRouter>
    )).toMatchSnapshot()
  })
  
  it('renders results', () => {
    expect(render(
      <MemoryRouter>
        <Results 
          questions={[
            {correct_answer: 'true', question: 'question0'},
            {correct_answer: 'true', question: 'question1'},
            {correct_answer: 'false', question: 'question2'}
          ]} 
          answers={['true', 'false', 'true']} 
        />
      </MemoryRouter>
    )).toMatchSnapshot()
  })

  it('restarts quiz on reset click', () => {
    const mockHistory = getMockHistory()
    const resetMock = jest.fn()
    const instance = render(
      <MemoryRouter>
        <Results 
          finished
          reset={resetMock}
          history={mockHistory}
          questions={[
            {correct_answer: 'true', question: 'question0'},
            {correct_answer: 'true', question: 'question1'},
            {correct_answer: 'false', question: 'question2'}
          ]} 
          answers={['true', 'false', 'true']} 
        />
      </MemoryRouter>
    )
    instance.root.findByType(Button).props.onClick()
    expect(mockHistory.replace).toHaveBeenCalledWith('/')
    expect(resetMock).toHaveBeenCalled()
  })
})
