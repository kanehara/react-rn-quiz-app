const initialState = {
  questions: [],
  questionNum: 0
}

export const setQuestions = questions => ({ type: 'SET_QUESTIONS', questions })
export const setAnswer = answer => ({ type: 'SET_ANSWER', answer })
export const reset = () => ({ type: 'RESET' })

export const quizReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'SET_QUESTIONS':
      return { ...state, questions: action.questions }
    case 'SET_ANSWER':
      const q = state.questions[state.questionNum]
      if (q) {
        q.answer = action.answer
        return { 
          ...state,
          questions: state.questions,
          questionNum: state.questionNum + 1
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
