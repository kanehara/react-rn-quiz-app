import ApolloClient from 'apollo-boost'
import { Platform } from 'react-native'

const client = new ApolloClient({
  uri: `http://${Platform.OS === 'android' ? '10.0.2.2' : 'localhost'}:4000`
})

export default client
