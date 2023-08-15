import { ApolloClient, InMemoryCache, HttpLink, from } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import fetch from "node-fetch"


const cache = new InMemoryCache();
const httpLink = new HttpLink({ uri: 'http://localhost:4000/', fetch })

const setAuthorizationLink = setContext(async (_, { headers }) => {
  const token = localStorage.getItem('token')

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '' 
    }
  }
});

const cliente = new ApolloClient({
  link: from([setAuthorizationLink, httpLink]),
  cache
})

export default cliente