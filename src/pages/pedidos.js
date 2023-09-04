import React from "react"
import Layout from '@/components/Layout'
import Link from "next/link"
import Order from "@/components/Order"
import { gql, useQuery } from "@apollo/client"

const OBETENER_PEDIDOS_VENDEDOR = gql`
  query ObtenerPedidosVendedor {
    obtenerPedidosVendedor {
      id
      pedido {
        nombre
        cantidad
        id
      }
      total
      cliente {
        id
        nombre
        apellido
        email
        telefono
      }
      vendedor
      creado
      estado
    }
  }
`

function Pedidos() {

  const { data, loading, error } = useQuery(OBETENER_PEDIDOS_VENDEDOR)

  // console.log(loading)
  // console.log(error)
  // console.log(data)

  if (loading) {
    return (
      <Layout>
        <p className="text-gray-800 font-light">Cargando....</p>
      </Layout>
    )
  }
  return (
    <div>
      {!loading && data ? (
        <Layout>
          <h1 className='text-slate-700 text-2xl font-light'>Pedidos</h1>
          <Link href="/nuevo-pedido" className="bg-slate-800 py-2 px-5 mt-3 inline-block text-white rounded text-sm hover:bg-slate-900 mb-3 uppercase">
            Nuevo Pedido
          </Link>
          {data?.obtenerPedidosVendedor === 0 ? (
            <p className="mt-5 text-center text-2xl">No hay pedidos aún</p>
          ) : (
            <>
            {data.obtenerPedidosVendedor.map(( pedidos ) => (
              <Order key={pedidos.id} pedidos={pedidos} />
            ))}
            </>
          )}
        </Layout>
      ) : null}
    </div>
  )
}

export default Pedidos