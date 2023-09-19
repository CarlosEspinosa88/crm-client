import React, { useReducer } from "react";
import PedidoContext from "./PedidoContext";
import PedidoReducer from "./PedidoReducer"
import { 
  SELECCIONAR_CLIENTE,
  SELECCIONAR_PRODUCTO,
  CANTIDAD_PRODUCTOS,
  ACTUALIZAR_TOTAL
 } from "@/types/index";
 
 function PedidoState({ children }) {
  const initialState = {
    cliente: {},
    productos: [],
    total: 0
  }

  const [ state, dispatch ] = useReducer(PedidoReducer, initialState)

  function agregarCliente(cliente) {
    dispatch({
      type: SELECCIONAR_CLIENTE,
      payload: cliente
    })
  }

  function agregarProductos(productosSeleccionados) {
    let nuevoEstado;

    if (state.productos.length > 0) {
      nuevoEstado = productosSeleccionados.map((producto) => {
        const nuevoObjeto = state.productos.find(productoState => productoState.id === producto.id)

        return { ...producto, ...nuevoObjeto}
      })
    } else {
      nuevoEstado = productosSeleccionados
    }


    dispatch({
      type: SELECCIONAR_PRODUCTO,
      payload: nuevoEstado
    })
  }

  function agregarCantidadProductos(nuevoProducto) {
    dispatch({
      type: CANTIDAD_PRODUCTOS,
      payload: nuevoProducto
    })
  }

  function actualizarTotal() {
    dispatch({
      type: ACTUALIZAR_TOTAL
    })
  }

   return (
     <PedidoContext.Provider
      value={{
        cliente: state.cliente,
        productos: state.productos,
        total: state.total,
        agregarCantidadProductos,
        agregarCliente,
        agregarProductos,
        actualizarTotal,
      }}
     >
      {children}
     </PedidoContext.Provider>
   )
 }

 export default PedidoState
 