import { gql } from '@apollo/client';

export const AUTENTICAR_NUEVO_USUARIO = gql`
  mutation AutenticarUsuario($input: AutenticarInput) {
    autenticarUsuario(input: $input) {
      token
    }
  }
`

export const NUEVA_CUENTA = gql`
  mutation NuevoUsuario($input: UsuarioInput) {
    nuevoUsuario(input: $input) {
      nombre
      apellido
      email
      creado
    }
  }
`

export const NUEVO_CLIENTE = gql`
  mutation NuevoCliente($input: ClienteInput) {
    nuevoCliente(input: $input) {
      id
      nombre
      apellido
      empresa
      telefono
      vendedor
    }
  }
`

export const NUEVO_PEDIDO = gql`
  mutation NuevoPedido($input: PedidoInput) {
    nuevoPedido(input: $input) {
      id
    }
  }
`

export const AGREGAR_NUEVO_PRODUCTO = gql`
  mutation NuevoProducto($input: ProductoInput) {
    nuevoProducto(input: $input) {
      id
      nombre
      existencia
      precio
    }
  }
`

export const ACTUALIZAR_PRODUCTO = gql`
  mutation ActualizarProducto($id: ID!, $input: ProductoInput) {
    actualizarProducto(id: $id, input: $input) {
      nombre
      precio
      existencia
      creado
    }
  }
`

export const ACTUALIZAR_CLIENTE = gql`
  mutation ActualizarCliente($id: ID!, $input: ClienteInput) {
    actualizarCliente(id: $id, input: $input) {
      id
      nombre
      apellido
      vendedor
    }
  }
`

export const ELIMINAR_PRODUCTO = gql`
  mutation EliminarProducto($id: ID!) {
    eliminarProducto(id: $id)
  }
`

export const ACTUALIZAR_PEDIDO = gql`
  mutation ActualizarPedido($id: ID!, $input: PedidoInput) {
    actualizarPedido(id: $id, input: $input) {
      id
      estado
      pedido {
        id
        cantidad
      }
    }
  }
`

export const ELIMINAR_PEDIDO = gql`
  mutation EliminarPedido($id: ID!) {
    eliminarPedido(id: $id)
  }
`
