import '@/styles/globals.css'
import { ApolloProvider } from '@apollo/client'
import cliente from '@/config/apollo'
import PedidoState from  '../context/pedidos/PedidoState'

export default function App({ Component, pageProps }) {
  return (
    <ApolloProvider client={cliente}>
      <PedidoState>
        <Component {...pageProps} />
      </PedidoState>
    </ApolloProvider>
  )
} 
