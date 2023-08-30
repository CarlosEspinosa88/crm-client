import React, { useState, useEffect, useContext } from 'react'
import Select from 'react-select'
import PedidoContext from '@/context/pedidos/PedidoContext'
import { useQuery, gql } from '@apollo/client'

const OBTENER_CLIENTES = gql`
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

export default function AssignOrders() {
  const [ cliente, setClientes ] = useState([]);
  const pedidoContext = useContext(PedidoContext);
  const { data , loading, error } = useQuery(OBTENER_CLIENTES);
  
  useEffect(() => {
    pedidoContext?.agregarCliente(cliente)

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cliente ])

  function seleccionarCliente(clienteSeleccionado) {
    setClientes(clienteSeleccionado)
  }

  if (loading) return null

  return (
    <>
      <p className="mt-10 my-2 bg-white border-l-4 border-slate-800 text-slate-700 p-2 text-sm font-bold">
        1 - Asigna un Cliente a tu pedido
      </p>
      <Select
        options={data?.obtenerClientesVendedor}
        onChange={seleccionarCliente}
        getOptionValue={(opciones) => opciones.id}
        getOptionLabel={(opciones) => opciones.nombre}
        placeholder="Busque o seleccione el cliente"
        noOptionsMessage={() => "No hay resultados"}
        className="text-slate-500"
      />
    </>
  )
}
