import '@/styles/globals.css'
import { ApolloProvider } from '@apollo/client'
import cliente from '@/config/apollo'

export default function App({ Component, pageProps }) {
  return (
    <ApolloProvider client={cliente}>
        <Component {...pageProps} />
    </ApolloProvider>
  )
} 
