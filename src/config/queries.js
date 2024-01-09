import { gql } from '@apollo/client'

export const OBTENER_USUARIO = gql`
  query ObtenerUsuario {
    obtenerUsuario {
      id
      nombre
      apellido
      email
    }
  }
`

export const OBTENER_CLIENTE = gql`
  query ObtenerCliente($id: ID!) {
    obtenerCliente(id: $id) {
      id
      nombre
      apellido
      email
      empresa
      vendedor
      telefono
    }
  }
`

export const OBTENER_CLIENTES = gql`
  query ObtenerClientesVendedor {
    obtenerClientesVendedor {
      id
      nombre
      apellido
      email
      empresa
      vendedor
    }
  }
`

export const MEJORES_CLIENTES = gql`
  query MejoresClientes {
    mejoresClientes {
      cliente {
        nombre,
        apellido
        empresa
        vendedor
      },
      total
    }
  }
`

export const MEJORES_VENDEDORES = gql`
  query MejoresVendedores {
    mejoresVendedores {
      vendedor {
        nombre
        apellido
        email
      }
      total
    }
  }
`

export const OBTENER_PEDIDOS_VENDEDOR = gql`
  query ObtenerPedidosVendedor {
    obtenerPedidosVendedor {
      id
    }
  }
`

export const OBTENER_PRODUCTOS = gql`
  query ObtenerProductos {
    obtenerProductos {
      id
      nombre
      precio
      existencia
      creado
    }
  }
`

export const OBTENER_PEDIDOS_VENDEDOR_COMPLETO = gql`
  query ObtenerPedidosVendedor {
    obtenerPedidosVendedor {
      id
      pedido {
        nombre
        cantidad
        id
      }
      total
      cliente
      vendedor
      creado
      estado
    }
  }
`

export const OBTENER_PRODUCTO = gql`
  query ObtenerProducto($id: ID!) {
    obtenerProducto(id: $id) {
      id
      nombre
      precio
      existencia
      creado
    }
  }
`
