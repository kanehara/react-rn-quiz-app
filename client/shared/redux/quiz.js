import client from 'shared/apolloClient'
import gql from 'graphql-tag'

export const initialState = {
  questions: [],
  answers: [],
  questionIndex: 0
}

const score = (state, idx = 0, cumm = 0) => {
  if (idx === state.questions.length) {
    return cumm
  }
  return score(state, idx + 1, cumm + (state.answers[idx] === state.questions[idx].correct_answer))
}
const finished = state => state.questions.length > 0 && state.questionIndex >= state.questions.length
const inProgress = state => !finished(state) && state.questions.length > 0

export const getters = {
  score,
  finished,
  inProgress
}

const setAnswer = answer => ({ type: 'SET_ANSWER', answer })
const setQuestions = questions => ({ type: 'SET_QUESTIONS', questions })
const reset = () => ({ type: 'RESET' })
const startQuiz = () => async dispatch => {
  try {
    const res = await client.query({
      query: gql`{
        questions {
          category
          question
          correct_answer
        }
      }`
    })
    dispatch(setQuestions(res.data.questions))
  } catch (e) {
    console.error('Failed fetching for questions', e)
    throw e
  }
}
export const actions = {
  setAnswer,
  setQuestions,
  reset,
  startQuiz
}

export const quizReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'SET_QUESTIONS':
      return { ...state, questions: action.questions || [] }
    case 'SET_ANSWER':
      const q = state.questions[state.questionIndex]
      if (q) {
        const nextIndex = state.questionIndex + 1
        const finished = getters.finished(state)
        return { 
          ...state,
          answers: [...state.answers, action.answer],
          questionIndex: finished
            ? state.questions.length - 1
            : nextIndex
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
