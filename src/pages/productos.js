import React from "react"
import Link from "next/link"
import Layout from '@/components/Layout'
import Product from "@/components/Product"
import { useQuery } from '@apollo/client'
import { OBTENER_PRODUCTOS } from '@/config/queries'


function Productos() {
  const { data, loading, error } = useQuery(OBTENER_PRODUCTOS, { fetchPolicy: 'cache-and-network' })

  if (loading) {
    return (
      <Layout>
        <p className="text-gray-800 font-light">Cargando productos</p>
      </Layout>
    )
  }

  if (error) {
    return (
      <Layout>
        <p className="text-gray-800 font-light">Error en la carga de los productos</p>
      </Layout>
    )
  }

  return (
    <>
      {!loading && data ? (
        <Layout>
          <>
            <h1 className='text-slate-700 text-2xl font-light'>Productos</h1>
            <Link href="/nuevo-producto" className="bg-slate-800 py-2 px-5 mt-3 inline-block text-white rounded text-sm hover:bg-slate-900 mb-3 uppercase">
              Nuevo Producto
            </Link>
            <div className="overflow-x-scroll">
              <table className='table-auto shadow-md mt-10 w-full w-lg'>
                <thead className='bg-slate-800'>
                  <tr className=' text-white'>
                    <th className='w-1/5 py-2'>Nombre</th>
                    <th className='w-1/5 py-2'>Existencia</th>
                    <th className='w-1/5 py-2'>Precio</th>
                    <th className='w-1/5 py-2'>Eliminar</th>
                    <th className='w-1/5 py-2'>Editar</th>
                  </tr>
                </thead>
                <tbody className='bg-white'>
                  {data?.obtenerProductos?.map(producto => (
                    <Product key={producto.id} producto={producto} />
                  ))}
                </tbody>
              </table>
            </div>
          </>
        </Layout>
      ) : null}
    </>
  )
}

export default Productos
