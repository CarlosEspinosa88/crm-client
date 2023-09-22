import { ApolloClient, InMemoryCache, createHttpLink, from } from '@apollo/client'
import { onError } from '@apollo/client/link/error';
import { setContext } from '@apollo/client/link/context'
import fetch from "node-fetch"

const cache = new InMemoryCache();
const httpLink = createHttpLink({ uri: process.env.NEXT_PUBLIC_DB_HOST, fetch })

const setAuthorizationLink = setContext( async (_, { headers }) => {
  const token = localStorage.getItem('token')

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '' 
    }
  }
});

const errorLink = onError(({ graphQLErrors, networkError, operation }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) => {
      const { variables } = operation;
      const dataError = {
        message,
        locations,
        path,
        variables
      };

      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      );
    });
  }

  if (networkError) {
    const networkErrorMessage = `[Network error]: ${networkError}`;
    console.log(networkErrorMessage);
  }
});

const cliente = new ApolloClient({
  connectToDevTools: true,
  link: from([errorLink, setAuthorizationLink, httpLink ]),
  cache
})

export default cliente
