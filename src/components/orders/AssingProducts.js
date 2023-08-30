import React, { useState, useEffect, useContext } from 'react'
import Select from 'react-select'
import PedidoContext from '@/context/pedidos/PedidoContext'
import { useQuery, gql } from '@apollo/client'

const OBTENER_PRODCUTOS = gql`
  query ObtenerProductos {
    obtenerProductos {
      id
      nombre
      precio
      existencia
    }
  }
`

export default function AssingProducts() {
  const [ productos, setProductos ] = useState([]);
  const pedidoContext = useContext(PedidoContext)
  const { data, loading, error } = useQuery(OBTENER_PRODCUTOS)

  useEffect(() => {
    pedidoContext?.agregarProductos(productos)

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productos])

  function seleccionarProducto(clienteSeleccionado) {
    setProductos(clienteSeleccionado)
  }


  if (loading) return null;

  return (
    <>
      <p className="mt-10 my-2 bg-white border-l-4 border-slate-800 text-slate-700 p-2 text-sm font-bold">
        2 - Asigna un Producto a tu pedido
      </p>
      <Select
        isMulti
        options={data?.obtenerProductos}
        onChange={seleccionarProducto}
        getOptionValue={(opciones) => opciones.id}
        getOptionLabel={(opciones) => `${opciones.nombre} - ${opciones.existencia} disponibles`}
        placeholder="Busque o seleccione los productos"
        noOptionsMessage={() => "No hay resultados"}
        className="text-slate-500"
      />
    </>
  )
}
