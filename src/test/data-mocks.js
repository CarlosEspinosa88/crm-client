import { OBTENER_PEDIDOS_VENDEDOR_COMPLETO, OBTENER_USUARIO, OBTENER_PRODUCTOS } from "@/config/queries";

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
        email: 'carlinhnos@pedido.com'
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
          id: 1233,
          nombre: 'iPhone 14',
          cantidad: 2,
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
    error: new Error('Failed to fetch stocks data')
  }
]


export const mockProductos = [
  userMock,
  {
    request: {
      query: OBTENER_PRODUCTOS,
      fetchPolicy: 'cache-and-network'
    },
    result: {
      data: {
        obtenerProductos: [{
          id: 23333,
          nombre: 'iPhone 12',
          precio: 8000000,
          existencia: 4,
          creado: '2020-03-02'
        }]
      }
    }
  }
]

export const errorMockProductos = [
  userMock,
  {
    request: {
      query: OBTENER_PRODUCTOS,
      fetchPolicy: 'cache-and-network'
    },
    error: new Error('Failed to fetch products data')
  }
]
