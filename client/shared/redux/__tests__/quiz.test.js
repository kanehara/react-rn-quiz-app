import 'unfetch/polyfill'
import { getters, actions, quizReducer, initialState } from '../quiz'
import client from 'shared/apolloClient'

const getMockState = (overrides = {}) => ({
  ...initialState,
  ...overrides
})

describe('getters', () => {
  it('.score is reduced from questions and answers', () => {
    expect(getters.score(getMockState({
      questions: [],
      answers: ['true', 'true', 'false', 'false']
    }))).toEqual(0)
    
    expect(getters.score(getMockState({
      questions: [],
      answers: []
    }))).toEqual(0)
    
    expect(getters.score(getMockState({
      questions: [
        { correct_answer: 'true' },
        { correct_answer: 'true' },
        { correct_answer: 'false' },
        { correct_answer: 'false' },
      ],
      answers: ['true', 'true', 'false', 'false']
    }))).toEqual(4)
    
    expect(getters.score(getMockState({
      questions: [
        { correct_answer: 'true' },
        { correct_answer: 'true' },
        { correct_answer: 'false' },
        { correct_answer: 'false' },
      ],
      answers: ['true', 'true', 'false', 'true']
    }))).toEqual(3)
    
    expect(getters.score(getMockState({
      questions: [
        { correct_answer: 'true' },
        { correct_answer: 'true' },
        { correct_answer: 'false' },
        { correct_answer: 'false' },
      ],
      answers: ['true', 'true']
    }))).toEqual(2)
    
    expect(getters.score(getMockState({
      questions: [
        { correct_answer: 'true' },
        { correct_answer: 'true' },
        { correct_answer: 'false' },
      ],
      answers: ['true', 'true', 'true', 'true']
    }))).toEqual(2)
  })
  
  it('.finished state is false if questions is empty', () => {
    expect(getters.finished(getMockState({
      questions: [],
      questionIndex: 0
    }))).toEqual(false)
    
    expect(getters.finished(getMockState({
      questions: [],
      questionIndex: 5
    }))).toEqual(false)
  })
  
  it('.finished state returns true when questionIndex >= number of questions', () => {
    expect(getters.finished(getMockState({
      questions: [{}, {}, {}],
      questionIndex: 3
    }))).toEqual(true)
    
    expect(getters.finished(getMockState({
      questions: [{}, {}, {}],
      questionIndex: 4
    }))).toEqual(true)
    
    expect(getters.finished(getMockState({
      questions: [{}, {}, {}],
      questionIndex: 2
    }))).toEqual(false)
    
    expect(getters.finished(getMockState({
      questions: [{}, {}, {}],
      questionIndex: 0
    }))).toEqual(false)
  })
  
  it('.inProgress returns false if questions length is 0', () => {
    expect(getters.inProgress(getMockState({
      questions: [],
      questionIndex: 0
    }))).toEqual(false)
    
    expect(getters.inProgress(getMockState({
      questions: [],
      questionIndex: 3
    }))).toEqual(false)
  })
  
  it('.inProgress returns true when questions length > 0 and quetsionIndex is less than num questions', () => {
    expect(getters.inProgress(getMockState({
      questions: [{}, {}, {}],
      questionIndex: 0
    }))).toEqual(true)
    
    expect(getters.inProgress(getMockState({
      questions: [{}, {}, {}],
      questionIndex: 1
    }))).toEqual(true)
    
    expect(getters.inProgress(getMockState({
      questions: [{}, {}, {}],
      questionIndex: 2
    }))).toEqual(true)
    
    expect(getters.inProgress(getMockState({
      questions: [{}, {}, {}],
      questionIndex: 3
    }))).toEqual(false)
    
    expect(getters.inProgress(getMockState({
      questions: [{}, {}, {}],
      questionIndex: 4
    }))).toEqual(false)
  })
})

describe('actions', () => {
  it('.setAnswer snapshot', () => {
    expect(actions.setAnswer('true')).toMatchSnapshot()
  })
  
  it('.setQuestions snapshot', () => {
    expect(actions.setQuestions(['wee', 'woo', 'fee'])).toMatchSnapshot()
  })
  
  it('.reset snapshot', () => {
    expect(actions.reset()).toMatchSnapshot()
  })
  
  describe('.startQuiz', () => {
    it('dispatches set questions on success', async () => {
      const mockDispatch = jest.fn()
      actions.startQuiz(mockDispatch)
      const mockQuestions = [
        {
          category: 'wee',
          question: 'who what when where',
          correct_answer: 'true'
        },
        {
          category: 'woo',
          question: 'whatever',
          correct_answer: 'false'
        },
        {
          category: 'fee',
          question: 'poop',
          correct_answer: 'true'
        }
      ]
      client.query = jest.fn().mockResolvedValue({
        data: {
          questions: mockQuestions
        }
      })
      await actions.startQuiz()(mockDispatch)
      expect(mockDispatch).toHaveBeenCalledWith({
        type: 'SET_QUESTIONS',
        questions: mockQuestions
      })
    })
    
    it('throws on failure', async () => {
      const mockDispatch = jest.fn()
      actions.startQuiz(mockDispatch)
      client.query = jest.fn().mockRejectedValue(new Error('oohwee'))
      try {
        console.error = jest.fn() // silence error
        await actions.startQuiz()(mockDispatch)
      } catch (e) {
        expect(mockDispatch).not.toHaveBeenCalled()
        expect(e.message).toEqual('oohwee')
      }
    })
  })
})

describe('reducer', () => {
  describe('SET_QUESTIONS', () => {
    it('sets to empty array if null questions', () => {
      const result = quizReducer(
        getMockState(), 
        actions.setQuestions(null)
      )
      expect(result.questions).toEqual([])
   
      const result2 = quizReducer(
        getMockState(), 
        actions.setQuestions(undefined)
      )
      expect(result2.questions).toEqual([])
    })

    it('sets to questions if given', () => {
      const result = quizReducer(
        getMockState(), 
        actions.setQuestions([{ id: '1' }])
      )
      expect(result.questions).toEqual([{ id: '1' }])
    })
  })
  
  describe('SET_ANSWER', () => {
    it('adds to answer array and ups the questionIndex', () => {
      const initialState = getMockState({
        questions: [{}, {}]
      })
      expect(initialState.questionIndex).toEqual(0)
      expect(initialState.answers).toEqual([])
      const result = quizReducer(
        initialState,
        actions.setAnswer('true')
      )
      expect(result.questionIndex).toEqual(1)
      expect(result.answers).toEqual(['true'])
    })
    
    it('returns current state if quiz is finished', () => {
      const initialState = getMockState({
        questions: [{}, {}],
        answers: ['true', 'true'],
        questionIndex: 2
      })
      expect(getters.finished(initialState)).toBe(true)
      const result = quizReducer(
        initialState,
        actions.setAnswer('false')
      )
      expect(result).toEqual(initialState)
    })
  })
  
  it('RESET resets to initial state', () => {
    const result = quizReducer(
      getMockState({ 
        questions: [{ id: '1' }], 
        questionIndex: 4 
      }), 
      actions.reset()
    )
    expect(result).toEqual(initialState)
  })
})
