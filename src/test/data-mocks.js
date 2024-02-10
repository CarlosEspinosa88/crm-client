import { OBTENER_PEDIDOS_VENDEDOR_COMPLETO, OBTENER_USUARIO } from "@/config/queries";

const userMock = {
  request: {
    query: OBTENER_USUARIO,
    fetchPolicy: 'cache-and-network',
  },
  result: {
    data: {
      obtenerUsuario: {
        id: 2233,
        nombre: 'Carlinhnos',
        apellido: 'Espinosa',
        email: 'carlinhnos@pedido.com',
      }
    },
  }
}

export const mockPedidos = [
  userMock,
  {
  request: {
    query: OBTENER_PEDIDOS_VENDEDOR_COMPLETO,
    fetchPolicy: 'cache-and-network'
  },
  result: {
    data: {
      obtenerPedidosVendedor: [{ 
        id: 2233,
        pedido: [{
          nombre: 'iPhone',
          cantidad: 2,
          id: 1233,
        }],
        cliente: {
          id: 22132,
          nombre: 'Carlos',
          apellido: 'Espinosa',
          email: 'carloes@pedido.com',
          telefono: '2121232312',
        },
        total: 332432,
        vendedor: 'Jhon',
        creado: '2020-02-01',
        estado: 'PENDIENTE',
      }]
    }
  }
}]

export const errorMockPedidos = [
  userMock,
  {
    request: {
      query: OBTENER_PEDIDOS_VENDEDOR_COMPLETO,
      fetchPolicy: 'cache-and-network',
    },
    error: new Error('Failed to fetch data')
  }
]
