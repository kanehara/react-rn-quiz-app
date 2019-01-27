const initialState = {
  questions: [],
  questionIndex: 0,
  finished: false
}

export const setQuestions = questions => ({ type: 'SET_QUESTIONS', questions })
export const setAnswer = answer => ({ type: 'SET_ANSWER', answer })
export const reset = () => ({ type: 'RESET' })

export const quizReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'SET_QUESTIONS':
      return { ...state, questions: action.questions || [] }
    case 'SET_ANSWER':
      const q = state.questions[state.questionIndex]
      if (q) {
        q.answer = action.answer
        const nextIndex = state.questionIndex + 1
        const finished = nextIndex === state.questions.length
        return { 
          ...state,
          questions: state.questions,
          questionIndex: finished
            ? state.questions.length - 1
            : nextIndex,
          finished
        }
      } else {
        return state
      }
    case 'RESET':
      return initialState
    default:
      return state
  }
}
