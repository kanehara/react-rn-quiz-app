import {Quiz, TrueButton} from '../Quiz'
import React from 'react'
import { render } from 'shared/_testutils'
import {MemoryRouter} from 'react-router-dom'
import {FalseButton} from 'web/src/components/Button'

describe('Quiz', () => {
  it('renders a redirect to / if no question', () => {
    expect(render(
      <MemoryRouter>
        <Quiz questions={[{}]} questionIndex={3} />
      </MemoryRouter>
    )).toMatchSnapshot()
  })
  
  it('renders a redirect to /results if finished', () => {
    expect(render(
      <MemoryRouter>
        <Quiz finished />
      </MemoryRouter>
    )).toMatchSnapshot()
  })

  it('renders question if present', () => {
    const setAnswerMock = jest.fn()
    const instance = render(
      <Quiz 
        questionIndex={0}
        setAnswer={setAnswerMock}
        questions={[{
          category: 'Rick & Morty',
          question: 'Who is Rick?'
        }]} />
    )
    expect(instance).toMatchSnapshot()

    instance.root.findByType(TrueButton).props.onClick()
    expect(setAnswerMock).toHaveBeenLastCalledWith('True')
    instance.root.findByType(FalseButton).props.onClick()
    expect(setAnswerMock).toHaveBeenLastCalledWith('False')
  })
})
