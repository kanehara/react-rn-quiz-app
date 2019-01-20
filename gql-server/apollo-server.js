const { ApolloServer, gql } = require('apollo-server')
const axios = require('axios')
const logger = require('./logger')
const decode = require('html-entities').AllHtmlEntities.decode

const typeDefs = gql`
  type Question {
    category: String,
    type: String,
    difficulty: String,
    question: String,
    correct_answer: String,
    incorrect_answers: [String]
  }

  type Query {
    questions(amount: Int, difficulty: String, type: String): [Question]
  }
`

const resolvers = {
  Query: {
    questions: async (_, { amount, difficulty, type }) => {
      try {
        const params = {
          amount: amount || 10,
          difficulty: difficulty || 'hard',
          type: type || 'boolean'
        }
        const res = await axios.get('https://opentdb.com/api.php', { params })
        return res.data.results
          .map(r => ({
            ...r,
            question: decode(r.question)
          }))
      } catch (e) {
        logger.error('Error fetching data\n' + e)
      }
    },
  },
}

const server = new ApolloServer({ typeDefs, resolvers });

module.exports = {
  server
}
