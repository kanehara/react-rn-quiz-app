const { createTestClient } = require('apollo-server-testing')
const { server } = require('../apollo-server')
const nock = require('nock')

const MOCK_RESPONSE = {
  response_code: 0,
  results: [
    {
      category: "Entertainment: Video Games",
      type: "boolean",
      difficulty: "easy",
      question: "&quot;Undertale&quot; is an RPG created by Toby Fox and released in 2015.",
      correct_answer: "True",
      incorrect_answers: [
        "False"
      ]
    },
    {
      category: "Science: Mathematics",
      type: "multiple",
      difficulty: "hard",
      question: "How many zeptometres are inside one femtometre?",
      correct_answer: "1,000,000",
      incorrect_answers: [
        "10",
        "1,000,000,000",
        "1000"
      ]
    },
    {
      category: "Entertainment: Musicals & Theatres",
      type: "multiple",
      difficulty: "hard",
      question: "In Macbeth, the eyes of what animals were used in the Witches&#039; cauldron?",
      correct_answer: "Newts",
      incorrect_answers: [
        "Humans",
        "Sharks",
        "Squids"
      ]
    },
    {
      category: "General Knowledge",
      type: "multiple",
      difficulty: "hard",
      question: "Nephelococcygia is the practice of doing what?",
      correct_answer: "Finding shapes in clouds",
      incorrect_answers: [
        "Sleeping with your eyes open",
        "Breaking glass with your voice",
        "Swimming in freezing water"
      ]
    }
  ]
}

describe('gql server', () => {
  let query
  beforeEach(() => {
    const client = createTestClient(server)
    query = client.query
  })

  it('fetches questions', async () => {
    nock('https://opentdb.com')
    .get('/api.php?amount=10&difficulty=hard&type=boolean')
    .reply(200, MOCK_RESPONSE)
    const res = await query({ query: `
      query {
        questions {
          category
          type
          difficulty
          question
          correct_answer
          incorrect_answers
        }
      }
    ` })
    expect(res).toMatchSnapshot()
  })

  it('fetches questions with custom params', async () => {
    nock('https://opentdb.com')
    .get('/api.php?amount=1&difficulty=easy&type=custom')
    .reply(200, MOCK_RESPONSE)
    const res = await query({ query: `
      query {
        questions(amount:1, difficulty:"easy", type:"custom") {
          category
          type
          difficulty
          question
          correct_answer
          incorrect_answers
        }
      }
    ` })
    expect(res).toMatchSnapshot()
  })
})