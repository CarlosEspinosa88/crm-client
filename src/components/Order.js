import React, { useState } from 'react'
import Swal from 'sweetalert2';
import { useMutation, useQuery } from '@apollo/client'
import { OBTENER_PEDIDOS_VENDEDOR, OBTENER_CLIENTE } from "@/config/queries"
import { ACTUALIZAR_PEDIDO, ELIMINAR_PEDIDO } from "@/config/mutations"
import { ESTADO_PEDIDO } from "@/utils/constants"

function Order({ pedidos }) {
  const { id, cliente, total, estado } = pedidos
  const [estadoPedido, guardarEstadoPedido] = useState(estado)
  const { data, loading, error} = useQuery(OBTENER_CLIENTE, { variables: { id: cliente }})
  const [ actualizarPedido ] = useMutation(ACTUALIZAR_PEDIDO)
  const [ eliminarPedido ] = useMutation(ELIMINAR_PEDIDO, {
    update(cache) {
      const { obtenerPedidosVendedor } = cache.readQuery({ query: OBTENER_PEDIDOS_VENDEDOR })

      cache.writeQuery({
        query: OBTENER_PEDIDOS_VENDEDOR,
        data: {
          obtenerPedidosVendedor: obtenerPedidosVendedor.filter(pedido => pedido.id !== id)
        }
      })
    }
  })

  async function cambiarEstadoPedido(event) {
    try {
      const { data } = await actualizarPedido({
        variables: {
          id,
          input: {
            estado: event.target.value,
            cliente
          }
        }
      });

      guardarEstadoPedido(data.actualizarPedido.estado)
    } catch (error) {
      console.log(error)
    }
  }

  function confirmarEliminarPedido() {
    Swal.fire({
      title: 'Deseas eliminar este pedido?',
      text: "Esta acción no se puede deshacer",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Eliminar!',
      cancelButtonText: 'No, cancelar'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const { data } = await eliminarPedido({
            variables: { id }
          })
          Swal.fire(
            'Correcto!',
            data.eliminarPedido,
            'success'
          )
        } catch (error) {
          console.log(error)
        }
      }
    })
  }

  if (loading) {
    return (
      <div>
        <p className="text-gray-800 font-light">Cargando....</p>
      </div>
    )
  }

  if (error) {
    return (
      <div>
        <p className="text-gray-800 font-light">Error de carga de datos....</p>
      </div>
    )
  }

  const infoCliente = data?.obtenerCliente

  return (
    <div className={`${ESTADO_PEDIDO[estado]} border-t-4 mt-4 bg-white rounded p-6 md:grid md:grid-cols-2 md:gap-4 shadow-lg`}>
      <div>
        <p className="font-bold text-slate-800 mt-2">
          Cliente: {infoCliente?.nombre} {infoCliente?.apellido}
        </p>

        {infoCliente?.email ? (
          <p className="flex justify-start pt-2 w-full text-slate-500 text-xs">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 9v.906a2.25 2.25 0 01-1.183 1.981l-6.478 3.488M2.25 9v.906a2.25 2.25 0 001.183 1.981l6.478 3.488m8.839 2.51l-4.66-2.51m0 0l-1.023-.55a2.25 2.25 0 00-2.134 0l-1.022.55m0 0l-4.661 2.51m16.5 1.615a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V8.844a2.25 2.25 0 011.183-1.98l7.5-4.04a2.25 2.25 0 012.134 0l7.5 4.04a2.25 2.25 0 011.183 1.98V19.5z" />
            </svg>
              {infoCliente?.email}
            </p>
        ) : null}

        {infoCliente?.telefono ? (
        <p className="flex justify-start py-2 w-full text-slate-500 text-xs">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
          </svg>
          {infoCliente?.telefono}
        </p>
        ) : null}

        <h2 className="font-bold text-slate-800 mt-10">
          Estado pedido: {estado}
        </h2>
        <select value={estadoPedido} onChange={cambiarEstadoPedido} className="mt-2 appearance-none bg-blue-600 p-2 text-center rounded leading-tight focus:outline-none focus:bg-blue-600 focus:border-blue-500 uppercase text-xs font-bold">
          <option value="PENDIENTE">PENDIENTE</option>
          <option value="COMPLETADO">COMPLETADO</option>
          <option value="CANCELADO">CANCELADO</option>
        </select>
      </div>
      
      <div>
        <h2 className="text-slate-800 font-bold mt-2">Resumen del pedido</h2>
        {pedidos.pedido.map((articulo, index) => (
          <div key={articulo.id} className="mt-5">
            <p className="text-slate-800 text-sm">
              Nombre producto: {articulo.nombre}
            </p>
            <p className="text-slate-800 text-sm">
              Cantidad: {articulo.cantidad}
            </p>
          </div>
        ))}
        
        <div>
          <p className="text-slate-800 text-sm mt-3 font-bold">
            Total a pagar: 
            <span className="text-slate-800 font-light ml-2">
              $ {total}
            </span>
          </p>
        </div>

        <div className="mt-4">
          <button
            type="button"
            className="flex justify-center items-center bg-red-800 px-4 py-2 w-full text-white rounded text-xs font-bold"
            onClick={confirmarEliminarPedido}
          >
            Eliminar pedido
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 ml-2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Order
