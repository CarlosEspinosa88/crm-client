import React, { useContext, useState } from 'react'
import Link from "next/link"
import Swal from 'sweetalert2';
import { useRouter } from 'next/router';
import { useMutation } from '@apollo/client'

import Layout from '@/components/Layout'
import AssignOrders from '@/components/orders/AssignOrders'
import AssingProducts from '@/components/orders/AssingProducts'
import ResumeOrder from '@/components/orders/ResumeOrder'
import Total from '@/components/orders/Total'
import PedidoContext from '@/context/pedidos/PedidoContext'
import { NUEVO_PEDIDO } from '@/config/mutations'
import { OBTENER_PEDIDOS_VENDEDOR } from '@/config/queries'

function NuevoPedido() {
  const router = useRouter()
  const [ mensaje, setMensaje ] = useState(null)
  const [ nuevoPedido ] = useMutation(NUEVO_PEDIDO, {
    update(cache, { data: { nuevoPedido }}) {
      const { obtenerPedidosVendedor } = cache.readQuery({ query: OBTENER_PEDIDOS_VENDEDOR})

      cache.writeQuery({
        query: OBTENER_PEDIDOS_VENDEDOR,
        data: {
          obtenerPedidosVendedor: [
            ...obtenerPedidosVendedor,
            nuevoPedido
          ]
        }
      })
    }
  })
  const pedidoContext = useContext(PedidoContext);
  const { cliente, total, productos } = pedidoContext

  const validarPedido = () => {
    return (!productos.every((producto) => producto.cantidad > 0) || total === 0 || cliente.length === 0 || productos.length === 0)    
  }

  async function crearPedido() {
    const pedido = productos.map(({__typename, existencia, ...producto}) => producto)

    try {
      const { data } = await nuevoPedido({ 
        variables: {
          input: {
            cliente: cliente?.id,
            total,
            pedido
          }
        }
      })

      router.push('/pedidos');

      Swal.fire(
        'Correcto',
        'El pedido se registró correctamente',
        'success'
      );
    } catch (error) {
      setMensaje(error.message.replace('GraphQL error: ', ''));

        setTimeout(() => {
          setMensaje(null);
        }, 3000)
    }
  }

  function mensajeDeLaApi() {
    return (
      <div className="bg-white py-2 px-3 max-w-sm my-3 text-center mx-auto">
        <p className='text-gray-800 font-light'>{mensaje}</p>
      </div>
    )
  }
  
  return (
    <Layout>
      <h1 className='text-slate-700 text-2xl font-light'>Crear nuevo pedido</h1>
      {mensaje ? mensajeDeLaApi() : null}
      <AssignOrders />
      <AssingProducts />
      <ResumeOrder />
      <Total />
      <button
        type="button"
        disabled={validarPedido()}
        onClick={crearPedido}
        className={`bg-slate-800 w-full mt-5 p-2 text-white uppercase font-bold hover:bg-slate-900 ${validarPedido() && "cursor-not-allowed"}`}
      >
        Resgistrar Pedido
      </button>
    </Layout>
  )
}

export default NuevoPedido
